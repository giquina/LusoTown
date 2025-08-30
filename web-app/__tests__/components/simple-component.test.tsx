/**
 * Simple Component Test
 * Tests basic Portuguese community component rendering
 */
import React from 'react'
import { render, screen } from '../utils/test-utils'
import { portugueseTestUtils } from '../utils/test-utils'

// Simple test component
const SimplePortugueseComponent = ({ language = 'en' }) => {
  return (
    <div>
      <h1>{language === 'pt' ? 'Bem-vindo ao LusoTown' : 'Welcome to LusoTown'}</h1>
      <p>{language === 'pt' ? 'Comunidade Portuguesa' : 'Portuguese Community'}</p>
    </div>
  )
}

describe('Simple Portuguese Component', () => {
  it('should render English content by default', () => {
    render(<SimplePortugueseComponent />)
    
    expect(screen.getByText('Welcome to LusoTown')).toBeInTheDocument()
    expect(screen.getByText('Portuguese Community')).toBeInTheDocument()
  })

  it('should render Portuguese content when language is pt', () => {
    render(<SimplePortugueseComponent language="pt" />, { initialLanguage: 'pt' })
    
    expect(screen.getByText('Bem-vindo ao LusoTown')).toBeInTheDocument()
    expect(screen.getByText('Comunidade Portuguesa')).toBeInTheDocument()
  })

  it('should use Portuguese test utilities correctly', () => {
    const { mockPortugueseUser, mockPortugueseEvent } = portugueseTestUtils
    
    expect(mockPortugueseUser.name).toBe('João Silva')
    expect(mockPortugueseUser.language).toBe('pt')
    expect(mockPortugueseEvent.title).toBe('Noite de Fado')
  })

  it('should render with mock providers', () => {
    render(<SimplePortugueseComponent />, { 
      initialLanguage: 'en',
      mockUser: portugueseTestUtils.mockPortugueseUser 
    })
    
    // Should find language provider in the tree
    expect(screen.getByTestId('language-provider')).toBeInTheDocument()
    expect(screen.getByTestId('heritage-provider')).toBeInTheDocument()
  })
})
