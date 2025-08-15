#!/bin/bash

# Remove generateStaticParams from client components

routes=(
  "src/app/groups/[id]/page.tsx"
  "src/app/profile/[id]/page.tsx"
  "src/app/events/[id]/page.tsx"
  "src/app/directory/member/[id]/page.tsx"
  "src/app/forums/topic/[id]/page.tsx"
  "src/app/chat/[id]/page.tsx"
)

for route in "${routes[@]}"; do
  echo "Processing $route..."
  
  # Check if file has 'use client'
  if grep -q "'use client'" "$route"; then
    echo "  - Removing generateStaticParams from client component: $route"
    
    # Remove the generateStaticParams function and empty lines
    sed -i '/\/\/ Generate static params for export/,+4d' "$route"
    
    echo "  - Removed generateStaticParams from $route"
  else
    echo "  - $route is a server component, keeping generateStaticParams"
  fi
done

echo "Cleaned up generateStaticParams from client components"
