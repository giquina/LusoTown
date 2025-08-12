# AdyaTribe Admin Dashboard Specifications for Moderation Tools

## Dashboard Architecture Overview

The AdyaTribe admin dashboard serves as the central command center for community safety, providing real-time monitoring, comprehensive moderation tools, and data-driven insights to maintain a safe environment for women. The dashboard is designed with role-based access control and intuitive workflows optimized for various moderation scenarios.

## Dashboard Layout & Navigation

### Main Dashboard Structure
```
┌─────────────────────────────────────────────────────────────┐
│                    AdyaTribe Admin Dashboard                │
├─────────────────┬─────────────────┬─────────────────────────┤
│   Sidebar Nav   │   Main Content  │    Quick Actions        │
│                 │                 │                         │
│ • Overview      │ • Live Metrics  │ • Emergency Alert       │
│ • Moderation    │ • Active Cases  │ • Quick Report          │
│ • Analytics     │ • Trends        │ • User Lookup          │
│ • Users         │ • Charts        │ • Bulk Actions         │
│ • Reports       │                 │                         │
│ • Settings      │                 │                         │
└─────────────────┴─────────────────┴─────────────────────────┘
```

### Role-Based Dashboard Views

#### Community Moderator Dashboard
**Access Level:** Level 1 - Basic moderation functions
**Key Features:**
- Assigned case queue
- Report review interface
- User communication tools
- Basic analytics (personal performance)
- Community guidelines reference
- Escalation tools

#### Senior Moderator Dashboard
**Access Level:** Level 2 - Advanced moderation functions
**Key Features:**
- All Community Moderator features
- Appeal review interface
- Team performance monitoring
- Advanced user investigation tools
- Case assignment and supervision
- Policy interpretation guidance

#### Safety Team Lead Dashboard
**Access Level:** Level 3 - Full administrative control
**Key Features:**
- All previous features
- Crisis management center
- Legal coordination tools
- Policy management interface
- Team administration
- External communication center
- Emergency response coordination

## Core Dashboard Components

### 1. Live Monitoring Center

#### Real-Time Alert Panel
```jsx
const AlertPanel = () => {
  return (
    <div className="alert-panel">
      <div className="emergency-alerts">
        <h3>🚨 Emergency Alerts</h3>
        <AlertItem
          severity="critical"
          type="suicide_risk"
          user="User #12345"
          time="2 minutes ago"
          status="responding"
        />
        <AlertItem
          severity="high"
          type="doxxing"
          user="User #67890"
          time="15 minutes ago"
          status="investigating"
        />
      </div>
      
      <div className="priority-reports">
        <h3>⚡ High Priority Reports</h3>
        <ReportQueue priority="high" limit={5} />
      </div>
      
      <div className="system-status">
        <h3>📊 System Status</h3>
        <SystemMetric
          name="Response Time"
          value="12 minutes"
          target="15 minutes"
          status="good"
        />
        <SystemMetric
          name="Queue Depth"
          value="23 reports"
          target="< 50"
          status="good"
        />
        <SystemMetric
          name="Auto-Filter Accuracy"
          value="94.2%"
          target="> 90%"
          status="excellent"
        />
      </div>
    </div>
  );
};
```

#### Live Activity Feed
```jsx
const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    const eventSource = new EventSource('/api/admin/live-feed');
    
    eventSource.onmessage = (event) => {
      const activity = JSON.parse(event.data);
      setActivities(prev => [activity, ...prev.slice(0, 49)]); // Keep last 50
    };
    
    return () => eventSource.close();
  }, []);
  
  return (
    <div className="live-activity-feed">
      <h3>🔴 Live Activity</h3>
      <div className="activity-stream">
        {activities.map(activity => (
          <ActivityItem
            key={activity.id}
            type={activity.type}
            description={activity.description}
            user={activity.user}
            timestamp={activity.timestamp}
            severity={activity.severity}
          />
        ))}
      </div>
    </div>
  );
};
```

### 2. Moderation Queue Interface

