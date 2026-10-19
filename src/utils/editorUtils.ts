import type { Page, PageElement } from '../types'

export function syntheticEl(
  id: string,
  name: string,
  page: Page,
  selectedElement: PageElement | null | undefined,
  elementType: string,
  defaultProps: Record<string, any>
): PageElement {
  return {
    id,
    pageId: page.id,
    name,
    elementType,
    displayOrder: -1,
    isEditable: true,
    isRequired: true,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
    properties: selectedElement?.id === id ? { ...defaultProps, ...selectedElement.properties } : defaultProps,
  }
}

export function getSyntheticElement(id: string, page: Page, selectedElement?: PageElement | null): PageElement | null {
  const getRealEl = (type: string) => page.elements.find(e => e.elementType === type)
  const getMergedProps = (type: string, defaultProps: any) => {
    const real = getRealEl(type);
    return real ? { ...defaultProps, ...real.properties } : defaultProps;
  }
  const getId = (type: string, fallbackId: string) => {
    return getRealEl(type)?.id || fallbackId;
  }

  // Handle both synthetic IDs and real IDs
  const matchType = (type: string, syntheticId: string) => id === syntheticId || id === getRealEl(type)?.id

  if (matchType('announcement-bar', 'announcement')) return syntheticEl(getId('announcement-bar', 'announcement'), 'Announcement bar', page, selectedElement, 'announcement-bar', getMergedProps('announcement-bar', { visibility: false }))
  if (matchType('nav', 'nav')) return syntheticEl(getId('nav', 'nav'), 'Header', page, selectedElement, 'nav', getMergedProps('nav', {}))

  if (matchType('hero', 'hero')) {
    const heroEl = getRealEl('hero');
    return syntheticEl(getId('hero', 'hero'), 'Hero', page, selectedElement, 'hero', getMergedProps('hero', { _headingId: heroEl?.id }))
  }

  if (matchType('featured-title', 'featured-title')) return syntheticEl(getId('featured-title', 'featured-title'), 'Featured collection', page, selectedElement, 'featured-title', getMergedProps('featured-title', {}))
  if (matchType('email-signup', 'email-signup')) return syntheticEl(getId('email-signup', 'email-signup'), 'Email signup', page, selectedElement, 'email-signup', getMergedProps('email-signup', {}))
  if (matchType('footer', 'footer')) return syntheticEl(getId('footer', 'footer'), 'Footer', page, selectedElement, 'footer', getMergedProps('footer', { showSocial: true }))
  if (matchType('heading', 'heading-dummy')) return syntheticEl(getId('heading', 'heading-dummy'), 'Heading', page, selectedElement, 'heading', getMergedProps('heading', { alignment: 'left' }))
  if (matchType('prod-grid', 'prod-grid')) return syntheticEl(getId('prod-grid', 'prod-grid'), 'Product grid', page, selectedElement, 'prod-grid', getMergedProps('prod-grid', { productsToShow: 6, columns: 3 }))
  if (matchType('coll-list', 'coll-list')) return syntheticEl(getId('coll-list', 'coll-list'), 'Collection list', page, selectedElement, 'coll-list', getMergedProps('coll-list', {}))

  if (id.startsWith('product-')) {
    const defaultProducts = [
      { name: '', price: '', image: '' },
      { name: '', price: '', image: '' },
      { name: '', price: '', image: '' },
      { name: '', price: '', image: '' },
    ];
    const idx = parseInt(id.split('-')[1]);
    const pId = id; // use the unique ID as the element type so they don't clash
    // We treat the unique ID as the elementType for these synthetic products
    const realProd = page.elements.find(e => e.elementType === pId)
    const props = realProd ? { ...defaultProducts[idx], ...realProd.properties } : defaultProducts[idx]
    return syntheticEl(realProd?.id || pId, 'Product', page, selectedElement, pId, props)
  }

  if (matchType('img-text', 'img-text')) return syntheticEl(getId('img-text', 'img-text'), 'Image with text', page, selectedElement, 'img-text', getMergedProps('img-text', {}))
  if (matchType('newsletter', 'newsletter')) return syntheticEl(getId('newsletter', 'newsletter'), 'Newsletter', page, selectedElement, 'newsletter', getMergedProps('newsletter', { title: 'Subscribe', subtitle: 'Get 10% off your first order', buttonText: 'Subscribe' }))
  if (matchType('policies', 'policies')) return syntheticEl(getId('policies', 'policies'), 'Policies and links', page, selectedElement, 'policies', getMergedProps('policies', { copyright: '© 2026 Luxora. All rights reserved.' }))

  if (matchType('features', 'features')) return syntheticEl(getId('features', 'features'), 'Features Strip', page, selectedElement, 'features', getMergedProps('features', { title: 'Highlights & Distinction' }))
  if (matchType('experience', 'experience')) return syntheticEl(getId('experience', 'experience'), 'Tasting Experience', page, selectedElement, 'experience', getMergedProps('experience', { title: 'The Tasting Experience', subtitle: 'A progressive multi-course sensory dinner' }))
  if (matchType('promo', 'promo')) return syntheticEl(getId('promo', 'promo'), 'Special Offers', page, selectedElement, 'promo', getMergedProps('promo', { title: 'Private Dining & Events', description: 'Reserve our private dining room or celebrate special milestones in intimacy.' }))
  if (matchType('gallery', 'gallery')) return syntheticEl(getId('gallery', 'gallery'), 'Atmosphere Gallery', page, selectedElement, 'gallery', getMergedProps('gallery', { title: 'Atmosphere & Moments' }))
  if (matchType('testimonials', 'testimonials')) return syntheticEl(getId('testimonials', 'testimonials'), 'Reviews & Critics', page, selectedElement, 'testimonials', getMergedProps('testimonials', { title: 'What Guests & Critics Say', subtitle: 'Acclaim & Recognition' }))
  if (matchType('location', 'location')) return syntheticEl(getId('location', 'location'), 'Location & Hours', page, selectedElement, 'location', getMergedProps('location', { address: '142 Mercer Street, SoHo, New York, NY 10012', hours: 'Dinner: Tue–Sun 17:30–23:00', phone: '(212) 555-0198' }))

  return null;
}
