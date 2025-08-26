// Comprehensive Navigation Testing Script
// Run this in browser console to test navigation functionality

console.log('🚀 Starting LusoTown Navigation Testing...');

// Test 1: Desktop Navigation Testing
function testDesktopNavigation() {
  console.log('\n📊 DESKTOP NAVIGATION TESTING');
  
  // Check if we're on desktop viewport
  if (window.innerWidth < 1024) {
    console.log('⚠️  Skipping desktop tests - viewport too small');
    return;
  }
  
  // Test Community dropdown
  const communityDropdown = document.querySelector('[data-dropdown="community"]') || 
                           document.querySelector('.dropdown-container:has(button:contains("Community"))') ||
                           document.querySelector('button:contains("Community")');
  
  if (communityDropdown) {
    console.log('✅ Community dropdown button found');
    // Simulate hover to test dropdown visibility
    communityDropdown.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    setTimeout(() => {
      const dropdown = document.querySelector('[class*="dropdown"]');
      if (dropdown && getComputedStyle(dropdown).opacity > 0) {
        console.log('✅ Community dropdown appears on hover');
      } else {
        console.log('❌ Community dropdown not visible on hover');
      }
    }, 100);
  } else {
    console.log('❌ Community dropdown button not found');
  }
  
  // Test For Business dropdown
  const businessDropdown = document.querySelector('button:contains("For Business")');
  if (businessDropdown) {
    console.log('✅ For Business dropdown button found');
    businessDropdown.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    setTimeout(() => {
      const dropdown = document.querySelector('[class*="dropdown"]');
      if (dropdown && getComputedStyle(dropdown).opacity > 0) {
        console.log('✅ For Business dropdown appears on hover');
      } else {
        console.log('❌ For Business dropdown not visible on hover');
      }
    }, 100);
  } else {
    console.log('❌ For Business dropdown button not found');
  }
  
  // Test z-index layering
  const header = document.querySelector('header');
  if (header) {
    const headerZIndex = parseInt(getComputedStyle(header).zIndex);
    console.log(`📐 Header z-index: ${headerZIndex} (should be 9999)`);
    if (headerZIndex >= 9999) {
      console.log('✅ Header z-index is properly set');
    } else {
      console.log('❌ Header z-index may be too low');
    }
  }
}

// Test 2: Mobile Navigation Testing  
function testMobileNavigation() {
  console.log('\n📱 MOBILE NAVIGATION TESTING');
  
  // Find mobile menu button
  const mobileMenuButton = document.querySelector('[data-testid="mobile-menu-button"]') ||
                          document.querySelector('button:has(.Bars3Icon)') ||
                          document.querySelector('button[aria-label*="menu"]');
  
  if (mobileMenuButton) {
    console.log('✅ Mobile menu button found');
    
    // Test button size (should be 56px for touch)
    const rect = mobileMenuButton.getBoundingClientRect();
    if (rect.width >= 44 && rect.height >= 44) {
      console.log('✅ Mobile menu button has adequate touch target size');
    } else {
      console.log('❌ Mobile menu button touch target too small');
    }
    
    // Test click functionality
    const originalDisplay = getComputedStyle(document.body).overflow;
    mobileMenuButton.click();
    
    setTimeout(() => {
      const mobileMenu = document.querySelector('[class*="mobile"]') ||
                        document.querySelector('[class*="backdrop"]') ||
                        document.querySelector('[role="dialog"]');
      
      if (mobileMenu && getComputedStyle(mobileMenu).opacity > 0) {
        console.log('✅ Mobile menu opens on click');
        
        // Test backdrop click to close
        const backdrop = document.querySelector('[class*="backdrop"]');
        if (backdrop) {
          backdrop.click();
          setTimeout(() => {
            if (getComputedStyle(mobileMenu).opacity == 0) {
              console.log('✅ Mobile menu closes on backdrop click');
            } else {
              console.log('❌ Mobile menu does not close on backdrop click');
            }
          }, 300);
        }
      } else {
        console.log('❌ Mobile menu does not appear on click');
      }
    }, 200);
  } else {
    console.log('❌ Mobile menu button not found');
  }
}

