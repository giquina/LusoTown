#!/bin/bash

# Fix incorrect conversions from the previous script

# Fix PhotoUpload.tsx - Remove invalid width/height attributes from non-image elements
sed -i 's/width={32} height={32} className="object-cover" \/>//g' src/components/PhotoUpload.tsx
sed -i 's/width={32} height={32} className="object-cover"//g' src/components/PhotoUpload.tsx

# Fix CaseStudies.tsx - Add proper width/height to Image components
sed -i '/src={study.participants.person1.image}/a\              width={80} height={80}' src/components/CaseStudies.tsx
sed -i '/src={study.participants.person2.image}/a\              width={80} height={80}' src/components/CaseStudies.tsx

# Fix SuccessStories.tsx - Add proper width/height to Image components  
sed -i '/src={story.profileImage}/a\              width={80} height={80}' src/components/SuccessStories.tsx
sed -i '/src={story.friendImage}/a\              width={80} height={80}' src/components/SuccessStories.tsx

# Fix Cart.tsx - Add proper width/height to Image component
sed -i '/src={item.imageUrl}/a\              width={96} height={96}' src/components/Cart.tsx

# Fix EventImageWithFallback.tsx - Remove duplicate fill attributes
sed -i 's/fill className={className}/className={className}/g' src/components/EventImageWithFallback.tsx
sed -i 's/fill={fill}//g' src/components/EventImageWithFallback.tsx

# Fix ProfileHeader.tsx - Remove invalid width/height attributes from div
sed -i 's/width={96} height={96} className="//g' src/components/profile/ProfileHeader.tsx
sed -i '/src={profile.profileImage}/a\              width={96} height={96}' src/components/profile/ProfileHeader.tsx

# Fix ProfileGallery.tsx - Add proper fill to Image component
sed -i '/src={photo.url}/a\          fill sizes="(max-width: 768px) 100vw, 400px"' src/components/profile/ProfileGallery.tsx

# Fix ProfilePhotoManager.tsx - Add proper width/height to Image components
sed -i '/src={profile.profile_picture_url}/a\              width={96} height={96}' src/components/profile/ProfilePhotoManager.tsx
sed -i '/src={upload.preview}/a\              width={48} height={48}' src/components/profile/ProfilePhotoManager.tsx

# Fix ProfileCard.tsx - Add proper fill to Image component
sed -i '/src={profile.profileImage}/a\            fill sizes="(max-width: 768px) 100vw, 400px"' src/components/profile/ProfileCard.tsx

# Fix GroupsShowcase.tsx - already looks correct

echo "Fixed conversion issues!"
