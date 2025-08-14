#!/usr/bin/env node

/**
 * LusoTown Agent Invocation Helper
 * 
 * This script helps identify the most appropriate agents for specific tasks
 * and provides guidance on how to invoke them effectively.
 */

const fs = require('fs');
const path = require('path');

// Load agent registry
const agentsRegistryPath = path.join(__dirname, 'agents.json');
const agentsRegistry = JSON.parse(fs.readFileSync(agentsRegistryPath, 'utf8'));

class AgentMatcher {
  constructor() {
    this.agents = agentsRegistry.agents;
  }

  /**
   * Find the most relevant agents for a given task description
   */
  findRelevantAgents(taskDescription, maxResults = 3) {
    const normalizedTask = taskDescription.toLowerCase();
    const agentScores = [];

    Object.entries(this.agents).forEach(([agentId, agent]) => {
      let score = 0;
      
      // Check invoke patterns
      agent.invoke_patterns.forEach(pattern => {
        if (normalizedTask.includes(pattern.toLowerCase())) {
          score += 3; // High weight for direct pattern matches
        }
      });

      // Check specialties
      agent.specialties.forEach(specialty => {
        const specialtyWords = specialty.toLowerCase().split(' ');
        specialtyWords.forEach(word => {
          if (normalizedTask.includes(word)) {
            score += 2; // Medium weight for specialty matches
          }
        });
      });

      // Check use cases
      agent.use_cases.forEach(useCase => {
        const useCaseWords = useCase.toLowerCase().split(' ');
        useCaseWords.forEach(word => {
          if (normalizedTask.includes(word)) {
            score += 1; // Lower weight for use case matches
          }
        });
      });

      // Check description
      const descriptionWords = agent.description.toLowerCase().split(' ');
      descriptionWords.forEach(word => {
        if (word.length > 4 && normalizedTask.includes(word)) {
          score += 0.5; // Very low weight for description matches
        }
      });

      if (score > 0) {
        agentScores.push({ agentId, agent, score });
      }
    });

    // Sort by score and return top results
    return agentScores
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  }

  /**
   * Get detailed information about a specific agent
   */
  getAgentDetails(agentId) {
    const agent = this.agents[agentId];
    if (!agent) {
      return null;
    }

    return {
      id: agentId,
      name: agent.name,
      description: agent.description,
      specialties: agent.specialties,
      use_cases: agent.use_cases,
      tools: agent.tools,
      file: agent.file
    };
  }

  /**
   * Generate invocation suggestions for a task
   */
  generateInvocationSuggestions(taskDescription) {
    const relevantAgents = this.findRelevantAgents(taskDescription);
    
    if (relevantAgents.length === 0) {
      return {
        suggestion: "No specialized agents found for this task. Consider using general development approach or the project-manager-agent for task coordination.",
        agents: []
      };
    }

    const primaryAgent = relevantAgents[0];
    const suggestions = [];

    // Single agent suggestion
    if (relevantAgents.length === 1 || primaryAgent.score >= 5) {
      suggestions.push({
        type: "single_agent",
        text: `I recommend using the **${primaryAgent.agent.name}** for this task. This agent specializes in: ${primaryAgent.agent.specialties.slice(0, 3).join(', ')}.`,
        agent: primaryAgent.agentId,
        confidence: "high"
      });
    } else {
      // Multiple agent suggestion
      const topAgents = relevantAgents.slice(0, 2);
      suggestions.push({
        type: "multiple_agents",
        text: `This task would benefit from multiple agents: **${topAgents[0].agent.name}** and **${topAgents[1].agent.name}**. Consider using the project-manager-agent to coordinate their work.`,
        agents: topAgents.map(a => a.agentId),
        confidence: "medium"
      });
    }

    return {
      suggestion: suggestions[0].text,
      agents: relevantAgents,
      coordination: relevantAgents.length > 1 ? "Consider using project-manager-agent for coordination" : null
    };
  }

  /**
   * List all available agents with their specialties
   */
  listAllAgents() {
    return Object.entries(this.agents).map(([agentId, agent]) => ({
      id: agentId,
      name: agent.name,
      description: agent.description,
      primarySpecialty: agent.specialties[0]
    }));
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const matcher = new AgentMatcher();

  if (args.length === 0) {
    console.log(`
🤖 LusoTown Agent Invocation Helper

Usage:
  node invoke-agent.js "task description"    # Find agents for a task
  node invoke-agent.js --list                # List all agents
  node invoke-agent.js --agent <agent-id>    # Get details about specific agent

Examples:
  node invoke-agent.js "translate content to portuguese"
  node invoke-agent.js "create a fado music event"
  node invoke-agent.js "fix bugs in the event feed"
  node invoke-agent.js --agent luso-content-agent
`);
    return;
  }

  if (args[0] === '--list') {
    console.log('\n📋 Available LusoTown Agents:\n');
    const agents = matcher.listAllAgents();
    agents.forEach(agent => {
      console.log(`🔸 **${agent.name}** (${agent.id})`);
      console.log(`   ${agent.description}`);
      console.log(`   Primary: ${agent.primarySpecialty}\n`);
    });
    return;
  }

  if (args[0] === '--agent' && args[1]) {
    const agentDetails = matcher.getAgentDetails(args[1]);
    if (!agentDetails) {
      console.log(`❌ Agent '${args[1]}' not found.`);
      return;
    }

    console.log(`\n🤖 **${agentDetails.name}** (${agentDetails.id})\n`);
    console.log(`**Description:** ${agentDetails.description}\n`);
    console.log(`**Specialties:**`);
    agentDetails.specialties.forEach(specialty => {
      console.log(`  • ${specialty}`);
    });
    console.log(`\n**Common Use Cases:**`);
    agentDetails.use_cases.forEach(useCase => {
      console.log(`  • ${useCase}`);
    });
    console.log(`\n**Available Tools:** ${agentDetails.tools.join(', ')}`);
    console.log(`\n**Agent File:** .claude/agents/${agentDetails.file}`);
    return;
  }

  // Task description provided
  const taskDescription = args.join(' ');
  console.log(`\n🔍 Finding agents for: "${taskDescription}"\n`);
  
  const suggestions = matcher.generateInvocationSuggestions(taskDescription);
  
  console.log(`💡 **Recommendation:**`);
  console.log(suggestions.suggestion);
  
  if (suggestions.agents.length > 0) {
    console.log(`\n📋 **Relevant Agents:**`);
    suggestions.agents.forEach((agentMatch, index) => {
      const agent = agentMatch.agent;
      console.log(`${index + 1}. **${agent.name}** (score: ${agentMatch.score.toFixed(1)})`);
      console.log(`   ${agent.description}`);
      console.log(`   Best for: ${agent.specialties.slice(0, 2).join(', ')}\n`);
    });
  }

  if (suggestions.coordination) {
    console.log(`🔗 **Coordination:** ${suggestions.coordination}`);
  }

  console.log(`\n💬 **How to use:**`);
  console.log(`Simply mention the agent's specialty in your prompt to Claude Code, for example:`);
  console.log(`"I need help with ${taskDescription}. Please use the appropriate Portuguese community specialist agent."`);
}

// Export for module usage
if (require.main === module) {
  main();
} else {
  module.exports = { AgentMatcher };
}