#!/usr/bin/env node

/**
 * LusoTown Instruction Capture System
 * 
 * Automatically captures and organizes instructions, patterns, and decisions
 * from commit messages, code comments, and user interactions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class InstructionCapture {
  constructor() {
    this.webAppRoot = path.resolve(__dirname, '../../');
    this.projectRoot = path.resolve(__dirname, '../../../');
    this.timestamp = new Date().toISOString();
  }

  async captureFromStdin() {
    return new Promise((resolve) => {
      let input = '';
      
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => {
        input += chunk;
      });
      
      process.stdin.on('end', () => {
        if (input.trim()) {
          this.processInput(input.trim());
        }
        resolve();
      });
    });
  }

  processInput(input) {
    console.log('📋 Processing instruction input...');
    
    const instructions = this.extractInstructions(input);
    const patterns = this.extractPatterns(input);
    const decisions = this.extractDecisions(input);
    
    if (instructions.length > 0) {
      this.saveInstructions(instructions);
    }
    
    if (patterns.length > 0) {
      this.savePatterns(patterns);
    }
    
    if (decisions.length > 0) {
      this.saveDecisions(decisions);
    }
  }

  extractInstructions(text) {
    const instructions = [];
    
    // Look for explicit instruction markers
    const instructionPatterns = [
      /INSTRUCTION:\s*(.+)/gi,
      /TODO:\s*(.+)/gi,
      /RULE:\s*(.+)/gi,
      /GUIDELINE:\s*(.+)/gi,
      /REQUIREMENT:\s*(.+)/gi
    ];

    for (const pattern of instructionPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        instructions.push(...matches.map(match => 
          match.replace(/^(INSTRUCTION|TODO|RULE|GUIDELINE|REQUIREMENT):\s*/i, '')
        ));
      }
    }

    // Look for imperative statements
    const imperativePatterns = [
      /(?:always|never|must|should|ensure)\s+[^.]+\./gi,
      /(?:do not|don't)\s+[^.]+\./gi
    ];

    for (const pattern of imperativePatterns) {
      const matches = text.match(pattern);
      if (matches) {
        instructions.push(...matches);
      }
    }

    return [...new Set(instructions)]; // Remove duplicates
  }

  extractPatterns(text) {
    const patterns = [];
    
    // Look for pattern markers
    const patternMarkers = [
      /PATTERN:\s*(.+)/gi,
      /APPROACH:\s*(.+)/gi,
      /METHOD:\s*(.+)/gi,
      /STRATEGY:\s*(.+)/gi
    ];

    for (const marker of patternMarkers) {
      const matches = text.match(marker);
      if (matches) {
        patterns.push(...matches.map(match => 
          match.replace(/^(PATTERN|APPROACH|METHOD|STRATEGY):\s*/i, '')
        ));
      }
    }

    // Detect code patterns
    if (text.includes('useLanguage') || text.includes('t(\'')) {
      patterns.push('Bilingual system usage detected');
    }

    if (text.includes('Portuguese') && text.includes('color')) {
      patterns.push('Portuguese brand color implementation');
    }

    if (text.includes('mobile') && text.includes('responsive')) {
      patterns.push('Mobile-first responsive design');
    }

    return [...new Set(patterns)];
  }

  extractDecisions(text) {
    const decisions = [];
    
    // Look for decision markers
    const decisionPatterns = [
      /DECISION:\s*(.+)/gi,
      /DECIDED:\s*(.+)/gi,
      /CHOSEN:\s*(.+)/gi,
      /SELECTED:\s*(.+)/gi
    ];

    for (const pattern of decisionPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        decisions.push(...matches.map(match => 
          match.replace(/^(DECISION|DECIDED|CHOSEN|SELECTED):\s*/i, '')
        ));
      }
    }

    // Detect architectural decisions
    if (text.includes('React Context') && text.includes('instead of Redux')) {
      decisions.push('Use React Context instead of Redux for state management');
    }

    if (text.includes('Supabase') && text.includes('backend')) {
      decisions.push('Supabase chosen as backend platform');
    }

    if (text.includes('Next.js') && text.includes('App Router')) {
      decisions.push('Next.js App Router architecture decision');
    }

    return [...new Set(decisions)];
  }

  saveInstructions(instructions) {
    const instructionsPath = path.join(this.webAppRoot, 'AGENT_BRIEFINGS.md');
    this.appendToFile(instructionsPath, 'Instructions', instructions);
  }

  savePatterns(patterns) {
    const patternsPath = path.join(this.webAppRoot, 'CODING_PATTERNS.md');
    this.appendToFile(patternsPath, 'Coding Patterns', patterns);
  }

  saveDecisions(decisions) {
    const decisionsPath = path.join(this.webAppRoot, 'ARCHITECTURE_DECISIONS.md');
    this.appendToFile(decisionsPath, 'Architecture Decisions', decisions);
  }

  appendToFile(filePath, sectionTitle, items) {
    let content = '';
    
    // Read existing content or create new file
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf8');
    } else {
      content = `# LusoTown ${sectionTitle}\n\n`;
      content += `This file automatically captures ${sectionTitle.toLowerCase()} from development activities.\n\n`;
    }

    // Add new section with timestamp
    const dateString = new Date().toLocaleDateString();
    const newSection = `## ${dateString}\n\n`;
    
    for (const item of items) {
      content += `- ${item}\n`;
    }
    
    content += '\n';
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Saved ${items.length} ${sectionTitle.toLowerCase()} to ${path.basename(filePath)}`);
  }

  async scanCodeCommentsForInstructions() {
    console.log('🔍 Scanning code comments for instructions...');
    
    const extensions = ['.tsx', '.ts', '.js', '.jsx'];
    const instructions = [];
    
    for (const ext of extensions) {
      try {
        const files = execSync(
          `find ${this.webAppRoot}/src -name "*${ext}" -type f`,
          { encoding: 'utf8' }
        ).trim().split('\n').filter(Boolean);
        
        for (const file of files) {
          const content = fs.readFileSync(file, 'utf8');
          
          // Look for special comments
          const commentPatterns = [
            /\/\*\*[\s\S]*?\*\//g, // JSDoc comments
            /\/\/\s*TODO:.*$/gm,   // TODO comments
            /\/\/\s*RULE:.*$/gm,   // RULE comments
            /\/\/\s*PATTERN:.*$/gm // PATTERN comments
          ];
          
          for (const pattern of commentPatterns) {
            const matches = content.match(pattern);
            if (matches) {
              for (const match of matches) {
                const extracted = this.extractInstructions(match);
                instructions.push(...extracted);
              }
            }
          }
        }
      } catch (error) {
        // Continue if file scanning fails
      }
    }
    
    if (instructions.length > 0) {
      this.saveInstructions(instructions);
    }
  }

  async generateInstructionSummary() {
    console.log('📊 Generating instruction summary...');
    
    const summaryPath = path.join(this.webAppRoot, 'INSTRUCTION_SUMMARY.md');
    
    // Collect all instructions from different sources
    const sources = [
      { file: 'AGENT_BRIEFINGS.md', title: 'Agent Instructions' },
      { file: 'CODING_PATTERNS.md', title: 'Coding Patterns' },
      { file: 'ARCHITECTURE_DECISIONS.md', title: 'Architecture Decisions' }
    ];
    
    let summary = `# LusoTown Instruction Summary\n\n`;
    summary += `Generated: ${new Date().toLocaleString()}\n\n`;
    summary += `This document provides a consolidated view of all instructions, patterns, and decisions.\n\n`;
    
    for (const source of sources) {
      const sourcePath = path.join(this.webAppRoot, source.file);
      
      if (fs.existsSync(sourcePath)) {
        const content = fs.readFileSync(sourcePath, 'utf8');
        
        summary += `## ${source.title}\n\n`;
        
        // Extract and count items
        const items = content.match(/^-\s+.+$/gm) || [];
        summary += `**Total items:** ${items.length}\n\n`;
        
        // Show recent items (last 10)
        const recentItems = items.slice(-10);
        summary += `**Recent additions:**\n`;
        recentItems.forEach(item => summary += `${item}\n`);
        summary += '\n';
      }
    }
    
    fs.writeFileSync(summaryPath, summary);
    console.log(`📄 Summary saved to: ${path.basename(summaryPath)}`);
  }
}

// Handle different execution modes
if (require.main === module) {
  const capture = new InstructionCapture();
  
  const args = process.argv.slice(2);
  
  if (args.includes('--scan')) {
    // Scan existing code for instructions
    capture.scanCodeCommentsForInstructions().then(() => {
      return capture.generateInstructionSummary();
    });
  } else if (args.includes('--summary')) {
    // Generate summary only
    capture.generateInstructionSummary();
  } else {
    // Default: capture from stdin (used by git hooks)
    capture.captureFromStdin().then(() => {
      console.log('📋 Instruction capture completed');
    });
  }
}

module.exports = InstructionCapture;