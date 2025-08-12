# AdyaTribe User Reporting System Design & UI Specifications

## Overview
The user reporting system is designed to provide multiple, accessible ways for community members to report concerning behavior, inappropriate content, or safety threats while maintaining user privacy and encouraging reporting.

## Design Principles

### Accessibility & Ease of Use
- One-tap reporting from any content or profile
- Clear categorization to reduce friction
- Anonymous reporting option available
- Multiple evidence collection methods
- Progress indicators and confirmation feedback

### Privacy & Safety
- Reporter identity protected by default
- Secure evidence collection and storage
- Clear communication about what information is shared
- Follow-up updates without revealing reporter identity
- Option to remain completely anonymous

### Comprehensive Coverage
- Report any user, content, or behavior
- Multiple entry points throughout the app
- Proactive safety check-ins for vulnerable situations
- Community-wide incident reporting
- Anonymous tip submission

## Reporting Entry Points

### 1. Content-Based Reporting
**Location:** Any message, post, photo, or comment
**UI Element:** Three-dot menu → "Report Content"
**Data Collected:** Content ID, author, timestamp, context

### 2. Profile-Based Reporting  
**Location:** User profiles, member lists
**UI Element:** Profile menu → "Report User"
**Data Collected:** User ID, profile information, interaction history

### 3. Conversation Reporting
**Location:** Group chats, direct messages (if implemented)
**UI Element:** Chat settings → "Report Conversation"
**Data Collected:** Conversation participants, message history, timestamps

### 4. Event/Group Reporting
**Location:** Event pages, group information screens
**UI Element:** Event/group menu → "Report Safety Concern"
**Data Collected:** Event/group details, organizer info, specific concern area

### 5. General Safety Reporting
**Location:** Main menu, safety center, help section
**UI Element:** "Report a Safety Concern"
**Data Collected:** Free-form submission with category selection

## UI Component Specifications

### Report Modal Flow

#### Step 1: Category Selection
```javascript
// Component: ReportCategoryScreen
const reportCategories = [
  {
    id: 'harassment',
    title: 'Harassment or Bullying',
    description: 'Personal attacks, persistent unwanted contact, threats',
    icon: 'shield-alert',
    color: '#FF4444',
    examples: ['Name-calling', 'Threats', 'Unwanted messages']
  },
  {
    id: 'inappropriate_content',
    title: 'Inappropriate Content',
    description: 'Content that violates community guidelines',
    icon: 'eye-off',
    color: '#FF8800',
    examples: ['Explicit images', 'Hate speech', 'Graphic content']
  },
  {
    id: 'spam_scam',
    title: 'Spam or Scam',
    description: 'Unwanted promotional content or fraudulent activity',
    icon: 'alert-triangle',
    color: '#FFAA00',
    examples: ['MLM schemes', 'Fake profiles', 'Suspicious links']
  },
  {
    id: 'safety_threat',
    title: 'Safety Threat',
    description: 'Immediate danger or serious safety concerns',
    icon: 'alert-octagon',
    color: '#CC0000',
    priority: 'urgent',
    examples: ['Violence threats', 'Doxxing', 'Stalking']
  },
  {
    id: 'privacy_violation',
    title: 'Privacy Violation',
    description: 'Sharing personal information without consent',
    icon: 'lock-open',
    color: '#AA00AA',
    examples: ['Personal info shared', 'Non-consensual photos', 'Impersonation']
  },
  {
    id: 'community_standards',
    title: 'Community Standards',
    description: 'General guideline violations',
    icon: 'users',
    color: '#0088AA',
    examples: ['Off-topic posting', 'Disrespectful behavior', 'Rule violations']
  }
];
```

