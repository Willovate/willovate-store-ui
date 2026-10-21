import { describe, expect, it } from 'vitest'
import { formatCurrency } from './currency'

describe('formatCurrency', () => {
  it('formats amounts in Indian Rupees (INR)', () => {
    const formatted = formatCurrency(1250)
    // Non-breaking space or standard currency symbol
    expect(formatted).toContain('₹')
    expect(formatted).toMatch(/1,250/)
  })

  it('formats zero correctly', () => {
    const formatted = formatCurrency(0)
    expect(formatted).toContain('₹')
    expect(formatted).toMatch(/0/)
  })

  it('formats large values according to Indian numbering grouping', () => {
    const formatted = formatCurrency(100000)
    expect(formatted).toContain('₹')
    // 1,00,000 in en-IN
    expect(formatted).toMatch(/1,00,000/)
  })

  it('does not display unnecessary decimal places when maximumFractionDigits is 0', () => {
    const formatted = formatCurrency(499.99)
    // Formats rounded to 0 decimals: ₹500
    expect(formatted).toContain('₹')
    expect(formatted).not.toContain('.99')
  })
})
