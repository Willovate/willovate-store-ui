import { describe, it } from 'vitest'
import { templates } from '../data/templates'

describe('Stage A Template Audit', () => {
  it('audits all templates in registry', () => {
    console.log(`TOTAL_TEMPLATES: ${templates.length}`)
    
    const validMarketplaceCategories = ['Electronics', 'Home & Furniture', 'General Store', 'Food & Grocery']
    const legacyIds = ['template-01', 'atelier', 'aura', 'casa', 'mono', 'noir', 'solis', 'market', 'studio']
    
    const marketplaceTemplates = templates.filter(t => {
      const isCat = t.categories && t.categories.some(c => validMarketplaceCategories.includes(c.name))
      return isCat && !legacyIds.includes(t.id)
    })
    console.log(`MARKETPLACE_TEMPLATES_COUNT: ${marketplaceTemplates.length}`)
    
    const templatesWithoutNavbar: string[] = []
    const navbarStyles: Record<string, string[]> = { minimal: [], center: [], utility: [], other: [] }
    const productFieldUsage: Record<string, number> = {}
    let totalCustomProductsCount = 0

    templates.forEach(t => {
      const navSection = t.sections.find(s => s.type === 'navbar')
      if (!navSection && t.id !== 'template-01') {
        templatesWithoutNavbar.push(t.id)
      } else if (navSection) {
        const style = navSection.props?.style || 'minimal'
        if (navbarStyles[style]) {
          navbarStyles[style].push(t.id)
        } else {
          navbarStyles.other.push(`${t.id} (${style})`)
        }
      }
      t.sections.forEach(s => {
        if (s.props?.products && Array.isArray(s.props.products)) {
          s.props.products.forEach((p: any) => {
            totalCustomProductsCount++
            Object.keys(p).forEach(k => {
              productFieldUsage[k] = (productFieldUsage[k] || 0) + 1
            })
          })
        }
        if (s.props?.product && typeof s.props.product === 'object') {
          totalCustomProductsCount++
          Object.keys(s.props.product).forEach(k => {
            productFieldUsage[k] = (productFieldUsage[k] || 0) + 1
          })
        }
        if (s.props?.hotspots && Array.isArray(s.props.hotspots)) {
          s.props.hotspots.forEach((h: any) => {
            if (h.product) {
              totalCustomProductsCount++
              Object.keys(h.product).forEach(k => {
                productFieldUsage[k] = (productFieldUsage[k] || 0) + 1
              })
            }
          })
        }
      })
    })

    let templatesWithProducts = 0
    let templatesWithoutProducts = 0
    templates.forEach(t => {
      let count = 0
      t.sections.forEach(s => {
        if (s.props?.products?.length) count += s.props.products.length
      })
      if (count > 0) templatesWithProducts++
      else templatesWithoutProducts++
    })
    const withoutProducts = templates.filter(t => !t.sections.some(s => s.props?.products?.length)).map(t => t.id)
    console.log(`WITHOUT_PRODUCTS_IDS: ${JSON.stringify(withoutProducts)}`)
    console.log(`TEMPLATES_WITH_CUSTOM_PRODUCTS: ${templatesWithProducts}, WITHOUT: ${templatesWithoutProducts}`)
    console.log(`TEMPLATES_WITHOUT_NAVBAR: ${JSON.stringify(templatesWithoutNavbar)}`)
    console.log(`OTHER_NAVBAR_STYLES: ${JSON.stringify(navbarStyles.other)}`)
    console.log(`NAVBAR_STYLES_COUNT: minimal=${navbarStyles.minimal.length}, center=${navbarStyles.center.length}, utility=${navbarStyles.utility.length}, other=${navbarStyles.other.length}`)
    console.log(`TOTAL_PRODUCTS_ACROSS_TEMPLATES: ${totalCustomProductsCount}`)
    console.log(`PRODUCT_FIELDS: ${JSON.stringify(productFieldUsage)}`)
  })
})
