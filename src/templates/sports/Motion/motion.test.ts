import { describe, expect, it } from 'vitest'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from '../../../data/sportsTemplatesData'
import { getTemplateComponent } from '../../../data/templateRegistry'
import { MotionStorefront, MOTION_PRODUCTS } from './MotionStorefront'

describe('Motion theme', () => {
  it('is listed in marketplace sports templates with futuristic performance concept', () => {
    const template = ALL_SPORTS_MARKETPLACE_TEMPLATES.find((item) => item.id === 'sports-motion')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Motion')
    expect(template?.headline).toBe('THE FUTURE OF PERFORMANCE')
    expect(template?.brandName).toBe('MOTION')
  })

  it('resolves to MotionStorefront component in template registry', () => {
    const template = ALL_SPORTS_MARKETPLACE_TEMPLATES.find((item) => item.id === 'sports-motion')

    expect(getTemplateComponent(template)).toBe(MotionStorefront)
  })

  it('contains comprehensive futuristic sports-tech catalog', () => {
    expect(MOTION_PRODUCTS.length).toBeGreaterThanOrEqual(8)
    expect(MOTION_PRODUCTS.every((p) => p.price > 0)).toBe(true)
    expect(MOTION_PRODUCTS.every((p) => p.technologyBadge && p.technology)).toBe(true)
    expect(MOTION_PRODUCTS.some((p) => p.category === 'Footwear')).toBe(true)
    expect(MOTION_PRODUCTS.some((p) => p.category === 'Smart Gear')).toBe(true)
    expect(MOTION_PRODUCTS.some((p) => p.category === 'Training')).toBe(true)
  })
})
