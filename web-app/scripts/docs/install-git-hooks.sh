#!/bin/bash

# LusoTown Git Hooks Installation Script
# This script installs git hooks for automated documentation maintenance

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../" && pwd)"
HOOKS_DIR="$PROJECT_ROOT/.git/hooks"
SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔧 Installing LusoTown documentation maintenance git hooks..."

# Create hooks directory if it doesn't exist
mkdir -p "$HOOKS_DIR"

# Install post-commit hook
cat > "$HOOKS_DIR/post-commit" << 'EOF'
#!/bin/bash
# LusoTown Post-Commit Documentation Hook
# Automatically updates documentation after each commit

echo "🔄 Running post-commit documentation maintenance..."

# Get the project root directory
PROJECT_ROOT="$(git rev-parse --show-toplevel)"
DOCS_AGENT="$PROJECT_ROOT/web-app/scripts/docs/documentation-agent.js"

# Check if documentation agent exists
if [ -f "$DOCS_AGENT" ]; then
    # Run documentation agent
    cd "$PROJECT_ROOT/web-app"
    node "$DOCS_AGENT"
    
    # Check if documentation was updated
    if git diff --quiet HEAD -- TODO.md CLAUDE.md ../CLAUDE.md; then
        echo "✅ Documentation is up to date"
    else
        echo "📝 Documentation was updated automatically"
        
        # Optionally auto-commit documentation updates
        # Uncomment the following lines to enable auto-commit of documentation
        # git add TODO.md CLAUDE.md ../CLAUDE.md docs-maintenance-report.md AGENT_BRIEFINGS.md 2>/dev/null || true
        # git commit -m "docs: automatic documentation maintenance [skip ci]" --no-verify || true
        
        echo "ℹ️  Review and commit documentation changes manually"
    fi
else
    echo "⚠️  Documentation agent not found at $DOCS_AGENT"
fi
EOF

# Install pre-push hook for documentation validation
cat > "$HOOKS_DIR/pre-push" << 'EOF'
#!/bin/bash
# LusoTown Pre-Push Documentation Validation Hook
# Ensures documentation is current before pushing

echo "🔍 Validating documentation before push..."

PROJECT_ROOT="$(git rev-parse --show-toplevel)"
DOCS_VALIDATOR="$PROJECT_ROOT/web-app/scripts/docs/validate-documentation.js"

# Check if validator exists and run it
if [ -f "$DOCS_VALIDATOR" ]; then
    cd "$PROJECT_ROOT/web-app"
    node "$DOCS_VALIDATOR"
    
    if [ $? -ne 0 ]; then
        echo "❌ Documentation validation failed. Please update documentation before pushing."
        echo "Run: npm run docs:update"
        exit 1
    fi
    
    echo "✅ Documentation validation passed"
else
    echo "⚠️  Documentation validator not found, skipping validation"
fi
EOF

# Install commit-msg hook for instruction capture
cat > "$HOOKS_DIR/commit-msg" << 'EOF'
#!/bin/bash
# LusoTown Commit Message Hook
# Captures instructions and patterns from commit messages

COMMIT_MSG_FILE=$1
PROJECT_ROOT="$(git rev-parse --show-toplevel)"
INSTRUCTION_CAPTURE="$PROJECT_ROOT/web-app/scripts/docs/capture-instructions.js"

# Read commit message
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Check for instruction patterns in commit message
if [[ "$COMMIT_MSG" =~ (INSTRUCTION|PATTERN|RULE|DECISION): ]]; then
    echo "📋 Captured instruction from commit message"
    
    # Run instruction capture if script exists
    if [ -f "$INSTRUCTION_CAPTURE" ]; then
        cd "$PROJECT_ROOT/web-app"
        echo "$COMMIT_MSG" | node "$INSTRUCTION_CAPTURE"
    fi
fi
EOF

# Make hooks executable
chmod +x "$HOOKS_DIR/post-commit"
chmod +x "$HOOKS_DIR/pre-push"
chmod +x "$HOOKS_DIR/commit-msg"

echo "✅ Git hooks installed successfully!"
echo ""
echo "Installed hooks:"
echo "  - post-commit: Automatic documentation maintenance"
echo "  - pre-push: Documentation validation"
echo "  - commit-msg: Instruction capture"
echo ""
echo "To enable auto-commit of documentation updates, edit:"
echo "  $HOOKS_DIR/post-commit"
echo ""
echo "To run documentation maintenance manually:"
echo "  npm run docs:update"