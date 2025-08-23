# LusoTown Agent System Documentation

## Overview

LusoTown features a comprehensive agent system specifically designed for Portuguese-speaking community management and platform optimization. Each agent is a specialized AI assistant that can be invoked to handle specific aspects of the Portuguese adult social calendar platform.

## How to Use Agents

### Activation Methods

1. **Direct Invocation**: Call agents by name using `/agents [agent-name]`
2. **Context-Based Activation**: Agents automatically activate when relevant tasks are detected
3. **Multi-Agent Coordination**: Multiple agents can work together on complex tasks

### Example Usage
```
/agents luso-content-agent
/agents luso-events-agent
/agents luso-safety-agent
```

## Portuguese-speaking community Specialists

### 🌐 luso-content-agent
**Role**: Portuguese language and cultural content management specialist

**Use When:**
- Translating content to Portuguese while maintaining cultural nuances
- Adapting content for Portuguese diaspora in London
- Creating bilingual user interface elements
- Ensuring cultural authenticity in messaging

**Key Capabilities:**
- Handle Portuguese regional variations (Portugal, Brazil, Angola, etc.)
- Create culturally appropriate event descriptions
- Develop authentic Portuguese-speaking community messaging
- Review bilingual content for cultural appropriateness

**Integration Points:**
- Works with `LanguageContext.tsx` for bilingual content
- Reviews all user-facing content in components
- Optimizes event pages and community features

---

### 🛡️ luso-safety-agent
**Role**: Portuguese-speaking community-specific content moderation and safety specialist

**Use When:**
- Moderating Portuguese-speaking community discussions and forums
- Handling safety reports and community conflicts
- Implementing adult community guidelines (18+ focus)
- Ensuring safe environment for Portuguese social activities

**Key Capabilities:**
- Moderate content in Portuguese and English
- Handle cultural sensitivity in community interactions
- Implement safety guidelines for adult networking events
- Resolve community conflicts with cultural awareness

**Integration Points:**
- Monitors content in `forums/` discussion areas
- Reviews event postings and user profiles
- Works with GroupReportModal for safety reporting

---

### 🎭 luso-events-agent
**Role**: Portuguese cultural events curator and adult social activities specialist

**Use When:**
- Creating Portuguese cultural events for London community
- Planning adult networking and professional events
- Curating authentic Portuguese cultural programming
- Coordinating nightlife and social activities

**Key Capabilities:**
- Research Portuguese venues and cultural spaces in London
- Create compelling event descriptions with cultural significance
- Plan professional networking and business meetups
- Develop cultural programming celebrating Portuguese heritage

**Integration Points:**
- Manages content for `events/` pages and EventCard components
- Works with EventFeed system for real-time updates
- Collaborates with Save/Cart functionality for event bookings

---

### 📈 luso-growth-agent
**Role**: Portuguese-speaking community outreach and growth optimization specialist

**Use When:**
- Optimizing platform for Portuguese keywords and SEO
- Developing social media strategies for Portuguese-speaking community
- Creating marketing campaigns targeting Portuguese speakers
- Building partnerships with Portuguese organizations

**Key Capabilities:**
- Multilingual SEO optimization (Portuguese and English)
- Portuguese diaspora engagement strategies
- Community outreach to Portuguese organizations and businesses
- Growth strategies for adult Portuguese-speaking community engagement

**Integration Points:**
- Optimizes content in sitemap and SEO elements
- Works with social sharing features in EventFeed
- Partners with other agents for marketing materials

---

### 🏢 luso-business-agent
**Role**: Portuguese business directory specialist and professional networking coordinator

**Use When:**
- Research and verify Portuguese-owned businesses in London
- Creating business profiles with cultural relevance
- Organizing professional networking events
- Facilitating B2B connections within Portuguese-speaking community

**Key Capabilities:**
- Maintain comprehensive Portuguese business directory
- Organize professional meetups and networking events
- Support Portuguese entrepreneurs and business owners
- Facilitate partnerships between Portuguese businesses

**Integration Points:**
- Manages business directory pages and BusinessCard components
- Collaborates with events agent for networking events
- Partners with growth agent for business marketing

---

### 🏛️ luso-heritage-agent
**Role**: Portuguese heritage preservation and storytelling specialist

**Use When:**
- Creating Portuguese heritage and cultural preservation content
- Developing educational materials about Portuguese culture
- Documenting Portuguese-speaking community success stories
- Organizing cultural preservation events

**Key Capabilities:**
- Deep knowledge of Portuguese history and cultural evolution
- Create compelling narratives about Portuguese culture
- Develop educational resources about Portuguese heritage
- Support intergenerational cultural knowledge transfer

