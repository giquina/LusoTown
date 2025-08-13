#!/bin/bash

# Claude Code Hook: Auto-Todo List Creation
# This hook automatically suggests creating todo lists for complex tasks

# Function to check if prompt suggests complex work
is_complex_task() {
    local prompt="$1"
    
    # Keywords that indicate complex tasks
    local complex_keywords=(
        "implement" "create" "build" "develop" "update" "fix" "refactor"
        "multiple" "several" "various" "and" "also" "then" "after"
        "deploy" "setup" "configure" "integrate" "optimize" "redesign"
        "replace" "modify" "change" "add" "remove" "install"
    )
    
    # Count keyword matches (case insensitive)
    local count=0
    for keyword in "${complex_keywords[@]}"; do
        if echo "$prompt" | grep -qi "$keyword"; then
            ((count++))
        fi
    done
    
    # If 2+ keywords found, suggest todo list
    if [ $count -ge 2 ]; then
        return 0  # Complex task detected
    fi
    
    return 1  # Simple task
}

# Check if the user prompt indicates complex work
USER_PROMPT="$1"

if is_complex_task "$USER_PROMPT"; then
    echo "🎯 Complex task detected! Consider asking Claude to:"
    echo "   • Create a comprehensive todo list to track all steps"
    echo "   • Break down the work into manageable phases"
    echo "   • Update progress as each item is completed"
    echo ""
    echo "💡 Example: 'Create a todo list for this work and update it as you progress'"
    echo ""
fi

# Always remind about best practices for complex development work
if echo "$USER_PROMPT" | grep -qi -E "(deploy|push|commit|github|git)"; then
    echo "🚀 Deployment reminder:"
    echo "   • Run tests before deployment"
    echo "   • Create detailed commit messages"
    echo "   • Update documentation if needed"
    echo ""
fi

# LusoTown-specific reminders
if echo "$USER_PROMPT" | grep -qi -E "(event|portuguese|lusophone|community)"; then
    echo "🇵🇹 LusoTown Development Notes:"
    echo "   • Ensure Portuguese cultural authenticity"
    echo "   • Consider age restrictions and women-only events"
    echo "   • Use Portuguese theme colors (green → red → yellow)"
    echo "   • Test events page and homepage showcase"
    echo ""
fi

exit 0