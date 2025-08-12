import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors, Spacing, Typography, CommonStyles } from '../../constants/Styles';

// Interest categories perfect for 30+ women in London/UK
const INTEREST_CATEGORIES = {
  'Fitness & Wellness': [
    { id: 'london-walks', name: 'London Walks', icon: '🚶‍♀️' },
    { id: 'yoga', name: 'Yoga', icon: '🧘‍♀️' },
    { id: 'running', name: 'Park Runs', icon: '🏃‍♀️' },
    { id: 'pilates', name: 'Pilates', icon: '💪' },
    { id: 'cycling', name: 'London Cycling', icon: '🚴‍♀️' },
    { id: 'swimming', name: 'Swimming', icon: '🏊‍♀️' },
    { id: 'climbing', name: 'Climbing', icon: '🧗‍♀️' },
    { id: 'meditation', name: 'Meditation', icon: '🕯️' },
  ],
  'Arts & Culture': [
    { id: 'museums', name: 'London Museums', icon: '🏛️' },
    { id: 'west-end', name: 'West End Shows', icon: '🎭' },
    { id: 'concerts', name: 'Live Music', icon: '🎵' },
    { id: 'galleries', name: 'Art Galleries', icon: '🎨' },
    { id: 'photography', name: 'Photography', icon: '📸' },
    { id: 'painting', name: 'Painting', icon: '🎨' },
    { id: 'crafting', name: 'Crafting', icon: '✂️' },
    { id: 'pottery', name: 'Pottery', icon: '🏺' },
  ],
  'Food & Drink': [
    { id: 'wine-tasting', name: 'Wine Tasting', icon: '🍷' },
    { id: 'cooking', name: 'Cooking', icon: '👩‍🍳' },
    { id: 'baking', name: 'Baking', icon: '🧁' },
    { id: 'london-dining', name: 'London Dining', icon: '🍽️' },
    { id: 'coffee-culture', name: 'Coffee Culture', icon: '☕' },
    { id: 'borough-market', name: 'Food Markets', icon: '🥕' },
    { id: 'pub-culture', name: 'Pub Culture', icon: '🍺' },
    { id: 'cocktails', name: 'Cocktail Bars', icon: '🍸' },
  ],
  'Learning & Growth': [
    { id: 'book-clubs', name: 'Book Clubs', icon: '📚' },
    { id: 'language-learning', name: 'Languages', icon: '🗣️' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'podcasts', name: 'Podcasts', icon: '🎙️' },
    { id: 'lectures', name: 'Lectures', icon: '🎓' },
    { id: 'workshops', name: 'Workshops', icon: '🛠️' },
    { id: 'volunteering', name: 'Volunteering', icon: '🤝' },
    { id: 'mentoring', name: 'Mentoring', icon: '👥' },
  ],
  'Travel & Adventure': [
    { id: 'uk-travel', name: 'UK Travel', icon: '✈️' },
    { id: 'weekend-getaways', name: 'Weekend Getaways', icon: '🎒' },
    { id: 'countryside', name: 'Countryside Trips', icon: '🌿' },
    { id: 'coastal-walks', name: 'Coastal Walks', icon: '🌊' },
    { id: 'historic-sites', name: 'Historic Sites', icon: '🏰' },
    { id: 'seaside-trips', name: 'Seaside Trips', icon: '🏖️' },
    { id: 'city-breaks', name: 'UK City Breaks', icon: '🏙️' },
    { id: 'heritage-tours', name: 'Heritage Tours', icon: '🗺️' },
  ],
  'Social & Entertainment': [
    { id: 'game-nights', name: 'Game Nights', icon: '🎲' },
    { id: 'trivia', name: 'Trivia', icon: '🤔' },
    { id: 'karaoke', name: 'Karaoke', icon: '🎤' },
    { id: 'dancing', name: 'Dancing', icon: '💃' },
    { id: 'comedy-shows', name: 'Comedy Shows', icon: '😂' },
    { id: 'movies', name: 'Movies', icon: '🎬' },
    { id: 'networking', name: 'Networking', icon: '🤝' },
    { id: 'happy-hours', name: 'Happy Hours', icon: '🥂' },
  ],
};

