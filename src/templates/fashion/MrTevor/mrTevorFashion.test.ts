import { describe, it, expect } from 'vitest'
import {
  MR_TEVOR_PRODUCTS,
  MR_TEVOR_HERO_SLIDES,
  MR_TEVOR_VALUE_PILLARS,
  MR_TEVOR_LAPEL_GUIDE,
  MR_TEVOR_TESTIMONIALS,
} from './data/mrTevorData'

describe('Mr-Tevor Haute Sartorial Suiting Theme', () => {
  it('should load all 10 authentic products with valid specifications', () => {
    expect(MR_TEVOR_PRODUCTS.length).toBe(10)

    const handles = MR_TEVOR_PRODUCTS.map((p) => p.handle)
    expect(handles).toContain('slim-fit-suit')
    expect(handles).toContain('classic-fit-suit')
    expect(handles).toContain('modern-fit-suit')
    expect(handles).toContain('notch-lapel-suit')
    expect(handles).toContain('shawl-lapel-suit')
    expect(handles).toContain('peak-lapel-suit')
    expect(handles).toContain('single-breasted-suit')
    expect(handles).toContain('double-breasted-suit')
    expect(handles).toContain('patch-pocket-blazer')
    expect(handles).toContain('double-vent-suit')

    MR_TEVOR_PRODUCTS.forEach((p) => {
      expect(p.price).toBeGreaterThan(0)
      expect(p.image).toContain('https://cdn.shopify.com/s/files/1/0612/7134/3347/products/')
      expect(['Notch Lapel', 'Peak Lapel', 'Shawl Lapel']).toContain(p.lapel)
      expect(['Slim Fit', 'Classic Fit', 'Modern Fit']).toContain(p.fit)
      expect(p.colors.length).toBeGreaterThan(0)
      expect(p.sizes.length).toBeGreaterThan(0)
    })
  })

  it('should have 3 authentic craftsmanship value pillars with official icons', () => {
    expect(MR_TEVOR_VALUE_PILLARS.length).toBe(3)
    expect(MR_TEVOR_VALUE_PILLARS[0].icon).toContain('icon-1.png')
    expect(MR_TEVOR_VALUE_PILLARS[1].icon).toContain('icon-2.png')
    expect(MR_TEVOR_VALUE_PILLARS[2].icon).toContain('icon-3.png')
  })

  it('should contain full lapel style guide across Notch, Peak, and Shawl lapels', () => {
    expect(MR_TEVOR_LAPEL_GUIDE.length).toBe(3)
    const lapelTypes = MR_TEVOR_LAPEL_GUIDE.map((l) => l.type)
    expect(lapelTypes).toContain('Notch Lapel')
    expect(lapelTypes).toContain('Peak Lapel')
    expect(lapelTypes).toContain('Shawl Lapel')
  })

  it('should load authentic gentlemen customer testimonials', () => {
    expect(MR_TEVOR_TESTIMONIALS.length).toBeGreaterThanOrEqual(3)
    expect(MR_TEVOR_TESTIMONIALS[0].author).toBe('Lord Arthur Sterling')
    expect(MR_TEVOR_TESTIMONIALS[0].rating).toBe(5)
  })

  it('should contain 3 multi-slide hero carousel banners', () => {
    expect(MR_TEVOR_HERO_SLIDES.length).toBe(3)
    expect(MR_TEVOR_HERO_SLIDES[0].title).toBe('The Art of Haute Sartorial Suiting')
    expect(MR_TEVOR_HERO_SLIDES[1].title).toBe('Heritage Wool & Virgin Tweed Blazers')
  })
})
