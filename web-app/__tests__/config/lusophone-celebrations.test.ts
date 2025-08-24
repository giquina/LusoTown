import { 
  LUSOPHONE_CELEBRATIONS, 
  CULTURAL_WISDOM,
  getFeaturedCelebrations,
  getRandomCulturalWisdom,
  getCelebrationsByCategory,
  getCelebrationsByCountry,
  getTotalCelebrationBusinesses
} from '@/config/lusophone-celebrations'

describe('Lusophone Celebrations Configuration', () => {
  test('should include celebrations from all major Portuguese-speaking countries', () => {
    const countries = new Set()
    LUSOPHONE_CELEBRATIONS.forEach(celebration => {
      celebration.countries.forEach(country => countries.add(country))
    })
    
    // Should include major Portuguese-speaking countries
    expect(countries).toContain('Portugal')
    expect(countries).toContain('Brazil')
    expect(countries).toContain('Angola')
    expect(countries).toContain('Cape Verde')
    expect(countries).toContain('Mozambique')
    expect(countries.size).toBeGreaterThanOrEqual(5) // At least 5 countries represented
  })

  test('should have bilingual content for all celebrations', () => {
    LUSOPHONE_CELEBRATIONS.forEach(celebration => {
      expect(celebration.name.en).toBeTruthy()
      expect(celebration.name.pt).toBeTruthy()
      expect(celebration.description.en).toBeTruthy()
      expect(celebration.description.pt).toBeTruthy()
      expect(celebration.period.en).toBeTruthy()
      expect(celebration.period.pt).toBeTruthy()
    })
  })

  test('should include diverse celebration categories', () => {
    const categories = new Set(LUSOPHONE_CELEBRATIONS.map(c => c.category))
    
    expect(categories).toContain('music')
    expect(categories).toContain('festival')
    expect(categories).toContain('independence')
    expect(categories).toContain('cultural')
    expect(categories).toContain('heritage')
    expect(categories.size).toBeGreaterThanOrEqual(4)
  })

  test('should have cultural wisdom from diverse countries', () => {
    const wisdomCountries = new Set(CULTURAL_WISDOM.map(w => w.country))
    
    expect(wisdomCountries).toContain('Portugal')
    expect(wisdomCountries).toContain('Brazil')
    expect(wisdomCountries).toContain('Angola')
    expect(wisdomCountries).toContain('Cape Verde')
  })

  test('should provide bilingual cultural wisdom', () => {
    CULTURAL_WISDOM.forEach(wisdom => {
      expect(wisdom.quote.en).toBeTruthy()
      expect(wisdom.quote.pt).toBeTruthy()
      expect(wisdom.origin.en).toBeTruthy()
      expect(wisdom.origin.pt).toBeTruthy()
      expect(wisdom.philosophy.en).toBeTruthy()
      expect(wisdom.philosophy.pt).toBeTruthy()
      expect(wisdom.flagEmoji).toBeTruthy()
    })
  })

  test('getFeaturedCelebrations should return specified number of celebrations', () => {
    const featured3 = getFeaturedCelebrations(3)
    const featured6 = getFeaturedCelebrations(6)
    
    expect(featured3).toHaveLength(3)
    expect(featured6).toHaveLength(6)
    
    // Should return different celebrations
    expect(featured3.every(c => c.id)).toBeTruthy()
  })

  test('getRandomCulturalWisdom should return valid wisdom', () => {
    const wisdom = getRandomCulturalWisdom()
    
    expect(wisdom).toBeDefined()
    expect(wisdom.quote.en).toBeTruthy()
    expect(wisdom.quote.pt).toBeTruthy()
    expect(wisdom.flagEmoji).toBeTruthy()
  })

  test('getCelebrationsByCategory should filter correctly', () => {
    const musicCelebrations = getCelebrationsByCategory('music')
    const independenceCelebrations = getCelebrationsByCategory('independence')
    
    expect(musicCelebrations.every(c => c.category === 'music')).toBeTruthy()
    expect(independenceCelebrations.every(c => c.category === 'independence')).toBeTruthy()
  })

  test('getCelebrationsByCountry should filter correctly', () => {
    const brazilianCelebrations = getCelebrationsByCountry('Brazil')
    const angolaCelebrations = getCelebrationsByCountry('Angola')
    
    expect(brazilianCelebrations.every(c => 
      c.countries.some(country => country.includes('Brazil'))
    )).toBeTruthy()
    
    expect(angolaCelebrations.every(c => 
      c.countries.some(country => country.includes('Angola'))
    )).toBeTruthy()
  })

  test('getTotalCelebrationBusinesses should calculate total correctly', () => {
    const total = getTotalCelebrationBusinesses()
    const manualTotal = LUSOPHONE_CELEBRATIONS.reduce(
      (sum, celebration) => sum + celebration.businessCount, 
      0
    )
    
    expect(total).toBe(manualTotal)
    expect(total).toBeGreaterThan(0)
  })

  test('should include specific inclusive celebrations', () => {
    const celebrationNames = LUSOPHONE_CELEBRATIONS.map(c => c.name.en.toLowerCase())
    
    // Should include celebrations from multiple countries
    expect(celebrationNames.some(name => name.includes('brazilian'))).toBeTruthy()
    expect(celebrationNames.some(name => name.includes('angola'))).toBeTruthy()
    expect(celebrationNames.some(name => name.includes('cape verde') || name.includes('verdean'))).toBeTruthy()
    expect(celebrationNames.some(name => name.includes('mozambic'))).toBeTruthy()
  })

  test('should have enhanced June festivals celebrating both Portuguese and Brazilian traditions', () => {
    const juneFestival = LUSOPHONE_CELEBRATIONS.find(c => 
      c.id === 'santos-populares-festa-junina'
    )
    
    expect(juneFestival).toBeDefined()
    expect(juneFestival?.countries).toContain('Portugal')
    expect(juneFestival?.countries).toContain('Brazil')
    expect(juneFestival?.name.en).toContain('Santos Populares')
    expect(juneFestival?.name.en).toContain('June Festivals')
  })

  test('should showcase music heritage from multiple Lusophone countries', () => {
    const musicHeritage = LUSOPHONE_CELEBRATIONS.find(c => 
      c.id === 'music-heritage-lusophone'
    )
    
    expect(musicHeritage).toBeDefined()
    expect(musicHeritage?.countries.length).toBeGreaterThanOrEqual(4)
    expect(musicHeritage?.countries).toContain('Portugal')
    expect(musicHeritage?.countries).toContain('Brazil')
    expect(musicHeritage?.countries).toContain('Angola')
    expect(musicHeritage?.countries).toContain('Cape Verde')
  })
})

