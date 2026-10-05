import type { TemplateConfig } from '../../types/template'

export const Electronics09: TemplateConfig = {
  id: 'electronics-09',
  name: 'Orbit',
  description: 'A premium portable technology marketplace built for digital mobility, commuting, travel setups, and everyday carry.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'mobility', name: 'Mobility' }, { id: 'travel', name: 'Travel' }, { id: 'portable', name: 'Portable' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Outfit, sans-serif', body: 'Public Sans, sans-serif' },
    colors: { primary: '#17212B', background: '#F2F7FA', accent: '#1D9BF0' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Technology for wherever you\'re going. Free shipping on all travel kits.' } },
    { id: 's2', type: 'navbar', props: { brand: 'ORBIT', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Your world. Packed lighter.', 
      subtitle: 'Premium travel technology and everyday carry essentials designed to keep you moving without friction.', 
      image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop Travel Tech' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Journey', 
      categories: [
        { name: 'Commute', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Travel', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Work Anywhere', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Weekend', image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=600' },
        { name: 'Capture', image: 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&q=80&w=600' },
        { name: 'Relax', image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'bento-grid', props: { 
      title: 'Everyday Carry',
      items: [
        { title: 'The Essentials', description: 'Curated for the daily commute.', size: 'large', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800' },
        { title: 'True Wireless', description: 'Zero tangles.', size: 'small', image: 'https://images.unsplash.com/photo-1608223652618-9730eb5eb803?auto=format&fit=crop&q=80&w=400' },
        { title: 'Compact Power', description: 'Magnetic banks.', size: 'small', image: 'https://images.unsplash.com/photo-1609081524998-a1163e2d44cb?auto=format&fit=crop&q=80&w=400' },
        { title: 'Connected Time', description: 'Travel alerts on wrist.', size: 'small', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's6', type: 'catalog', props: {
      title: 'Audio on the Move',
      products: [
        { id: 'a1', name: 'Orbit ANC Over-Ear', description: '30-Hour Travel Battery', price: 299, imageUrl: 'https://images.unsplash.com/photo-1520170350707-b2da59970118?auto=format&fit=crop&q=80&w=600' },
        { id: 'a2', name: 'Pro Wireless Buds', description: 'Active Noise Cancellation', price: 199, imageUrl: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=600' },
        { id: 'a3', name: 'Compact Speaker', description: 'IP67 Waterproof', price: 129, imageUrl: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'a4', name: 'Aero Open-Ear', description: 'Ambient Awareness', price: 149, imageUrl: 'https://images.unsplash.com/photo-1505236273191-1dce886b01e9?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'Power Anywhere',
      products: [
        { id: 'p1', name: 'MagBank Pro', description: '10,000mAh Magnetic Wireless', price: 79, imageUrl: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=600' },
        { id: 'p2', name: 'GaN Travel Hub', description: '65W Multi-Port Fast Charge', price: 59, imageUrl: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&q=80&w=600' },
        { id: 'p3', name: 'Universal Adapter', description: '150+ Countries Compatible', price: 49, imageUrl: 'https://images.unsplash.com/photo-1585805562768-4505374465df?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'bento-grid', props: { 
      title: 'Work Anywhere',
      items: [
        { title: 'Mobile Productivity', description: 'Tablets designed to replace laptops on the road.', size: 'large', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800' },
        { title: 'Ultra-Light Computing', description: 'Sub-2lb laptops.', size: 'small', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400' },
        { title: 'Foldable Input', description: 'Travel keyboards.', size: 'small', image: 'https://images.unsplash.com/photo-1529336953128-a85760f58cb5?auto=format&fit=crop&q=80&w=400' },
        { title: 'Compact Display', description: '15" portable monitors.', size: 'small', image: 'https://images.unsplash.com/photo-1527443154391-607cf9eb76a5?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's9', type: 'catalog', props: {
      title: 'Capture the Journey',
      products: [
        { id: 'c1', name: 'Action Cam 360', description: 'Rugged Dual Lens', price: 399, imageUrl: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Travel Gimbal', description: 'Ultra-Compact Stabilizer', price: 149, imageUrl: 'https://images.unsplash.com/photo-1575005081014-998877526715?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Mini Drone', description: '249g Folding Quadcopter', price: 499, imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Pocket Creator Cam', description: '1-inch Sensor Compact', price: 749, imageUrl: 'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'editorial-grid', props: { 
      title: 'Travel Tech Kit', 
      images: [
        'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
      ] 
    } },
    { id: 's11', type: 'bento-grid', props: { 
      title: 'Connectivity Hub',
      items: [
        { title: 'Global 5G Hotspot', description: 'Stay online in 150+ countries.', size: 'small', image: 'https://images.unsplash.com/photo-1516428731057-08ab3475be8c?auto=format&fit=crop&q=80&w=400' },
        { title: 'Travel Router', description: 'Secure hotel Wi-Fi.', size: 'small', image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&q=80&w=400' },
        { title: 'Bluetooth Tracker', description: 'Never lose your bag.', size: 'small', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's12', type: 'catalog', props: {
      title: 'Portable Entertainment',
      products: [
        { id: 'e1', name: 'Orbit Handheld', description: 'Cloud Gaming Device', price: 349, imageUrl: 'https://images.unsplash.com/photo-1592840062402-4fc99b79412d?auto=format&fit=crop&q=80&w=600' },
        { id: 'e2', name: 'Oasis E-Reader', description: 'Glare-Free Paper Display', price: 179, imageUrl: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&fit=crop&q=80&w=600' },
        { id: 'e3', name: 'Travel VR Headset', description: 'Standalone Virtual Reality', price: 499, imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's13', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1504890001746-a9a68eda46e2?auto=format&fit=crop&q=80&w=800', 
      name: 'Orbit Aero Drone', 
      category: 'Travel Capture', 
      description: 'The ultimate travel companion. Folds down to the size of a smartphone while delivering stabilized 4K footage in any environment.', 
      price: 699, 
      features: ['Compact Folding Design', '35-Minute Flight Time', 'Intelligent Tracking'], 
      badge: 'Editor\'s Choice',
      imageRight: true
    } },
    { id: 's14', type: 'story', props: { 
      title: 'The art of traveling light.', 
      text: 'True mobility means never having to choose between capability and portability. We engineer our products to pack maximum performance into the smallest possible footprint, so you can go further without being weighed down.', 
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1600' 
    } },
    { id: 's15', type: 'testimonials', props: { 
      title: 'Customer Travel Stories', 
      testimonials: [
        { quote: 'The GaN Travel Hub replaced four different chargers in my bag. It\'s exactly what digital nomad life requires: simplicity and reliability.', author: 'Alex V., Remote Worker' },
        { quote: 'I never travel without the ANC Over-Ears. The battery literally lasts through a round-trip international flight.', author: 'Jamie L., Consultant' }
      ] 
    } },
    { id: 's16', type: 'newsletter', props: { } },
    { id: 's17', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Commute', href: '#commute' },
    { label: 'Travel', href: '#travel' },
    { label: 'Work', href: '#work' },
    { label: 'Capture', href: '#capture' },
  ],
  features: [
    { id: 'support', label: 'Support' },
    { id: 'cart', label: 'Cart' },
  ]
}
