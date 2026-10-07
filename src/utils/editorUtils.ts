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

  if (matchType('announcement-bar', 'announcement')) return syntheticEl(getId('announcement-bar', 'announcement'), 'Announcement bar', page, selectedElement, 'announcement-bar', getMergedProps('announcement-bar', { text: 'Free shipping on orders above ₹499', link: '', visibility: false }))
  if (matchType('nav', 'nav')) return syntheticEl(getId('nav', 'nav'), 'Header', page, selectedElement, 'nav', getMergedProps('nav', { logoText: '__DEFAULT_LOGO__' }))

  if (matchType('hero', 'hero')) {
    const heroEl = getRealEl('hero');
    return syntheticEl(getId('hero', 'hero'), 'Hero', page, selectedElement, 'hero', getMergedProps('hero', { eyebrow: '', title: '', subtitle: '', buttonText: 'Explore', buttonLink: '/', style_backgroundColor: '#f6ebd9', style_textColor: '#111111', style_buttonColor: '#1A1C20', style_buttonTextColor: '#ffffff', style_backgroundImage: '/mino_bag_preview.jpg', _headingId: heroEl?.id }))
  }

  if (matchType('featured-title', 'featured-title')) return syntheticEl(getId('featured-title', 'featured-title'), 'Featured collection', page, selectedElement, 'featured-title', getMergedProps('featured-title', { title: 'Featured Collection' }))
  if (matchType('email-signup', 'email-signup')) return syntheticEl(getId('email-signup', 'email-signup'), 'Email signup', page, selectedElement, 'email-signup', getMergedProps('email-signup', { heading: 'Join our newsletter', subtext: 'Get updates on new arrivals and exclusive offers.', placeholder: 'Enter your email', buttonText: 'Subscribe' }))
  if (matchType('footer', 'footer')) return syntheticEl(getId('footer', 'footer'), 'Footer', page, selectedElement, 'footer', getMergedProps('footer', { brand: '__DEFAULT_BRAND__', tagline: '__DEFAULT_TAGLINE__', showSocial: true }))
  if (matchType('heading', 'heading-dummy')) return syntheticEl(getId('heading', 'heading-dummy'), 'Heading', page, selectedElement, 'heading', getMergedProps('heading', { content: 'Designed for your lifestyle', alignment: 'left' }))
  if (matchType('prod-grid', 'prod-grid')) return syntheticEl(getId('prod-grid', 'prod-grid'), 'Product grid', page, selectedElement, 'prod-grid', getMergedProps('prod-grid', { title: 'New Arrivals', productsToShow: 4, columns: 4 }))
  if (matchType('coll-list', 'coll-list')) return syntheticEl(getId('coll-list', 'coll-list'), 'Collection list', page, selectedElement, 'coll-list', getMergedProps('coll-list', { title: 'Shop by Category' }))

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

  if (matchType('img-text', 'img-text')) return syntheticEl(getId('img-text', 'img-text'), 'Image with text', page, selectedElement, 'img-text', getMergedProps('img-text', { title: 'Designed for your lifestyle', content: 'Simple, elegant and crafted with care to bring comfort into your everyday.', image: '/assets/lifestyle.jpg', buttonText: 'Explore Collection', buttonLink: '/about' }))
  if (matchType('newsletter', 'newsletter')) return syntheticEl(getId('newsletter', 'newsletter'), 'Newsletter', page, selectedElement, 'newsletter', getMergedProps('newsletter', { title: 'Subscribe', subtitle: 'Get 10% off your first order', buttonText: 'Subscribe' }))
  if (matchType('policies', 'policies')) return syntheticEl(getId('policies', 'policies'), 'Policies and links', page, selectedElement, 'policies', getMergedProps('policies', { copyright: '© 2026 Luxora. All rights reserved.' }))

  return null;
}
