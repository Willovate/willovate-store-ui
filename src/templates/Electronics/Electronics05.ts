import type { TemplateConfig } from '../../types/template'

export const Electronics05: TemplateConfig = {
  id: 'electronics-05',
  name: 'Luma',
  description: 'A premium personal-technology marketplace built around calm daily life, wellness, and morning-to-night routines.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'lifestyle', name: 'Lifestyle' }, { id: 'wellness', name: 'Wellness' }, { id: 'personal', name: 'Personal' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'DM Serif Display, serif', body: 'Albert Sans, sans-serif' },
    colors: { primary: '#30282B', background: '#F8F4F1', accent: '#C9827B' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Elevate your daily routine. Complimentary shipping on all personal audio and wellness devices.' } },
    { id: 's2', type: 'navbar', props: { brand: 'LUMA', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Made for the rhythm of your day.', 
      subtitle: 'Beautifully minimal personal technology designed to fit quietly and seamlessly into your everyday life.', 
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop Your Routine', 
      categories: [
        { name: 'Morning', image: 'https://images.unsplash.com/photo-1505739998589-00fe190cece5?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Focus', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Move', image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Listen', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600' },
        { name: 'Recover', image: 'https://images.unsplash.com/photo-1524135329990-07660cd5bf10?auto=format&fit=crop&q=80&w=600' },
        { name: 'Unwind', image: 'https://images.unsplash.com/photo-1515022361661-bc7306eb5535?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'catalog', props: {
      title: 'Personal Audio',
      products: [
        { id: 'a1', name: 'Luma Silence Over-Ear', description: 'Adaptive Noise Cancellation', price: 349, imageUrl: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=600' },
        { id: 'a2', name: 'Aura True Wireless', description: 'All-Day Comfort Fit', price: 179, imageUrl: 'https://images.unsplash.com/photo-1608223653139-494b914d3393?auto=format&fit=crop&q=80&w=600' },
        { id: 'a3', name: 'Resonance Home Speaker', description: 'Room-Filling Warmth', price: 249, imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'catalog', props: {
      title: 'Wearables',
      products: [
        { id: 'w1', name: 'Vitality Smart Watch', description: 'Holistic Health Tracking', price: 299, imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=600' },
        { id: 'w2', name: 'Minimal Fitness Band', description: 'Discreet Activity Monitor', price: 99, imageUrl: 'https://images.unsplash.com/photo-1557180295-763d25626a8d?auto=format&fit=crop&q=80&w=600' },
        { id: 'w3', name: 'Sleep & Recovery Ring', description: 'Advanced Nightly Insights', price: 299, imageUrl: 'https://images.unsplash.com/photo-1603513360481-98782a22bece?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'bento-grid', props: { 
      title: 'Morning Technology',
      items: [
        { title: 'Gentle Awakening', description: 'Sunrise simulation alarm clock.', size: 'large', image: 'https://images.unsplash.com/photo-1584615377546-a36ff8363be5?auto=format&fit=crop&q=80&w=800' },
        { title: 'Valet Tray', description: 'Qi-certified wireless charging mat.', size: 'small', image: 'https://images.unsplash.com/photo-1610425712176-59b34a6efc19?auto=format&fit=crop&q=80&w=400' },
        { title: 'Morning Air', description: 'Smart ultrasonic diffuser.', size: 'small', image: 'https://images.unsplash.com/photo-1582215394236-4e5a953e5dc7?auto=format&fit=crop&q=80&w=400' },
        { title: 'Morning Audio', description: 'Warm sound to start the day.', size: 'small', image: 'https://images.unsplash.com/photo-1544837562-b903e07f6f56?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's8', type: 'catalog', props: {
      title: 'Focus & Productivity',
      products: [
        { id: 'f1', name: 'Clarity Personal Display', description: 'Paper-Like Matte Finish', price: 499, imageUrl: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&q=80&w=600' },
        { id: 'f2', name: 'Tactile Keyboard', description: 'Quiet Mechanical Switches', price: 149, imageUrl: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fit=crop&q=80&w=600' },
        { id: 'f3', name: 'Focus Headphones', description: 'Distraction-Free Audio', price: 299, imageUrl: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'Move With You',
      products: [
        { id: 'm1', name: 'Active True Wireless', description: 'Secure Fit for Movement', price: 169, imageUrl: 'https://images.unsplash.com/photo-1628205739504-20d40faee887?auto=format&fit=crop&q=80&w=600' },
        { id: 'm2', name: 'Pace Sport Watch', description: 'GPS & Heart Rate', price: 249, imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?auto=format&fit=crop&q=80&w=600' },
        { id: 'm3', name: 'Smart Hydration', description: 'UV Purification Tech', price: 89, imageUrl: 'https://images.unsplash.com/photo-1545665277-5937489579f2?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'catalog', props: {
      title: 'Sleep & Recovery',
      products: [
        { id: 'r1', name: 'Blackout Sleep Mask', description: 'Integrated Binaural Beats', price: 129, imageUrl: 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&q=80&w=600' },
        { id: 'r2', name: 'Percussion Massager', description: 'Ultra-Quiet Muscle Relief', price: 199, imageUrl: 'https://images.unsplash.com/photo-1611756515865-eb738fba9006?auto=format&fit=crop&q=80&w=600' },
        { id: 'r3', name: 'Ambient Sound Machine', description: 'Organic Sleep Sounds', price: 79, imageUrl: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's11', type: 'editorial-grid', props: { 
      title: 'Personal Tech Essentials', 
      images: [
        'https://images.unsplash.com/photo-1518331539949-6f2bfbdc32ce?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1507206130118-b5907f817163?auto=format&fit=crop&q=80&w=800'
      ] 
    } },
    { id: 's12', type: 'bento-grid', props: { 
      title: 'Build Your Routine',
      items: [
        { title: 'The Morning Ritual', description: 'Wake up naturally.', size: 'small', image: 'https://images.unsplash.com/photo-1517420879255-ae465737bfa3?auto=format&fit=crop&q=80&w=400' },
        { title: 'The Focus Hour', description: 'Block out the noise.', size: 'small', image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=400' },
        { title: 'The Daily Movement', description: 'Track your progress.', size: 'small', image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=400' },
        { title: 'The Evening Wind Down', description: 'Prepare for rest.', size: 'small', image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's13', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=800', 
      name: 'Luma Sleep Ring', 
      category: 'Wellness Wearable', 
      description: 'Crafted from titanium and completely unobtrusive. The Luma Sleep Ring monitors your heart rate variability, temperature trends, and sleep stages to help you understand your body\'s natural rhythm.', 
      price: 299, 
      features: ['7-Day Battery Life', 'Medical-Grade Sensors', 'Water Resistant to 100m'], 
      badge: 'Bestseller',
      imageRight: false
    } },
    { id: 's14', type: 'story', props: { 
      title: 'Technology that breathes with you.', 
      text: 'We believe that the devices you use every day shouldn\'t demand your attention—they should support your intentions. By focusing on tactile materials, calm interfaces, and seamless integration, we create technology that feels less like a gadget and more like a natural extension of your life.', 
      image: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?auto=format&fit=crop&q=80&w=1600' 
    } },
    { id: 's15', type: 'testimonials', props: { 
      title: 'Customer Stories', 
      testimonials: [
        { quote: 'The Sunrise Alarm completely changed my mornings. I wake up feeling rested rather than startled. It is such a simple, beautiful piece of technology.', author: 'Sarah M.' },
        { quote: 'I wear the Sleep Ring every day. It looks like a piece of minimal jewelry, but the insights it provides into my recovery have been invaluable.', author: 'David L.' }
      ] 
    } },
    { id: 's16', type: 'newsletter', props: { } },
    { id: 's17', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Morning', href: '#morning' },
    { label: 'Focus', href: '#focus' },
    { label: 'Move', href: '#move' },
    { label: 'Unwind', href: '#unwind' },
  ],
  features: [
    { id: 'support', label: 'Support' },
    { id: 'cart', label: 'Cart' },
  ]
}
