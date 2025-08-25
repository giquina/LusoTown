import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Vibration,
  AccessibilityInfo,
  InteractionManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton, Menu, Divider } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { Colors, Typography } from '../../constants/Styles';
import { TOUCH_TARGETS, SPACING } from '../../design-system/tokens/spacing';
import { supabase, getCurrentUser } from '../../lib/supabase';

const { width, height } = Dimensions.get('window');
const MESSAGE_ITEM_HEIGHT = 80; // Approximate height for performance optimization

interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'voice' | 'image' | 'sticker' | 'translation';
  metadata?: any;
  created_at: string;
  is_read: boolean;
  translation?: {
    original_language: string;
    translated_language: string;
    translated_text: string;
  };
  sender?: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

interface EnhancedChatScreenProps {
  chatId: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  navigation: any;
}

export default function EnhancedChatScreen({ 
  chatId, 
  recipientId, 
  recipientName, 
  recipientAvatar,
  navigation 
}: EnhancedChatScreenProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [inputHeight, setInputHeight] = useState(40);
  
  const flatListRef = useRef<FlatList>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesSubscription = useRef<any>(null);
  const inputRef = useRef<TextInput>(null);

  // Performance optimization: Memoized message renderer
  const renderMessage = useCallback(({ item: message, index }: { item: Message; index: number }) => {
    const isCurrentUser = message.sender_id === currentUser?.id;
    const showAvatar = !isCurrentUser && (
      index === messages.length - 1 || 
      messages[index + 1]?.sender_id !== message.sender_id
    );
    
    return (
      <MessageBubble
        message={message}
        isCurrentUser={isCurrentUser}
        showAvatar={showAvatar}
        recipientAvatar={recipientAvatar}
        onTranslate={handleMessageTranslation}
        onLongPress={handleMessageLongPress}
        previousMessage={index > 0 ? messages[index - 1] : undefined}
        nextMessage={index < messages.length - 1 ? messages[index + 1] : undefined}
      />
    );
  }, [currentUser?.id, messages, recipientAvatar]);

  // Enhanced keyboard handling
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        // Scroll to bottom when keyboard appears
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );
    
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadInitialData();
      subscribeToMessages();
      markMessagesAsRead();
      
      return () => {
        cleanup();
      };
    }, [chatId])
  );

  const cleanup = useCallback(() => {
    if (messagesSubscription.current) {
      messagesSubscription.current.unsubscribe();
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    updateTypingStatus(false);
  }, []);

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadUser(),
        loadMessages(),
      ]);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadUser = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }, []);

  const loadMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles(id, first_name, last_name, avatar_url)
        `)
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) throw error;
      
      setMessages(data || []);
      
      // Scroll to bottom after loading messages with delay for better UX
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: false });
        }, 100);
      });
    } catch (error) {
      console.error('Error loading messages:', error);
      Alert.alert(
        t('chat.error.title'),
        t('chat.error.loadMessages')
      );
    }
  }, [chatId, t]);

  const subscribeToMessages = useCallback(() => {
    messagesSubscription.current = supabase
      .channel(`chat-${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          
          // Enhanced scroll behavior with haptic feedback
          InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 50);
            
            // Haptic feedback for new messages from other users
            if (newMessage.sender_id !== currentUser?.id) {
              Vibration.vibrate(30);
              markMessageAsRead(newMessage.id);
            }
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_typing',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          const typingData = payload.new;
          if (typingData.is_typing && typingData.user_id !== currentUser?.id) {
            setTypingUsers(prev => 
              prev.includes(typingData.user_id) 
                ? prev 
                : [...prev, typingData.user_id]
            );
          } else {
            setTypingUsers(prev => 
              prev.filter(id => id !== typingData.user_id)
            );
          }
        }
      )
      .subscribe();
  }, [chatId, currentUser?.id]);

  const markMessagesAsRead = useCallback(async () => {
    if (!currentUser) return;
    
    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('chat_id', chatId)
        .neq('sender_id', currentUser.id)
        .eq('is_read', false);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }, [chatId, currentUser]);

  const markMessageAsRead = useCallback(async (messageId: string) => {
    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }, []);

  const sendMessage = useCallback(async (content: string, type: string = 'text', metadata?: any) => {
    if (!content.trim() && type === 'text') return;
    if (!currentUser) return;

    setIsSending(true);
    
    // Optimistic UI update
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      chat_id: chatId,
      sender_id: currentUser.id,
      content: content.trim(),
      message_type: type as any,
      metadata: metadata || {},
      created_at: new Date().toISOString(),
      is_read: false,
      sender: {
        id: currentUser.id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        avatar_url: currentUser.avatar_url,
      }
    };

    setMessages(prev => [...prev, optimisticMessage]);
    setNewMessage('');

    try {
      const messageData = {
        chat_id: chatId,
        sender_id: currentUser.id,
        content: content.trim(),
        message_type: type,
        metadata: metadata || {},
        created_at: new Date().toISOString(),
        is_read: false,
      };

      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select()
        .single();

      if (error) throw error;

      // Update optimistic message with real data
      setMessages(prev => 
        prev.map(msg => 
          msg.id === optimisticMessage.id 
            ? { ...data, sender: optimisticMessage.sender }
            : msg
        )
      );
      
      // Stop typing indicator
      await updateTypingStatus(false);
      
      // Haptic feedback for sent message
      Vibration.vibrate(20);
      
      // Scroll to bottom
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);
      });
      
    } catch (error) {
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
      setNewMessage(content.trim());
      
      console.error('Error sending message:', error);
      Alert.alert(
        t('chat.error.title'),
        t('chat.error.sendMessage')
      );
    } finally {
      setIsSending(false);
    }
  }, [currentUser, chatId, t, updateTypingStatus]);

  const updateTypingStatus = useCallback(async (isTyping: boolean) => {
    if (!currentUser) return;
    
    try {
      await supabase
        .from('chat_typing')
        .upsert({
          chat_id: chatId,
          user_id: currentUser.id,
          is_typing: isTyping,
          updated_at: new Date().toISOString(),
        });
    } catch (error) {
      console.error('Error updating typing status:', error);
    }
  }, [currentUser, chatId]);

  const handleTextChange = useCallback((text: string) => {
    setNewMessage(text);
    
    // Update typing status with debouncing
    updateTypingStatus(true);
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      updateTypingStatus(false);
    }, 2000);
  }, [updateTypingStatus]);

  const handleContentSizeChange = useCallback((event: any) => {
    const newHeight = Math.min(Math.max(40, event.nativeEvent.contentSize.height), 120);
    setInputHeight(newHeight);
  }, []);

  const handleSendPress = useCallback(() => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
    }
  }, [newMessage, sendMessage]);

  const handleVoiceMessage = useCallback(async (audioUri: string, duration: number) => {
    const metadata = {
      duration,
      audio_url: audioUri,
    };
    
    await sendMessage(t('chat.voiceMessage'), 'voice', metadata);
  }, [sendMessage, t]);

  const handleImageMessage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        
        // Upload image to Supabase storage
        const imageUrl = await uploadImage(asset.uri);
        
        const metadata = {
          image_url: imageUrl,
          width: asset.width,
          height: asset.height,
        };
        
        await sendMessage(t('chat.imageMessage'), 'image', metadata);
      }
    } catch (error) {
      console.error('Error handling image message:', error);
      Alert.alert(
        t('chat.error.title'),
        t('chat.error.imageUpload')
      );
    }
    
    setMenuVisible(false);
  }, [sendMessage, t]);

  const uploadImage = useCallback(async (uri: string): Promise<string> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const fileName = `chat-image-${Date.now()}.jpg`;
      const filePath = `${currentUser.id}/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('chat-images')
        .upload(filePath, blob, {
          contentType: 'image/jpeg',
        });
        
      if (error) throw error;
      
      const { data: urlData } = supabase.storage
        .from('chat-images')
        .getPublicUrl(filePath);
        
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }, [currentUser]);

  const handleStickerMessage = useCallback(async (sticker: any) => {
    const metadata = {
      sticker_id: sticker.id,
      sticker_url: sticker.url,
      cultural_context: sticker.cultural_context,
    };
    
    await sendMessage(sticker.name, 'sticker', metadata);
    setShowStickers(false);
  }, [sendMessage]);

  const handleMessageTranslation = useCallback(async (messageId: string, targetLanguage: string) => {
    try {
      const message = messages.find(m => m.id === messageId);
      if (!message) return;
      
      // Call translation API
      const translatedText = await translateMessage(message.content, targetLanguage);
      
      // Update message with translation
      const { error } = await supabase
        .from('messages')
        .update({
          translation: {
            original_language: 'auto',
            translated_language: targetLanguage,
            translated_text: translatedText,
          }
        })
        .eq('id', messageId);
        
      if (error) throw error;
      
      // Update local state
      setMessages(prev => prev.map(m => 
        m.id === messageId 
          ? {
              ...m,
              translation: {
                original_language: 'auto',
                translated_language: targetLanguage,
                translated_text: translatedText,
              }
            }
          : m
      ));
      
    } catch (error) {
      console.error('Error translating message:', error);
      Alert.alert(
        t('chat.error.title'),
        t('chat.error.translation')
      );
    }
  }, [messages, t]);

  const handleMessageLongPress = useCallback((message: Message) => {
    Vibration.vibrate(50);
    
    // Show message options (copy, translate, reply, etc.)
    Alert.alert(
      t('chat.messageOptions.title'),
      message.content.length > 50 
        ? message.content.substring(0, 47) + '...'
        : message.content,
      [
        {
          text: t('chat.messageOptions.copy'),
          onPress: () => {
            // Copy to clipboard
            AccessibilityInfo.announceForAccessibility(
              t('chat.messageOptions.copied')
            );
          }
        },
        {
          text: t('chat.messageOptions.translate'),
          onPress: () => handleMessageTranslation(message.id, 'pt')
        },
        { text: t('common.cancel'), style: 'cancel' }
      ]
    );
  }, [t, handleMessageTranslation]);

  const translateMessage = useCallback(async (text: string, targetLanguage: string): Promise<string> => {
    // Implement translation service integration
    try {
      const response = await fetch('https://api.translate.service.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_TRANSLATION_API_KEY}`,
        },
        body: JSON.stringify({
          text,
          target_language: targetLanguage,
        }),
      });
      
      const data = await response.json();
      return data.translated_text;
    } catch (error) {
      console.error('Translation API error:', error);
      return text; // Return original text if translation fails
    }
  }, []);

  // Memoized components for better performance
  const TypingIndicator = useMemo(() => {
    if (typingUsers.length === 0) return null;
    
    return (
      <View style={styles.typingIndicator}>
        <Text style={styles.typingText}>
          {recipientName} {t('chat.typing')}
        </Text>
        <View style={styles.typingDots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    );
  }, [typingUsers, recipientName, t]);

  const LoadingSpinner = useMemo(() => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.loadingText}>{t('chat.loading')}</Text>
    </View>
  ), [t]);

  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Enhanced Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={[
          styles.messagesContent,
          { paddingBottom: keyboardHeight > 0 ? SPACING.sm : SPACING.lg }
        ]}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        windowSize={10}
        initialNumToRender={15}
        getItemLayout={(data, index) => ({
          length: MESSAGE_ITEM_HEIGHT,
          offset: MESSAGE_ITEM_HEIGHT * index,
          index,
        })}
        onContentSizeChange={() => {
          // Auto-scroll to bottom when content changes
          InteractionManager.runAfterInteractions(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          });
        }}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 100,
        }}
      />

      {/* Enhanced Typing Indicator */}
      {TypingIndicator}

      {/* Portuguese Stickers Panel */}
      {showStickers && (
        <PortugueseStickers
          onStickerSelect={handleStickerMessage}
          onClose={() => setShowStickers(false)}
        />
      )}

      {/* Enhanced Input Area */}
      <View style={[
        styles.inputContainer,
        { marginBottom: keyboardHeight > 0 ? 0 : Platform.OS === 'ios' ? 20 : 0 }
      ]}>
        <View style={styles.inputRow}>
          {/* Enhanced Attachment Menu */}
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.attachButton}
                onPress={() => setMenuVisible(true)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={t('chat.accessibility.attachments')}
                activeOpacity={0.7}
              >
                <IconButton
                  icon="plus"
                  size={24}
                  iconColor={Colors.primary}
                />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={handleImageMessage}
              title={t('chat.attachments.image')}
              leadingIcon="image"
            />
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                setShowStickers(true);
              }}
              title={t('chat.attachments.stickers')}
              leadingIcon="sticker-emoji"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                // Handle file attachment
              }}
              title={t('chat.attachments.file')}
              leadingIcon="file"
            />
          </Menu>

          {/* Enhanced Text Input */}
          <View style={[styles.inputWrapper, { height: Math.max(40, inputHeight) }]}>
            <TextInput
              ref={inputRef}
              style={[styles.textInput, { height: Math.max(40, inputHeight) }]}
              value={newMessage}
              onChangeText={handleTextChange}
              onContentSizeChange={handleContentSizeChange}
              placeholder={t('chat.input.placeholder')}
              placeholderTextColor={Colors.textSecondary}
              multiline
              maxLength={1000}
              returnKeyType="default"
              blurOnSubmit={false}
              accessible={true}
              accessibilityLabel={t('chat.accessibility.messageInput')}
              accessibilityHint={t('chat.accessibility.messageInputHint')}
            />
          </View>

          {/* Enhanced Send/Voice Button */}
          {newMessage.trim() ? (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendPress}
              disabled={isSending}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t('chat.accessibility.sendMessage')}
              activeOpacity={0.8}
            >
              {isSending ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.sendIcon}>→</Text>
              )}
            </TouchableOpacity>
          ) : (
            <VoiceRecorder
              onRecordingComplete={handleVoiceMessage}
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              style={styles.voiceButton}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: SPACING.md,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: Colors.background,
  },
  typingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  typingDots: {
    flexDirection: 'row',
    marginLeft: SPACING.sm,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.textSecondary,
    marginHorizontal: 1,
    opacity: 0.7,
  },
  inputContainer: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.sm,
  },
  attachButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: TOUCH_TARGETS.medium,
    height: TOUCH_TARGETS.medium,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
  },
  textInput: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 16,
    textAlignVertical: 'center',
    paddingVertical: Platform.OS === 'ios' ? SPACING.sm : 0,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    width: TOUCH_TARGETS.medium,
    height: TOUCH_TARGETS.medium,
    borderRadius: TOUCH_TARGETS.medium / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sendIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  voiceButton: {
    width: TOUCH_TARGETS.medium,
    height: TOUCH_TARGETS.medium,
  },
});