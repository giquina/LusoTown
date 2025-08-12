# AdyaTribe Technical Safety Implementation Specifications

## Architecture Overview

### Safety System Components
```
┌─────────────────────────────────────────────────────────────┐
│                    AdyaTribe Safety Architecture            │
├─────────────────┬─────────────────┬─────────────────────────┤
│   Mobile App    │    Web App      │    Backend Services     │
│                 │                 │                         │
│ • Report UI     │ • Admin Panel   │ • Content Filtering     │
│ • Safety Tools  │ • Mod Dashboard │ • ML Classification     │
│ • Alerts        │ • Analytics     │ • User Management       │
└─────────────────┼─────────────────┼─────────────────────────┘
                  │                 │
                  └─────────────────┘
                          │
              ┌───────────┴───────────┐
              │   Firebase Services   │
              │                       │
              │ • Cloud Functions     │
              │ • Firestore          │
              │ • Cloud Storage      │
              │ • ML Kit             │
              │ • Authentication     │
              └───────────────────────┘
```

## Firebase Backend Implementation

### Cloud Functions Architecture

#### Content Filtering Functions
```javascript
// functions/src/contentModeration.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { PerspectiveApi } = require('perspective-api-client');
const vision = require('@google-cloud/vision');

// Initialize services
const perspective = new PerspectiveApi({ apiKey: process.env.PERSPECTIVE_API_KEY });
const visionClient = new vision.ImageAnnotatorClient();

/**
 * Real-time text content analysis
 * Triggered on: Message creation, post creation, profile updates
 */
exports.analyzeTextContent = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (snap, context) => {
    const message = snap.data();
    const messageId = context.params.messageId;
    
    try {
      // Multi-layer content analysis
      const results = await Promise.all([
        analyzeToxicity(message.content),
        detectPersonalInfo(message.content),
        checkSpamPatterns(message.content, message.userId),
        analyzeContext(message.content, message.groupId)
      ]);
      
      const [toxicity, personalInfo, spam, context] = results;
      
      // Calculate risk score
      const riskScore = calculateRiskScore({
        toxicity,
        personalInfo,
        spam,
        context,
        userHistory: await getUserModerationHistory(message.userId)
      });
      
      // Take action based on risk level
      if (riskScore >= 0.8) {
        await handleHighRiskContent(messageId, message, riskScore);
      } else if (riskScore >= 0.6) {
        await flagForReview(messageId, message, riskScore);
      } else if (riskScore >= 0.4) {
        await addContentWarning(messageId, message, riskScore);
      }
      
      // Log moderation action
      await logModerationAction({
        contentId: messageId,
        contentType: 'message',
        riskScore,
        action: getActionForScore(riskScore),
        automated: true,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
      
    } catch (error) {
      console.error('Content analysis failed:', error);
      // Fail-safe: flag for manual review
      await flagForReview(messageId, message, 0.5, 'analysis_error');
    }
  });

/**
 * Image content analysis
 * Triggered on: Image uploads for messages, profiles, events
 */
exports.analyzeImageContent = functions.storage
  .object()
  .onFinalize(async (object) => {
    const filePath = object.name;
    const contentType = object.contentType;
    
    // Only process images
    if (!contentType.startsWith('image/')) return;
    
    try {
      // Remove EXIF data and location information
      await stripImageMetadata(filePath);
      
      // Analyze image content
      const [safeSearchResult] = await visionClient.safeSearchDetection(
        `gs://${object.bucket}/${filePath}`
      );
      
      const safeSearch = safeSearchResult.safeSearchAnnotation;
      
      // Check for inappropriate content
      const riskFlags = {
        adult: safeSearch.adult === 'LIKELY' || safeSearch.adult === 'VERY_LIKELY',
        violence: safeSearch.violence === 'LIKELY' || safeSearch.violence === 'VERY_LIKELY',
        racy: safeSearch.racy === 'LIKELY' || safeSearch.racy === 'VERY_LIKELY'
      };
      
      if (Object.values(riskFlags).some(flag => flag)) {
        await quarantineImage(filePath);
        await createModerationAlert({
          type: 'inappropriate_image',
          filePath,
          riskFlags,
          priority: 'high'
        });
      }
      
      // Face detection for verification compliance
      if (filePath.includes('profile-verification/')) {
        await verifyProfilePhoto(filePath);
      }
      
    } catch (error) {
      console.error('Image analysis failed:', error);
      await flagImageForReview(filePath, 'analysis_error');
    }
  });