**UI Layout:**
```jsx
<ScrollView style={styles.categoryContainer}>
  <Text style={styles.headerText}>What type of issue are you reporting?</Text>
  <Text style={styles.subheaderText}>
    Your report helps keep our community safe. All reports are confidential.
  </Text>
  
  {reportCategories.map((category) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryCard, { borderLeftColor: category.color }]}
      onPress={() => selectCategory(category.id)}
    >
      <Icon name={category.icon} size={24} color={category.color} />
      <View style={styles.categoryContent}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
        <View style={styles.exampleTags}>
          {category.examples.map((example) => (
            <Text key={example} style={styles.exampleTag}>{example}</Text>
          ))}
        </View>
      </View>
      <Icon name="chevron-right" size={16} color={Colors.textSecondary} />
    </TouchableOpacity>
  ))}
</ScrollView>
```

#### Step 2: Subcategory & Details
```jsx
<View style={styles.detailsContainer}>
  <Text style={styles.stepTitle}>Tell us more details</Text>
  
  {/* Subcategory Selection */}
  <View style={styles.subcategorySection}>
    <Text style={styles.sectionLabel}>Specific Issue:</Text>
    <PickerField
      selectedValue={subcategory}
      onValueChange={setSubcategory}
      options={getSubcategoriesFor(selectedCategory)}
    />
  </View>
  
  {/* Description Input */}
  <View style={styles.descriptionSection}>
    <Text style={styles.sectionLabel}>
      Description: <Text style={styles.required}>*</Text>
    </Text>
    <Text style={styles.helperText}>
      Please describe what happened. Include specific details and context.
    </Text>
    <TextInput
      style={styles.descriptionInput}
      multiline
      numberOfLines={4}
      maxLength={1000}
      value={description}
      onChangeText={setDescription}
      placeholder="Describe the issue in detail..."
    />
    <Text style={styles.characterCount}>{description.length}/1000</Text>
  </View>
  
  {/* Anonymous Reporting Option */}
  <View style={styles.anonymousSection}>
    <CheckboxField
      checked={isAnonymous}
      onToggle={setIsAnonymous}
      label="Submit this report anonymously"
      description="We won't be able to follow up with you directly, but your report will still be reviewed."
    />
  </View>
</View>
```

#### Step 3: Evidence Collection
```jsx
<View style={styles.evidenceContainer}>
  <Text style={styles.stepTitle}>Add Evidence (Optional)</Text>
  <Text style={styles.stepDescription}>
    Evidence helps our moderation team understand the situation better.
  </Text>
  
  {/* Screenshot/Photo Upload */}
  <TouchableOpacity
    style={styles.evidenceOption}
    onPress={handlePhotoEvidence}
  >
    <Icon name="camera" size={24} color={Colors.primary} />
    <Text style={styles.evidenceOptionText}>Add Screenshots</Text>
    <Text style={styles.evidenceOptionDesc}>
      Photos of the content or behavior
    </Text>
  </TouchableOpacity>
  
  {/* Additional Context */}
  <TouchableOpacity
    style={styles.evidenceOption}
    onPress={handleAdditionalInfo}
  >
    <Icon name="file-text" size={24} color={Colors.primary} />
    <Text style={styles.evidenceOptionText}>Additional Information</Text>
    <Text style={styles.evidenceOptionDesc}>
      Dates, locations, or other relevant details
    </Text>
  </TouchableOpacity>
  
  {/* Evidence Preview */}
  {evidence.length > 0 && (
    <View style={styles.evidencePreview}>
      <Text style={styles.evidencePreviewTitle}>
        Evidence Added ({evidence.length} items)
      </Text>
      {evidence.map((item, index) => (
        <EvidencePreviewItem
          key={index}
          item={item}
          onRemove={() => removeEvidence(index)}
        />
      ))}
    </View>
  )}
  
  {/* Privacy Notice */}
  <View style={styles.privacyNotice}>
    <Icon name="info" size={16} color={Colors.info} />
    <Text style={styles.privacyNoticeText}>
      Evidence is stored securely and only viewed by our moderation team. 
      Images are automatically stripped of location data.
    </Text>
  </View>
</View>
```

