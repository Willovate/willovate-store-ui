import { cafeImages } from './cafe-images'

export type CafeDrink = { name: string; detail: string; price: string; category: string; image: string }

const base: Record<string, Omit<CafeDrink, 'image'>[]> = {
  'brew-house': [
    { name: 'Blackline Espresso', detail: 'Chocolate, cherry and a long finish.', price: '$4', category: 'Espresso' },
    { name: 'Kenya Nyeri', detail: 'Washed single origin, citrus and panela.', price: '$22', category: 'Beans' },
    { name: 'Cold Brew Tonic', detail: 'Slow-steeped coffee and grapefruit tonic.', price: '$6', category: 'Cold' },
    { name: 'Cacao Cortado', detail: 'Short milk coffee with a dark-cocoa finish.', price: '$5', category: 'Espresso' },
    { name: 'Roaster’s Flight', detail: 'Three half cups from this week’s bar.', price: '$12', category: 'Tasting' },
    { name: 'Miso Maple Cookie', detail: 'Brown butter, white miso and maple sugar.', price: '$4', category: 'Bakery' },
  ],
  'corner-cafe': [
    { name: 'Iced Matcha', detail: 'Ceremonial matcha, milk and vanilla.', price: '$6', category: 'Drinks' },
    { name: 'Lemon Poppy Loaf', detail: 'Bright lemon glaze, baked this morning.', price: '$5', category: 'Bakery' },
    { name: 'Market Breakfast', detail: 'Eggs, greens and toasted sourdough.', price: '$12', category: 'Kitchen' },
    { name: 'Rosemary Flat White', detail: 'Silky espresso with a herb-sugar whisper.', price: '$5', category: 'Drinks' },
    { name: 'Pear Almond Tart', detail: 'Frangipane, poached pear and flaky crust.', price: '$6', category: 'Bakery' },
    { name: 'Greenhouse Toast', detail: 'Whipped feta, peas, mint and lemon.', price: '$11', category: 'Kitchen' },
  ],
  'latte-lane': [
    { name: 'Terracotta Latte', detail: 'Espresso, cinnamon caramel and oat foam.', price: '$6', category: 'Lattes' },
    { name: 'Cardamom Bun', detail: 'Twisted daily with orange sugar.', price: '$5', category: 'Bakes' },
    { name: 'Peach Fizz', detail: 'Cold brew, peach and sparkling water.', price: '$6', category: 'Coolers' },
    { name: 'Strawberry Cloud', detail: 'Iced milk, strawberry cream and espresso.', price: '$7', category: 'Lattes' },
    { name: 'Jammy Toastie', detail: 'Raspberry jam, mascarpone and sea salt.', price: '$7', category: 'Bakes' },
    { name: 'Lime Disco Soda', detail: 'Lime, mint, bubbles and a tiny umbrella.', price: '$5', category: 'Coolers' },
  ],
  'the-daily-grind': [
    { name: 'Double Espresso', detail: 'Dark chocolate, caramel, no nonsense.', price: '$4', category: 'Hot' },
    { name: 'Nitro Cold Brew', detail: 'Velvet texture, big roast character.', price: '$6', category: 'Cold' },
    { name: 'Roast Club 01', detail: 'A monthly 250g drop for regulars.', price: '$18', category: 'Beans' },
    { name: 'Overtime Americano', detail: 'Long, hot and engineered for the inbox.', price: '$4', category: 'Hot' },
    { name: 'Oat Flat White', detail: 'Dense microfoam, deep caramel sweetness.', price: '$5', category: 'Hot' },
    { name: 'Midnight Blend', detail: '250g of molasses, walnut and late-night fuel.', price: '$16', category: 'Beans' },
  ],
}

export const getCafeMenu = (id: string): CafeDrink[] => (base[id] ?? []).map((item, index) => ({ ...item, image: cafeImages[id].menu[index] }))