// Test 3: SSR Testing
function testSSRRendering() {
  console.log('\n🏗️ SSR RENDERING TESTING');
  
  // Check if critical elements are present immediately
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  const logo = document.querySelector('[class*="logo"]') || document.querySelector('a[href="/"]');
  
  if (header) {
    console.log('✅ Header element rendered');
  } else {
    console.log('❌ Header element missing');
  }
  
  if (nav) {
    console.log('✅ Navigation element rendered');
  } else {
    console.log('❌ Navigation element missing');
  }
  
  if (logo) {
    console.log('✅ Logo element rendered');
  } else {
    console.log('❌ Logo element missing');
  }
  
  // Check for hydration errors in console
  const performanceEntries = performance.getEntriesByType('navigation');
  if (performanceEntries.length > 0) {
    const loadTime = performanceEntries[0].loadEventEnd - performanceEntries[0].navigationStart;
    console.log(`⏱️ Page load time: ${loadTime}ms`);
    if (loadTime < 2000) {
      console.log('✅ Page loads quickly (good SSR)');
    } else {
      console.log('⚠️ Page load time could be improved');
    }
  }
}

// Test 4: Portuguese Cultural Context
function testPortugueseCulturalContext() {
  console.log('\n🇵🇹 PORTUGUESE CULTURAL CONTEXT TESTING');
  
  // Check for Portuguese-specific styling
  const primaryColors = getComputedStyle(document.documentElement).getPropertyValue('--primary-500');
  if (primaryColors && primaryColors.includes('197')) { // Portuguese red: rgb(197, 40, 47)
    console.log('✅ Portuguese cultural colors detected');
  } else {
    console.log('⚠️ Portuguese cultural colors may not be applied');
  }
  
  // Check for bilingual content
  const languageToggle = document.querySelector('[class*="language"]') ||
                        document.querySelector('button:contains("PT")') ||
                        document.querySelector('button:contains("EN")');
  
  if (languageToggle) {
    console.log('✅ Language toggle found');
  } else {
    console.log('❌ Language toggle not found');
  }
  
  // Check for Portuguese-speaking community references
  const bodyText = document.body.innerText.toLowerCase();
  if (bodyText.includes('portuguese-speaking') || bodyText.includes('lusophone')) {
    console.log('✅ Portuguese-speaking community terminology used correctly');
  } else if (bodyText.includes('portuguese community')) {
    console.log('⚠️ Should use "Portuguese-speaking community" instead of "Portuguese community"');
  }
}

// Test 5: Responsive Breakpoints
function testResponsiveBreakpoints() {
  console.log('\n📐 RESPONSIVE BREAKPOINTS TESTING');
  
  const breakpoints = [
    { width: 375, name: 'Mobile' },
    { width: 768, name: 'Tablet' },
    { width: 1024, name: 'Desktop' }
  ];
  
  breakpoints.forEach(bp => {
    // Simulate viewport size (note: this won't actually resize the browser)
    console.log(`📱 Testing ${bp.name} breakpoint (${bp.width}px)`);
    
    if (window.innerWidth >= bp.width) {
      console.log(`✅ Current viewport (${window.innerWidth}px) supports ${bp.name} breakpoint`);
    } else {
      console.log(`ℹ️ Current viewport (${window.innerWidth}px) is smaller than ${bp.name} breakpoint`);
    }
  });
  
  // Test mobile-first design
  if (window.innerWidth < 768) {
    const mobileElements = document.querySelectorAll('[class*="mobile"]');
    if (mobileElements.length > 0) {
      console.log('✅ Mobile-specific elements detected');
    }
  }
}

// Run all tests
async function runAllNavigationTests() {
  console.log('🧪 COMPREHENSIVE NAVIGATION TESTING SUITE');
  console.log('==========================================');
  
  testDesktopNavigation();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  testMobileNavigation();  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  testSSRRendering();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  testPortugueseCulturalContext();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  testResponsiveBreakpoints();
  
  console.log('\n🎯 NAVIGATION TESTING COMPLETE');
  console.log('Check results above for any ❌ failures that need attention');
}

// Auto-run the tests
runAllNavigationTests();
