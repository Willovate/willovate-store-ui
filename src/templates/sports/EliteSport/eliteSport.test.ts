import { describe, expect, it } from 'vitest'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from '../../../data/sportsTemplatesData'
import { getTemplateComponent } from '../../../data/templateRegistry'
import { EliteSportStorefront } from './EliteSportStorefront'

describe('EliteSport theme', () => {
  it('is listed as a new editorial sports storefront', () => {
    const template = ALL_SPORTS_MARKETPLACE_TEMPLATES.find((item) => item.id === 'sports-elitesport')

    expect(template?.name).toBe('EliteSport')
    expect(template?.headline).toBe('ENGINEERED FOR EXCELLENCE')
    expect(template?.layoutType).toBe('editorial')
  })

  it('resolves to its independent storefront', () => {
    const template = ALL_SPORTS_MARKETPLACE_TEMPLATES.find((item) => item.id === 'sports-elitesport')

    expect(getTemplateComponent(template)).toBe(EliteSportStorefront)
  })
})