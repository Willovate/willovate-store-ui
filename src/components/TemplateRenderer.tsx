import type { TemplateConfig, TemplateSectionConfig } from '../types/template'
import DefaultWillovateTemplate from '../templates/DefaultWillovateTemplate'
import { HeroSection } from './sections/HeroSection'
import { CatalogSection } from './sections/CatalogSection'
import { StorySection } from './sections/StorySection'
import { NewsletterSection } from './sections/NewsletterSection'
import { FooterSection } from './sections/FooterSection'
import { SplitHeroSection } from './sections/SplitHeroSection'
import { FullWidthHeroSection } from './sections/FullWidthHeroSection'
import { PromoBannerSection } from './sections/PromoBannerSection'
import { EditorialGridSection } from './sections/EditorialGridSection'
import { CategoryGridSection } from './sections/CategoryGridSection'
import { TestimonialsSection } from './sections/TestimonialsSection'
import { NavBarSection } from './sections/NavBarSection'
import { BentoGridSection } from './sections/BentoGridSection'
import { SpecificationGridSection } from './sections/SpecificationGridSection'
import { FeatureComparisonSection } from './sections/FeatureComparisonSection'
import { ProductSpotlightSection } from './sections/ProductSpotlightSection'
import { ShopTheLookSection } from './sections/ShopTheLookSection'
import { MaterialGridSection } from './sections/MaterialGridSection'
import { CraftsmanshipSection } from './sections/CraftsmanshipSection'

export function TemplateRenderer({ template }: { template: TemplateConfig }) {
  if (template.id === 'template-01') {
    return <DefaultWillovateTemplate />
  }

  // Inject CSS variables for the theme
  const style = {
    '--template-primary': template.theme.colors.primary,
    '--template-background': template.theme.colors.background,
    '--template-accent': template.theme.colors.accent,
    '--template-heading-font': template.theme.fonts.heading,
    '--template-body-font': template.theme.fonts.body,
    backgroundColor: 'var(--template-background)',
    color: 'var(--template-primary)',
    fontFamily: 'var(--template-body-font)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    containerType: 'inline-size' as any
  }

  // Simple section mapping
  const renderSection = (section: TemplateSectionConfig) => {
    switch (section.type) {
      case 'hero':
        return <HeroSection key={section.id} {...section.props} />
      case 'split-hero':
        return <SplitHeroSection key={section.id} {...section.props} />
      case 'full-hero':
        return <FullWidthHeroSection key={section.id} {...section.props} />
      case 'promo':
        return <PromoBannerSection key={section.id} {...section.props} />
      case 'editorial-grid':
        return <EditorialGridSection key={section.id} {...section.props} />
      case 'category-grid':
        return <CategoryGridSection key={section.id} {...section.props} />
      case 'testimonials':
        return <TestimonialsSection key={section.id} {...section.props} />
      case 'navbar':
        return <NavBarSection key={section.id} template={template} {...section.props} />
      case 'catalog':
        return <CatalogSection key={section.id} {...section.props} />
      case 'story':
        return <StorySection key={section.id} {...section.props} />
      case 'newsletter':
        return <NewsletterSection key={section.id} {...section.props} />
      case 'footer':
        return <FooterSection key={section.id} {...section.props} />
      case 'bento-grid':
        return <BentoGridSection key={section.id} {...(section.props as any)} />
      case 'specification-grid':
        return <SpecificationGridSection key={section.id} {...(section.props as any)} />
      case 'feature-comparison':
        return <FeatureComparisonSection key={section.id} {...(section.props as any)} />
      case 'product-spotlight':
        return <ProductSpotlightSection key={section.id} {...(section.props as any)} />
      case 'shop-the-look':
        return <ShopTheLookSection key={section.id} {...(section.props as any)} />
      case 'material-grid':
        return <MaterialGridSection key={section.id} {...(section.props as any)} />
      case 'craftsmanship':
        return <CraftsmanshipSection key={section.id} {...(section.props as any)} />
      default:
        return null
    }
  }

  // If no sections are defined, fallback to a default layout for the preview
  const sections = template.sections.length > 0 ? template.sections : [
    { id: 's1', type: 'hero', props: { title: template.name, subtitle: template.description } },
    { id: 's2', type: 'catalog', props: {} },
    { id: 's3', type: 'story', props: {} },
    { id: 's4', type: 'newsletter', props: {} },
    { id: 's5', type: 'footer', props: {} }
  ]

  return (
    <div className={`template-preview ${template.id}`} style={style}>
      {sections.map(renderSection)}
    </div>
  )
}

