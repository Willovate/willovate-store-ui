import type { TemplateConfig } from '../../types/template'

export const Electronics08: TemplateConfig = {
  id: 'electronics-08',
  name: 'Techflow',
  description: 'A premium technology workspace marketplace built for creators, developers, designers, and high-performance professionals.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'workspace', name: 'Workspace' }, { id: 'professional', name: 'Professional' }, { id: 'creator', name: 'Creator' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Bricolage Grotesque, sans-serif', body: 'Source Sans 3, sans-serif' },
    colors: { primary: '#252525', background: '#F7F5F0', accent: '#C65D32' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Elevate your workflow with professional-grade creator technology.' } },
    { id: 's2', type: 'navbar', props: { brand: 'TECHFLOW', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Build the space where your best work happens.', 
      subtitle: 'Premium workstation technology designed for professional creators, developers, and designers.', 
      image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop Workstations' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Workflow', 
      categories: [
        { name: 'Create', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Develop', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Edit', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=600' },
        { name: 'Record', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600' },
        { name: 'Collaborate', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'full-hero', props: { 
      title: 'The Modern Studio', 
      subtitle: 'Complete ecosystem integration for zero-friction creativity.', 
      image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore Setups' 
    } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'd1', name: 'ProColor 32" Display', description: 'Hardware Calibrated 4K', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&q=80&w=600' },
        { id: 'd2', name: 'Ultrawide Master 38"', description: 'Immersive Editing Canvas', price: 1599, imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=600' },
        { id: 'd3', name: 'Dual Monitor Arm', description: 'Gas-Spring Articulation', price: 249, imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600' },
        { id: 'd4', name: 'Reference Display 27"', description: '10-Bit HDR OLED', price: 2199, imageUrl: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'bento-grid', props: { 
      title: 'Input & Control',
      items: [
        { title: 'Mechanical Precision', description: 'Tactile typing for developers.', size: 'large', image: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?auto=format&fit=crop&q=80&w=800' },
        { title: 'Ergonomic Control', description: 'Vertical mouse.', size: 'small', image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?auto=format&fit=crop&q=80&w=400' },
        { title: 'Digital Canvas', description: 'Pro drawing tablets.', size: 'small', image: 'https://images.unsplash.com/photo-1580983584852-520e55648058?auto=format&fit=crop&q=80&w=400' },
        { title: 'Audio Surface', description: 'Tactile faders.', size: 'small', image: 'https://images.unsplash.com/photo-1516280440502-861f438eb140?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's8', type: 'catalog', props: {
      products: [
        { id: 'a1', name: 'Studio Condenser Mic', description: 'Cardioid Vocal Capture', price: 349, imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600' },
        { id: 'a2', name: 'USB Audio Interface', description: 'Low Latency Preamps', price: 229, imageUrl: 'https://images.unsplash.com/photo-1519782808034-7cecb1d061f0?auto=format&fit=crop&q=80&w=600' },
        { id: 'a3', name: 'Reference Headphones', description: 'Open-Back Monitoring', price: 499, imageUrl: 'https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?auto=format&fit=crop&q=80&w=600' },
        { id: 'a4', name: 'Active Studio Monitors', description: 'Flat Frequency Response', price: 699, imageUrl: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'editorial-grid', props: { 
      title: 'Developer Workspace', 
      images: [
        'https://images.unsplash.com/photo-1515347619152-19e42c55452d?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800'
      ] 
    } },
    { id: 's10', type: 'bento-grid', props: { 
      title: 'Build Your Desk',
      items: [
        { title: 'The Foundation', description: 'Solid wood standing desks.', size: 'large', image: 'https://images.unsplash.com/photo-1497215848121-70a4c28f323a?auto=format&fit=crop&q=80&w=800' },
        { title: 'Posture Support', description: 'Ergonomic seating.', size: 'small', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=400' },
        { title: 'Task Lighting', description: 'Eye-care lamps.', size: 'small', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400' },
        { title: 'Desk Accessories', description: 'Cable management.', size: 'small', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's11', type: 'feature-comparison', props: { 
      title: 'Professional Display Comparison', 
      products: [
        { name: 'ProColor 27"', price: 799 }, 
        { name: 'ProColor 32"', price: 1299, isHighlighted: true }, 
        { name: 'Reference OLED 27"', price: 2199 }
      ], 
      rows: [
        { label: 'Panel Type', values: ['IPS Black', 'IPS Black', 'OLED'] }, 
        { label: 'Color Gamut', values: ['98% DCI-P3', '99% DCI-P3', '100% Adobe RGB'] }, 
        { label: 'Connectivity', values: ['USB-C 90W PD', 'Thunderbolt 4', 'Thunderbolt 4'] },
        { label: 'Hardware Calibration', values: ['Supported', 'Integrated Sensor', 'Supported'] }
      ] 
    } },
    { id: 's12', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800', 
      name: 'Techflow Thunderbolt Dock', 
      category: 'Workspace Hub', 
      description: 'One cable to connect your entire professional studio. Delivers up to 140W of power while supporting dual 4K displays at 60Hz and ultra-fast NVMe storage.', 
      price: 349, 
      features: ['Dual 4K Support', '140W Power Delivery', 'Built-in SD Card Reader'], 
      badge: 'Bestseller',
      imageRight: false
    } },
    { id: 's13', type: 'story', props: { 
      title: 'Designed for deep work.', 
      text: 'Every professional knows that friction kills momentum. Our equipment is rigorously tested to ensure that the hardware never stands in the way of your next great idea.', 
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1600' 
    } },
    { id: 's14', type: 'testimonials', props: { 
      title: 'Creator Stories', 
      testimonials: [
        { quote: 'The ProColor display series fundamentally changed my color grading workflow. I trust it implicitly.', author: 'Marcus D., Video Editor' },
        { quote: 'Building my desk ecosystem through Techflow gave me the ergonomic focus I needed for long coding sessions.', author: 'Sarah K., Lead Developer' }
      ] 
    } },
    { id: 's15', type: 'newsletter', props: { } },
    { id: 's16', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Displays', href: '#displays' },
    { label: 'Audio', href: '#audio' },
    { label: 'Keyboards', href: '#keyboards' },
    { label: 'Workstations', href: '#workstations' },
  ],
  features: [
    { id: 'support', label: 'Support' },
    { id: 'cart', label: 'Cart' },
  ]
}
