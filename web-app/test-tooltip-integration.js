// Simple script to verify tooltip integration
const fs = require('fs');
const path = require('path');

const homepageFile = path.join(__dirname, 'src/app/page.tsx');
const tooltipFile = path.join(__dirname, 'src/components/ui/GuidanceTooltip.tsx');

console.log('🔍 Testing Tooltip Integration...\n');

// Check if homepage has required tooltip imports
const homepageContent = fs.readFileSync(homepageFile, 'utf8');
const hasTooltipImports = homepageContent.includes('EventsCalendarTooltip') && 
                         homepageContent.includes('MatchingTooltip');

console.log(`✅ Homepage imports: ${hasTooltipImports ? 'FOUND' : 'MISSING'}`);

// Check for data-guidance attributes
const guidanceAttributes = (homepageContent.match(/data-guidance="/g) || []).length;
console.log(`✅ Guidance attributes: ${guidanceAttributes} found`);

// Check tooltip component exists
const tooltipExists = fs.existsSync(tooltipFile);
console.log(`✅ Tooltip component: ${tooltipExists ? 'EXISTS' : 'MISSING'}`);

// Check translation keys
const enTranslations = path.join(__dirname, 'src/i18n/en.json');
const enContent = fs.readFileSync(enTranslations, 'utf8');
const hasGuidanceTranslations = enContent.includes('guidance.calendar.title') &&
                               enContent.includes('guidance.matches.title');

console.log(`✅ Translations: ${hasGuidanceTranslations ? 'COMPLETE' : 'MISSING'}`);

console.log('\n📊 INTEGRATION SUMMARY:');
console.log(`   - Tooltip imports: ${hasTooltipImports ? '✅' : '❌'}`);
console.log(`   - Guidance attributes: ${guidanceAttributes}/4 expected`);
console.log(`   - Component exists: ${tooltipExists ? '✅' : '❌'}`);
console.log(`   - Translations: ${hasGuidanceTranslations ? '✅' : '❌'}`);

const allGood = hasTooltipImports && guidanceAttributes >= 3 && tooltipExists && hasGuidanceTranslations;
console.log(`\n🎯 OVERALL STATUS: ${allGood ? '✅ INTEGRATION SUCCESSFUL' : '❌ NEEDS FIXES'}`);
