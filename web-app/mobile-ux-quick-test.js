#!/usr/bin/env node
/**
 * Quick Mobile UX Test for LusoTown
 * Tests critical mobile UX issues that were fixed
 */

const fs = require('fs');
const path = require('path');

console.log('🇵🇹 LusoTown Mobile UX Quick Test\n');

// Test 1: Check touch target sizes in key files
function checkTouchTargets() {
  console.log('✅ Testing Touch Targets (≥44px)...');
  
  const filesToCheck = [
    'src/components/Header.tsx',
    'src/components/MobileWelcomeWizard.tsx',
    'src/components/LuxuryMobileInteraction.tsx'
  ];

  let allPassed = true;

  filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for 44px minimum touch targets
      const has44pxTargets = content.includes('min-h-[44px]') || content.includes('min-w-[44px]') || content.includes('min-h-[48px]');
      const hasSmallTargets = content.includes('w-5 h-5') && !content.includes('min-w-[44px]');
      
      if (has44pxTargets && !hasSmallTargets) {
        console.log(`  ✅ ${file}: Touch targets fixed`);
      } else {
        console.log(`  ❌ ${file}: Touch targets need fixing`);
        allPassed = false;
      }
    } else {
      console.log(`  ⚠️  ${file}: File not found`);
    }
  });

  return allPassed;
}

// Test 2: Check horizontal scroll prevention
function checkHorizontalScrollPrevention() {
  console.log('\n✅ Testing Horizontal Scroll Prevention...');
  
  const cssFiles = [
    'src/app/globals.css',
    'src/styles/hero-mobile-enhancements.css'
  ];

  let hasPreventionCode = false;

  cssFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes('overflow-x: hidden') || content.includes('max-width: 100vw')) {
        console.log(`  ✅ ${file}: Horizontal scroll prevention present`);
        hasPreventionCode = true;
      }
    }
  });

  if (!hasPreventionCode) {
    console.log('  ❌ No horizontal scroll prevention found');
  }

  return hasPreventionCode;
}

// Test 3: Check modal blocking prevention
function checkModalBlocking() {
  console.log('\n✅ Testing Modal Blocking Prevention...');
  
  const pageFile = path.join(__dirname, 'src/app/page.tsx');
  if (fs.existsSync(pageFile)) {
    const content = fs.readFileSync(pageFile, 'utf8');
    
    // Check if welcome wizard delay is increased (less aggressive)
    const hasLongerDelay = content.includes('10000') || content.includes('5000');
    const hasShortDelay = content.includes('2000');
    
    if (hasLongerDelay && !hasShortDelay) {
      console.log('  ✅ Welcome wizard delay increased (less blocking)');
      return true;
    } else {
      console.log('  ❌ Welcome wizard still too aggressive');
      return false;
    }
  }
  
  console.log('  ⚠️  Page file not found');
  return false;
}

// Test 4: Check performance optimizations
function checkPerformanceOptimizations() {
  console.log('\n✅ Testing Performance Optimizations...');
  
  const pageFile = path.join(__dirname, 'src/app/page.tsx');
  if (fs.existsSync(pageFile)) {
    const content = fs.readFileSync(pageFile, 'utf8');
    
    // Check for SSR disabled on heavy components
    const ssrDisabledCount = (content.match(/ssr: false/g) || []).length;
    const dynamicImportsCount = (content.match(/dynamic\(/g) || []).length;
    
    console.log(`  📊 Dynamic imports: ${dynamicImportsCount}`);
    console.log(`  📊 SSR disabled components: ${ssrDisabledCount}`);
    
    if (ssrDisabledCount >= 5 && dynamicImportsCount >= 10) {
      console.log('  ✅ Good performance optimization');
      return true;
    } else {
      console.log('  ⚠️  Could use more performance optimization');
      return false;
    }
  }
  
  return false;
}

// Run all tests
console.log('Running Mobile UX Tests for Portuguese-speaking Community...\n');

const touchTargetsPass = checkTouchTargets();
const horizontalScrollPass = checkHorizontalScrollPrevention();
const modalBlockingPass = checkModalBlocking();
const performancePass = checkPerformanceOptimizations();

console.log('\n📊 Test Results Summary:');
console.log(`Touch Targets (44px+): ${touchTargetsPass ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Horizontal Scroll: ${horizontalScrollPass ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Modal Blocking: ${modalBlockingPass ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Performance: ${performancePass ? '✅ PASS' : '⚠️  NEEDS WORK'}`);

const totalScore = [touchTargetsPass, horizontalScrollPass, modalBlockingPass, performancePass].filter(Boolean).length;
const maxScore = 4;

console.log(`\n🎯 Overall Score: ${totalScore}/${maxScore} (${Math.round(totalScore/maxScore * 100)}%)`);

if (totalScore === maxScore) {
  console.log('🎉 Excellent! Mobile UX significantly improved for Portuguese-speaking community');
} else if (totalScore >= 3) {
  console.log('👍 Good progress! Mobile UX improvements implemented');
} else {
  console.log('⚠️  More work needed on mobile UX');
}

console.log('\n🇵🇹 Portuguese Community Mobile Experience Priority:');
console.log('- 375px (iPhone SE) compatibility: Critical');
console.log('- Touch targets ≥44px: Critical');
console.log('- Load time <3s on mobile: High');
console.log('- No horizontal scroll: Critical');
console.log('- Modal accessibility: High');