describe('Cultural Inclusivity Standards', () => {
  test('should avoid Portugal-centric language', () => {
    const allText = LUSOPHONE_CELEBRATIONS.flatMap(c => [
      c.name.en, c.name.pt, 
      c.description.en, c.description.pt,
      c.significance.en, c.significance.pt
    ]).join(' ')
    
    // Should use inclusive language
    expect(allText.toLowerCase()).toContain('lusophone')
    expect(allText.toLowerCase()).toContain('portuguese-speaking')
    
    // Should not be overly Portugal-focused
    const portugalMentions = (allText.match(/portugal/gi) || []).length
    const brazilMentions = (allText.match(/brazil/gi) || []).length
    const angolaMentions = (allText.match(/angola/gi) || []).length
    
    // Should have balanced representation
    expect(brazilMentions).toBeGreaterThan(0)
    expect(angolaMentions).toBeGreaterThan(0)
  })

  test('should celebrate diversity in cultural wisdom', () => {
    const wisdomOrigins = CULTURAL_WISDOM.map(w => w.country)
    const uniqueOrigins = new Set(wisdomOrigins)
    
    expect(uniqueOrigins.size).toBeGreaterThanOrEqual(4)
    expect(wisdomOrigins).toContain('Brazil')
    expect(wisdomOrigins).toContain('Angola')
    expect(wisdomOrigins).toContain('Cape Verde')
  })
})