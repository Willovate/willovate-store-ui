import { describe, it, expect } from 'vitest'
import { TimzeeStorefront } from './TimzeeStorefront'
import {
  TIMZEE_PRODUCTS,
  TIMZEE_HERO_SLIDES,
  TIMZEE_PROMO_CARDS,
  TIMZEE_GALLERY_BLOCKS,
  TIMZEE_TESTIMONIALS,
  TIMZEE_BLOG_POSTS,
  TIMZEE_BRAND_PARTNERS,
  TIMZEE_SERVICES,
} from './data/timzeeData'
import { TIMZEE_WATCHES_TEMPLATE } from '../../../data/jewelryTemplatesData'
import { getTemplateComponent } from '../../../data/templateRegistry'

describe('Timzee Luxury Watches Template', () => {
  it('exports TimzeeStorefront component correctly', () => {
    expect(TimzeeStorefront).toBeDefined()
    expect(typeof TimzeeStorefront).toBe('function')
  })

  it('has authentic hero slides matching the live Timzee theme', () => {
    expect(TIMZEE_HERO_SLIDES.length).toBeGreaterThanOrEqual(3)
    expect(TIMZEE_HERO_SLIDES[0].pretitle).toBe('Alertzy')
    expect(TIMZEE_HERO_SLIDES[0].title).toContain('Exclusive Offer -20% Off')
    expect(TIMZEE_HERO_SLIDES[1].pretitle).toBe('Gertious')
    expect(TIMZEE_HERO_SLIDES[2].pretitle).toBe('Gorgeous')
  })

  it('contains authentic 3-column promotional flash sale cards', () => {
    expect(TIMZEE_PROMO_CARDS.length).toBe(3)
    expect(TIMZEE_PROMO_CARDS[0].title).toBe("Men's Watch")
    expect(TIMZEE_PROMO_CARDS[0].discount).toBe('25% Discount')
    expect(TIMZEE_PROMO_CARDS[1].title).toBe("Women's Watch")
    expect(TIMZEE_PROMO_CARDS[1].discount).toBe('40% Discount')
    expect(TIMZEE_PROMO_CARDS[2].title).toBe("Couple's Watch")
    expect(TIMZEE_PROMO_CARDS[2].discount).toBe('30% Discount')
  })

  it('has comprehensive luxury watch products with prices and specs', () => {
    expect(TIMZEE_PRODUCTS.length).toBeGreaterThanOrEqual(15)
    const analogNumeral = TIMZEE_PRODUCTS.find((p) => p.name === 'Analog Numeral')
    expect(analogNumeral).toBeDefined()
    expect(analogNumeral?.price).toBe(750)
    expect(analogNumeral?.caseDiameter).toBeDefined()
    expect(analogNumeral?.movement).toBeDefined()

    const goldenAuto = TIMZEE_PRODUCTS.find((p) => p.name === 'Golden Automatic')
    expect(goldenAuto).toBeDefined()
    expect(goldenAuto?.badge).toBe('OFF 50%')
  })

  it('contains authentic mosaic gallery blocks', () => {
    expect(TIMZEE_GALLERY_BLOCKS.length).toBe(6)
    expect(TIMZEE_GALLERY_BLOCKS[0].title).toBe('Versits')
    expect(TIMZEE_GALLERY_BLOCKS[1].title).toBe('2019 Novalties')
  })

  it('contains horology testimonials and blog articles', () => {
    expect(TIMZEE_TESTIMONIALS.length).toBe(2)
    expect(TIMZEE_TESTIMONIALS[0].author).toBe('Andrew Mark')
    expect(TIMZEE_TESTIMONIALS[1].author).toBe('John Doe')

    expect(TIMZEE_BLOG_POSTS.length).toBeGreaterThanOrEqual(5)
    expect(TIMZEE_BLOG_POSTS[0].title).toBe('The Story Behind a Super Watch')
  })

  it('has brand partners and service pillars', () => {
    expect(TIMZEE_BRAND_PARTNERS.length).toBe(4)
    expect(TIMZEE_SERVICES.length).toBe(4)
  })

  it('resolves TIMZEE_WATCHES_TEMPLATE to TimzeeStorefront via getTemplateComponent', () => {
    expect(getTemplateComponent(TIMZEE_WATCHES_TEMPLATE)).toBe(TimzeeStorefront)
  })
})

