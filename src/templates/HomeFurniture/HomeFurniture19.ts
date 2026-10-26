import type { TemplateConfig } from '../../types/template'

export const HomeFurniture19: TemplateConfig = {
  id: 'habitat-studio',
  name: 'Habitat Studio',
  description: 'Interior design and home styling marketplace. Design-studio aesthetic.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'studio', name: 'Studio' }, { id: 'design', name: 'Design' }, { id: 'architectural', name: 'Architectural' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#000000', background: '#f4f4f5', accent: '#71717a' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Complimentary delivery on orders over ₹25,000. Architectural consultations available.' } },
    { id: 's2', type: 'navbar', props: { brand: 'HABITAT STUDIO', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: {
      title: 'Objects for Considered Spaces',
      subtitle: 'Sculptural furniture and raw materials designed for architectural environments.',
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Explore Collection'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Collections',
      categories: [
        { name: 'Seating', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
        { name: 'Tables', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600' },
        { name: 'Storage', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' },
        { name: 'Objects', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600' },
        { name: 'Outdoor', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'bento-grid', props: {
      title: 'Material / Form / Function',
      items: [
        { title: 'Concrete', description: 'Raw and foundational.', size: 'large', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800' },
        { title: 'Oak', description: 'Warm geometry.', size: 'small', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400' },
        { title: 'Travertine', description: 'Carved from stone.', size: 'small', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400' },
        { title: 'Steel', description: 'Industrial precision.', size: 'small', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400' },
        { title: 'Glass', description: 'Light and transparency.', size: 'small', image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      name: 'Monument Lounge Chair',
      category: 'Seating',
      description: 'A sculptural statement piece defined by its stark geometry and negative space. Cast from lightweight concrete with a hand-polished finish.',
      price: 3400,
      features: ['Architectural proportions', 'Hand-finished concrete', 'Suitable for indoor and outdoor'],
      imageRight: true
    } },
    { id: 's7', type: 'shop-the-look', props: {
      title: 'Concrete Residence',
      subtitle: 'Shop our latest styled room.',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 60, product: { name: 'Boucle Sofa', price: 2200, imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=600' } },
        { x: 50, y: 75, product: { name: 'Low Plinth Table', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=600' } },
        { x: 75, y: 40, product: { name: 'Linear Floor Lamp', price: 850, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600' } },
        { x: 60, y: 55, product: { name: 'Geometric Object', price: 250, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's8', type: 'catalog', props: {
      title: 'Architectural Furniture & Objects',
      products: [
        { id: 'h19_1', name: 'Modular Lounge Chair', description: 'Sculptural Bouclé & Minimal Steel Frame', price: 2200, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_2', name: 'Travertine Side Table', description: 'Carved Solid Porous Stone Column', price: 1250, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_3', name: 'Linear Pendant', description: 'Minimalist Anodized Extruded Aluminum Fixture', price: 850, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_4', name: 'Oak Credenza', description: 'Solid White Oak Low Storage Unit with Hidden Touch Latches', price: 3100, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_5', name: 'Steel Console', description: 'Laser-Folded Architectural Raw Sheet Steel', price: 1600, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_6', name: 'Sculptural Floor Lamp', description: 'Counterweighted Solid Brass Arm & Cast Base', price: 920, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_7', name: 'Stone Plinth', description: 'Honed Limestone Display Cube 40cm', price: 540, category: 'Objects', imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_8', name: 'Low Platform Sofa', description: 'Chalk Linen Low Sectional with Wide Track Arms', price: 4200, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_9', name: 'Monument Concrete Lounge Chair', description: 'Cast Lightweight Architectural Concrete Shell', price: 3400, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_10', name: 'Monolithic Dining Table', description: 'Blackened Oak with Massive Cylindrical Pillar Legs', price: 4800, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_11', name: 'Minimal High-Back Dining Chair', description: 'Welded Steel Rod Frame & Saddle Leather Back', price: 890, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_12', name: 'Travertine Cocktail Table', description: 'Low Rectangular Stepped Slab with Honed Bevel', price: 2100, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_13', name: 'Architectural Tall Bookcase', description: 'Open Grid Raw Anodized Aluminum 6-Tier', price: 2600, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_14', name: 'Disc Ceiling Flush Mount', description: 'Hand-Spun Solid Brass Reflector with Opal Glass Sphere', price: 640, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_15', name: 'Cast Bronze Object 01', description: 'Numbered Studio Edition Lost-Wax Cast Bronze Sculptural Form', price: 480, category: 'Objects', imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_16', name: 'Outdoor Concrete Fire Vessel', description: 'Weather-Resistant Composite Stone Low Fire Bowl', price: 1750, category: 'Outdoor', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'editorial-grid', props: {
      title: 'Studio Journal',
      images: [
        'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600'
      ]
    } },
    { id: 's10', type: 'story', props: {
      title: 'Designed Around Space',
      description: 'Habitat Studio approaches furniture as part of an architectural environment rather than as isolated objects. Our pieces are defined by their form, material, and proportion, designed to integrate seamlessly into contemporary spaces.'
    } },
    { id: 's11', type: 'testimonials', props: {
      title: 'Perspectives',
      testimonials: [
        { quote: 'The proportions are exceptional. The piece feels designed for the room rather than simply placed inside it.', author: 'Architectural Digest' },
        { quote: 'Raw materials presented with absolute precision. A brilliant integration of industrial scale and residential comfort.', author: 'Design Anthology' },
        { quote: 'Habitat Studio continues to blur the line between structural architecture and interior objects.', author: 'Wallpaper*' }
      ]
    } },
    { id: 's12', type: 'newsletter', props: { title: 'Notes on Space', subtitle: 'Subscribe to our journal for material studies, studio projects, and new collections.' } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Objects', href: '#catalog' },
    { label: 'Collections', href: '#categories' },
    { label: 'Journal', href: '#journal' },
    { label: 'About', href: '#story' }
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}
