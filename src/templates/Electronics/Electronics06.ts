import type { TemplateConfig } from '../../types/template'

export const Electronics06: TemplateConfig = {
  id: 'electronics-06',
  name: 'Pixel',
  description: 'A visually expressive ecommerce theme for people who use technology for creativity, media, content, photography, and modern digital lifestyles.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'creative', name: 'Creative' }, { id: 'digital', name: 'Digital' }, { id: 'lifestyle', name: 'Lifestyle' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  theme: {
    fonts: { heading: 'Syne, sans-serif', body: 'Manrope, sans-serif' },
    colors: { primary: '#16161A', background: '#F5F3FF', accent: '#8b5cf6' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'CREATE / CAPTURE / DISPLAY' } },
    { id: 's2', type: 'navbar', props: { brand: 'PIXEL', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'MAKE EVERY PIXEL COUNT.', 
      subtitle: 'Premium creative technology built for artists, designers, photographers, and modern digital storytellers.', 
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore Creative Tech' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Discipline', 
      categories: [
        { name: 'Displays', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Cameras', image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Tablets', image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Creator Gear', image: 'https://images.unsplash.com/photo-1620052329302-36cce5634da2?auto=format&fit=crop&q=80&w=600' },
        { name: 'Desk Tech', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=600' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1512295767273-ac10bd3667af?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'px1', name: 'Studio Display Pro', description: '5K Retina Color Accurate', price: 1599, imageUrl: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&q=80&w=600' },
        { id: 'px2', name: 'Creator Pad 12"', description: 'Digital Canvas + Stylus', price: 799, imageUrl: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=600' },
        { id: 'px3', name: 'CineCam Mirrorless', description: '4K/120fps Full Frame', price: 2199, imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'px4', name: 'Artisan Tablet', description: 'Graphic Drawing Surface', price: 349, imageUrl: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { 
      title: 'The Gallery', 
      images: [
        'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800'
      ] 
    } },
    { id: 's7', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=800', 
      name: 'Lumina X1', 
      category: 'Mirrorless Camera', 
      description: 'Capture cinematic video and breathtaking stills with our most advanced sensor ever. Built for creators who demand zero compromises in dynamic range.', 
      price: 2499, 
      features: ['50MP Full Frame', '8-Stop IBIS', 'Uncompressed RAW'], 
      badge: 'Creator Choice',
      imageRight: false
    } },
    { id: 's8', type: 'bento-grid', props: { 
      title: 'Creative Workspace',
      items: [
        { title: 'The Ultimate Setup', description: 'Where ideas happen.', size: 'large', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
        { title: 'Mechanical Flow', description: 'Tactile typing.', size: 'small', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=400' },
        { title: 'Studio Audio', description: 'Hear every detail.', size: 'small', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400' },
        { title: 'Lighting', description: 'Perfect ambience.', size: 'small', image: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's9', type: 'split-hero', props: { 
      title: 'Tools for ideas in motion.', 
      subtitle: 'From the first sketch to the final render, our gear is designed to remove the friction between your imagination and the screen.', 
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop Cameras' 
    } },
    { id: 's10', type: 'catalog', props: {
      products: [
        { id: 'pt1', name: 'Nomad Tablet', description: 'Liquid AMOLED display', price: 699, imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80&w=600' },
        { id: 'pt2', name: 'Precision Stylus', description: '4096 Pressure Levels', price: 99, imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'pt3', name: 'Portable Monitor', description: '15.6" USB-C Display', price: 249, imageUrl: 'https://images.unsplash.com/photo-1593640495253-23d96b424c22?auto=format&fit=crop&q=80&w=600' },
        { id: 'pt4', name: 'Travel Keyboard', description: 'Ultra-slim Bluetooth', price: 79, imageUrl: 'https://images.unsplash.com/photo-1595009622879-1bf452077b94?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's11', type: 'feature-comparison', props: { 
      title: 'Compare Creator Displays', 
      products: [
        { name: 'Studio HD', price: 499 }, 
        { name: 'Studio Pro 4K', price: 899, isHighlighted: true }, 
        { name: 'Reference 6K', price: 2999 }
      ], 
      rows: [
        { label: 'Resolution', values: ['2560x1440', '3840x2160', '6016x3384'] }, 
        { label: 'Color Gamut', values: ['99% sRGB', '100% P3', '100% P3, 10-bit'] }, 
        { label: 'Brightness', values: ['400 nits', '600 nits', '1000 nits HDR'] },
        { label: 'Refresh Rate', values: ['60Hz', '120Hz ProMotion', '120Hz ProMotion'] }
      ] 
    } },
    { id: 's12', type: 'catalog', props: {
      products: [
        { id: 'pa1', name: 'V-90 SD Card 128GB', description: '300MB/s Transfer', price: 129, imageUrl: 'https://images.unsplash.com/photo-1531299243346-608f6580f5d0?auto=format&fit=crop&q=80&w=600' },
        { id: 'pa2', name: 'Aluminum Tablet Stand', description: 'Adjustable Angle', price: 49, imageUrl: 'https://images.unsplash.com/photo-1592890278964-b676f9d2737c?auto=format&fit=crop&q=80&w=600' },
        { id: 'pa3', name: 'Creator Hub', description: 'USB-C and Card Reader', price: 89, imageUrl: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=600' },
        { id: 'pa4', name: 'SSD Armor 2TB', description: 'Rugged USB 3.2', price: 199, imageUrl: 'https://images.unsplash.com/photo-1621288424161-00030560a289?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's13', type: 'full-hero', props: { 
      title: 'Technology should disappear into the creative process.', 
      subtitle: 'Focus on your art. We will handle the pixels.', 
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Read Our Philosophy' 
    } },
    { id: 's14', type: 'testimonials', props: { 
      title: 'Creator Notes', 
      testimonials: [
        { quote: 'The Studio Pro 4K has transformed how I grade video. The color accuracy is absolute perfection.', author: 'Jordan K.' },
        { quote: 'Finally a tablet that feels like drawing on real paper without sacrificing modern features.', author: 'Maya S.' }
      ] 
    } },
    { id: 's15', type: 'newsletter', props: { } },
    { id: 's16', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Displays', href: '#displays' },
    { label: 'Cameras', href: '#cameras' },
    { label: 'Tablets', href: '#tablets' },
    { label: 'Gear', href: '#gear' },
  ],
  features: [
    { id: 'support', label: 'Support' },
    { id: 'cart', label: 'Cart' },
  ]
}
