// Helper functions for enhanced push notifications in LusoTown Service Worker

function isQuietHours() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 22 || hour < 8; // 10 PM to 8 AM
}

function exceedsNotificationLimits(notificationType) {
  try {
    const today = new Date().toDateString();
    const notificationHistory = JSON.parse(localStorage.getItem('lusotown-notification-history') || '{}');
    const todayHistory = notificationHistory[today] || {};
    
    // Daily limits by type
    const dailyLimits = {
      'cultural-event': 5,
      'festa': 3,
      'fado-night': 3,
      'community-match': 8,
      'business-update': 3,
      'restaurant-special': 2,
      'heritage-reminder': 2,
      'emergency': 10,
      'default': 10
    };
    
    const limit = dailyLimits[notificationType] || dailyLimits.default;
    const count = todayHistory[notificationType] || 0;
    
    return count >= limit;
  } catch (error) {
    console.error('[SW] Error checking notification limits:', error);
    return false;
  }
}

function getVibratePattern(region) {
  const patterns = {
    portugal: [200, 100, 200],
    brazil: [300, 100, 300, 100, 300],
    'cape-verde': [150, 50, 150, 50, 150],
    angola: [250, 100, 250],
    mozambique: [200, 50, 200, 50, 200],
    default: [200, 100, 200]
  };
  
  return patterns[region] || patterns.default;
}

function scheduleNotificationForLater(data) {
  try {
    const scheduledNotifications = JSON.parse(localStorage.getItem('lusotown-scheduled-notifications') || '[]');
    
    // Schedule for 8 AM next morning
    const scheduleTime = new Date();
    if (scheduleTime.getHours() >= 8) {
      scheduleTime.setDate(scheduleTime.getDate() + 1);
    }
    scheduleTime.setHours(8, 0, 0, 0);
    
    scheduledNotifications.push({
      ...data,
      scheduledFor: scheduleTime.getTime()
    });
    
    localStorage.setItem('lusotown-scheduled-notifications', JSON.stringify(scheduledNotifications));
    console.log('[SW] Notification scheduled for:', scheduleTime);
  } catch (error) {
    console.error('[SW] Error scheduling notification:', error);
  }
}

function storeNotificationEvent(data) {
  try {
    const events = JSON.parse(localStorage.getItem('lusotown-notification-events') || '[]');
    events.push({
      type: data.type,
      timestamp: Date.now(),
      title: data.title,
      culturalContext: data.culturalContext
    });
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('lusotown-notification-events', JSON.stringify(events));
  } catch (error) {
    console.error('[SW] Error storing notification event:', error);
  }
}

async function updateNotificationHistory(data) {
  try {
    const today = new Date().toDateString();
    const notificationHistory = JSON.parse(localStorage.getItem('lusotown-notification-history') || '{}');
    
    if (!notificationHistory[today]) {
      notificationHistory[today] = {};
    }
    
    if (!notificationHistory[today][data.type]) {
      notificationHistory[today][data.type] = 0;
    }
    
    notificationHistory[today][data.type]++;
    
    // Clean old history (keep last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    Object.keys(notificationHistory).forEach(date => {
      if (new Date(date) < sevenDaysAgo) {
        delete notificationHistory[date];
      }
    });
    
    localStorage.setItem('lusotown-notification-history', JSON.stringify(notificationHistory));
  } catch (error) {
    console.error('[SW] Error updating notification history:', error);
  }
}

function trackNotificationInteraction(tag, action) {
  try {
    const interactions = JSON.parse(localStorage.getItem('lusotown-notification-interactions') || '[]');
    interactions.push({
      tag,
      action: action || 'click',
      timestamp: Date.now()
    });
    
    // Keep only last 200 interactions
    if (interactions.length > 200) {
      interactions.splice(0, interactions.length - 200);
    }
    
    localStorage.setItem('lusotown-notification-interactions', JSON.stringify(interactions));
    console.log('[SW] Tracked notification interaction:', { tag, action });
  } catch (error) {
    console.error('[SW] Error tracking notification interaction:', error);
  }
}

async function handleEventShare(notificationData) {
  try {
    if (navigator.share) {
      await navigator.share({
        title: notificationData.title || 'LusoTown Event',
        text: notificationData.body || 'Join this Portuguese community event!',
        url: notificationData.eventUrl || self.location.origin + '/events'
      });
    } else {
      // Fallback to opening share URL
      const shareUrl = `${self.location.origin}/share?event=${encodeURIComponent(notificationData.eventId || '')}`;
      clients.openWindow(shareUrl);
    }
  } catch (error) {
    console.error('[SW] Error sharing event:', error);
  }
}

async function handleEventRSVP(notificationData, response) {
  try {
    if (notificationData.eventId) {
      await fetch('/api/events/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventId: notificationData.eventId,
          response: response
        })
      });
      
      console.log('[SW] RSVP submitted:', response);
    }
  } catch (error) {
    console.error('[SW] Error handling RSVP:', error);
  }
}