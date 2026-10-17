import { describe, it, expect } from 'vitest'
import { GAMEDAY_PRODUCTS, GAMEDAY_SPORTS, GAMEDAY_FAN_ESSENTIALS, GAMEDAY_MATCH_STORIES, GAMEDAY_FAN_REVIEWS } from './data/gameDayData'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from '../../../data/sportsTemplatesData'
import type { MarketplaceTemplate } from '../../../types'

describe('GameDay Theme', () => {
  it('has at least 10 products', () => {
    expect(GAMEDAY_PRODUCTS.length).toBeGreaterThanOrEqual(10)
  })

  it('covers all 5 sports', () => {
    const sports = new Set(GAMEDAY_PRODUCTS.map((p) => p.sport))
    expect(sports.has('football')).toBe(true)
    expect(sports.has('cricket')).toBe(true)
    expect(sports.has('basketball')).toBe(true)
    expect(sports.has('tennis')).toBe(true)
    expect(sports.has('running')).toBe(true)
  })

  it('has jerseys with canCustomize flag', () => {
    const customJerseys = GAMEDAY_PRODUCTS.filter((p) => p.canCustomize)
    expect(customJerseys.length).toBeGreaterThan(0)
  })

  it('has limited edition products', () => {
    const limited = GAMEDAY_PRODUCTS.filter((p) => p.isLimited)
    expect(limited.length).toBeGreaterThan(0)
  })

  it('has 5 sport categories', () => {
    expect(GAMEDAY_SPORTS.length).toBe(5)
  })

  it('has 6 fan essentials', () => {
    expect(GAMEDAY_FAN_ESSENTIALS.length).toBe(6)
  })

  it('has 3 match stories', () => {
    expect(GAMEDAY_MATCH_STORIES.length).toBe(3)
  })

  it('has 4 fan reviews', () => {
    expect(GAMEDAY_FAN_REVIEWS.length).toBe(4)
  })

  it('all fan reviews are verified', () => {
    expect(GAMEDAY_FAN_REVIEWS.every((r) => r.verified)).toBe(true)
  })

  it('all products have valid prices', () => {
    expect(GAMEDAY_PRODUCTS.every((p) => p.price > 0)).toBe(true)
  })

  it('all products have at least one size', () => {
    expect(GAMEDAY_PRODUCTS.every((p) => p.sizes.length > 0)).toBe(true)
  })

  it('all products have at least one color', () => {
    expect(GAMEDAY_PRODUCTS.every((p) => p.colors.length > 0)).toBe(true)
  })

  it('is registered in ALL_SPORTS_MARKETPLACE_TEMPLATES', () => {
    const gameday = ALL_SPORTS_MARKETPLACE_TEMPLATES.find((t: MarketplaceTemplate) => t.id === 'sports-gameday')
    expect(gameday).toBeDefined()
    expect(gameday?.name).toBe('GameDay')
    expect(gameday?.badge).toBe('trending')
    expect(gameday?.layoutType).toBe('editorial')
  })

  it('has products with both image and hoverImage', () => {
    expect(GAMEDAY_PRODUCTS.every((p) => p.image && p.hoverImage)).toBe(true)
  })
})
