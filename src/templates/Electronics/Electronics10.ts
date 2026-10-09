import type { TemplateConfig } from '../../types/template'

export const Electronics10: TemplateConfig = {
  id: 'electronics-10',
  name: 'Axis',
  description: 'A premium cinematic media and home entertainment marketplace featuring atmospheric layouts and sophisticated minimal design.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'cinema', name: 'Cinema' }, { id: 'entertainment', name: 'Entertainment' }, { id: 'premium', name: 'Premium' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Playfair Display, serif', body: 'Lato, sans-serif' },
    colors: { primary: '#171717', background: '#F2F0EB', accent: '#B89B5E' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Experience uncompromised visual fidelity. Complimentary installation on flagship displays.' } },
    { id: 's2', type: 'navbar', props: { brand: 'AXIS', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: { 
      title: 'Cinema, without leaving home.', 
      subtitle: 'Premium projectors, large-format displays, and immersive audio systems engineered for the modern media room.', 
      image: 'https://images.unsplash.com/photo-1532372576444-ea6ba6a78241?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Design Your Theater' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop the Experience', 
      categories: [
        { name: 'Dedicated Cinema', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Premium Displays', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Projection', image: 'https://images.unsplash.com/photo-1601058268499-e52658b8ebf8?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Media Streaming', image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=600' },
        { name: 'Control & Accessories', image: 'https://images.unsplash.com/photo-1558485292-0b7952e4f016?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'split-hero', props: { 
      title: 'The Reference System', 
      subtitle: 'Calibrated exactly to director\'s intent. Our reference setups provide flawless color accuracy and infinite contrast.', 
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'View Reference Systems' 
    } },
    { id: 's6', type: 'catalog', props: {
      title: 'The Screen',
      products: [
        { id: 'd1', name: 'Axis 83" Master Series', description: 'Self-Lit OLED TV', price: 4999, imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600' },
        { id: 'd2', name: 'Reference 8K LED', description: 'Quantum Dot Technology', price: 3499, imageUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=600' },
        { id: 'd3', name: 'Gallery Wall Display', description: 'Zero-Gap Mounting', price: 2199, imageUrl: 'https://images.unsplash.com/photo-1588661601614-25e24bcf3c95?auto=format&fit=crop&q=80&w=600' },
        { id: 'd4', name: 'Modular MicroLED', description: 'Seamless Visual Canvas', price: 12999, imageUrl: 'https://images.unsplash.com/photo-1623916960812-c28f64585cbb?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'Projection Room',
      products: [
        { id: 'p1', name: 'Native 4K Laser', description: '2500 ANSI Lumens', price: 5999, imageUrl: 'https://images.unsplash.com/photo-1599580665578-83b6324d4554?auto=format&fit=crop&q=80&w=600' },
        { id: 'p2', name: 'Ultra Short Throw', description: '120" Screen from 10 inches', price: 2999, imageUrl: 'https://images.unsplash.com/photo-1620023608240-f1d200fcb4ec?auto=format&fit=crop&q=80&w=600' },
        { id: 'p3', name: 'Acoustically Transparent Screen', description: 'Edge-Free Tensioned', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'catalog', props: {
      title: 'Streaming & Media',
      products: [
        { id: 'm1', name: 'Reference 4K Disc Player', description: 'Dolby Vision Support', price: 899, imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' },
        { id: 'm2', name: 'Media Hub Pro', description: 'Lossless Audio Passthrough', price: 199, imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600' },
        { id: 'm3', name: 'Cinematic Soundbar', description: '11.1.4 Channel Object Audio', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'bento-grid', props: { 
      title: 'Build Your Cinema',
      items: [
        { title: 'The Display Canvas', description: 'Stunning visual fidelity.', size: 'large', image: 'https://images.unsplash.com/photo-1571412035349-4171ea738361?auto=format&fit=crop&q=80&w=800' },
        { title: 'Acoustic Environment', description: 'Immersive sound.', size: 'small', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
        { title: 'Media Engines', description: 'Content hubs.', size: 'small', image: 'https://images.unsplash.com/photo-1528644485501-49b068d90fa6?auto=format&fit=crop&q=80&w=400' },
        { title: 'Atmosphere', description: 'Lighting control.', size: 'small', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's10', type: 'bento-grid', props: { 
      title: 'Cinema by Room',
      items: [
        { title: 'The Living Room', description: 'Discreet technology that blends into architecture.', size: 'small', image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=400' },
        { title: 'Dedicated Theater', description: 'Uncompromised projection and acoustic treatment.', size: 'small', image: 'https://images.unsplash.com/photo-1489599875479-82a83fd760dc?auto=format&fit=crop&q=80&w=400' },
        { title: 'The Bedroom', description: 'Minimalist visual displays and soft soundbars.', size: 'small', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=400' },
        { title: 'Compact Space', description: 'Maximum immersion in smaller footprints.', size: 'small', image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's11', type: 'feature-comparison', props: { 
      title: 'Visual Technology', 
      products: [
        { name: 'Master OLED', price: 4999, isHighlighted: true }, 
        { name: 'Reference LED', price: 3499 }, 
        { name: '4K Projection', price: 5999 }
      ], 
      rows: [
        { label: 'Contrast Ratio', values: ['Infinite', '1M:1 Dynamic', '2.5M:1 Dynamic'] }, 
        { label: 'Peak Brightness', values: ['1000 nits', '2500 nits', '2500 lumens'] }, 
        { label: 'Ideal Environment', values: ['Controlled Lighting', 'Bright Rooms', 'Dark Theater'] },
        { label: 'Size Options', values: ['55" - 83"', '65" - 98"', '100" - 150"'] }
      ] 
    } },
    { id: 's12', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&q=80&w=800', 
      name: 'Axis Prime Projector', 
      category: 'Flagship Projection', 
      description: 'The pinnacle of home cinema. Utilizing a tri-color laser light source to cover 107% of the BT.2020 color space, delivering cinematic perfection to screens up to 150 inches.', 
      price: 5999, 
      features: ['Native 4K Resolution', 'Tri-Color Laser', 'HDR10+ Dynamic Tone Mapping'], 
      badge: 'Master Series',
      imageRight: false
    } },
    { id: 's13', type: 'story', props: { 
      title: 'The modern movie night.', 
      text: 'Film is meant to be an immersive experience. We curate systems that don\'t just play movies, but transport you directly into the director\'s vision. Pure blacks, vibrant colors, and sound that moves around you.', 
      image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?auto=format&fit=crop&q=80&w=1600' 
    } },
    { id: 's14', type: 'testimonials', props: { 
      title: 'Customer Cinema Spaces', 
      testimonials: [
        { quote: 'The Master OLED completely transformed our living room. It acts as a piece of art during the day, and a breathtaking cinema display at night.', author: 'Robert M.' },
        { quote: 'Axis helped us design a dedicated theater room that actually outperforms our local commercial cinema. The acoustic clarity is unmatched.', author: 'Jonathan K.' }
      ] 
    } },
    { id: 's15', type: 'editorial-grid', props: { 
      title: 'Inspiration Gallery', 
      images: [
        'https://images.unsplash.com/photo-1598928506311-c55dd12faea3?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd05?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600566752355-385eebc5d9f0?auto=format&fit=crop&q=80&w=800'
      ] 
    } },
    { id: 's16', type: 'newsletter', props: { } },
    { id: 's17', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Displays', href: '#displays' },
    { label: 'Projectors', href: '#projectors' },
    { label: 'Audio', href: '#audio' },
    { label: 'Streaming', href: '#streaming' },
  ],
  features: [
    { id: 'support', label: 'Support' },
    { id: 'cart', label: 'Cart' },
  ]
}