#### Step 4: Review & Submit
```jsx
<ScrollView style={styles.reviewContainer}>
  <Text style={styles.stepTitle}>Review Your Report</Text>
  
  <View style={styles.reportSummary}>
    <SummaryItem label="Issue Type" value={getCategoryLabel(selectedCategory)} />
    <SummaryItem label="Specific Issue" value={subcategory} />
    <SummaryItem label="Description" value={description} multiline />
    {reportedUser && (
      <SummaryItem label="Reported User" value={reportedUser.name} />
    )}
    {reportedContent && (
      <SummaryItem label="Reported Content" value="Message/Post" />
    )}
    <SummaryItem 
      label="Evidence" 
      value={evidence.length > 0 ? `${evidence.length} items attached` : 'None'} 
    />
    <SummaryItem 
      label="Anonymous" 
      value={isAnonymous ? 'Yes' : 'No'} 
    />
  </View>
  
  {/* What Happens Next */}
  <View style={styles.nextStepsSection}>
    <Text style={styles.nextStepsTitle}>What happens next?</Text>
    <NextStepItem
      icon="clock"
      text="We'll review your report within 24 hours"
    />
    <NextStepItem
      icon="shield"
      text="Our trained moderators will investigate thoroughly"
    />
    <NextStepItem
      icon="message-circle"
      text={isAnonymous 
        ? "We'll take appropriate action but can't provide updates"
        : "We'll update you on the outcome"
      }
    />
    <NextStepItem
      icon="users"
      text="Your report helps keep the community safe"
    />
  </View>
  
  {/* Emergency Notice */}
  {selectedCategory === 'safety_threat' && (
    <View style={styles.emergencyNotice}>
      <Icon name="alert-triangle" size={20} color={Colors.error} />
      <Text style={styles.emergencyNoticeText}>
        If you're in immediate danger, please contact emergency services (999) 
        before submitting this report.
      </Text>
    </View>
  )}
  
  <TouchableOpacity
    style={[styles.submitButton, { opacity: isSubmitting ? 0.7 : 1 }]}
    onPress={handleSubmit}
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <ActivityIndicator color="white" />
    ) : (
      <Text style={styles.submitButtonText}>Submit Report</Text>
    )}
  </TouchableOpacity>
</ScrollView>
```

### Confirmation Screen
```jsx
<View style={styles.confirmationContainer}>
  <LottieView
    source={require('../../assets/animations/checkmark-success.json')}
    style={styles.successAnimation}
    autoPlay
    loop={false}
  />
  
  <Text style={styles.confirmationTitle}>Report Submitted</Text>
  <Text style={styles.confirmationMessage}>
    Thank you for helping keep our community safe. We take all reports seriously 
    and will review this within 24 hours.
  </Text>
  
  <View style={styles.reportReference}>
    <Text style={styles.referenceLabel}>Report Reference:</Text>
    <Text style={styles.referenceNumber}>{reportId}</Text>
    <TouchableOpacity
      style={styles.copyButton}
      onPress={() => copyToClipboard(reportId)}
    >
      <Icon name="copy" size={16} color={Colors.primary} />
    </TouchableOpacity>
  </View>
  
  {!isAnonymous && (
    <View style={styles.followUpInfo}>
      <Icon name="mail" size={20} color={Colors.info} />
      <Text style={styles.followUpText}>
        We'll send updates to your account notifications. You can check the 
        status in Safety Center → My Reports.
      </Text>
    </View>
  )}
  
  <TouchableOpacity
    style={styles.safetyCenterButton}
    onPress={navigateToSafetyCenter}
  >
    <Text style={styles.safetyCenterButtonText}>Visit Safety Center</Text>
  </TouchableOpacity>
  
  <TouchableOpacity
    style={styles.doneButton}
    onPress={onClose}
  >
    <Text style={styles.doneButtonText}>Done</Text>
  </TouchableOpacity>
</View>
```

## Quick Reporting Features