const InterestTagsStep = ({ onNext, onBack, selectedInterests, setSelectedInterests }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const interests = selectedInterests || [];

  const toggleInterest = (interestId) => {
    if (interests.includes(interestId)) {
      setSelectedInterests(interests.filter(id => id !== interestId));
    } else {
      if (interests.length >= 20) {
        Alert.alert(
          'Maximum Interests Reached',
          'You can select up to 20 interests to help us find your perfect community matches.'
        );
        return;
      }
      setSelectedInterests([...interests, interestId]);
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const getInterestById = (interestId) => {
    for (const category of Object.values(INTEREST_CATEGORIES)) {
      const interest = category.find(item => item.id === interestId);
      if (interest) return interest;
    }
    return null;
  };

  const handleNext = () => {
    if (interests.length < 3) {
      Alert.alert(
        'Select More Interests',
        'Please select at least 3 interests to help us connect you with like-minded community members.',
        [{ text: 'OK' }]
      );
      return;
    }
    onNext();
  };

  const clearAllInterests = () => {
    Alert.alert(
      'Clear All Interests',
      'Are you sure you want to remove all selected interests?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', onPress: () => setSelectedInterests([]) },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.stepContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.stepNumber}>6 of 7</Text>
          <Text style={styles.title}>What are your interests?</Text>
          <Text style={styles.subtitle}>
            Select activities you enjoy so we can connect you with like-minded community members.
          </Text>
        </View>

        {/* Selected Interests Counter */}
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {interests.length} selected {interests.length > 0 && '• '}
            {interests.length > 0 && (
              <TouchableOpacity onPress={clearAllInterests}>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </Text>
          <Text style={styles.counterLimit}>Select 3-20 interests</Text>
        </View>

        {/* Selected Interests Preview */}
        {interests.length > 0 && (
          <View style={styles.selectedContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {interests.map(interestId => {
                const interest = getInterestById(interestId);
                return interest ? (
                  <TouchableOpacity
                    key={interestId}
                    style={styles.selectedTag}
                    onPress={() => toggleInterest(interestId)}
                  >
                    <Text style={styles.selectedTagIcon}>{interest.icon}</Text>
                    <Text style={styles.selectedTagText}>{interest.name}</Text>
                    <Text style={styles.removeIcon}>×</Text>
                  </TouchableOpacity>
                ) : null;
              })}
            </ScrollView>
          </View>
        )}

        {/* Interest Categories */}
        <View style={styles.categoriesContainer}>
          {Object.entries(INTEREST_CATEGORIES).map(([categoryName, categoryInterests]) => (
            <View key={categoryName} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() => toggleCategory(categoryName)}
              >
                <Text style={styles.categoryTitle}>{categoryName}</Text>
                <Text style={styles.categoryArrow}>
                  {expandedCategory === categoryName ? '−' : '+'}
                </Text>
              </TouchableOpacity>
              
              {expandedCategory === categoryName && (
                <View style={styles.interestsGrid}>
                  {categoryInterests.map(interest => (
                    <TouchableOpacity
                      key={interest.id}
                      style={[
                        styles.interestTag,
                        interests.includes(interest.id) && styles.interestTagSelected
                      ]}
                      onPress={() => toggleInterest(interest.id)}
                    >
                      <Text style={styles.interestIcon}>{interest.icon}</Text>
                      <Text style={[
                        styles.interestText,
                        interests.includes(interest.id) && styles.interestTextSelected
                      ]}>
                        {interest.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.button, 
              interests.length >= 3 && styles.buttonActive
            ]} 
            onPress={handleNext}
          >
            <Text style={[
              styles.buttonText, 
              interests.length >= 3 && styles.buttonTextActive
            ]}>
              Continue ({interests.length}/20)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  stepNumber: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  counterText: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  clearAllText: {
    ...Typography.body,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  counterLimit: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  selectedContainer: {
    marginBottom: Spacing.lg,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    marginRight: Spacing.xs,
  },
  selectedTagIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  selectedTagText: {
    ...Typography.bodySmall,
    color: Colors.surface,
    fontWeight: '500',
  },
  removeIcon: {
    ...Typography.body,
    color: Colors.surface,
    marginLeft: Spacing.xs,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginBottom: Spacing.xl,
  },
  categoryContainer: {
    marginBottom: Spacing.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  categoryTitle: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
  },
  categoryArrow: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: Spacing.sm,
    gap: Spacing.xs,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  interestTagSelected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  interestIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  interestText: {
    ...Typography.bodySmall,
    color: Colors.text,
  },
  interestTextSelected: {
    color: Colors.surface,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
  },
  backButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  backButtonText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  button: {
    ...CommonStyles.button,
    flex: 1,
    marginLeft: Spacing.md,
    backgroundColor: Colors.border,
  },
  buttonActive: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    ...CommonStyles.buttonText,
    color: Colors.textSecondary,
  },
  buttonTextActive: {
    color: Colors.surface,
  },
});

export default InterestTagsStep;