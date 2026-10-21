import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { NewsletterSection } from '../components/sections/NewsletterSection'
import { StorySection } from '../components/sections/StorySection'
import { FooterSection } from '../components/sections/FooterSection'
import { ProductCard } from '../components/ProductCard'
import { ProductSpotlightSection } from '../components/sections/ProductSpotlightSection'
import type { Product } from '../types'

describe('Stage 3 Quality Improvements', () => {
  describe('Stage 3A: Newsletter Section Content Fidelity', () => {
    it('renders custom template-supplied title, subtitle, and buttonText', () => {
      const html = renderToStaticMarkup(
        <NewsletterSection
          title="THE SAVOUR JOURNAL"
          subtitle="Recipes, seasonal discoveries and stories from the world of good food."
          buttonText="JOIN THE JOURNAL"
        />
      )

      expect(html).toContain('THE SAVOUR JOURNAL')
      expect(html).toContain('Recipes, seasonal discoveries and stories from the world of good food.')
      expect(html).toContain('JOIN THE JOURNAL')
      expect(html).toContain('type="submit"')
      expect(html).toContain('aria-label="Email address"')
    })

    it('renders description prop when subtitle is absent', () => {
      const html = renderToStaticMarkup(
        <NewsletterSection
          title="The Wellness Journal"
          description="Weekly plant-based recipes, new arrivals, and mindful living tips."
        />
      )

      expect(html).toContain('The Wellness Journal')
      expect(html).toContain('Weekly plant-based recipes, new arrivals, and mindful living tips.')
      expect(html).toContain('Subscribe') // Sensible button fallback
    })

    it('falls back gracefully to default copy when optional props are absent', () => {
      const html = renderToStaticMarkup(<NewsletterSection />)

      expect(html).toContain('Stay in the loop')
      expect(html).toContain('Join our newsletter for updates and new arrivals.')
      expect(html).toContain('Subscribe')
    })
  })

  describe('Stage 3A: Story Section Content Fidelity & Layout', () => {
    it('renders custom template story title, subtitle, and content with image', () => {
      const html = renderToStaticMarkup(
        <StorySection
          title="Small things. Better days."
          subtitle="The DailyCo Philosophy"
          content="We believe the objects in your life should support your natural rhythm."
          image="https://example.com/dailyco-story.jpg"
        />
      )

      expect(html).toContain('Small things. Better days.')
      expect(html).toContain('The DailyCo Philosophy')
      expect(html).toContain('We believe the objects in your life should support your natural rhythm.')
      expect(html).toContain('src="https://example.com/dailyco-story.jpg"')
      expect(html).toContain('id="story"')
      expect(html).toContain('class="story-section"')
    })

    it('renders custom template text and description props', () => {
      const html = renderToStaticMarkup(
        <StorySection
          title="The modern movie night."
          text="Film is meant to be an immersive experience."
        />
      )

      expect(html).toContain('The modern movie night.')
      expect(html).toContain('Film is meant to be an immersive experience.')
    })

    it('falls back gracefully to default brand story when props are absent', () => {
      const html = renderToStaticMarkup(<StorySection />)

      expect(html).toContain('Our Story')
      expect(html).toContain('We bring together independent makers and thoughtful design')
      expect(html).toContain('id="story"')
    })
  })

  describe('Stage 3A: Footer Section Content Fidelity', () => {
    it('renders custom template brand, text, and social links', () => {
      const social = [
        { label: 'Instagram', href: 'https://instagram.com/everyday' },
        { label: 'Pinterest', href: 'https://pinterest.com/everyday' },
      ]

      const html = renderToStaticMarkup(
        <FooterSection
          brand="EVERYDAY"
          text="Practical, beautiful essentials for a well-organized life."
          social={social}
        />
      )

      expect(html).toContain('EVERYDAY')
      expect(html).toContain('Practical, beautiful essentials for a well-organized life.')
      expect(html).toContain('Instagram')
      expect(html).toContain('href="https://instagram.com/everyday"')
      expect(html).toContain('Pinterest')
      expect(html).toContain('href="https://pinterest.com/everyday"')
    })

    it('renders default copyright and no empty links or unwanted brand when props are empty', () => {
      const html = renderToStaticMarkup(<FooterSection />)

      expect(html).toContain('Willovate one. All rights reserved.')
      expect(html).not.toContain('<a')
      expect(html).not.toContain('<h3')
    })
  })

  describe('Stage 3B & 3C: Product Image Rendering and Fallbacks', () => {
    const productWithImage: Product = {
      id: 'chair-01',
      slug: 'chair-01',
      name: 'Executive Chair',
      description: 'Fine leather chair',
      category: 'Seating',
      price: 5400,
      compareAtPrice: null,
      stockQuantity: 4,
      visualTheme: 'sand',
      isFeatured: true,
      imageUrl: 'https://images.unsplash.com/photo-chair.jpg',
    }

    const productWithoutImage: Product = {
      id: 'table-01',
      slug: 'table-01',
      name: 'Marble Dining Table',
      description: 'Solid marble surface',
      category: 'Tables',
      price: 8500,
      compareAtPrice: null,
      stockQuantity: 2,
      visualTheme: 'stone',
      isFeatured: false,
    }

    it('renders img element on ProductCard when imageUrl is provided', () => {
      const html = renderToStaticMarkup(
        <ProductCard product={productWithImage} onAdd={() => {}} />
      )

      expect(html).toContain('<img')
      expect(html).toContain('src="https://images.unsplash.com/photo-chair.jpg"')
      expect(html).toContain('alt="Executive Chair"')
    })

    it('renders letter placeholder fallback on ProductCard when no image is provided', () => {
      const html = renderToStaticMarkup(
        <ProductCard product={productWithoutImage} onAdd={() => {}} />
      )

      expect(html).not.toContain('<img')
      expect(html).toContain('class="product-shape"')
      expect(html).toContain('M') // First letter of "Marble Dining Table"
    })

    it('renders img element in ProductSpotlightSection when image is provided', () => {
      const html = renderToStaticMarkup(
        <ProductSpotlightSection
          name="AeroBuds Pro"
          category="Audio"
          description="Next-gen active noise cancelling."
          price={249}
          imageUrl="https://images.unsplash.com/photo-aerobuds.jpg"
        />
      )

      expect(html).toContain('<img')
      expect(html).toContain('src="https://images.unsplash.com/photo-aerobuds.jpg"')
      expect(html).toContain('alt="AeroBuds Pro"')
    })

    it('renders letter placeholder fallback in ProductSpotlightSection when image is missing', () => {
      const html = renderToStaticMarkup(
        <ProductSpotlightSection
          name="AeroBuds Pro"
          category="Audio"
          description="Next-gen active noise cancelling."
          price={249}
        />
      )

      expect(html).not.toContain('<img')
      expect(html).toContain('A') // First letter of "AeroBuds Pro"
    })
  })
})