### One-Tap Report Buttons
```jsx
// For urgent/common violations
const QuickReportButtons = ({ contentId, userId }) => (
  <View style={styles.quickReportContainer}>
    <QuickReportButton
      icon="flag"
      label="Harassment"
      color={Colors.error}
      onPress={() => quickReport('harassment', contentId, userId)}
    />
    <QuickReportButton
      icon="eye-off"
      label="Inappropriate"
      color={Colors.warning}
      onPress={() => quickReport('inappropriate_content', contentId, userId)}
    />
    <QuickReportButton
      icon="spam"
      label="Spam"
      color={Colors.orange}
      onPress={() => quickReport('spam_scam', contentId, userId)}
    />
    <QuickReportButton
      icon="more-horizontal"
      label="More"
      color={Colors.primary}
      onPress={() => openFullReportModal()}
    />
  </View>
);
```

### Swipe-to-Report
```jsx
// Implemented on message/content items
const SwipeableContent = ({ children, onReport, onBlock }) => (
  <Swipeable
    rightActions={[
      {
        icon: 'flag',
        label: 'Report',
        color: Colors.error,
        onPress: onReport
      },
      {
        icon: 'user-x',
        label: 'Block',
        color: Colors.dark,
        onPress: onBlock
      }
    ]}
  >
    {children}
  </Swipeable>
);
```

## Safety Check-In System

### Proactive Safety Prompts
```jsx
const SafetyCheckIn = () => {
  const [showCheckIn, setShowCheckIn] = useState(false);
  
  // Trigger safety check-ins based on:
  // - First-time meeting arrangements
  // - Late-night event RSVPs
  // - Meeting someone new
  // - Travel/location-based events
  
  return (
    <Modal visible={showCheckIn} animationType="slide">
      <View style={styles.checkInContainer}>
        <Text style={styles.checkInTitle}>Safety Check-In</Text>
        <Text style={styles.checkInMessage}>
          We noticed you're meeting someone from the community for the first time. 
          Here are some safety reminders:
        </Text>
        
        <SafetyTipsList tips={meetingInPersonTips} />
        
        <View style={styles.checkInActions}>
          <TouchableOpacity
            style={styles.shareLocationButton}
            onPress={offerLocationSharing}
          >
            <Icon name="map-pin" size={20} color="white" />
            <Text style={styles.shareLocationText}>Share Live Location</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.emergencyContactButton}
            onPress={setEmergencyContact}
          >
            <Icon name="phone" size={20} color={Colors.primary} />
            <Text style={styles.emergencyContactText}>Set Check-In Time</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => setShowCheckIn(false)}
        >
          <Text style={styles.continueText}>I Understand</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
```

## Report Tracking & Status Updates

### My Reports Screen
```jsx
const MyReportsScreen = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  
  return (
    <View style={styles.container}>
      <Header title="My Reports" />
      
      {loading ? (
        <LoadingSpinner />
      ) : reports.length === 0 ? (
        <EmptyState
          icon="shield-check"
          title="No Reports Submitted"
          message="You haven't submitted any reports. If you see something concerning, don't hesitate to report it."
        />
      ) : (
        <FlatList
          data={reports}
          renderItem={({ item }) => <ReportStatusCard report={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const ReportStatusCard = ({ report }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return Colors.warning;
      case 'investigating': return Colors.info;
      case 'resolved': return Colors.success;
      case 'dismissed': return Colors.textSecondary;
      default: return Colors.textSecondary;
    }
  };
  
  return (
    <View style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <View style={styles.reportInfo}>
          <Text style={styles.reportCategory}>
            {getCategoryLabel(report.category)}
          </Text>
          <Text style={styles.reportDate}>
            {formatDate(report.createdAt)}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
          <Text style={styles.statusText}>{report.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.reportDescription} numberOfLines={2}>
        {report.description}
      </Text>
      
      <View style={styles.reportFooter}>
        <Text style={styles.reportId}>ID: {report.id}</Text>
        {report.lastUpdate && (
          <Text style={styles.lastUpdate}>
            Updated {formatDate(report.lastUpdate)}
          </Text>
        )}
      </View>
      
      {report.moderatorMessage && (
        <View style={styles.moderatorMessage}>
          <Icon name="message-circle" size={16} color={Colors.info} />
          <Text style={styles.moderatorMessageText}>
            {report.moderatorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};
```

