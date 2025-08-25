/**
 * Optimized Image Component for Portuguese Cultural Content
 * Implements lazy loading, caching, and progressive loading
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  ImageStyle,
  ViewStyle,
  Animated,
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { COLORS } from '../../design-system/tokens/colors';
import { ImageOptimizer } from '../../utils/performance';

interface OptimizedImageProps {
  uri: string;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  culturalType?: 'portuguese-flag' | 'event-banner' | 'user-avatar' | 'business-logo' | 'cultural-photo' | 'fado-performance' | 'festival-image' | 'food-image';
  placeholder?: string;
  fallbackText?: string;
  lazy?: boolean;
  priority?: 'high' | 'medium' | 'low';
  onLoad?: () => void;
  onError?: (error: any) => void;
  children?: React.ReactNode;
}

const { width: screenWidth } = Dimensions.get('window');

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  uri,
  style,
  containerStyle,
  culturalType = 'cultural-photo',
  placeholder,
  fallbackText,
  lazy = false,
  priority = 'medium',
  onLoad,
  onError,
  children
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy);
  const [optimizedUri, setOptimizedUri] = useState<string>('');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const viewRef = useRef<View>(null);
  
  // Optimize image URI on mount
  useEffect(() => {
    const styleFlat = StyleSheet.flatten(style) as ImageStyle;
    const width = styleFlat?.width as number || 400;
    const height = styleFlat?.height as number || 300;
    
    const optimized = ImageOptimizer.getOptimizedImageUri(uri, {
      width,
      height,
      quality: culturalType === 'user-avatar' ? 0.9 : 0.8
    });
    
    setOptimizedUri(optimized);
  }, [uri, style, culturalType]);
  
  // Lazy loading implementation
  useEffect(() => {
    if (!lazy || isVisible) return;
    
    const checkVisibility = () => {
      if (viewRef.current) {
        viewRef.current.measure((x, y, width, height, pageX, pageY) => {
          const screenHeight = Dimensions.get('window').height;
          const isInViewport = pageY < screenHeight && pageY + height > 0;
          
          if (isInViewport && !isVisible) {
            setIsVisible(true);
          }
        });
      }
    };
    
    // Simple intersection observer alternative for React Native
    const interval = setInterval(checkVisibility, 100);
    
    return () => clearInterval(interval);
  }, [lazy, isVisible]);
  
  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    onLoad?.();
  };
  
  // Handle image error
  const handleError = (error: any) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(error);
  };
  
  // Preload high priority images
  useEffect(() => {
    if (priority === 'high' && optimizedUri && isVisible) {
      Image.prefetch(optimizedUri).catch(console.warn);
    }
  }, [optimizedUri, priority, isVisible]);
  
  // Render placeholder while loading or when lazy loading
  const renderPlaceholder = () => {
    if (placeholder) {
      return (
        <Image
          source={{ uri: placeholder }}
          style={[style, styles.placeholder]}
          resizeMode="cover"
        />
      );
    }
    
    return (
      <View style={[style, styles.placeholderContainer, { backgroundColor: COLORS.neutral.background.secondary }]}>
        {isLoading && isVisible ? (
          <>
            <ActivityIndicator color={COLORS.primary.main} size="small" />
            <Text style={styles.loadingText}>Loading...</Text>
          </>
        ) : (
          <Text style={styles.placeholderText}>
            {fallbackText || getCulturalFallbackText(culturalType)}
          </Text>
        )}
      </View>
    );
  };
  
  // Render error state
  const renderError = () => (
    <View style={[style, styles.errorContainer]}>
      <Text style={styles.errorText}>🖼️</Text>
      <Text style={styles.errorMessage}>Image failed to load</Text>
    </View>
  );
  
  if (!isVisible) {
    return (
      <View ref={viewRef} style={[containerStyle, style]}>
        {renderPlaceholder()}
      </View>
    );
  }
  
  if (hasError) {
    return (
      <View style={containerStyle}>
        {renderError()}
        {children}
      </View>
    );
  }
  
  return (
    <View ref={viewRef} style={containerStyle}>
      {isLoading && renderPlaceholder()}
      
      {optimizedUri && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image
            source={{ uri: optimizedUri }}
            style={style}
            onLoad={handleLoad}
            onError={handleError}
            resizeMode="cover"
            // Optimize memory usage
            {...(priority === 'low' && { blurRadius: 0.5 })}
          />
        </Animated.View>
      )}
      
      {children}
    </View>
  );
};

// Helper function to get cultural fallback text
const getCulturalFallbackText = (culturalType: string): string => {
  const fallbacks: Record<string, string> = {
    'portuguese-flag': '🇵🇹',
    'event-banner': '🎉',
    'user-avatar': '👤',
    'business-logo': '🏪',
    'cultural-photo': '📸',
    'fado-performance': '🎵',
    'festival-image': '🎭',
    'food-image': '🍽️'
  };
  
  return fallbacks[culturalType] || '🖼️';
};

const styles = StyleSheet.create({
  placeholder: {
    opacity: 0.6,
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral.background.secondary,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.neutral.text.secondary,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 24,
    textAlign: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral.background.tertiary,
  },
  errorText: {
    fontSize: 32,
    marginBottom: 4,
  },
  errorMessage: {
    fontSize: 12,
    color: COLORS.neutral.text.secondary,
    textAlign: 'center',
  },
});

export default OptimizedImage;
