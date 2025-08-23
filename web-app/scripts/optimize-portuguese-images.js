#!/usr/bin/env node

/**
 * Portuguese-speaking community Image Optimization Script
 * 
 * This script helps download, resize, and optimize images for the Portuguese-speaking community
 * sections of the LusoTown website. It ensures consistent formatting and web optimization.
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// Image specifications based on usage
const imageSpecs = {
  testimonials: {
    width: 400,
    height: 400,
    quality: 85,
    format: 'jpg'
  },
  community: {
    width: 400,
    height: 400,
    quality: 85,
    format: 'jpg'
  },
  events: {
    width: 800,
    height: 600,
    quality: 85,
    format: 'jpg'
  },
  business: {
    width: 400,
    height: 400,
    quality: 85,
    format: 'jpg'
  }
};

// Portuguese testimonial image requirements
const portugueseTestimonials = [
  {
    id: 'carlos-silva',
    name: 'Carlos Silva',
    description: 'Portuguese-speaking community organizer from Camden, London',
    category: 'testimonials',
    keywords: ['Portuguese man professional', 'young entrepreneur', 'community leader']
  },
  {
    id: 'ana-ferreira',
    name: 'Ana Ferreira',
    description: 'Brazilian dance community leader from Stockwell, London',
    category: 'testimonials',
    keywords: ['Brazilian woman professional', 'dance instructor', 'community leader']
  },
  {
    id: 'miguel-santos',
    name: 'Miguel Santos',
    description: 'Fado cultural heritage keeper from Elephant & Castle, London',
    category: 'testimonials',
    keywords: ['Portuguese man traditional', 'fado musician', 'cultural heritage']
  },
  {
    id: 'joana-silva',
    name: 'Joana Silva',
    description: 'Culinary culture professional from Canary Wharf, London',
    category: 'testimonials',
    keywords: ['Portuguese business woman', 'professional networking', 'corporate']
  },
  {
    id: 'pedro-costa',
    name: 'Pedro Costa',
    description: 'Literature and tech community builder from Hampstead, London',
    category: 'testimonials',
    keywords: ['Portuguese man academic', 'tech professional', 'intellectual']
  },
  {
    id: 'teresa-rodrigues',
    name: 'Teresa Rodrigues',
    description: 'Music appreciation leader from Brixton, London',
    category: 'testimonials',
    keywords: ['Cape Verdean woman', 'African Portuguese', 'music cultural']
  },
  {
    id: 'ricardo-oliveira',
    name: 'Ricardo Oliveira',
    description: 'Sports community organizer from Greenwich, London',
    category: 'testimonials',
    keywords: ['Portuguese man sports', 'football fan', 'community organizer']
  },
  {
    id: 'fernanda-santos',
    name: 'Fernanda Santos',
    description: 'Language exchange coordinator from King\'s Cross, London',
    category: 'testimonials',
    keywords: ['young Portuguese woman', 'teacher', 'education professional']
  },
  {
    id: 'antonio-pereira',
    name: 'António Pereira',
    description: 'Heritage tours guide from City of London',
    category: 'testimonials',
    keywords: ['mature Portuguese man', 'heritage guide', 'business consultant']
  },
  {
    id: 'fernanda-oliveira',
    name: 'Fernanda Oliveira',
    description: 'Cultural events organizer from Stockwell, London',
    category: 'testimonials',
    keywords: ['Portuguese woman cultural', 'event organizer', 'community leader']
  },
  {
    id: 'marco-santos',
    name: 'Marco Santos',
    description: 'Brazilian musician from Bermondsey, London',
    category: 'testimonials',
    keywords: ['Brazilian man musician', 'samba performer', 'cultural artist']
  },
  {
    id: 'catarina-lopes',
    name: 'Catarina Lopes',
    description: 'Portuguese educator from Nine Elms, London',
    category: 'testimonials',
    keywords: ['Portuguese mother educator', 'teacher family', 'bilingual education']
  }
];

// Portuguese event image requirements
const portugueseEvents = [
  {
    id: 'feijoada-samba',
    name: 'Brazilian Feijoada & Samba Event',
    description: 'Authentic Brazilian feast with live samba music',
    category: 'events',
    keywords: ['Brazilian feijoada', 'samba music', 'Brazilian community London']
  },
  {
    id: 'football-screening',
    name: 'Portuguese Football Screening',
    description: 'Portuguese football viewing party (Benfica vs Porto)',
    category: 'events',
    keywords: ['Portuguese football fans', 'sports bar', 'Portuguese-speaking community']
  },
  {
    id: 'portuguese-networking',
    name: 'Portuguese Professional Networking',
    description: 'Portuguese-speaking women\'s professional networking',
    category: 'events',
    keywords: ['Portuguese business networking', 'professional women', 'corporate']
  },
  {
    id: 'cape-verde-night',
    name: 'Cape Verdean Cultural Night',
    description: 'Cape Verdean morna music and cachupa evening',
    category: 'events',
    keywords: ['Cape Verde culture', 'morna music', 'Cape Verdean London']
  },
  {
    id: 'mozambican-bbq',
    name: 'Mozambican Seafood BBQ',
    description: 'Mozambican seafood BBQ community gathering',
    category: 'events',
    keywords: ['Mozambican culture', 'seafood BBQ', 'Portuguese-speaking community']
  },
  {
    id: 'portuguese-cinema',
    name: 'Portuguese Cinema Night',
    description: 'Portuguese film screening with wine',
    category: 'events',
    keywords: ['Portuguese cinema', 'cultural film', 'Portuguese heritage']
  }
];

/**
 * Downloads an image from a URL
 * @param {string} url - Image URL
 * @param {string} filepath - Local file path to save
 */
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Optimizes an image according to specifications
 * @param {string} inputPath - Input image path
 * @param {string} outputPath - Output image path
 * @param {Object} specs - Image specifications
 */
