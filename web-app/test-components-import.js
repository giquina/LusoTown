// Test script to check if our new components can be imported
const fs = require('fs');
const path = require('path');

console.log('Testing component imports...\n');

// List of components to test
const componentsToTest = [
  'StreamlinedCommunitySelectorNew',
  'MentorshipProgramsSectionNew', 
  'ConversationsListNew',
  'NetworkHeaderNew',
  'NetworkBadgesNew',
  'ConnectionNotificationBannerNew'
];

componentsToTest.forEach(component => {
  const filePath = path.join(__dirname, 'src/components', `${component}.tsx`);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has export default
    if (content.includes('export default')) {
      console.log(`✅ ${component}: File exists and has export default`);
    } else {
      console.log(`❌ ${component}: File exists but missing export default`);
    }
    
    // Check if file has proper React structure
    if (content.includes('useLanguage') && content.includes('brandColors')) {
      console.log(`   └── Has Portuguese community features`);
    }
    
    // Check file size
    const stats = fs.statSync(filePath);
    console.log(`   └── File size: ${Math.round(stats.size / 1024)}KB`);
    
  } else {
    console.log(`❌ ${component}: File does not exist`);
  }
  
  console.log('');
});

console.log('Component import test completed!');

// Test index file
const indexPath = path.join(__dirname, 'src/components', 'index-new.ts');
if (fs.existsSync(indexPath)) {
  console.log('✅ New index file exists');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  componentsToTest.forEach(component => {
    if (indexContent.includes(component)) {
      console.log(`   ✅ ${component} is exported in index`);
    } else {
      console.log(`   ❌ ${component} is NOT exported in index`);
    }
  });
} else {
  console.log('❌ New index file does not exist');
}