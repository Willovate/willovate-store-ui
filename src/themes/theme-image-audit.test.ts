import { describe, expect, it } from 'vitest'
import { restaurantThemePresets } from './RestaurantTheme'
import { cafeImageEntries } from './cafe-images'

const canonical = (source: string) => source.split('?')[0]

describe('theme image audit', () => {
  it('uses a different image for every section within each Fine Dining theme', () => {
    const duplicates = Object.values(restaurantThemePresets)
      .filter(theme => theme.kind === 'fine')
      .flatMap(theme => theme.images.map(canonical).filter((source, index, all) => all.indexOf(source) !== index).map(source => `${theme.id}: ${source}`))
    expect(duplicates, `Fine Dining section duplicate assets: ${duplicates.join(', ')}`).toEqual([])
  })

  it('does not reuse a Fine Dining image in another Fine Dining theme', () => {
    const entries = Object.values(restaurantThemePresets)
      .filter(theme => theme.kind === 'fine')
      .flatMap(theme => theme.images.map(source => ({ theme: theme.id, source: canonical(source) })))
    const duplicates = entries.filter((entry, index) => entries.findIndex(candidate => candidate.source === entry.source) !== index)
    expect(duplicates, `Fine Dining cross-theme duplicate assets: ${duplicates.map(entry => `${entry.theme}: ${entry.source}`).join(', ')}`).toEqual([])
  })

  it('has no Fine Dining image asset reused by a Café / Restaurant theme', () => {
    const fineDining = Object.values(restaurantThemePresets).filter(theme => theme.kind === 'fine').flatMap(theme => theme.images.map((source, index) => ({ theme: theme.id, section: `preset-${index}`, source: canonical(source) })))
    const cafe = cafeImageEntries.map(image => ({ ...image, source: canonical(image.source) }))
    const cafeSources = new Set(cafe.map(image => image.source))
    const duplicates = fineDining.filter(image => cafeSources.has(image.source))
    expect(duplicates, `Cross-section duplicate assets: ${duplicates.map(item => `${item.theme}/${item.section}: ${item.source}`).join(', ')}`).toEqual([])
  })

  it('has no reuse, missing images, or placeholders across the five Café collections', () => {
    const sources = cafeImageEntries.map(image => image.source)
    const duplicateSources = sources.map(canonical).filter((source, index, all) => all.indexOf(source) !== index)
    expect(duplicateSources, `Café duplicate assets: ${duplicateSources.join(', ')}`).toEqual([])
    expect(sources.filter(source => !source || /placeholder|default|vase/i.test(source))).toEqual([])
  })
})
