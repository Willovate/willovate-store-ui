import { describe, expect, it } from 'vitest'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from '../../../data/sportsTemplatesData'
import { getTemplateComponent } from '../../../data/templateRegistry'
import { StreetAthleteStorefront } from './StreetAthleteStorefront'

describe('StreetAthlete theme', () => {
  it('is listed as a new editorial sports storefront', () => {
    const template = ALL_SPORTS_MARKETPLACE_TEMPLATES.find((item) => item.id === 'sports-streetathlete')

    expect(template?.name).toBe('StreetAthlete')
    expect(template?.badge).toBe('new')
    expect(template?.layoutType).toBe('editorial')
  })

  it('resolves to its own storefront instead of another sports theme', () => {
    const template = ALL_SPORTS_MARKETPLACE_TEMPLATES.find((item) => item.id === 'sports-streetathlete')

    expect(getTemplateComponent(template)).toBe(StreetAthleteStorefront)
  })
})