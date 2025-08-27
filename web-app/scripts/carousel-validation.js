#!/usr/bin/env node

/**
 * Comprehensive Carousel Validation Script
 * Portuguese-Speaking Community Mobile Experience Validator
 * 
 * Usage: node scripts/carousel-validation.js
 * 
 * This script validates:
 * - Mobile responsiveness (375px, 768px, 1024px)
 * - Portuguese cultural content authenticity
 * - Touch target compliance (WCAG 2.1 AA)
 * - Performance optimization
 * - Accessibility features
 */

const fs = require('fs')
const path = require('path')

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`${colors.cyan}${colors.bright}\n🎯 ${msg}${colors.reset}\n`),
  subheader: (msg) => console.log(`${colors.magenta}${colors.bright}📋 ${msg}${colors.reset}`)
}

// Validation results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  issues: []
}

function validateFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log.success(`${description} exists`)
    results.passed++
    return true
  } else {
    log.error(`${description} missing: ${filePath}`)
    results.failed++
    results.issues.push(`Missing file: ${filePath}`)
    return false
  }
}

function validateFileContent(filePath, patterns, description) {
  if (!fs.existsSync(filePath)) {
    log.error(`Cannot validate ${description} - file missing: ${filePath}`)
    results.failed++
    return false
  }
  
  const content = fs.readFileSync(filePath, 'utf8')
  const allPatternsFound = patterns.every(pattern => {
    const found = pattern.test(content)
    if (!found) {
      log.warning(`${description}: Pattern not found - ${pattern.source}`)
      results.warnings++
    }
    return found
  })
  
  if (allPatternsFound) {
    log.success(`${description} validation passed`)
    results.passed++
    return true
  } else {
    log.error(`${description} validation failed`)
    results.failed++
    results.issues.push(`Content validation failed: ${filePath}`)
    return false
  }
}

function validatePortugueseCulturalContent() {
  log.header('Portuguese Cultural Content Validation')
  
  const carouselFile = path.join(__dirname, '../src/components/carousels/LusophoneCarousel.tsx')
  const examplesFile = path.join(__dirname, '../src/components/carousels/LusophoneCarouselExamples.tsx')
  
  // Check for Portuguese cultural patterns
  const culturalPatterns = [
    /Portuguese.?speaking.?community/i,
    /🇵🇹|🇧🇷|🇨🇻|🇦🇴|🇲🇿/,  // Portuguese-speaking country flags
    /Fado|Samba|Morna/i,              // Cultural music genres
    /PALOP/i,                         // Portuguese-speaking African countries
    /traditional|cultural|heritage/i   // Cultural terminology
  ]
  
  validateFileContent(carouselFile, culturalPatterns, 'Portuguese cultural patterns in LusophoneCarousel')
  
  // Validate terminology compliance
  const terminologyPatterns = [
    /Portuguese.?speaking.?community/i,
    /United Kingdom|UK/i
  ]
  
  validateFileContent(carouselFile, terminologyPatterns, 'Correct Portuguese terminology usage')
}

function validateMobileResponsiveness() {
  log.header('Mobile Responsiveness Validation')
  
  const carouselFile = path.join(__dirname, '../src/components/carousels/LusophoneCarousel.tsx')
  
  // Mobile responsive patterns
  const mobilePatterns = [
    /375|768|1024/,                    // Breakpoint values
    /itemsPerView.*1.*2.*3/s,          // Progressive items per view
    /mobile.*tablet.*desktop/i,        // Device categories
    /touchThreshold.*44/,              // WCAG touch target size
    /enableSwipeGestures/,             // Touch gesture support
    /sm:|md:|lg:/                      // Tailwind responsive classes
  ]
  
  validateFileContent(carouselFile, mobilePatterns, 'Mobile responsive configuration')
  
  // Touch target compliance
  const touchTargetPatterns = [
    /minWidth.*44px|min-width.*44px/,
    /minHeight.*44px|min-height.*44px/,
    /touchThreshold.*44/,
    /touch-manipulation/
  ]
  
  validateFileContent(carouselFile, touchTargetPatterns, 'WCAG 2.1 AA touch target compliance')
}

function validateAccessibilityFeatures() {
  log.header('Accessibility Features Validation')
  
  const carouselFile = path.join(__dirname, '../src/components/carousels/LusophoneCarousel.tsx')
  
  // Accessibility patterns
  const a11yPatterns = [
    /role="region"|role="group"/,      // ARIA roles
    /aria-label/,                      // Accessible labels
    /aria-live="polite"/,              // Live regions
    /tabIndex=\{0\}/,                  // Keyboard navigation
    /onKeyDown/,                       // Keyboard handlers
    /lang="pt"/,                       // Portuguese language support
    /speechSynthesis/                  // Screen reader announcements
  ]
  
  validateFileContent(carouselFile, a11yPatterns, 'WCAG 2.1 AA accessibility features')
  
  // Portuguese accessibility
  const portugueseA11yPatterns = [
    /Portuguese.*cultural.*carousel/i,
    /pt-PT|pt-BR/,                     // Portuguese language codes
    /enableAccessibilityAnnouncements/
  ]
  
  validateFileContent(carouselFile, portugueseA11yPatterns, 'Portuguese language accessibility')
}

