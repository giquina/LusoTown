#!/bin/bash

# Add generateStaticParams to all dynamic routes for static export

routes=(
  "src/app/groups/[id]/page.tsx"
  "src/app/profile/[id]/page.tsx"
  "src/app/events/[id]/page.tsx"
  "src/app/directory/member/[id]/page.tsx"
  "src/app/forums/topic/[id]/page.tsx"
)

for route in "${routes[@]}"; do
  echo "Processing $route..."
  
  # Check if generateStaticParams already exists
  if grep -q "generateStaticParams" "$route"; then
    echo "  - generateStaticParams already exists in $route"
    continue
  fi
  
  # Find the first import statement and add generateStaticParams after the imports
  # We'll add it before the first function/component definition
  
  # Create temp file with generateStaticParams function
  temp_file=$(mktemp)
  
  # Add the function after imports but before first component
  awk '
    /^(export default|function|const.*=|class)/ && !added {
      print "// Generate static params for export"
      print "export async function generateStaticParams() {"
      print "  // Return empty array for static export - pages will be generated on-demand"
      print "  return []"
      print "}"
      print ""
      added = 1
    }
    {print}
  ' "$route" > "$temp_file"
  
  # Replace original file
  mv "$temp_file" "$route"
  echo "  - Added generateStaticParams to $route"
done

echo "Fixed all dynamic routes for static export"