/**
 * User behavior analysis
 * Triggered on: User actions, periodic analysis
 */
exports.analyzeBehaviorPatterns = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    const suspiciousUsers = await identifySuspiciousPatterns();
    
    for (const user of suspiciousUsers) {
      const riskLevel = await assessUserRisk(user.uid);
      
      if (riskLevel >= 0.8) {
        await temporarySuspension(user.uid, 'automated_high_risk');
      } else if (riskLevel >= 0.6) {
        await createModerationAlert({
          type: 'suspicious_behavior',
          userId: user.uid,
          patterns: user.suspiciousPatterns,
          priority: 'medium'
        });
      }
    }
  });
```

#### User Management Functions
```javascript
// functions/src/userManagement.js

/**
 * Apply moderation actions to users
 */
exports.applyModerationAction = functions.https
  .onCall(async (data, context) => {
    // Verify moderator permissions
    const moderatorId = context.auth?.uid;
    if (!await isModerator(moderatorId)) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Only moderators can perform this action'
      );
    }
    
    const { userId, action, duration, reason, evidence } = data;
    
    try {
      switch (action) {
        case 'warn':
          await issueWarning(userId, reason, moderatorId);
          break;
        case 'restrict':
          await applyRestrictions(userId, duration, reason, moderatorId);
          break;
        case 'suspend':
          await suspendUser(userId, duration, reason, moderatorId);
          break;
        case 'ban':
          await banUser(userId, reason, moderatorId);
          break;
        default:
          throw new Error('Invalid moderation action');
      }
      
      // Document the action
      await createModerationRecord({
        targetUserId: userId,
        moderatorId,
        action,
        duration,
        reason,
        evidence,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        appealable: action !== 'warn'
      });
      
      // Notify user of action
      await notifyUserOfAction(userId, action, reason, duration);
      
      return { success: true, message: 'Moderation action applied successfully' };
      
    } catch (error) {
      console.error('Moderation action failed:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Failed to apply moderation action'
      );
    }
  });

/**
 * Handle user reports
 */
