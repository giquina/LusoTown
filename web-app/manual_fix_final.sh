#!/bin/bash

# Manual fix for remaining syntax errors

# Fix PhotoUpload.tsx - Fix broken HTML syntax
sed -i '210s/.*/        \/>/' src/components/PhotoUpload.tsx
sed -i '213s/.*/          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" \/>/' src/components/PhotoUpload.tsx
sed -i '234s/.*/              <CloudArrowUpIcon className="w-12 h-12 text-primary-500 mx-auto mb-2" \/>/' src/components/PhotoUpload.tsx
sed -i '252s/.*/            <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0" \/>/' src/components/PhotoUpload.tsx
sed -i '258s/.*/              <XMarkIcon className="w-4 h-4" \/>/' src/components/PhotoUpload.tsx
sed -i '280s/.*/                \/>/' src/components/PhotoUpload.tsx
sed -i '286s/.*/                      <CloudArrowUpIcon className="w-6 h-6 mx-auto mb-2 animate-bounce" \/>/' src/components/PhotoUpload.tsx
sed -i '295s/.*/                    <CheckCircleIcon className="w-5 h-5 text-green-500 bg-white rounded-full" \/>/' src/components/PhotoUpload.tsx
sed -i '304s/.*/                  <XMarkIcon className="w-4 h-4" \/>/' src/components/PhotoUpload.tsx
sed -i '316s/.*/                  \/>/' src/components/PhotoUpload.tsx

# Fix ProfileHeader.tsx - Fix class declaration
sed -i '91s/.*/              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-lg bg-gray-200 overflow-hidden">/' src/components/profile/ProfileHeader.tsx

# Fix EventImageWithFallback.tsx - Add fill prop back
sed -i '46s/.*/      fill/' src/components/EventImageWithFallback.tsx

# Fix ProfilePhotoManager.tsx - Remove conflicting fill and width/height
sed -i '240s/.*/                className="object-cover"/' src/components/profile/ProfilePhotoManager.tsx
sed -i '330s/.*/                  className="object-cover"/' src/components/profile/ProfilePhotoManager.tsx

echo "Manual fixes completed!"