## Accessibility Features

### Voice Reporting
```jsx
const VoiceReporting = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  return (
    <View style={styles.voiceReportContainer}>
      <Text style={styles.voiceReportTitle}>Voice Report</Text>
      <Text style={styles.voiceReportDescription}>
        Speak your report and we'll transcribe it for you
      </Text>
      
      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordingActive]}
        onPress={toggleRecording}
      >
        <Icon 
          name={isRecording ? 'square' : 'mic'} 
          size={32} 
          color="white" 
        />
      </TouchableOpacity>
      
      {transcript && (
        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptLabel}>Transcript:</Text>
          <Text style={styles.transcriptText}>{transcript}</Text>
          <TouchableOpacity
            style={styles.editTranscriptButton}
            onPress={editTranscript}
          >
            <Text style={styles.editTranscriptText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
```

### Screen Reader Optimizations
```jsx
// Accessibility labels and hints
<TouchableOpacity
  style={styles.reportButton}
  onPress={openReportModal}
  accessibilityLabel="Report this content"
  accessibilityHint="Opens a form to report inappropriate content or behavior"
  accessibilityRole="button"
>
  <Icon name="flag" size={20} color={Colors.error} />
</TouchableOpacity>
```

## Emergency Reporting Features

### Crisis Reporting
```jsx
const CrisisReportButton = () => (
  <TouchableOpacity
    style={styles.crisisButton}
    onPress={handleCrisisReport}
    accessibilityLabel="Emergency Safety Report"
  >
    <Icon name="alert-triangle" size={24} color="white" />
    <Text style={styles.crisisButtonText}>Emergency Report</Text>
  </TouchableOpacity>
);

const handleCrisisReport = () => {
  Alert.alert(
    'Emergency Report',
    'This will immediately alert our safety team. If you\'re in immediate danger, please contact emergency services (999) first.',
    [
      { text: 'Contact 999', onPress: () => Linking.openURL('tel:999') },
      { text: 'Submit Emergency Report', onPress: submitCrisisReport },
      { text: 'Cancel', style: 'cancel' }
    ]
  );
};
```

### Silent Reporting
```jsx
// Panic button functionality - reports current situation without UI
const SilentReport = () => {
  const triggerSilentReport = async () => {
    await submitReport({
      category: 'safety_threat',
      subcategory: 'immediate_danger',
      description: 'Silent alert triggered',
      priority: 'urgent',
      location: await getCurrentLocation(),
      timestamp: new Date().toISOString(),
      deviceInfo: getDeviceInfo()
    });
    
    // Minimal UI feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };
  
  return (
    <TouchableOpacity
      style={styles.hiddenButton}
      onPress={triggerSilentReport}
      accessibilityLabel="Silent safety alert"
    />
  );
};
```

## Styles & Theme

```javascript
const styles = StyleSheet.create({
  // Report Modal Styles
  categoryContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.background
  },
  categoryCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    borderLeftWidth: 4,
    alignItems: 'center',
    ...CommonStyles.shadow
  },
  categoryContent: {
    flex: 1,
    marginLeft: Spacing.md
  },
  categoryTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs
  },
  categoryDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm
  },
  exampleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  exampleTag: {
    ...Typography.caption,
    backgroundColor: Colors.backgroundSecondary,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 8,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs
  },
  
  // Evidence Collection Styles
  evidenceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    ...CommonStyles.shadow
  },
  evidenceOptionText: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginLeft: Spacing.md,
    flex: 1
  },
  evidenceOptionDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: Spacing.md,
    flex: 2
  },
  
  // Quick Report Styles
  quickReportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 12
  },
  
  // Crisis Button Styles
  crisisButton: {
    backgroundColor: Colors.error,
    padding: Spacing.md,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...CommonStyles.shadow
  },
  crisisButtonText: {
    ...Typography.button,
    color: Colors.white,
    marginLeft: Spacing.sm
  }
});
```

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Platform:** React Native with Expo
**Dependencies:** React Navigation, Expo Camera, Expo ImagePicker, Formik, Yup