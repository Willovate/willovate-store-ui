import type { TemplateConfig } from '../../types/template'

export const Electronics04: TemplateConfig = {
  id: 'electronics-04',
  name: 'Circuit',
  description: 'A premium technical electronics marketplace designed for people who care about hardware, specifications, compatibility, and performance.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'technical', name: 'Technical' }, { id: 'hardware', name: 'Hardware' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'IBM Plex Mono, monospace', body: 'DM Sans, sans-serif' },
    colors: { primary: '#111315', background: '#e9ece8', accent: '#b7ff3c' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'COMPONENTS // ARCHITECTURES // SPECIFICATION-FIRST HARDWARE' } },
    { id: 's2', type: 'navbar', props: { brand: 'CIRCUIT', style: 'utility' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'BUILT TO SPEC.',
      subtitle: 'High-throughput workstations, silicon modules, and precision-engineered peripherals with zero bottlenecks.',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Configure System'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'SYSTEM CATEGORIES',
      categories: [
        { name: 'Laptops', image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&q=80&w=600' },
        { name: 'Displays', image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&q=80&w=600' },
        { name: 'Components', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600' },
        { name: 'Peripherals', image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?auto=format&fit=crop&q=80&w=600' },
        { name: 'Networking', image: 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=600' },
        { name: 'Storage', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      title: 'Validated Hardware Systems',
      products: [
        { id: 'chk1', name: 'Workstation M1', description: 'Intel i9 / 64GB RAM / RTX 4080', price: 2899, imageUrl: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&q=80&w=600' },
        { id: 'chk2', name: 'ProDisplay 27', description: '4K IPS / 99% DCI-P3 / 144Hz', price: 699, imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600' },
        { id: 'chk3', name: 'MechBoard TKL', description: 'Hot-swappable MX Cherry Switches', price: 149, imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600' },
        { id: 'chk4', name: 'NetCore AXE11000', description: 'Tri-Band Wi-Fi 6E Low-Latency Router', price: 349, imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'specification-grid', props: {
      title: 'HARDWARE TELEMETRY: WORKSTATION M1',
      specs: [
        { label: 'Processor', value: 'Intel Core i9-14900KS (24 Cores / 6.2GHz)' },
        { label: 'Graphics', value: 'NVIDIA RTX 4080 16GB GDDR6X' },
        { label: 'Volatile Memory', value: '64GB DDR5-6400MHz Dual-Channel' },
        { label: 'Storage Bus', value: '2TB PCIe Gen5 NVMe (12,400 MB/s)' },
        { label: 'Networking', value: 'Dual 10GbE LAN + Wi-Fi 6E' },
        { label: 'Thermal Design', value: '360mm Closed-Loop Liquid / <68°C Full Load' }
      ]
    } },
    { id: 's7', type: 'bento-grid', props: {
      title: 'SYSTEM ARCHITECTURE MATRIX',
      items: [
        { title: 'Core Architecture', description: 'Server-grade motherboards & sockets', size: 'large', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800' },
        { title: 'Graphics Processing', description: 'GPUs & compute acceleration arrays', size: 'small', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400' },
        { title: 'Volatile Memory', description: 'Overclocked low-latency DDR5 kits', size: 'small', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' },
        { title: 'Power Delivery', description: 'ATX 3.0 80+ Titanium certified PSUs', size: 'small', image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's8', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
      name: 'Circuit RTX 900 Ultra',
      category: 'Compute & Rendering',
      description: 'Engineered for extreme rendering pipelines and high-framerate simulation. Features a triple-fan cooling array, vapor chamber, and direct copper thermal interface.',
      price: 1599,
      features: ['24GB GDDR6X VRAM', 'PCIe 5.0 x16 Architecture', '3x DisplayPort 2.1 + 1x HDMI 2.1'],
      badge: 'In Stock',
      imageRight: true
    } },
    { id: 's9', type: 'feature-comparison', props: {
      title: 'THROUGHPUT & I/O COMPATIBILITY MATRIX',
      products: [
        { name: 'Basic Hub', price: 49 },
        { name: 'Pro Dock', price: 199, isHighlighted: true },
        { name: 'Thunderbolt Station', price: 349 }
      ],
      rows: [
        { label: 'Host Interface', values: ['USB-C 3.2 Gen 1 (5Gbps)', 'USB-C Gen 2 (10Gbps)', 'Thunderbolt 4 (40Gbps)'] },
        { label: 'Display Output', values: ['1x HDMI 4K@30Hz', '2x HDMI 4K@60Hz', '2x DP 8K@60Hz / 4K@144Hz'] },
        { label: 'USB-A Ports', values: ['3x USB 3.0 (5Gbps)', '4x USB 3.2 Gen 1', '5x USB 3.2 Gen 2 (10Gbps)'] },
        { label: 'Power Delivery', values: ['Pass-through 60W', '100W Integrated', '140W PD 3.1 Certified'] }
      ]
    } },
    { id: 's10', type: 'catalog', props: {
      title: 'Components & High-Speed Interconnects',
      products: [
        { id: 'ce1', name: 'Circuit NVMe Gen5 2TB', description: '12400MB/s Sequential Read Speed', price: 189, imageUrl: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&q=80&w=600' },
        { id: 'ce2', name: 'Circuit Ext-SSD 1TB', description: 'Rugged USB-C 3.2 Gen 2x2 Enclosure', price: 149, imageUrl: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=600' },
        { id: 'ce3', name: 'Thermal Compound Pro', description: 'Liquid Metal High-Conductivity Interface', price: 19, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600' },
        { id: 'ce4', name: 'Thunderbolt 4 Active Cable', description: 'Active 2m 40Gbps / 100W Power Delivery', price: 39, imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's11', type: 'newsletter', props: { title: 'HARDWARE TELEMETRY', subtitle: 'Receive verified driver updates, silicon benchmark reports, and system drops.' } },
    { id: 's12', type: 'footer', props: {} }
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