async function optimizeImage(inputPath, outputPath, specs) {
  try {
    await sharp(inputPath)
      .resize(specs.width, specs.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: specs.quality })
      .toFile(outputPath);
    
    console.log(`✅ Optimized: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
  }
}

/**
 * Creates directory if it doesn't exist
 * @param {string} dirPath - Directory path
 */
async function ensureDirectory(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

/**
 * Generates placeholder images with Portuguese colors
 * @param {Object} item - Image item configuration
 * @param {string} outputPath - Output file path
 */
async function generatePlaceholder(item, outputPath) {
  const specs = imageSpecs[item.category];
  
  // Create placeholder with Portuguese flag colors
  const placeholder = sharp({
    create: {
      width: specs.width,
      height: specs.height,
      channels: 3,
      background: { r: 0, g: 102, b: 0 } // Portuguese green
    }
  });

  // Add text overlay (simplified for now)
  const svg = `
    <svg width="${specs.width}" height="${specs.height}">
      <rect width="100%" height="100%" fill="rgb(0,102,0)"/>
      <circle cx="${specs.width/2}" cy="${specs.height/2}" r="60" fill="rgb(255,204,0)"/>
      <text x="${specs.width/2}" y="${specs.height/2}" text-anchor="middle" 
            fill="white" font-size="16" font-family="Arial, sans-serif">
        ${item.name}
      </text>
      <text x="${specs.width/2}" y="${specs.height/2 + 20}" text-anchor="middle" 
            fill="white" font-size="12" font-family="Arial, sans-serif">
        Portuguese-speaking community
      </text>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svg))
      .jpeg({ quality: specs.quality })
      .toFile(outputPath);
    
    console.log(`🎨 Generated placeholder: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Failed to generate placeholder for ${item.id}:`, error.message);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🇵🇹 Portuguese-speaking community Image Optimization Script');
  console.log('=================================================');
  
  const publicDir = path.join(__dirname, '../public');
  
  // Ensure directories exist
  await ensureDirectory(path.join(publicDir, 'profiles/testimonials/portuguese'));
  await ensureDirectory(path.join(publicDir, 'profiles/community/portuguese'));
  await ensureDirectory(path.join(publicDir, 'events/portuguese'));
  await ensureDirectory(path.join(publicDir, 'profiles/business/portuguese'));
  
  // Generate placeholder images for testimonials
  console.log('\\n📸 Generating Portuguese testimonial placeholders...');
  for (const testimonial of portugueseTestimonials) {
    const outputPath = path.join(
      publicDir, 
      'profiles/testimonials/portuguese', 
      `${testimonial.id}.jpg`
    );
    
    // Check if image already exists
    try {
      await fs.access(outputPath);
      console.log(`⏭️  Skipping existing: ${testimonial.id}.jpg`);
    } catch {
      await generatePlaceholder(testimonial, outputPath);
    }
  }
  
  // Generate placeholder images for events
  console.log('\\n🎉 Generating Portuguese event placeholders...');
  for (const event of portugueseEvents) {
    const outputPath = path.join(
      publicDir, 
      'events/portuguese', 
      `${event.id}.jpg`
    );
    
    // Check if image already exists
    try {
      await fs.access(outputPath);
      console.log(`⏭️  Skipping existing: ${event.id}.jpg`);
    } catch {
      await generatePlaceholder(event, outputPath);
    }
  }
  
  // Generate search instructions
  console.log('\\n🔍 Image Sourcing Instructions:');
  console.log('================================');
  
  console.log('\\n👥 Portuguese Testimonials:');
  portugueseTestimonials.forEach((testimonial, index) => {
    console.log(`${index + 1}. ${testimonial.name}`);
    console.log(`   📍 ${testimonial.description}`);
    console.log(`   🔎 Keywords: ${testimonial.keywords.join(', ')}`);
    console.log(`   📁 Save as: ${testimonial.id}.jpg\\n`);
  });
  
  console.log('🎊 Portuguese Events:');
  portugueseEvents.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name}`);
    console.log(`   📍 ${event.description}`);
    console.log(`   🔎 Keywords: ${event.keywords.join(', ')}`);
    console.log(`   📁 Save as: ${event.id}.jpg\\n`);
  });
  
  console.log('\\n📋 Next Steps:');
  console.log('===============');
  console.log('1. 🌐 Visit Unsplash, Getty Images, or Adobe Stock');
  console.log('2. 🔍 Search using the keywords provided above');
  console.log('3. 📥 Download high-resolution images (minimum 800x800px)');
  console.log('4. 📂 Place images in the corresponding directories');
  console.log('5. 🏃 Run this script again to optimize: npm run optimize-images');
  console.log('');
  console.log('💡 Pro tip: Look for images with Portuguese flag colors, cultural elements,');
  console.log('   London backgrounds, or authentic Portuguese-speaking community settings.');
  
  console.log('\\n✅ Placeholder generation complete!');
  console.log('🎯 Ready for authentic Portuguese-speaking community images.');
}

// Error handling
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  optimizeImage,
  generatePlaceholder,
  portugueseTestimonials,
  portugueseEvents,
  imageSpecs
};