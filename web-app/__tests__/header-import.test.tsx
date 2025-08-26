import React from 'react'

describe('Header Import Test', () => {
  it('should be able to import Header component', async () => {
    try {
      const Header = await import('@/components/Header')
      expect(Header.default).toBeDefined()
    } catch (error) {
      console.error('Header import error:', error)
      throw error
    }
  })
})
