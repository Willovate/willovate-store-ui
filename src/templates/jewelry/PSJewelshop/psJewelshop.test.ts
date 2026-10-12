import { describe, it, expect } from 'vitest'
import { PSJewelshopStorefront } from './PSJewelshopStorefront'
import {
  PSJEWELSHOP_PRODUCTS,
  PSJEWELSHOP_SERVICES,
  PSJEWELSHOP_BLOG_POSTS,
  PSJEWELSHOP_BRANDS,
} from './data/jewelshopData'
import { PS_JEWELSHOP_TEMPLATE } from '../../../data/jewelryTemplatesData'
import { getTemplateComponent } from '../../../data/templateRegistry'
import { TEMPLATE_REGISTRY } from '../../../data/templateRegistry'

describe('PS Jewelshop Storefront Data & Architecture', () => {
  it('should have products with correct prices and categories', () => {
    expect(PSJEWELSHOP_PRODUCTS.length).toBeGreaterThanOrEqual(6)
    PSJEWELSHOP_PRODUCTS.forEach((product) => {
      expect(product.id).toBeDefined()
      expect(product.name).toBeDefined()
      expect(product.price).toBeGreaterThan(0)
      expect(product.images.length).toBeGreaterThan(0)
      expect(['earrings', 'rings', 'bracelets', 'necklaces']).toContain(product.category)
    })
  })

  it('should have the 4 exact service pillars from the reference', () => {
    expect(PSJEWELSHOP_SERVICES).toHaveLength(4)
    const titles = PSJEWELSHOP_SERVICES.map((s) => s.title)
    expect(titles).toContain('FREE SHIPPING')
    expect(titles).toContain('FESTIVAL OFFER')
    expect(titles).toContain('24 X 7 SERVICE')
    expect(titles).toContain('ONLINE PAYMENT')
  })

  it('should have 3 editorial blog articles matching the reference', () => {
    expect(PSJEWELSHOP_BLOG_POSTS).toHaveLength(3)
    PSJEWELSHOP_BLOG_POSTS.forEach((post) => {
      expect(post.author).toBe('dhairya')
      expect(post.title).toBeDefined()
      expect(post.image).toBeDefined()
    })
  })

  it('should have 5 brand / certification badges', () => {
    expect(PSJEWELSHOP_BRANDS).toHaveLength(5)
    const names = PSJEWELSHOP_BRANDS.map((b) => b.name)
    expect(names).toContain('DIAMOND ATELIER')
    expect(names).toContain('CERTIFIED GIA')
  })

  it('exports PSJewelshopStorefront component', () => {
    expect(PSJewelshopStorefront).toBeDefined()
  })

  it('resolves PS_JEWELSHOP_TEMPLATE to PSJewelshopStorefront via getTemplateComponent', () => {
    expect(getTemplateComponent(PS_JEWELSHOP_TEMPLATE)).toBe(PSJewelshopStorefront)
  })

  it('registers PS Jewelshop exclusively in Jewelry category and not in Fashion or Sports', () => {
    const jewelryCat = TEMPLATE_REGISTRY['jewelry-accessories']
    const fashionCat = TEMPLATE_REGISTRY['clothing-store']
    const sportsCat = TEMPLATE_REGISTRY['sporting-goods']

    expect(jewelryCat.templates.some((t) => t.id === 'jewelry-ps-jewelshop')).toBe(true)
    expect(fashionCat.templates.some((t) => t.id === 'jewelry-ps-jewelshop')).toBe(false)
    expect(sportsCat.templates.some((t) => t.id === 'jewelry-ps-jewelshop')).toBe(false)
  })
})

