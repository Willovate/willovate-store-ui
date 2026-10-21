export function handleHeroNavigation(ctaLabel?: string, ctaLink?: string): void {
  // 1. If explicit anchor/link is provided
  if (ctaLink && typeof ctaLink === 'string') {
    if (ctaLink.startsWith('#')) {
      const target = document.querySelector(ctaLink) || document.getElementById(ctaLink.replace('#', ''))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        focusSectionTarget(target)
        return
      }
    }
  }

  const label = (ctaLabel || '').toLowerCase().trim()

  // 2. Story / Philosophy / About destination
  if (label.includes('story') || label.includes('philosophy') || label.includes('about')) {
    const storyEl = document.querySelector('section.story-section, [data-section="story"]')
    if (storyEl) {
      storyEl.scrollIntoView({ behavior: 'smooth' })
      focusSectionTarget(storyEl)
      return
    }
  }

  // 3. Editorial / Journal / Lookbook destination
  if (label.includes('journal') || label.includes('editorial') || label.includes('lookbook')) {
    const editorialEl = document.querySelector('section.editorial-grid-section, [data-section="editorial-grid"]')
    if (editorialEl) {
      editorialEl.scrollIntoView({ behavior: 'smooth' })
      focusSectionTarget(editorialEl)
      return
    }
  }

  // 4. Categories / Collections destination
  if (label.includes('category') || label.includes('categories')) {
    const catGridEl = document.querySelector('section.category-grid-section, [data-section="category-grid"]')
    if (catGridEl) {
      catGridEl.scrollIntoView({ behavior: 'smooth' })
      focusSectionTarget(catGridEl)
      return
    }
  }

  // 5. Default shopping / catalog destination (e.g. Shop Now, Explore Collection, Build Your Basket)
  const catalogEl = document.getElementById('catalog') ||
                    document.querySelector('section.catalog-section, [data-section="catalog"]') ||
                    document.querySelector('.product-card')?.closest('section')

  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth' })
    focusSectionTarget(catalogEl)
    return
  }

  // Safe fallback: scroll down smoothly
  window.scrollBy({ top: 600, behavior: 'smooth' })
}

function focusSectionTarget(element: Element): void {
  const focusable = element.querySelector('h1, h2, h3, button, a, [tabindex]') as HTMLElement | null
  if (focusable) {
    if (!focusable.hasAttribute('tabindex')) {
      focusable.setAttribute('tabindex', '-1')
    }
    focusable.focus({ preventScroll: true })
  }
}
