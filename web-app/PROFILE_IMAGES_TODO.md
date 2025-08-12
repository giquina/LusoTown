# Profile Images Required

## Overview
AdyaTribe needs 29 high-quality, diverse profile images of women 30+ for various sections of the platform. All images should represent diverse ethnicities, professions, and be professional yet approachable.

## Image Requirements

### Technical Specifications
- **Format**: JPG
- **Quality**: 85%
- **Dimensions**: 
  - Testimonials: 400x400px
  - Community: 400x400px  
  - Directory: 400x400px
  - Forums: 200x200px
- **File Size**: Maximum 200KB each
- **Style**: Professional headshots, natural lighting, authentic expressions

### Diversity Guidelines
- Represent multiple ethnicities (African, Asian, Caucasian, Hispanic, Middle Eastern)
- Age range: 30-50 years old
- Professional appearance but approachable
- Natural expressions and authentic smiles
- Various professional settings/backgrounds

## Images Needed (29 Total)

### 1. Testimonials (6 images)
Located in `/public/profiles/testimonials/`

- `sarah-chen.jpg` - Asian professional, warm smile
- `maya-patel.jpg` - South Asian professional, confident expression  
- `jessica-williams.jpg` - African American professional, authentic smile
- `emma-johnson.jpg` - Caucasian professional, approachable look
- `priya-sharma.jpg` - Indian professional, business setting
- `lisa-thompson.jpg` - Mixed ethnicity professional, natural lighting

### 2. Community Showcase (12 images)
Located in `/public/profiles/community/`

- `member-1.jpg` through `member-12.jpg`
- Mix of ethnicities and professional backgrounds
- Outdoor and indoor settings
- Various ages within 30-50 range
- Professional but casual styling

### 3. Directory Profiles (6 images)
Located in `/public/profiles/directory/`

- `rachel-green.jpg` - Wine enthusiast and book lover
- `emma-wilson.jpg` - Fitness enthusiast and adventure seeker  
- `sophia-martinez.jpg` - Tech professional and creative
- `olivia-taylor.jpg` - Artist and creative professional
- `ava-davis.jpg` - Finance professional, new to London
- `chloe-brown.jpg` - Environmental consultant

### 4. Forum Avatars (5 images)
Located in `/public/profiles/forums/`

- `forum-user-1.jpg` through `forum-user-5.jpg`
- Smaller format (200x200px)
- Simple, clean headshots
- Diverse representation

## Recommended Sources

### Free Stock Photo Sites
1. **Pexels** (pexels.com) - 500,000+ diverse women photos
2. **Freepik** (freepik.com) - Professional headshots collection
3. **Unsplash** (unsplash.com) - High-quality portraits
4. **Pixabay** (pixabay.com) - Free commercial use images

### Search Terms
- "diverse professional women 30+"
- "business headshots women"
- "professional portraits diverse"
- "women entrepreneurs headshots"
- "multicultural professional women"

### Alternative Solutions
- **AI-Generated**: Use LightX or similar AI tools for consistent, professional headshots
- **Stock Photo Services**: Purchase high-quality diverse photo packs
- **Professional Photography**: Commission custom headshots for authentic representation

## Download and Optimization Process

1. **Download**: Save original high-resolution images
2. **Resize**: Crop to required dimensions (square format preferred)  
3. **Optimize**: Compress to <200KB while maintaining quality
4. **Rename**: Use exact filenames as specified in `profileImages.ts`
5. **Test**: Verify all images load correctly on development server

## Current Status
- ❌ Directories created but empty
- ❌ 0/29 images downloaded
- ❌ Images not optimized
- ❌ Not tested in production build

## Priority Order
1. Testimonials (6) - High priority, visible on main landing page
2. Community (12) - Medium priority, used in features section
3. Directory (6) - Medium priority, member directory page
4. Forums (5) - Lower priority, forum functionality

## Notes
- All images must be properly licensed for commercial use
- Maintain consistency in lighting and quality across all images
- Consider accessibility with proper alt text (already defined in `profileImages.ts`)
- Test loading performance after adding all images