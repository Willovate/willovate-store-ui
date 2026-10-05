import type { TemplateConfig } from '../../types/template'

export const Electronics04: TemplateConfig = {
  id: 'electronics-04',
  name: 'Circuit',
  description: 'A premium technical electronics marketplace designed for people who care about hardware, specifications, compatibility, and performance.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'technical', name: 'Technical' }, { id: 'hardware', name: 'Hardware' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'IBM Plex Mono, monospace', body: 'DM Sans, sans-serif' },
    colors: { primary: '#111315', background: '#e9ece8', accent: '#b7ff3c' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'COMPONENTS / SYSTEMS / PERFORMANCE' } },
    { id: 's2', type: 'navbar', props: { brand: 'CIRCUIT', style: 'utility' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'BUILT TO SPEC.', 
      subtitle: 'Hardware engineered around performance, compatibility and control.', 
      image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore Hardware' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'SYSTEM CATEGORIES', 
      categories: [
        { name: 'Laptops', image: 'https://images.unsplash.com/photo-1593642702821-c823b13eb2a2?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Displays', image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Components', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Peripherals', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb5c9023?auto=format&fit=crop&q=80&w=600' },
        { name: 'Networking', image: 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=600' },
        { name: 'Storage', image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'chk1', name: 'Workstation M1', description: 'Intel i9 / 64GB RAM / RTX 4080', price: 2899, imageUrl: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&q=80&w=600' },
        { id: 'chk2', name: 'ProDisplay 27', description: '4K IPS / 99% DCI-P3 / 144Hz', price: 699, imageUrl: 'https://images.unsplash.com/photo-1552831388-6a0b35077328?auto=format&fit=crop&q=80&w=600' },
        { id: 'chk3', name: 'MechBoard TKL', description: 'Hot-swappable MX Cherry', price: 149, imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb5c9023?auto=format&fit=crop&q=80&w=600' },
        { id: 'chk4', name: 'NetCore AXE11000', description: 'Tri-Band Wi-Fi 6E Router', price: 349, imageUrl: 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'specification-grid', props: { 
      title: 'METRICS: WORKSTATION M1', 
      specs: [
        { label: 'Processor', value: 'Intel Core i9-13900K (24 Cores)' }, 
        { label: 'Graphics', value: 'NVIDIA RTX 4080 16GB GDDR6X' }, 
        { label: 'Memory', value: '64GB DDR5-6000MHz' }, 
        { label: 'Storage', value: '2TB PCIe Gen4 NVMe M.2 SSD' }, 
        { label: 'Networking', value: '10GbE LAN, Wi-Fi 6E' },
        { label: 'Ports', value: '2x Thunderbolt 4, 6x USB-A 3.2' }
      ] 
    } },
    { id: 's7', type: 'bento-grid', props: { 
      title: 'SYSTEM BUILDER',
      items: [
        { title: 'Core Architecture', description: 'Motherboards & Platforms', size: 'large', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800' },
        { title: 'Graphics Processing', description: 'GPUs & Acceleration', size: 'small', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400' },
        { title: 'Volatile Memory', description: 'DDR5 Kits', size: 'small', image: 'https://images.unsplash.com/photo-1562976540-1502f6e4a282?auto=format&fit=crop&q=80&w=400' },
        { title: 'Power Delivery', description: '80+ Platinum PSUs', size: 'small', image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's8', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800', 
      name: 'Circuit RTX 900', 
      category: 'Graphics Card', 
      description: 'Engineered for extreme rendering pipelines and high-framerate simulation. Features a triple-fan cooling array and vapor chamber technology.', 
      price: 1599, 
      features: ['24GB VRAM', 'PCIe 5.0 x16', '3x DisplayPort 1.4a'], 
      badge: 'In Stock',
      imageRight: true
    } },
    { id: 's9', type: 'feature-comparison', props: { 
      title: 'I/O COMPATIBILITY MATRIX', 
      products: [
        { name: 'Basic Hub', price: 49 }, 
        { name: 'Pro Dock', price: 199, isHighlighted: true }, 
        { name: 'Thunderbolt Station', price: 349 }
      ], 
      rows: [
        { label: 'Host Interface', values: ['USB-C 3.2', 'USB-C Gen 2', 'Thunderbolt 4'] }, 
        { label: 'Display Output', values: ['1x HDMI 4K@30', '2x HDMI 4K@60', '2x DP 8K@60'] }, 
        { label: 'USB-A Ports', values: ['3x USB 3.0', '4x USB 3.2 Gen 1', '5x USB 3.2 Gen 2'] },
        { label: 'Power Delivery', values: ['Pass-through 60W', '100W Integrated', '140W PD 3.1'] }
      ] 
    } },
    { id: 's10', type: 'catalog', props: {
      products: [
        { id: 'cp1', name: 'UltraWide 34"', description: 'WQHD Curved Monitor', price: 799, imageUrl: 'https://images.unsplash.com/photo-1552831388-6a0b35077328?auto=format&fit=crop&q=80&w=600' },
        { id: 'cp2', name: 'Precision Mouse', description: '16000 DPI Sensor', price: 89, imageUrl: 'https://images.unsplash.com/photo-1527814050087-37938154791f?auto=format&fit=crop&q=80&w=600' },
        { id: 'cp3', name: 'Vision Pro Cam', description: '4K/60fps Webcam', price: 199, imageUrl: 'https://images.unsplash.com/photo-1596752763294-f252ebbf77d7?auto=format&fit=crop&q=80&w=600' },
        { id: 'cp4', name: 'Thunderbolt 4 Hub', description: '40Gbps Data Transfer', price: 299, imageUrl: 'https://images.unsplash.com/photo-1596753063548-8422116035ec?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's11', type: 'editorial-grid', props: { 
      title: 'CONNECTIVITY LAB', 
      images: [
        'https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=600', 
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1596753063548-8422116035ec?auto=format&fit=crop&q=80&w=600'
      ] 
    } },
    { id: 's12', type: 'split-hero', props: { 
      title: 'Every connection matters.', 
      subtitle: 'We engineer our systems to ensure zero bottlenecks. From memory timings to PCIe lane distribution, every trace is optimized for maximum throughput.', 
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Read Documentation' 
    } },
    { id: 's13', type: 'catalog', props: {
      products: [
        { id: 'ce1', name: 'Circuit NVMe 2TB', description: '7300MB/s Read Speed', price: 189, imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600' },
        { id: 'ce2', name: 'Circuit Ext-SSD 1TB', description: 'Rugged USB-C 3.2', price: 149, imageUrl: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=600' },
        { id: 'ce3', name: 'Thermal Compound', description: 'Liquid Metal Paste', price: 19, imageUrl: 'https://images.unsplash.com/photo-1611078449428-79d123e7dc3f?auto=format&fit=crop&q=80&w=600' },
        { id: 'ce4', name: 'Thunderbolt 4 Cable', description: 'Active 2m Cord', price: 39, imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's14', type: 'bento-grid', props: { 
      title: 'THE CIRCUIT STANDARD',
      items: [
        { title: 'Specification-First', description: 'No hidden specs. Full datasheets provided for every component.', size: 'small', image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=400' },
        { title: 'Clear Compatibility', description: 'Validated system builds to guarantee hardware synergy.', size: 'small', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400' },
        { title: 'Modular Hardware', description: 'Easily upgradable and designed for longevity.', size: 'small', image: 'https://images.unsplash.com/photo-1562976540-1502f6e4a282?auto=format&fit=crop&q=80&w=400' },
        { title: 'Performance-Focused', description: 'No thermal throttling. Tested under sustained load.', size: 'small', image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's15', type: 'newsletter', props: {} },
    { id: 's16', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Workstations', href: '#workstations' },
    { label: 'Components', href: '#components' },
    { label: 'Networking', href: '#networking' },
    { label: 'Documentation', href: '#docs' },
  ],
  features: [
    { id: 'compare', label: 'Matrix' },
    { id: 'support', label: 'Support' },
    { id: 'cart', label: 'Cart' },
  ]
}
