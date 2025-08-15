#!/bin/bash

# Final completion of img to Image component conversions

# ImprovedEventCard.tsx - Line 304-309
sed -i '304,309c\
                          <Image\
                            src={attendee.profileImage}\
                            alt={attendee.name}\
                            width={32} height={32}\
                            className="rounded-full border-2 border-white object-cover shadow-sm hover:scale-110 transition-transform"\
                            title={attendee.name}\
                          />' src/components/ImprovedEventCard.tsx

# PhotoUpload.tsx - Line 276
sed -i 's|<img|<Image|g; s|/>|width={32} height={32} className="object-cover" />|g' src/components/PhotoUpload.tsx

# CaseStudies.tsx - Lines 404 and 422
sed -i 's|<img|<Image|g; s|className="w-20 h-20|width={80} height={80} className="|g' src/components/CaseStudies.tsx

# SuccessStories.tsx - Lines 184 and 198  
sed -i 's|<img|<Image|g; s|className="w-16 h-16|width={64} height={64} className="|g' src/components/SuccessStories.tsx

# Cart.tsx - Line 285
sed -i 's|<img|<Image|g; s|className="w-12 h-12|width={48} height={48} className="|g' src/components/Cart.tsx

# EventImageWithFallback.tsx - Line 32
sed -i 's|<img|<Image|g; s|className=|fill className=|g' src/components/EventImageWithFallback.tsx

# ProfileHeader.tsx - Line 93
sed -i 's|<img|<Image|g; s|className="w-24 h-24|width={96} height={96} className="|g' src/components/profile/ProfileHeader.tsx

# ProfileGallery.tsx - Line 99
sed -i 's|<img|<Image|g; s|className="w-full h-48|fill sizes="(max-width: 768px) 100vw, 400px" className="w-full h-48|g' src/components/profile/ProfileGallery.tsx

# ProfilePhotoManager.tsx - Lines 236 and 326
sed -i 's|<img|<Image|g; s|className="w-20 h-20|width={80} height={80} className="|g' src/components/profile/ProfilePhotoManager.tsx

# ProfileCard.tsx - Line 62
sed -i 's|<img|<Image|g; s|className="w-10 h-10|width={40} height={40} className="|g' src/components/profile/ProfileCard.tsx

# GroupsShowcase.tsx - Line 78
sed -i 's|<img|<Image|g; s|className="w-full h-48|fill sizes="(max-width: 768px) 100vw, 400px" className="w-full h-48|g' src/components/GroupsShowcase.tsx

echo "Final img to Image conversions completed!"
