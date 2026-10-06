import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  addStoredBrand,
  addStoredCollection,
  addStoredProductType,
  addStoredTag,
  addStoredTags,
  clearOptionsRegistryMemory,
  getStoredBrands,
  getStoredCollections,
  getStoredProductTypes,
  getStoredTags,
  subscribeToOptionsRegistry,
} from './optionsRegistry'

describe('optionsRegistry', () => {
  beforeEach(() => {
    clearOptionsRegistryMemory()
  })

  it('loads default brands and adds new brand', () => {
    const initial = getStoredBrands()
    expect(initial).toContain('Willovate')
    expect(initial).toContain('Nike')

    const updated = addStoredBrand('Gymshark')
    expect(updated).toContain('Gymshark')
    expect(getStoredBrands()).toContain('Gymshark')
  })

  it('deduplicates brand additions case-insensitively', () => {
    addStoredBrand('Gymshark')
    const countBefore = getStoredBrands().length
    addStoredBrand('gymshark')
    const countAfter = getStoredBrands().length
    expect(countAfter).toBe(countBefore)
  })

  it('loads default product types and adds new product type', () => {
    const initial = getStoredProductTypes()
    expect(initial).toContain('T-Shirt')

    const updated = addStoredProductType('Windbreaker')
    expect(updated).toContain('Windbreaker')
    expect(getStoredProductTypes()).toContain('Windbreaker')
  })

  it('adds and gets custom collections and tags', () => {
    addStoredCollection('Monsoon Special')
    expect(getStoredCollections()).toContain('Monsoon Special')

    addStoredTag('EcoFriendly')
    expect(getStoredTags()).toContain('EcoFriendly')

    addStoredTags(['Organic', 'Recycled'])
    expect(getStoredTags()).toContain('Organic')
    expect(getStoredTags()).toContain('Recycled')
  })

  it('triggers listeners when options are added', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeToOptionsRegistry(listener)

    addStoredBrand('NewBrandTest')
    expect(listener).toHaveBeenCalled()

    unsubscribe()
  })
})