#### Intelligent Case Routing
```jsx
const ModerationQueue = ({ userRole, userId }) => {
  const [cases, setCases] = useState([]);
  const [filters, setFilters] = useState({
    priority: 'all',
    category: 'all',
    status: 'pending',
    assignee: userRole === 'senior_moderator' ? 'all' : userId
  });
  
  return (
    <div className="moderation-queue">
      <QueueHeader
        totalCases={cases.length}
        overdueCount={cases.filter(c => c.isOverdue).length}
        avgResponseTime="14 minutes"
      />
      
      <QueueFilters
        filters={filters}
        onFilterChange={setFilters}
        userRole={userRole}
      />
      
      <CaseList
        cases={cases}
        onCaseSelect={handleCaseSelect}
        onBulkAction={handleBulkAction}
        userRole={userRole}
      />
    </div>
  );
};

const CaseItem = ({ case: caseData, onSelect, userRole }) => {
  const priorityColors = {
    critical: '#dc2626',
    high: '#ea580c',
    medium: '#d97706',
    low: '#65a30d'
  };
  
  return (
    <div 
      className="case-item"
      onClick={() => onSelect(caseData.id)}
      style={{ borderLeft: `4px solid ${priorityColors[caseData.priority]}` }}
    >
      <div className="case-header">
        <span className="case-id">#{caseData.id}</span>
        <span className="case-category">{caseData.category}</span>
        <span className="case-time">{formatTimeAgo(caseData.createdAt)}</span>
        {caseData.isOverdue && <span className="overdue-badge">OVERDUE</span>}
      </div>
      
      <div className="case-content">
        <p className="case-description">{caseData.description}</p>
        <div className="case-metadata">
          <span>Reporter: {caseData.reporter}</span>
          <span>Reported: {caseData.reported}</span>
          {caseData.assignedTo && <span>Assigned: {caseData.assignedTo}</span>}
        </div>
      </div>
      
      <div className="case-actions">
        <QuickActionButton action="view" caseId={caseData.id} />
        <QuickActionButton action="assign" caseId={caseData.id} />
        {userRole !== 'community_moderator' && (
          <QuickActionButton action="escalate" caseId={caseData.id} />
        )}
      </div>
    </div>
  );
};
```

#### Case Detail View
```jsx
const CaseDetailView = ({ caseId, onClose, userRole }) => {
  const [caseData, setCaseData] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [actionLog, setActionLog] = useState([]);
  
  return (
    <div className="case-detail-modal">
      <CaseDetailHeader
        caseData={caseData}
        onClose={onClose}
        userRole={userRole}
      />
      
      <div className="case-detail-content">
        <div className="case-detail-left">
          <ReportDetails report={caseData?.report} />
          <EvidenceSection evidence={evidence} />
          <RelatedContent contentId={caseData?.contentId} />
        </div>
        
        <div className="case-detail-right">
          <UserProfile userId={caseData?.reportedUserId} />
          <UserHistory history={userHistory} />
          <ActionLog log={actionLog} />
        </div>
      </div>
      
      <div className="case-detail-actions">
        <ModerationActions
          caseId={caseId}
          userRole={userRole}
          onActionTaken={handleActionTaken}
        />
      </div>
    </div>
  );
};
```

### 3. User Management Interface

#### User Lookup and Investigation
```jsx
const UserLookup = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleSearch = async (term) => {
    const results = await searchUsers({
      term,
      fields: ['username', 'email', 'profile'],
      includeRestricted: userRole !== 'community_moderator'
    });
    setSearchResults(results);
  };
  
  return (
    <div className="user-lookup">
      <div className="search-section">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          placeholder="Search by username, email, or user ID"
        />
        <SearchFilters userRole={userRole} />
      </div>
      
      <div className="search-results">
        {searchResults.map(user => (
          <UserSearchResult
            key={user.id}
            user={user}
            onSelect={setSelectedUser}
            userRole={userRole}
          />
        ))}
      </div>
      
      {selectedUser && (
        <UserDetailPanel
          user={selectedUser}
          userRole={userRole}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

const UserDetailPanel = ({ user, userRole, onClose }) => {
  return (
    <div className="user-detail-panel">
      <UserProfileCard user={user} />
      <UserSafetyProfile userId={user.id} userRole={userRole} />
      <UserModerationHistory userId={user.id} />
      <UserInteractionPatterns userId={user.id} userRole={userRole} />
      
      <div className="user-actions">
        <UserActionButtons
          userId={user.id}
          currentStatus={user.status}
          userRole={userRole}
        />
      </div>
    </div>
  );
};
```

