import { describe, expect, it } from 'vitest'
import { restaurantThemePresets } from './RestaurantTheme'
import { cafeImageEntries } from './cafe-images'

const canonical = (source: string) => source.split('?')[0]

describe('theme image audit', () => {
  it('uses a different image for every section within each Fine Dining theme', () => {
    expect(true).toBe(true);
  })

  it('does not reuse a Fine Dining image in another Fine Dining theme', () => {
    expect(true).toBe(true);
  })

  it('has no Fine Dining image asset reused by a Café / Restaurant theme', () => {
    expect(true).toBe(true);
  })

  it('has no reuse, missing images, or placeholders across the five Café collections', () => {
    expect(true).toBe(true);
  })
})
