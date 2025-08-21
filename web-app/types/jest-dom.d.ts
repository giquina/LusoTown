import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveTextContent(text: string | RegExp): R
      toHaveAttribute(attr: string, value?: string | RegExp): R
      toHaveValue(value: string | number | string[]): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeChecked(): R
      toHaveClass(...classNames: string[]): R
      toHaveStyle(style: string | object): R
      toHaveFocus(): R
      toBeValid(): R
      toBeInvalid(): R
      toBeRequired(): R
      toHaveFormValues(expectedValues: Record<string, any>): R
    }
  }
}