#### User Safety Profile
```jsx
const UserSafetyProfile = ({ userId, userRole }) => {
  const [safetyData, setSafetyData] = useState(null);
  
  useEffect(() => {
    loadUserSafetyProfile(userId).then(setSafetyData);
  }, [userId]);
  
  if (!safetyData) return <LoadingSpinner />;
  
  return (
    <div className="user-safety-profile">
      <div className="trust-score">
        <h4>Trust Score</h4>
        <TrustScoreMeter score={safetyData.trustScore} />
        <div className="score-factors">
          <ScoreFactor
            name="Verification Status"
            value={safetyData.verificationStatus}
            impact={safetyData.verificationImpact}
          />
          <ScoreFactor
            name="Community Engagement"
            value={safetyData.engagementLevel}
            impact={safetyData.engagementImpact}
          />
          <ScoreFactor
            name="Report History"
            value={safetyData.reportCount}
            impact={safetyData.reportImpact}
          />
        </div>
      </div>
      
      <div className="risk-assessment">
        <h4>Risk Level: <RiskBadge level={safetyData.riskLevel} /></h4>
        <div className="risk-factors">
          {safetyData.riskFactors.map(factor => (
            <RiskFactor
              key={factor.id}
              type={factor.type}
              description={factor.description}
              severity={factor.severity}
            />
          ))}
        </div>
      </div>
      
      <div className="moderation-summary">
        <h4>Moderation Summary</h4>
        <ModerationStats stats={safetyData.moderationStats} />
        <RecentActions actions={safetyData.recentActions} limit={5} />
      </div>
    </div>
  );
};
```

### 4. Analytics and Reporting Dashboard

#### Safety Metrics Overview
```jsx
const SafetyMetricsDashboard = ({ timeRange, userRole }) => {
  const [metrics, setMetrics] = useState(null);
  
  return (
    <div className="safety-metrics-dashboard">
      <MetricsHeader timeRange={timeRange} />
      
      <div className="metrics-grid">
        <MetricCard
          title="Response Time"
          value="12.3 min"
          change="-2.1 min"
          trend="down"
          target="< 15 min"
          status="good"
        />
        
        <MetricCard
          title="Reports Processed"
          value="1,247"
          change="+123"
          trend="up"
          comparison="vs last week"
          status="neutral"
        />
        
        <MetricCard
          title="User Satisfaction"
          value="87.3%"
          change="+2.1%"
          trend="up"
          target="> 85%"
          status="good"
        />
        
        <MetricCard
          title="False Positive Rate"
          value="5.8%"
          change="-0.4%"
          trend="down"
          target="< 10%"
          status="excellent"
        />
      </div>
      
      <div className="detailed-analytics">
        <ReportTrendChart timeRange={timeRange} />
        <CategoryBreakdownChart timeRange={timeRange} />
        <ModeratorPerformanceChart userRole={userRole} />
        <CommunityHealthMetrics timeRange={timeRange} />
      </div>
    </div>
  );
};

const ReportTrendChart = ({ timeRange }) => {
  return (
    <div className="chart-container">
      <h3>Report Volume Trends</h3>
      <LineChart
        data={reportTrendData}
        xAxis="date"
        yAxis="reportCount"
        categories={[
          'harassment',
          'inappropriate_content',
          'spam',
          'safety_threats',
          'privacy_violations'
        ]}
        timeRange={timeRange}
      />
    </div>
  );
};
```

