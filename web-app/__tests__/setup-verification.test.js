/**
 * Basic test to verify Jest setup is working correctly
 */

describe('LusoTown Testing Framework Setup', () => {
  it('should have Jest configured correctly', () => {
    expect(true).toBe(true)
  })

  it('should have Portuguese test utilities available', () => {
    expect(global.testUtils).toBeDefined()
    expect(global.testUtils.mockPortugueseUser).toBeDefined()
    expect(global.testUtils.mockPortugueseUser.name).toBe('João Silva')
  })

  it('should have localStorage mock available', () => {
    expect(global.localStorage).toBeDefined()
    expect(typeof global.localStorage.setItem).toBe('function')
    expect(typeof global.localStorage.getItem).toBe('function')
  })

  it('should support Portuguese text', () => {
    const portugueseText = 'Bem-vindo à comunidade portuguesa em Londres'
    expect(portugueseText).toContain('à')
    expect(portugueseText).toContain('Bem-vindo')
    expect(portugueseText.length).toBeGreaterThan(0)
  })

  it('should have mobile testing support', () => {
    expect(global.matchMedia).toBeDefined()
    expect(global.IntersectionObserver).toBeDefined()
    expect(global.ResizeObserver).toBeDefined()
  })

  it('should mock Framer Motion correctly', () => {
    const { motion } = require('framer-motion')
    expect(motion.div).toBeDefined()
    expect(typeof motion.div).toBe('function')
  })

  it('should mock react-hot-toast correctly', () => {
    const toast = require('react-hot-toast')
    expect(toast.default.success).toBeDefined()
    expect(typeof toast.default.success).toBe('function')
  })

  it('should support Portuguese event data', () => {
    const event = global.testUtils.mockPortugueseEvent
    expect(event.title).toBe('Noite de Fado')
    expect(event.location).toContain('Portuguese Cultural Centre')
    expect(event.category).toBe('cultural')
  })
})
