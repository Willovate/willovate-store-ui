import { describe, expect, it } from 'vitest'
import { templates } from '../data/templates'

describe('Bento grid and responsive layout configuration', () => {
  it('BentoGrid sections in templates have valid items and sizes', () => {
    const templatesWithBento = templates.filter(t =>
      t.sections.some(s => s.type === 'bento-grid')
    )

    expect(templatesWithBento.length).toBeGreaterThan(0)

    for (const t of templatesWithBento) {
      const bentoSections = t.sections.filter(s => s.type === 'bento-grid')
      for (const section of bentoSections) {
        const items = (section.props as { items?: { title: string; size?: string }[] })?.items
        expect(Array.isArray(items)).toBe(true)
        if (items) {
          for (const item of items) {
            expect(item.title).toBeDefined()
            if (item.size) {
              expect(['small', 'medium', 'large']).toContain(item.size)
            }
          }
        }
      }
    }
  })
})