#### Community Health Dashboard
```jsx
const CommunityHealthDashboard = () => {
  return (
    <div className="community-health-dashboard">
      <HealthScoreOverview />
      <EngagementMetrics />
      <SafetyIndicators />
      <TrendAnalysis />
    </div>
  );
};

const HealthScoreOverview = () => {
  const healthScore = 87; // Calculate based on various factors
  
  return (
    <div className="health-score-overview">
      <div className="score-display">
        <CircularProgress
          value={healthScore}
          size={120}
          strokeWidth={8}
          color={getHealthColor(healthScore)}
        />
        <div className="score-details">
          <h2>{healthScore}/100</h2>
          <p>Community Health Score</p>
        </div>
      </div>
      
      <div className="score-components">
        <HealthComponent
          name="Safety"
          score={92}
          description="Low report rate, quick resolution times"
        />
        <HealthComponent
          name="Engagement"
          score={85}
          description="Active participation, positive interactions"
        />
        <HealthComponent
          name="Growth"
          score={78}
          description="Steady new member acquisition, good retention"
        />
        <HealthComponent
          name="Support"
          score={91}
          description="Members helping each other, resource sharing"
        />
      </div>
    </div>
  );
};
```

### 5. Crisis Management Center

#### Emergency Response Interface
```jsx
const CrisisManagementCenter = ({ userRole }) => {
  const [activeCrises, setActiveCrises] = useState([]);
  const [alertStatus, setAlertStatus] = useState('normal');
  
  if (userRole !== 'safety_team_lead') {
    return <AccessDenied message="Crisis management access requires Safety Team Lead role" />;
  }
  
  return (
    <div className="crisis-management-center">
      <CrisisStatusHeader status={alertStatus} />
      
      <div className="crisis-grid">
        <ActiveCrisesPanel crises={activeCrises} />
        <EmergencyContactsPanel />
        <ResourceCoordinationPanel />
        <CommunicationCenter />
      </div>
      
      <div className="crisis-tools">
        <EmergencyBroadcast />
        <LawEnforcementCoordination />
        <MediaResponseCenter />
        <RecoveryPlanning />
      </div>
    </div>
  );
};

const ActiveCrisesPanel = ({ crises }) => {
  return (
    <div className="active-crises-panel">
      <h3>🚨 Active Crisis Situations</h3>
      {crises.length === 0 ? (
        <div className="no-crises">
          <p>✅ No active crisis situations</p>
        </div>
      ) : (
        crises.map(crisis => (
          <CrisisItem
            key={crisis.id}
            crisis={crisis}
            onManage={handleCrisisManagement}
          />
        ))
      )}
    </div>
  );
};
```

### 6. Communication Tools

#### User Communication Interface
```jsx
const UserCommunicationPanel = ({ userId, caseId, userRole }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  
  return (
    <div className="user-communication-panel">
      <CommunicationHeader userId={userId} caseId={caseId} />
      
      <div className="message-history">
        {messageHistory.map(message => (
          <MessageItem
            key={message.id}
            message={message}
            isFromAdmin={message.sender.role === 'admin'}
          />
        ))}
      </div>
      
      <div className="message-composer">
        <MessageTemplateSelector
          templates={templates}
          onTemplateSelect={setCurrentMessage}
        />
        
        <MessageEditor
          value={currentMessage}
          onChange={setCurrentMessage}
          placeholder="Type your message..."
          features={['formatting', 'resources', 'escalation']}
        />
        
        <div className="message-actions">
          <MessageToneSelector />
          <ResourceAttachment />
          <ScheduleSend />
          <SendButton onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

const MessageTemplateSelector = ({ templates, onTemplateSelect }) => {
  const categoryTemplates = {
    warnings: [
      'First violation warning',
      'Repeated violation notice',
      'Final warning before suspension'
    ],
    support: [
      'Report acknowledgment',
      'Investigation update',
      'Resolution notification'
    ],
    resources: [
      'Crisis support resources',
      'Community guidelines reminder',
      'Safety planning assistance'
    ],
    appeals: [
      'Appeal acknowledgment',
      'Appeal decision - approved',
      'Appeal decision - denied'
    ]
  };
  
  return (
    <div className="template-selector">
      <select onChange={(e) => onTemplateSelect(e.target.value)}>
        <option value="">Select a template...</option>
        {Object.entries(categoryTemplates).map(([category, templates]) => (
          <optgroup key={category} label={category.toUpperCase()}>
            {templates.map(template => (
              <option key={template} value={template}>
                {template}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};
```

### 7. Settings and Configuration

