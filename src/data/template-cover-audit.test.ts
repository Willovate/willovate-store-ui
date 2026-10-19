import { describe, expect, it } from 'vitest'
import { templateCategories } from './templateCategories'

const hospitality = templateCategories.find(category => category.slug === 'food-and-restaurant')
const requestedCollections = ['fine-dining', 'cafe']
const expansionCollections = ['bakery', 'fast-food', 'cloud-kitchen', 'pizza', 'indian', 'dessert-shop', 'food-delivery', 'bbq-grill']
const isInvalidCover = (cover: string) => !cover || /placeholder|default|vase/i.test(cover)

describe('hospitality template covers', () => {
  it('has five distinct, non-placeholder covers in Fine Dining and Café', () => {
    const collections = requestedCollections.map(slug => hospitality?.subsections.find(section => section.slug === slug))
    expect(collections).not.toContain(undefined)

    for (const collection of collections) {
      expect(collection?.themes, `${collection?.name ?? 'Unknown'} count`).toHaveLength(5)
      const covers = collection?.themes.map(theme => theme.coverImage) ?? []
      expect(covers.filter(isInvalidCover), `${collection?.name} invalid covers`).toEqual([])
      expect(new Set(covers).size, `${collection?.name} duplicate covers`).toBe(5)
    }
  })

  it('does not reuse a cover between Fine Dining and Café', () => {
    const covers = requestedCollections.flatMap(slug =>
      hospitality?.subsections.find(section => section.slug === slug)?.themes.map(theme => theme.coverImage) ?? [],
    )
    expect(covers).toHaveLength(10)
    expect(new Set(covers).size, 'Duplicate cover across Fine Dining and Café').toBe(10)
  })

  it('gives all forty new food-service themes a unique, non-placeholder cover', () => {
    const collections = expansionCollections.map(slug => hospitality?.subsections.find(section => section.slug === slug))
    expect(collections).not.toContain(undefined)
    expect(collections.every(collection => collection?.themes.length === 5)).toBe(true)
    const covers = collections.flatMap(collection => collection?.themes.map(theme => theme.coverImage) ?? [])
    expect(covers).toHaveLength(40)
    expect(covers.filter(isInvalidCover)).toEqual([])
    expect(new Set(covers).size, 'Duplicate cover in new food-service themes').toBe(40)
  })
})
