import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LanguageProvider } from '@/context/LanguageContext'
import { HeritageProvider } from '@/context/HeritageContext'

function TestComponent() {
  return <div data-testid="test">Hello LusoTown</div>
}

describe('Context Test', () => {
  it('should render with all providers', () => {
    render(
      <LanguageProvider>
        <HeritageProvider>
          <TestComponent />
        </HeritageProvider>
      </LanguageProvider>
    )
    
    expect(screen.getByTestId('test')).toBeInTheDocument()
    expect(screen.getByTestId('test')).toHaveTextContent('Hello LusoTown')
  })
})
