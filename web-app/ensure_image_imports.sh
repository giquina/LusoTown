#!/bin/bash

# Ensure all files using Image component have the correct import

# List of files that should have Image imports
files=(
  "src/components/ImprovedEventCard.tsx"
  "src/components/PhotoUpload.tsx"
  "src/components/CaseStudies.tsx"
  "src/components/SuccessStories.tsx"
  "src/components/Cart.tsx"
  "src/components/EventImageWithFallback.tsx"
  "src/components/profile/ProfileHeader.tsx"
  "src/components/profile/ProfileGallery.tsx"
  "src/components/profile/ProfilePhotoManager.tsx"
  "src/components/profile/ProfileCard.tsx"
  "src/components/GroupsShowcase.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    # Check if import already exists
    if ! grep -q "import Image from 'next/image'" "$file"; then
      # Add import at the beginning after 'use client' if it exists
      if grep -q "'use client'" "$file"; then
        sed -i "/'use client'/a import Image from 'next/image'" "$file"
      else
        # Add import at the very top
        sed -i '1i import Image from '\''next/image'\' "$file"
      fi
      echo "Added Image import to $file"
    else
      echo "Image import already exists in $file"
    fi
  else
    echo "File not found: $file"
  fi
done

echo "Image import verification completed!"