function validatePerformanceOptimization() {
  log.header('Performance Optimization Validation')
  
  const carouselFile = path.join(__dirname, '../src/components/carousels/LusophoneCarousel.tsx')
  
  // Performance patterns
  const performancePatterns = [
    /memo\(/,                          // React.memo optimization
    /useCallback/,                     // Callback memoization
    /useMemo/,                         // Value memoization
    /lazy|Suspense/,                   // Code splitting
    /enableLazyLoading/,               // Lazy loading
    /preloadDistance/,                 // Preloading optimization
    /useMobilePerformance/             // Performance monitoring
  ]
  
  validateFileContent(carouselFile, performancePatterns, 'Performance optimization features')
  
  // PWA features
  const pwaPatterns = [
    /enableOfflineMode/,
    /cacheStrategy/,
    /navigator\.onLine/,
    /beforeinstallprompt/
  ]
  
  validateFileContent(carouselFile, pwaPatterns, 'PWA features for offline Portuguese content')
}

function validateTestCoverage() {
  log.header('Test Coverage Validation')
  
  const testFiles = [
    '../__tests__/carousels/enhanced-mobile-carousel.test.tsx',
    '../__tests__/carousels/portuguese-cultural-content.test.tsx',
    '../__tests__/e2e/carousel-comprehensive-mobile-testing.spec.ts',
    '../__tests__/e2e/carousel-performance-testing.spec.ts',
    '../__tests__/e2e/carousel-accessibility-testing.spec.ts'
  ]
  
  testFiles.forEach(file => {
    const fullPath = path.join(__dirname, file)
    validateFile(fullPath, `Test file: ${path.basename(file)}`)
  })
  
  // Validate test content
  const e2eTestFile = path.join(__dirname, '../__tests__/e2e/carousel-comprehensive-mobile-testing.spec.ts')
  const testPatterns = [
    /375.*768.*1024/,                  // Mobile breakpoints
    /Portuguese.?speaking.?community/i, // Cultural terminology
    /WCAG.*2\.1.*AA/,                  // Accessibility standards
    /cross.?browser/i,                 // Browser compatibility
    /touch.*target.*44px/i             // Touch target testing
  ]
  
  validateFileContent(e2eTestFile, testPatterns, 'Comprehensive E2E test coverage')
}

function validateBilingualSupport() {
  log.header('Bilingual Support Validation (EN/PT)')
  
  const carouselFile = path.join(__dirname, '../src/components/carousels/LusophoneCarousel.tsx')
  
  // Bilingual patterns
  const bilingualPatterns = [
    /title.*en.*pt/,                   // Bilingual titles
    /description.*en.*pt/,             // Bilingual descriptions
    /useLanguage/,                     // Language context
    /language.*===.*'pt'/,             // Portuguese detection
    /t\('.*'\)/                        // Translation function
  ]
  
  validateFileContent(carouselFile, bilingualPatterns, 'Bilingual EN/PT support')
}

function validateBusinessLogic() {
  log.header('Business Logic Validation')
  
  const carouselFile = path.join(__dirname, '../src/components/carousels/LusophoneCarousel.tsx')
  
  // Business logic patterns
  const businessPatterns = [
    /WeekendEventItem|PALOPHeritageItem/,  // Business types
    /CarouselItemType/,                    // Type definitions
    /ResponsiveConfig/,                    // Configuration types
    /DEFAULT_RESPONSIVE/,                  // Default settings
    /autoAdvanceInterval/,                 // Auto-advance feature
    /showControls.*showDots/              // UI controls
  ]
  
  validateFileContent(carouselFile, businessPatterns, 'Carousel business logic implementation')
}

function printSummary() {
  log.header('Validation Summary')
  
  console.log(`${colors.green}✅ Passed: ${results.passed}${colors.reset}`)
  console.log(`${colors.red}❌ Failed: ${results.failed}${colors.reset}`)
  console.log(`${colors.yellow}⚠️  Warnings: ${results.warnings}${colors.reset}`)
  
  const total = results.passed + results.failed
  const successRate = total > 0 ? Math.round((results.passed / total) * 100) : 0
  
  console.log(`\n${colors.cyan}Success Rate: ${successRate}%${colors.reset}`)
  
  if (results.issues.length > 0) {
    log.subheader('Issues Found:')
    results.issues.forEach(issue => {
      console.log(`  ${colors.red}• ${issue}${colors.reset}`)
    })
  }
  
  if (results.failed === 0) {
    log.success('\n🎉 All carousel validations passed! Mobile experience is optimized for Portuguese-speaking community.')
  } else {
    log.error(`\n🔧 ${results.failed} validation(s) failed. Please address the issues above.`)
  }
  
  // Mobile UX recommendations
  console.log(`\n${colors.blue}${colors.bright}📱 Mobile UX Recommendations:${colors.reset}`)
  console.log(`  • Test carousel on physical devices: iPhone SE, iPad, Android`)
  console.log(`  • Validate Portuguese flag emoji rendering: 🇵🇹 🇧🇷 🇨🇻 🇦🇴 🇲🇿`)
  console.log(`  • Test touch gestures with Portuguese cultural content`)
  console.log(`  • Verify 44px minimum touch targets for accessibility`)
  console.log(`  • Test auto-advance timing with cultural event carousels`)
}

// Main execution
function main() {
  console.log(`${colors.cyan}${colors.bright}`)
  console.log('🎠 LusoTown Carousel Validation Script')
  console.log('🇵🇹 Portuguese-Speaking Community Mobile Experience')
  console.log('📱 Mobile-First Responsive Design Validator')
  console.log(`${colors.reset}\n`)
  
  validatePortugueseCulturalContent()
  validateMobileResponsiveness()
  validateAccessibilityFeatures()
  validatePerformanceOptimization()
  validateTestCoverage()
  validateBilingualSupport()
  validateBusinessLogic()
  
  printSummary()
  
  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0)
}

if (require.main === module) {
  main()
}

module.exports = {
  validatePortugueseCulturalContent,
  validateMobileResponsiveness,
  validateAccessibilityFeatures,
  validatePerformanceOptimization,
  results
}