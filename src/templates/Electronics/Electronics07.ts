import type { TemplateConfig } from '../../types/template'

export const Electronics07: TemplateConfig = {
  id: 'electronics-07',
  name: 'Aeris',
  description: 'A premium smart-home and connected living marketplace featuring warm architectural design, ambient intelligence, and calm aesthetic layouts.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'smart-home', name: 'Smart Home' }, { id: 'interior', name: 'Interior' }, { id: 'ambient', name: 'Ambient' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Cormorant Garamond, serif', body: 'Manrope, sans-serif' },
    colors: { primary: '#24302A', background: '#F4F1EA', accent: '#D4A373' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Elevate your home. The next generation of connected living.' } },
    { id: 's2', type: 'navbar', props: { brand: 'AERIS', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Technology, quietly at home.', 
      subtitle: 'Discover ambient sensors, intelligent lighting, and automated climate systems that blend seamlessly into your interior design.', 
      image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop Ecosystem' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Intelligent Living', 
      categories: [
        { name: 'Ambient Lighting', image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Climate Control', image: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Home Security', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Connected Audio', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=600' },
        { name: 'Smart Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' },
        { name: 'Automation Hubs', image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'full-hero', props: { 
      title: 'The Connected Ecosystem', 
      subtitle: 'One seamless application. Absolute control over your environment.', 
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'View Automation' 
    } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'l1', name: 'Aura Pendant', description: 'Adaptive Color Temperature', price: 249, imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e917428fbb?auto=format&fit=crop&q=80&w=600' },
        { id: 'l2', name: 'Lumina Strip', description: 'Architectural Accent Lighting', price: 89, imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600' },
        { id: 'l3', name: 'Sol Floor Lamp', description: 'Circadian Rhythm Sync', price: 399, imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?auto=format&fit=crop&q=80&w=600' },
        { id: 'l4', name: 'Halo Sconce', description: 'Minimalist Wall Fixture', price: 159, imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'bento-grid', props: { 
      title: 'Connected Living Room',
      items: [
        { title: 'Acoustic Fidelity', description: 'Room-filling smart audio.', size: 'large', image: 'https://images.unsplash.com/photo-1543661845-d850c95029e2?auto=format&fit=crop&q=80&w=800' },
        { title: 'Central Command', description: 'Touch interfaces.', size: 'small', image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=400' },
        { title: 'Visual Media', description: 'Seamless casting.', size: 'small', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400' },
        { title: 'Automated Shades', description: 'Light control.', size: 'small', image: 'https://images.unsplash.com/photo-1502672260266-1c1585bd3abe?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's8', type: 'bento-grid', props: { 
      title: 'Responsive Environments',
      items: [
        { title: 'Morning', description: 'Blinds open, warm lights brighten gradually.', size: 'small', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400' },
        { title: 'Away', description: 'Security activates, climate shifts to eco-mode.', size: 'small', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400' },
        { title: 'Relax', description: 'Audio starts, lighting shifts to ambient amber.', size: 'small', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=400' },
        { title: 'Night', description: 'Doors lock, screens dim, house sleeps.', size: 'small', image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's9', type: 'catalog', props: {
      products: [
        { id: 'sec1', name: 'Aeris Cam Pro', description: '4K Object Recognition', price: 299, imageUrl: 'https://images.unsplash.com/photo-1557438159-51eecce89612?auto=format&fit=crop&q=80&w=600' },
        { id: 'sec2', name: 'Entry Sensor', description: 'Invisible Contact Sensor', price: 49, imageUrl: 'https://images.unsplash.com/photo-1582298538104-e3fb6b872b77?auto=format&fit=crop&q=80&w=600' },
        { id: 'sec3', name: 'Smart Deadbolt', description: 'Biometric Access', price: 229, imageUrl: 'https://images.unsplash.com/photo-1510525048601-526b3be31e4f?auto=format&fit=crop&q=80&w=600' },
        { id: 'sec4', name: 'Motion Detector', description: 'Pet-Immune Sensing', price: 59, imageUrl: 'https://images.unsplash.com/photo-1551651767-d5fdcb3ac92c?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Aeris Thermostat', description: 'Learning Climate Control', price: 249, imageUrl: 'https://images.unsplash.com/photo-1545259733-41f221415df5?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Air Purifier X', description: 'HEPA & VOC Filtration', price: 499, imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Smart Humidifier', description: 'Ultrasonic Mist', price: 129, imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Air Quality Monitor', description: 'CO2 & Particulate Tracking', price: 149, imageUrl: 'https://images.unsplash.com/photo-1592839719941-8e2651039d01?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's11', type: 'editorial-grid', props: { 
      title: 'Intelligent Kitchen', 
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1556909128-4dc01e0a9693?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1556910113-685d0d829dc7?auto=format&fit=crop&q=80&w=800'
      ] 
    } },
    { id: 's12', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', 
      name: 'Aeris Hub Core', 
      category: 'Automation', 
      description: 'The invisible brain of your home. Process automation routines locally without relying on the cloud, ensuring total privacy and instant response times.', 
      price: 199, 
      features: ['Local Processing', 'Thread / Matter Support', 'End-to-End Encryption'], 
      badge: 'New Release',
      imageRight: false
    } },
    { id: 's13', type: 'story', props: { 
      title: 'Designed to disappear.', 
      text: 'We believe that the best technology is the kind you never have to think about. Our devices are engineered with premium materials to complement your interior design, while operating quietly in the background to anticipate your needs.', 
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600' 
    } },
    { id: 's14', type: 'testimonials', props: { 
      title: 'Homeowner Stories', 
      testimonials: [
        { quote: 'Aeris completely changed how our home feels. The lighting adjusts naturally throughout the day, creating an atmosphere that is always perfectly calibrated.', author: 'Elena M.' },
        { quote: 'I love how beautifully the hardware blends into our living space. It is smart technology that respects architectural design.', author: 'David S.' }
      ] 
    } },
    { id: 's15', type: 'newsletter', props: { } },
    { id: 's16', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Lighting', href: '#lighting' },
    { label: 'Climate', href: '#climate' },
    { label: 'Security', href: '#security' },
    { label: 'Audio', href: '#audio' },
  ],
  features: [
    { id: 'support', label: 'Support' },
    { id: 'cart', label: 'Cart' },
  ]
}