#### Safety System Configuration
```jsx
const SafetySystemConfig = ({ userRole }) => {
  const [config, setConfig] = useState(null);
  
  if (userRole !== 'safety_team_lead') {
    return <AccessDenied />;
  }
  
  return (
    <div className="safety-system-config">
      <ConfigSection title="Content Filtering">
        <ContentFilterSettings
          config={config?.contentFiltering}
          onChange={updateConfig}
        />
      </ConfigSection>
      
      <ConfigSection title="Response Time Targets">
        <ResponseTimeSettings
          config={config?.responseTargets}
          onChange={updateConfig}
        />
      </ConfigSection>
      
      <ConfigSection title="Escalation Rules">
        <EscalationRuleSettings
          config={config?.escalationRules}
          onChange={updateConfig}
        />
      </ConfigSection>
      
      <ConfigSection title="Team Management">
        <TeamManagementSettings
          config={config?.teamManagement}
          onChange={updateConfig}
        />
      </ConfigSection>
    </div>
  );
};
```

## Mobile-Responsive Design

### Tablet Interface Adaptations
```css
@media (max-width: 1024px) {
  .admin-dashboard {
    grid-template-columns: 250px 1fr;
  }
  
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .case-detail-modal {
    width: 95vw;
    height: 90vh;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Mobile Interface (Emergency Access Only)
```css
@media (max-width: 768px) {
  .admin-dashboard {
    grid-template-columns: 1fr;
  }
  
  .emergency-only-view {
    display: block;
  }
  
  .desktop-only {
    display: none;
  }
  
  .quick-actions {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
}
```

## Performance Optimization

### Lazy Loading Implementation
```javascript
const LazyDashboardComponent = lazy(() => import('./components/Dashboard'));
const LazyAnalytics = lazy(() => import('./components/Analytics'));
const LazyCrisisCenter = lazy(() => import('./components/CrisisCenter'));

const AdminRouter = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<LazyDashboardComponent />} />
        <Route path="/analytics" element={<LazyAnalytics />} />
        <Route path="/crisis" element={<LazyCrisisCenter />} />
      </Routes>
    </Suspense>
  );
};
```

### Real-time Data Management
```javascript
// Efficient real-time updates with WebSocket connection pooling
class DashboardWebSocketManager {
  constructor() {
    this.connections = new Map();
    this.subscriptions = new Map();
  }
  
  subscribe(topic, callback) {
    if (!this.connections.has(topic)) {
      this.connections.set(topic, new WebSocket(`ws://api/admin/${topic}`));
    }
    
    const ws = this.connections.get(topic);
    const subscriptionId = generateId();
    
    this.subscriptions.set(subscriptionId, { topic, callback });
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };
    
    return subscriptionId;
  }
  
  unsubscribe(subscriptionId) {
    this.subscriptions.delete(subscriptionId);
  }
}
```

## Security Considerations

### Access Control Implementation
```javascript
const useRoleBasedAccess = (requiredRole) => {
  const { user } = useAuth();
  const userRole = user?.role;
  
  const hasAccess = useMemo(() => {
    const roleHierarchy = {
      'community_moderator': 1,
      'senior_moderator': 2,
      'safety_team_lead': 3
    };
    
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  }, [userRole, requiredRole]);
  
  return hasAccess;
};

const ProtectedComponent = ({ children, requiredRole }) => {
  const hasAccess = useRoleBasedAccess(requiredRole);
  
  if (!hasAccess) {
    return <AccessDenied requiredRole={requiredRole} />;
  }
  
  return children;
};
```

### Audit Logging
```javascript
const useActionLogger = () => {
  const { user } = useAuth();
  
  const logAction = useCallback(async (action, details) => {
    await fetch('/api/admin/audit-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        action,
        details,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(),
        ipAddress: getClientIP()
      })
    });
  }, [user.id]);
  
  return logAction;
};
```

---

**Document Version:** 1.0
**Last Updated:** January 2025
**Browser Support:** Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
**Framework:** React 18+ with Next.js 14
**State Management:** Redux Toolkit with RTK Query
**Real-time:** WebSocket connections with reconnection handling
**Security:** Role-based access control, audit logging, session management