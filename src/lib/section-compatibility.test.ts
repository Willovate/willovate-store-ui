import { describe, expect, it } from 'vitest'
import { templates } from '../data/templates'

describe('Section type compatibility and template rendering support', () => {
  const supportedSectionTypes = new Set([
    'hero',
    'split-hero',
    'full-hero',
    'full-width-hero',
    'promo',
    'promo-banner',
    'editorial-grid',
    'category-grid',
    'testimonials',
    'navbar',
    'catalog',
    'story',
    'newsletter',
    'footer',
    'bento-grid',
    'specification-grid',
    'feature-comparison',
    'product-spotlight',
    'shop-the-look',
    'material-grid',
    'craftsmanship',
  ])

  it('all 50 registered templates in data/templates use supported section types', () => {
    expect(templates.length).toBeGreaterThanOrEqual(50)

    const unsupportedOccurrences: { templateId: string; sectionId: string; type: string }[] = []

    for (const template of templates) {
      for (const section of template.sections) {
        if (!supportedSectionTypes.has(section.type)) {
          unsupportedOccurrences.push({
            templateId: template.id,
            sectionId: section.id,
            type: section.type,
          })
        }
      }
    }

    expect(unsupportedOccurrences).toEqual([])
  })

  it('FoodGrocery templates containing promo-banner sections are covered', () => {
    const foodGroceryTemplates = templates.filter(t => t.id.startsWith('food-grocery-'))
    const promoBannerTemplates = foodGroceryTemplates.filter(t =>
      t.sections.some(s => s.type === 'promo-banner')
    )

    // Confirms FoodGrocery02, 04, 05, 07, 09, 10 are recognized
    expect(promoBannerTemplates.length).toBeGreaterThanOrEqual(6)
    for (const t of promoBannerTemplates) {
      const banner = t.sections.find(s => s.type === 'promo-banner')
      expect(banner).toBeDefined()
      expect(banner?.props).toBeDefined()
    }
  })

  it('HomeFurniture15 / Room & Co template contains valid hero section', () => {
    const roomAndCo = templates.find(t => t.id === 'room-and-co')
    expect(roomAndCo).toBeDefined()
    const heroSection = roomAndCo?.sections.find(s => s.type === 'full-width-hero' || s.type === 'full-hero')
    expect(heroSection).toBeDefined()
  })
})
