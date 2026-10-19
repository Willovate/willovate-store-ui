import { describe, expect, it } from 'vitest'
import { getVariantColorInfo, getCategoryIconName } from './CategoryIconResolver'

describe('CategoryIconResolver & Variant Color System', () => {
  describe('getCategoryIconName', () => {
    it('resolves shoe category', () => {
      expect(getCategoryIconName('Apparel > Shoes > Sneakers')).toBe('shoe')
    })
    it('resolves apparel / clothing category', () => {
      expect(getCategoryIconName('Apparel > Clothing > Tops > T-Shirts')).toBe('shirt')
    })
    it('resolves bag category', () => {
      expect(getCategoryIconName('Accessories > Handbags & Luggage')).toBe('bag')
    })
    it('resolves jewelry category', () => {
      expect(getCategoryIconName('Jewelry > Rings')).toBe('jewelry')
    })
    it('resolves watches category', () => {
      expect(getCategoryIconName('Accessories > Watches > Smartwatches')).toBe('watch')
    })
    it('resolves electronics category', () => {
      expect(getCategoryIconName('Electronics > Laptops')).toBe('laptop')
    })
  })

  describe('getVariantColorInfo', () => {
    it('resolves White variant to light/white representation', () => {
      const info = getVariantColorInfo({ Size: 'S', Color: 'White', Gender: 'Men' })
      expect(info).not.toBeNull()
      expect(info?.bg).toBe('#FFFFFF')
      expect(info?.iconColor).toBe('#94A3B8')
    })

    it('resolves Black variant to dark/black representation', () => {
      const info = getVariantColorInfo({ Size: 'M', Color: 'Black', Gender: 'Women' })
      expect(info).not.toBeNull()
      expect(info?.iconColor).toBe('#0F172A')
      expect(info?.bg).toBe('#E2E8F0')
    })

    it('resolves Blue variant to blue representation', () => {
      const info = getVariantColorInfo({ Size: 'L', Color: 'Blue' })
      expect(info).not.toBeNull()
      expect(info?.iconColor).toBe('#2563EB')
      expect(info?.bg).toBe('#EFF6FF')
    })

    it('resolves Red variant to red representation', () => {
      const info = getVariantColorInfo({ Size: 'M', Color: 'Red' })
      expect(info).not.toBeNull()
      expect(info?.iconColor).toBe('#DC2626')
      expect(info?.bg).toBe('#FEF2F2')
    })

    it('resolves Green variant to green representation', () => {
      const info = getVariantColorInfo({ Size: 'XL', Color: 'Green' })
      expect(info).not.toBeNull()
      expect(info?.iconColor).toBe('#16A34A')
      expect(info?.bg).toBe('#F0FDF4')
    })

    it('resolves Yellow variant to yellow representation', () => {
      const info = getVariantColorInfo({ Size: 'S', Color: 'Yellow' })
      expect(info).not.toBeNull()
      expect(info?.iconColor).toBe('#D97706')
      expect(info?.bg).toBe('#FEFCE8')
    })

    it('returns null for variants without Color option (neutral default state)', () => {
      const info = getVariantColorInfo({ Size: 'S', Gender: 'Men', 'Age Group': 'Adult' })
      expect(info).toBeNull()
    })

    it('returns null if color value is empty', () => {
      const info = getVariantColorInfo({ Size: 'S', Color: '   ' })
      expect(info).toBeNull()
    })

    it('resolves hex color codes dynamically', () => {
      const info = getVariantColorInfo({ Color: '#10B981' })
      expect(info).not.toBeNull()
      expect(info?.iconColor).toBe('#10B981')
    })

    it('resolves other CSS color names dynamically', () => {
      const info = getVariantColorInfo({ Color: 'coral' })
      expect(info).not.toBeNull()
      expect(info?.iconColor).toBe('#EA580C')
    })

    it('resolves case-insensitive key names like "colour"', () => {
      const info = getVariantColorInfo({ Size: 'M', Colour: 'Navy' })
      expect(info).not.toBeNull()
      expect(info?.iconColor).toBe('#1E3A8A')
    })
  })
})