**Integration Points:**
- Creates content for heritage sections of platform
- Supports SuccessStories component with narratives
- Collaborates with events agent for cultural programming

---

### 💼 luso-membership-agent
**Role**: Community membership optimization specialist

**Use When:**
- Optimizing membership features for Portuguese-speaking community needs
- Handling Portuguese-specific payment preferences
- Creating membership benefits tailored to community
- Managing subscription and premium features

**Key Capabilities:**
- Adult community membership optimization
- Portuguese-specific payment and billing solutions
- Membership tier development for community needs
- Revenue optimization strategies

---

### 🤝 luso-partnership-agent
**Role**: Portuguese institutional partnerships and relationships specialist

**Use When:**
- Establishing partnerships with Portuguese cultural centers
- Coordinating with consulates and official organizations
- Managing relationships with Portuguese institutions
- Creating cross-promotional opportunities

**Key Capabilities:**
- Partnership development with Portuguese organizations
- Institutional relationship management
- Cross-promotional campaign creation
- Community partnership coordination

## Development and Operations Specialists

### 📚 doc-writer
**Role**: Technical and project documentation specialist

**Use When:**
- Creating or updating technical documentation
- Writing user guides and help content
- Documenting new features and system changes
- Maintaining project documentation standards

---

### 🐛 bug-finder
**Role**: Quality assurance and bug detection specialist

**Use When:**
- Identifying potential bugs and issues in code
- Reviewing code quality and best practices
- Testing functionality and user experience
- Ensuring platform stability and reliability

---

### 🔧 refactor-helper
**Role**: Code optimization and architecture improvement specialist

**Use When:**
- Optimizing existing code for better performance
- Improving code structure and maintainability
- Implementing best practices and design patterns
- Modernizing legacy code components

---

### ⭐ feature-builder
**Role**: New feature development specialist

**Use When:**
- Building new features for Portuguese-speaking community needs
- Implementing user-requested functionality
- Developing innovative community features
- Extending platform capabilities

---

### 🚀 deploy-manager
**Role**: Production deployment and DevOps management specialist

**Use When:**
- Managing production deployments to Vercel
- Handling deployment configurations and optimizations
- Monitoring production performance and issues
- Managing CI/CD pipelines and deployment workflows

## Multi-Agent Workflows

### Content Creation Workflow
1. **luso-content-agent**: Create Portuguese content
2. **luso-heritage-agent**: Add cultural context and authenticity
3. **luso-safety-agent**: Review for community appropriateness
4. **doc-writer**: Document content guidelines

### Event Planning Workflow
1. **luso-events-agent**: Plan and create event details
2. **luso-business-agent**: Identify venue partnerships
3. **luso-growth-agent**: Develop promotional strategy
4. **luso-safety-agent**: Review event safety guidelines

### Platform Growth Workflow
1. **luso-growth-agent**: Develop growth strategies
2. **luso-partnership-agent**: Establish institutional partnerships
3. **luso-business-agent**: Create business networking opportunities
4. **luso-membership-agent**: Optimize membership conversion

## Best Practices

### Agent Coordination
- Use multiple agents for complex tasks requiring different expertise
- Allow agents to collaborate on overlapping responsibilities
- Leverage agent specializations for optimal results

### Cultural Authenticity
- Always involve Portuguese-speaking community specialists for cultural content
- Ensure adult focus (18+) is maintained across all agent activities
- Respect Portuguese regional variations and diaspora experiences

### Quality Assurance
- Use bug-finder and refactor-helper agents for technical quality
- Employ luso-safety-agent for community appropriateness
- Leverage doc-writer for documentation and guidelines

## Agent Performance Metrics

Each agent tracks specific success metrics:
- **Content Agents**: Community engagement and cultural authenticity
- **Safety Agents**: Community safety and incident resolution
- **Growth Agents**: User acquisition and retention rates
- **Event Agents**: Event attendance and satisfaction
- **Business Agents**: Partnership development and networking success

## Activation Triggers

Agents can be activated by:
- Direct user invocation
- Content requiring Portuguese cultural expertise
- Community safety concerns or reports
- New feature development needs
- Marketing and growth initiatives
- Partnership and business development opportunities
- Technical issues or optimization needs

## Support and Integration

For technical support with the agent system:
1. Check agent documentation in `.claude/agents/` directory
2. Review integration points in relevant code files
3. Test agent functionality in development environment
4. Monitor agent performance metrics and community feedback

The LusoTown agent system provides comprehensive support for building and maintaining an authentic Portuguese adult community platform in London, ensuring cultural authenticity, community safety, and platform excellence.