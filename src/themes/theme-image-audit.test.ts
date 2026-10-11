import { describe, expect, it } from 'vitest'
import { restaurantThemePresets } from './RestaurantTheme'
import { cafeImageEntries } from './cafe-images'

const canonical = (source: string) => source.split('?')[0]

describe('theme image audit', () => {
  const fineDiningThemes = ['noir-table', 'velvet-reserve', 'the-tasting-room', 'ember-and-oak', 'maison-gourmet']
  const fineDiningImages = fineDiningThemes.flatMap(id => (restaurantThemePresets[id]?.images ?? []).map(canonical))

  it('uses valid images for every section within each Fine Dining theme', () => {
    fineDiningThemes.forEach(id => {
      const images = (restaurantThemePresets[id]?.images ?? []).map(canonical)
      expect(images.length, `Fine Dining theme ${id} has images`).toBeGreaterThan(0)
      images.forEach(img => {
        expect(img, `${id} image is valid`).toBeTruthy()
        expect(img, `${id} image is not placeholder`).not.toMatch(/placeholder|default|vase/i)
      })
    })
  })

  it('maintains rich imagery across Fine Dining themes', () => {
    expect(fineDiningImages.length).toBeGreaterThan(50)
  })

  it('has no Fine Dining image asset reused by a Café / Restaurant theme', () => {
    const cafeImages = cafeImageEntries.map(entry => canonical(entry.source))
    const fineDiningSet = new Set(fineDiningImages)
    const overlaps = cafeImages.filter(img => fineDiningSet.has(img))
    expect(overlaps, 'Fine Dining and Café image overlap').toEqual([])
  })

  it('has no reuse, missing images, or placeholders across the five Café collections', () => {
    expect(cafeImageEntries).toHaveLength(55)
    
    // Check for missing or placeholder images
    for (const entry of cafeImageEntries) {
      expect(entry.source, `${entry.theme} ${entry.section} is valid`).toBeTruthy()
      expect(entry.source, `${entry.theme} ${entry.section} not placeholder`).not.toMatch(/placeholder|default|vase/i)
      expect(entry.source, `${entry.theme} ${entry.section} is from unsplash`).toMatch(/^https:\/\/images\.unsplash\.com\//)
    }

    // Verify zero cross-theme reuse and zero internal reuse
    const allCafeImages = cafeImageEntries.map(entry => canonical(entry.source))
    const uniqueCafeImages = new Set(allCafeImages)
    expect(uniqueCafeImages.size, 'Total unique cafe images').toBe(55)

    // Check each theme individually has 11 distinct images
    const themes = ['morning-ritual', 'brew-house', 'corner-cafe', 'latte-lane', 'the-daily-grind']
    for (const theme of themes) {
      const themeImages = cafeImageEntries.filter(e => e.theme === theme).map(e => canonical(e.source))
      expect(themeImages, `${theme} has 11 images`).toHaveLength(11)
      expect(new Set(themeImages).size, `${theme} internal uniqueness`).toBe(11)
    }
  })
})
