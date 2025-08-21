#!/usr/bin/env node

/**
 * LusoTown Task Integration System
 * 
 * This system integrates with user conversations and task management
 * to automatically capture instructions, requirements, and patterns
 * from user interactions and development discussions.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TaskIntegration {
  constructor() {
    this.webAppRoot = path.resolve(__dirname, '../../');
    this.projectRoot = path.resolve(__dirname, '../../../');
    this.timestamp = new Date().toISOString();
    this.conversationLog = [];
  }

  /**
   * Process a user conversation or task description
   * Extracts actionable instructions and requirements
   */
  processConversation(conversationText) {
    console.log('🗣️ Processing user conversation for instructions...');
    
    const instructions = this.extractUserInstructions(conversationText);
    const requirements = this.extractRequirements(conversationText);
    const todos = this.extractTodoItems(conversationText);
    const decisions = this.extractArchitecturalDecisions(conversationText);
    
    // Save all extracted information
    if (instructions.length > 0) {
      this.saveUserInstructions(instructions);
    }
    
    if (requirements.length > 0) {
      this.saveRequirements(requirements);
    }
    
    if (todos.length > 0) {
      this.updateTodoList(todos);
    }
    
    if (decisions.length > 0) {
      this.saveArchitecturalDecisions(decisions);
    }
    
    // Generate conversation summary
    this.generateConversationSummary(conversationText, {
      instructions,
      requirements,
      todos,
      decisions
    });
  }

  /**
   * Extract direct user instructions from conversation
   */
  extractUserInstructions(text) {
    const instructions = [];
    
    // Look for direct commands and instructions
    const instructionPatterns = [
      /(?:please|can you|could you|I need you to|you should|make sure to)\s+([^.!?]+)/gi,
      /(?:create|build|implement|add|remove|update|fix|ensure)\s+([^.!?]+)/gi,
      /(?:always|never|don't|avoid)\s+([^.!?]+)/gi,
      /(?:remember to|make sure|be sure to)\s+([^.!?]+)/gi
    ];

    for (const pattern of instructionPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        instructions.push(...matches.map(match => match.trim()));
      }
    }

    // Look for Portuguese-specific instructions
    const portuguesePatterns = [
      /portuguese[^.!?]+/gi,
      /bilingual[^.!?]+/gi,
      /translation[^.!?]+/gi,
      /cultural[^.!?]+/gi
    ];

    for (const pattern of portuguesePatterns) {
      const matches = text.match(pattern);
      if (matches) {
        instructions.push(...matches.map(match => 
          `Portuguese Community: ${match.trim()}`
        ));
      }
    }

    return [...new Set(instructions)];
  }

  /**
   * Extract technical requirements from conversation
   */
  extractRequirements(text) {
    const requirements = [];
    
    // Look for requirement keywords
    const requirementPatterns = [
      /(?:requirement|required|must have|needs to|should have)\s*:?\s*([^.!?]+)/gi,
      /(?:specification|spec)\s*:?\s*([^.!?]+)/gi,
      /(?:feature|functionality)\s*:?\s*([^.!?]+)/gi
    ];

    for (const pattern of requirementPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        requirements.push(...matches.map(match => 
          match.replace(/^(requirement|required|must have|needs to|should have|specification|spec|feature|functionality)\s*:?\s*/i, '')
        ));
      }
    }

    // Technical component requirements
    if (text.includes('component') || text.includes('React')) {
      const componentMatches = text.match(/(?:component|React component)\s+[^.!?]+/gi);
      if (componentMatches) {
        requirements.push(...componentMatches.map(match => 
          `Technical: ${match.trim()}`
        ));
      }
    }

    return [...new Set(requirements)];
  }

  /**
   * Extract actionable TODO items from conversation
   */
  extractTodoItems(text) {
    const todos = [];
    
    // Look for explicit TODO mentions
    const todoPatterns = [
      /TODO\s*:?\s*([^.!?\n]+)/gi,
      /(?:need to|have to|should)\s+([^.!?]+)/gi,
      /(?:implement|create|build|add|fix)\s+([^.!?]+)/gi
    ];

    for (const pattern of todoPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        todos.push(...matches.map(match => 
          match.replace(/^(TODO\s*:?\s*|need to|have to|should|implement|create|build|add|fix)\s*/i, '')
        ));
      }
    }

    // Look for numbered or bulleted action items
    const actionItems = text.match(/(?:^\s*[-*]\s+|^\s*\d+\.\s+)([^.\n]+)/gm);
    if (actionItems) {
      todos.push(...actionItems.map(item => 
        item.replace(/^\s*[-*]\s+|\s*\d+\.\s+/, '').trim()
      ));
    }

    return [...new Set(todos)];
  }

  /**
   * Extract architectural decisions from conversation
   */
  extractArchitecturalDecisions(text) {
    const decisions = [];
    
    // Technology stack decisions
    const techDecisions = [
      { pattern: /Next\.js/gi, decision: 'Next.js framework chosen' },
      { pattern: /TypeScript/gi, decision: 'TypeScript for type safety' },
      { pattern: /Tailwind/gi, decision: 'Tailwind CSS for styling' },
      { pattern: /Supabase/gi, decision: 'Supabase as backend platform' },
      { pattern: /React Context/gi, decision: 'React Context for state management' }
    ];

    for (const tech of techDecisions) {
      if (tech.pattern.test(text)) {
        decisions.push(tech.decision);
      }
    }

    // Explicit decision patterns
    const decisionPatterns = [
      /(?:decided to|chosen to|selected)\s+([^.!?]+)/gi,
      /(?:decision|choice)\s*:?\s*([^.!?]+)/gi,
      /(?:we will|we'll)\s+([^.!?]+)/gi
    ];

    for (const pattern of decisionPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        decisions.push(...matches.map(match => 
          match.replace(/^(decided to|chosen to|selected|decision|choice|we will|we'll)\s*:?\s*/i, '')
        ));
      }
    }

    return [...new Set(decisions)];
  }

  /**
   * Save user instructions to agent briefings
   */
  saveUserInstructions(instructions) {
    const briefingsPath = path.join(this.webAppRoot, 'USER_INSTRUCTIONS.md');
    
    let content = '';
    if (fs.existsSync(briefingsPath)) {
      content = fs.readFileSync(briefingsPath, 'utf8');
    } else {
      content = `# LusoTown User Instructions\n\n`;
      content += `This file captures instructions directly from user conversations.\n\n`;
    }

    // Add new section
    content += `## ${new Date().toLocaleDateString()} - Conversation Instructions\n\n`;
    
    for (const instruction of instructions) {
      content += `- ${instruction}\n`;
    }
    
    content += '\n';
    
    fs.writeFileSync(briefingsPath, content);
    console.log(`✅ Saved ${instructions.length} user instructions`);
  }

  /**
   * Save requirements to dedicated file
   */
  saveRequirements(requirements) {
    const requirementsPath = path.join(this.webAppRoot, 'USER_REQUIREMENTS.md');
    
    let content = '';
    if (fs.existsSync(requirementsPath)) {
      content = fs.readFileSync(requirementsPath, 'utf8');
    } else {
      content = `# LusoTown User Requirements\n\n`;
      content += `Requirements captured from user conversations and specifications.\n\n`;
    }

    // Add new section
    content += `## ${new Date().toLocaleDateString()} - Requirements\n\n`;
    
    for (const requirement of requirements) {
      content += `- ${requirement}\n`;
    }
    
    content += '\n';
    
    fs.writeFileSync(requirementsPath, content);
    console.log(`✅ Saved ${requirements.length} user requirements`);
  }

  /**
   * Update TODO.md with new items from conversation
   */
  updateTodoList(todos) {
    const todoPath = path.join(this.webAppRoot, 'TODO.md');
    
    if (!fs.existsSync(todoPath)) {
      console.warn('TODO.md not found, creating new file');
      this.createNewTodoFile(todos);
      return;
    }

    let todoContent = fs.readFileSync(todoPath, 'utf8');
    
    // Add new section for conversation-derived todos
    const newSection = `\n## 🗣️ From User Conversations - ${new Date().toLocaleDateString()}\n\n`;
    
    for (const todo of todos) {
      const todoItem = `- [ ] ${todo}\n`;
      newSection += todoItem;
    }
    
    // Append to existing TODO.md
    todoContent += newSection;
    
    fs.writeFileSync(todoPath, todoContent);
    console.log(`✅ Added ${todos.length} TODO items from conversation`);
  }

  /**
   * Create new TODO file if it doesn't exist
   */
  createNewTodoFile(todos) {
    const todoContent = `# LusoTown TODO\n\n## From User Conversations - ${new Date().toLocaleDateString()}\n\n${
      todos.map(todo => `- [ ] ${todo}`).join('\n')
    }\n\nLast Updated: ${new Date().toLocaleDateString()}\n`;
    
    const todoPath = path.join(this.webAppRoot, 'TODO.md');
    fs.writeFileSync(todoPath, todoContent);
  }

  /**
   * Save architectural decisions
   */
  saveArchitecturalDecisions(decisions) {
    const decisionsPath = path.join(this.webAppRoot, 'USER_DECISIONS.md');
    
    let content = '';
    if (fs.existsSync(decisionsPath)) {
      content = fs.readFileSync(decisionsPath, 'utf8');
    } else {
      content = `# LusoTown User Decisions\n\n`;
      content += `Architectural and design decisions from user conversations.\n\n`;
    }

    // Add new section
    content += `## ${new Date().toLocaleDateString()} - Decisions\n\n`;
    
    for (const decision of decisions) {
      content += `- ${decision}\n`;
    }
    
    content += '\n';
    
    fs.writeFileSync(decisionsPath, content);
    console.log(`✅ Saved ${decisions.length} architectural decisions`);
  }

  /**
   * Generate comprehensive conversation summary
   */
  generateConversationSummary(originalText, extracted) {
    const summaryPath = path.join(this.webAppRoot, 'CONVERSATION_SUMMARIES.md');
    
    let content = '';
    if (fs.existsSync(summaryPath)) {
      content = fs.readFileSync(summaryPath, 'utf8');
    } else {
      content = `# LusoTown Conversation Summaries\n\n`;
      content += `Automated summaries of user conversations and extracted information.\n\n`;
    }

    // Add new conversation summary
    const summary = `## Conversation Summary - ${new Date().toLocaleString()}\n\n`;
    
    content += summary;
    content += `### Extracted Information\n`;
    content += `- **Instructions:** ${extracted.instructions.length}\n`;
    content += `- **Requirements:** ${extracted.requirements.length}\n`;
    content += `- **TODO Items:** ${extracted.todos.length}\n`;
    content += `- **Decisions:** ${extracted.decisions.length}\n\n`;
    
    content += `### Key Points\n`;
    
    // Add top extracted items as key points
    const allItems = [
      ...extracted.instructions.slice(0, 3),
      ...extracted.requirements.slice(0, 3),
      ...extracted.todos.slice(0, 3)
    ];
    
    for (const item of allItems.slice(0, 5)) {
      content += `- ${item}\n`;
    }
    
    content += '\n---\n\n';
    
    fs.writeFileSync(summaryPath, content);
    console.log(`✅ Generated conversation summary`);
  }

  /**
   * Process conversation from file
   */
  processConversationFile(filePath) {
    if (!fs.existsSync(filePath)) {
      console.error(`Conversation file not found: ${filePath}`);
      return;
    }

    const conversationText = fs.readFileSync(filePath, 'utf8');
    this.processConversation(conversationText);
  }

  /**
   * Process conversation from stdin
   */
  async processConversationFromStdin() {
    return new Promise((resolve) => {
      let input = '';
      
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => {
        input += chunk;
      });
      
      process.stdin.on('end', () => {
        if (input.trim()) {
          this.processConversation(input.trim());
        }
        resolve();
      });
    });
  }
}

// Handle different execution modes
if (require.main === module) {
  const taskIntegration = new TaskIntegration();
  const args = process.argv.slice(2);
  
  if (args.length > 0 && args[0] !== '--stdin') {
    // Process conversation from file
    taskIntegration.processConversationFile(args[0]);
  } else {
    // Process conversation from stdin
    taskIntegration.processConversationFromStdin().then(() => {
      console.log('📋 Task integration completed');
    });
  }
}

module.exports = TaskIntegration;