exports.processUserReport = functions.firestore
  .document('reports/{reportId}')
  .onCreate(async (snap, context) => {
    const report = snap.data();
    const reportId = context.params.reportId;
    
    try {
      // Immediate safety check
      if (report.category === 'safety_threat' || report.category === 'harassment') {
        await createUrgentAlert(report);
      }
      
      // Check for repeated reports against same user
      const recentReports = await getRecentReports(report.reportedUserId, 24);
      if (recentReports.length >= 3) {
        await temporaryRestriction(report.reportedUserId, 'multiple_reports');
        await escalateToSeniorModerator(reportId);
      }
      
      // Auto-assign to moderator
      const assignedModerator = await assignModerator(report.category, report.priority);
      await updateReport(reportId, {
        assignedModerator,
        status: 'assigned',
        assignedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Send confirmation to reporter
      await notifyReporter(report.reporterId, reportId);
      
    } catch (error) {
      console.error('Report processing failed:', error);
    }
  });
```

### Database Schema

#### User Safety Collections
```javascript
// Firestore collections for safety system

// users/{userId}/safetyProfile
{
  verificationStatus: 'verified' | 'pending' | 'rejected',
  verificationDate: timestamp,
  trustScore: number, // 0-100
  riskLevel: 'low' | 'medium' | 'high',
  moderationHistory: {
    warnings: number,
    restrictions: number,
    suspensions: number,
    lastViolation: timestamp
  },
  reportsMade: number,
  reportsReceived: number,
  accountFlags: string[], // ['spam_risk', 'harassment_risk', etc.]
  privacySettings: {
    profileVisibility: 'public' | 'members_only',
    allowDirectMessages: boolean,
    shareLocation: boolean,
    photoTagging: 'anyone' | 'friends' | 'none'
  }
}

// reports/{reportId}
{
  reporterId: string,
  reportedUserId: string,
  reportedContentId: string, // optional
  category: 'harassment' | 'spam' | 'inappropriate_content' | 'safety_threat' | 'other',
  subcategory: string,
  description: string,
  evidence: {
    screenshots: string[], // storage URLs
    additionalInfo: string
  },
  priority: 'low' | 'medium' | 'high' | 'urgent',
  status: 'pending' | 'assigned' | 'investigating' | 'resolved' | 'dismissed',
  assignedModerator: string,
  resolution: {
    action: string,
    reason: string,
    moderatorNotes: string,
    resolvedAt: timestamp
  },
  createdAt: timestamp,
  updatedAt: timestamp
}

// moderationActions/{actionId}
{
  targetUserId: string,
  moderatorId: string,
  action: 'warn' | 'restrict' | 'suspend' | 'ban',
  reason: string,
  evidence: string[],
  duration: number, // days, null for permanent
  appealable: boolean,
  appealed: boolean,
  appealOutcome: string,
  createdAt: timestamp,
  expiresAt: timestamp,
  status: 'active' | 'expired' | 'appealed' | 'overturned'
}

// contentFlags/{flagId}
{
  contentId: string,
  contentType: 'message' | 'post' | 'image' | 'profile',
  flagType: 'automated' | 'user_report' | 'moderator_review',
  riskScore: number,
  violations: string[],
  status: 'pending' | 'reviewing' | 'approved' | 'removed',
  reviewedBy: string,
  reviewedAt: timestamp,
  action: string,
  createdAt: timestamp
}
```

### Real-time Monitoring System

#### Firebase Realtime Database for Live Monitoring
```javascript
// Real-time moderation dashboard data structure
{
  "moderationQueue": {
    "high_priority": {
      "report_001": {
        "type": "user_report",
        "category": "harassment",
        "priority": "urgent",
        "assignedTo": "moderator_123",
        "createdAt": "2025-01-10T10:30:00Z",
        "timeRemaining": 900 // seconds
      }
    },
    "medium_priority": { /* ... */ },
    "low_priority": { /* ... */ }
  },
  "activeIncidents": {
    "incident_001": {
      "type": "coordinated_harassment",
      "affectedUsers": ["user_456", "user_789"],
      "status": "investigating",
      "leadModerator": "moderator_456"
    }
  },
  "systemAlerts": {
    "alert_001": {
      "type": "spike_in_reports",
      "metric": "harassment_reports",
      "threshold": 10,
      "current": 15,
      "timeWindow": "1hour"
    }
  }
}
```

## Mobile App Safety Features

### Report Component Implementation
```javascript
// mobile-app/src/components/safety/ReportModal.js

import React, { useState } from 'react';
import { Modal, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { submitReport, uploadEvidence } from '../../services/SafetyService';

const ReportSchema = Yup.object().shape({
  category: Yup.string().required('Please select a category'),
  subcategory: Yup.string().required('Please select a subcategory'),
  description: Yup.string()
    .min(10, 'Please provide more details')
    .max(1000, 'Description too long')
    .required('Description is required')
});

export const ReportModal = ({ 
  visible, 
  onClose, 
  reportedUserId, 
  reportedContentId,
  contentType 
}) => {
  const [uploading, setUploading] = useState(false);
  const [evidence, setEvidence] = useState([]);

  const reportCategories = {
    harassment: {
      label: 'Harassment or Bullying',
      subcategories: [
        'Personal attacks',
        'Persistent unwanted contact',
        'Threats or intimidation',
        'Discriminatory language'
      ]
    },
    inappropriate_content: {
      label: 'Inappropriate Content',
      subcategories: [
        'Explicit or sexual content',
        'Graphic violence',
        'Hate speech',
        'Misinformation'
      ]
    },
    spam: {
      label: 'Spam or Scam',
      subcategories: [
        'Promotional spam',
        'Repetitive posting',
        'Suspicious links',
        'Financial scam'
      ]
    },
    safety_threat: {
      label: 'Safety Threat',
      subcategories: [
        'Threats of violence',
        'Doxxing',
        'Stalking behavior',
        'Self-harm content'
      ]
    },
    privacy_violation: {
      label: 'Privacy Violation',
      subcategories: [
        'Sharing personal info',
        'Non-consensual photos',
        'Impersonation',
        'Account hacking'
      ]
    }
  };

  const handleEvidenceUpload = async () => {
    // Implementation for photo/screenshot evidence upload
    setUploading(true);
    try {
      // Use Expo ImagePicker to select evidence
      // Upload to Firebase Storage
      // Add to evidence array
    } catch (error) {
      Alert.alert('Upload Failed', 'Could not upload evidence. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const submitReportHandler = async (values) => {
    try {
      const reportData = {
        reportedUserId,
        reportedContentId,
        contentType,
        category: values.category,
        subcategory: values.subcategory,
        description: values.description,
        evidence: evidence,
        priority: calculatePriority(values.category),
        deviceInfo: {
          platform: Platform.OS,
          version: Platform.Version,
          timestamp: new Date().toISOString()
        }
      };

      await submitReport(reportData);
      
      Alert.alert(
        'Report Submitted',
        'Thank you for helping keep our community safe. We\'ll review your report and take appropriate action.',
        [{ text: 'OK', onPress: onClose }]
      );
    } catch (error) {
      Alert.alert(
        'Submission Failed',
        'We couldn\'t submit your report right now. Please try again later or contact support if the issue persists.'
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <Header
          title="Report Content"
          leftButton={{ title: 'Cancel', onPress: onClose }}
        />
        
        <Formik
          initialValues={{
            category: '',
            subcategory: '',
            description: ''
          }}
          validationSchema={ReportSchema}
          onSubmit={submitReportHandler}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <ScrollView style={styles.form}>
              <CategorySelector
                categories={reportCategories}
                selectedCategory={values.category}
                onSelect={handleChange('category')}
                error={errors.category}
              />
              
              {values.category && (
                <SubcategorySelector
                  subcategories={reportCategories[values.category].subcategories}
                  selectedSubcategory={values.subcategory}
                  onSelect={handleChange('subcategory')}
                  error={errors.subcategory}
                />
              )}
              
              <DescriptionInput
                value={values.description}
                onChangeText={handleChange('description')}
                error={errors.description}
                placeholder="Please describe what happened in detail..."
              />
              
              <EvidenceUpload
                evidence={evidence}
                onUpload={handleEvidenceUpload}
                uploading={uploading}
              />
              
              <SafetyTips category={values.category} />
              
              <SubmitButton
                onPress={handleSubmit}
                disabled={!isValid}
                title="Submit Report"
              />
            </ScrollView>
          )}
        </Formik>
      </SafeAreaView>
    </Modal>
  );
};
```

### Safety Tools Component
```javascript
// mobile-app/src/components/safety/SafetyTools.js

import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { BlockUser, MuteUser, ReportContent } from '../../services/SafetyService';

export const SafetyTools = ({ targetUserId, targetUserName }) => {
  const safetyActions = [
    {
      id: 'block',
      title: 'Block User',
      description: 'Prevent this user from contacting you or seeing your content',
      icon: 'user-x',
      color: Colors.error,
      action: () => handleBlockUser(),
      destructive: true
    },
    {
      id: 'mute',
      title: 'Mute User',
      description: 'Hide content from this user without them knowing',
      icon: 'volume-x',
      color: Colors.warning,
      action: () => handleMuteUser()
    },
    {
      id: 'report',
      title: 'Report User',
      description: 'Report inappropriate behavior to our moderation team',
      icon: 'flag',
      color: Colors.primary,
      action: () => handleReportUser()
    },
    {
      id: 'safety_tips',
      title: 'Safety Tips',
      description: 'Learn about staying safe in the community',
      icon: 'shield',
      color: Colors.info,
      action: () => showSafetyTips()
    }
  ];

  const handleBlockUser = () => {
    Alert.alert(
      'Block User',
      `Are you sure you want to block ${targetUserName}? They won't be able to contact you or see your content.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block',
          style: 'destructive',
          onPress: async () => {
            try {
              await BlockUser(targetUserId);
              Alert.alert('User Blocked', 'You have successfully blocked this user.');
            } catch (error) {
              Alert.alert('Error', 'Could not block user. Please try again.');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SafetyHeader />
      
      {safetyActions.map((action) => (
        <SafetyActionItem
          key={action.id}
          {...action}
        />
      ))}
      
      <EmergencyContacts />
      <CommunityGuidelines />
    </ScrollView>
  );
};
```

## Web Admin Dashboard

### Moderation Dashboard Implementation
```javascript
// web-app/src/components/admin/ModerationDashboard.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { RealtimeDatabase } from '@/lib/firebase-admin';
import { ModerationQueue } from './ModerationQueue';
import { SafetyMetrics } from './SafetyMetrics';
import { IncidentResponse } from './IncidentResponse';

export const ModerationDashboard = () => {
  const [queueData, setQueueData] = useState({});
  const [metrics, setMetrics] = useState({});
  const [activeIncidents, setActiveIncidents] = useState([]);

  useEffect(() => {
    // Real-time subscription to moderation queue
    const queueRef = RealtimeDatabase.ref('moderationQueue');
    const metricsRef = RealtimeDatabase.ref('safetyMetrics');
    const incidentsRef = RealtimeDatabase.ref('activeIncidents');

    const queueListener = queueRef.on('value', (snapshot) => {
      setQueueData(snapshot.val() || {});
    });

    const metricsListener = metricsRef.on('value', (snapshot) => {
      setMetrics(snapshot.val() || {});
    });

    const incidentsListener = incidentsRef.on('value', (snapshot) => {
      setActiveIncidents(Object.values(snapshot.val() || {}));
    });

    return () => {
      queueRef.off('value', queueListener);
      metricsRef.off('value', metricsListener);
      incidentsRef.off('value', incidentsListener);
    };
  }, []);

  return (
    <div className="moderation-dashboard">
      <DashboardHeader />
      
      <div className="dashboard-grid">
        <SafetyMetrics 
          metrics={metrics}
          className="col-span-2"
        />
        
        <IncidentResponse 
          incidents={activeIncidents}
          className="col-span-1"
        />
        
        <ModerationQueue 
          queueData={queueData}
          className="col-span-3"
        />
        
        <UserSafetyTools 
          className="col-span-1"
        />
      </div>
    </div>
  );
};

const ModerationQueue = ({ queueData }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const priorityOrder = ['urgent', 'high_priority', 'medium_priority', 'low_priority'];
  
  return (
    <div className="moderation-queue">
      <h2>Moderation Queue</h2>
      
      {priorityOrder.map(priority => (
        <PrioritySection
          key={priority}
          priority={priority}
          reports={queueData[priority] || {}}
          onSelectReport={setSelectedReport}
        />
      ))}
      
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};
```

## Security & GDPR Compliance

### Data Protection Implementation
```javascript
// functions/src/dataProtection.js

/**
 * GDPR-compliant data handling for safety reports
 */
exports.handleDataRequest = functions.https
  .onCall(async (data, context) => {
    const { userId, requestType } = data;
    
    // Verify user identity
    if (context.auth?.uid !== userId) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'User can only request their own data'
      );
    }
    
    switch (requestType) {
      case 'export':
        return await exportUserSafetyData(userId);
      case 'delete':
        return await deleteUserSafetyData(userId);
      case 'rectification':
        return await updateUserSafetyData(userId, data.corrections);
      default:
        throw new functions.https.HttpsError(
          'invalid-argument',
          'Invalid request type'
        );
    }
  });

/**
 * Anonymize data for long-term storage
 */
const anonymizeSafetyData = async (reportId) => {
  const report = await admin.firestore()
    .collection('reports')
    .doc(reportId)
    .get();
    
  if (!report.exists) return;
  
  const anonymizedData = {
    ...report.data(),
    reporterId: 'anonymized',
    reportedUserId: hashUserId(report.data().reportedUserId),
    personalInfo: '[REDACTED]',
    evidence: report.data().evidence.map(item => ({
      type: item.type,
      timestamp: item.timestamp,
      content: '[REDACTED]'
    })),
    anonymizedAt: admin.firestore.FieldValue.serverTimestamp()
  };
  
  // Store in separate anonymized collection
  await admin.firestore()
    .collection('anonymizedReports')
    .doc(reportId)
    .set(anonymizedData);
    
  // Remove original after confirmation
  await admin.firestore()
    .collection('reports')
    .doc(reportId)
    .delete();
};
```

### Content Encryption
```javascript
// Encryption for sensitive safety data
const crypto = require('crypto');

class SafetyDataEncryption {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.key = Buffer.from(process.env.SAFETY_ENCRYPTION_KEY, 'base64');
  }
  
  encrypt(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.key);
    cipher.setAAD(Buffer.from('safety_data'));
    
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }
  
  decrypt(encryptedData) {
    const { encrypted, iv, authTag } = encryptedData;
    const decipher = crypto.createDecipher(this.algorithm, this.key);
    
    decipher.setAAD(Buffer.from('safety_data'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }
}
```

## Monitoring & Analytics

### Safety Metrics Collection
```javascript
// Real-time safety metrics
exports.updateSafetyMetrics = functions.firestore
  .document('reports/{reportId}')
  .onWrite(async (change, context) => {
    const metricsRef = admin.database().ref('safetyMetrics');
    const now = new Date();
    const timeKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    if (change.after.exists && !change.before.exists) {
      // New report created
      await metricsRef.child(`daily/${timeKey}/reportsReceived`).transaction(count => (count || 0) + 1);
      
      const report = change.after.data();
      await metricsRef.child(`daily/${timeKey}/categories/${report.category}`).transaction(count => (count || 0) + 1);
    }
    
    if (change.after.exists && change.before.exists) {
      // Report updated (possibly resolved)
      const beforeData = change.before.data();
      const afterData = change.after.data();
      
      if (beforeData.status !== 'resolved' && afterData.status === 'resolved') {
        await metricsRef.child(`daily/${timeKey}/reportsResolved`).transaction(count => (count || 0) + 1);
        
        // Calculate resolution time
        const resolutionTime = afterData.resolvedAt.toDate() - beforeData.createdAt.toDate();
        await metricsRef.child(`daily/${timeKey}/avgResolutionTime`).transaction(time => {
          const currentAvg = time || 0;
          return (currentAvg + resolutionTime) / 2; // Simplified averaging
        });
      }
    }
  });
```

## Deployment & Configuration

### Firebase Configuration
```javascript
// firebase.json - Security rules and deployment config
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "runtime": "nodejs18"
    }
  ],
  "database": {
    "rules": "database.rules.json"
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

### Environment Variables
```bash
# functions/.env
PERSPECTIVE_API_KEY=your_perspective_api_key
SAFETY_ENCRYPTION_KEY=your_encryption_key_base64
EMERGENCY_WEBHOOK_URL=your_emergency_notification_webhook
MODERATION_EMAIL=safety@adyatribe.com
LEGAL_CONTACT_EMAIL=legal@adyatribe.com
```

---

**Document Version:** 1.0
**Last Updated:** January 2025
**Review Schedule:** Monthly technical review, quarterly security audit