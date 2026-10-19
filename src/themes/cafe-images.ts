const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`

export type CafeImageCollection = { hero: string; menu: [string, string, string, string, string, string]; story: string; gallery: [string, string, string] }

/** Each collection is theme-owned. An asset may not appear in another collection. */
export const cafeImages: Record<string, CafeImageCollection> = {
  'morning-ritual': {
    hero: image('photo-1509042239860-f550ce710b93'),
    menu: [
      image('photo-1525351484163-7529414344d8'),
      image('photo-1555507036-ab1f4038808a'),
      image('photo-1482049016688-2d3e1b311543'),
      image('photo-1589367920969-ab8e050bbb04'),
      image('photo-1509440159596-0249088772ff'),
      image('photo-1495474472287-4d71bcdd2085'),
    ],
    story: image('photo-1504630083234-14187a9df0f5'),
    gallery: [
      image('photo-1522992319-0365e5f11656'),
      image('photo-1445116572660-236099ec97a0'),
      image('photo-1554118811-1e0d58224f24'),
    ],
  },
  'brew-house': {
    hero: image('photo-1512568400610-62da28bc8a13'),
    menu: [
      image('photo-1510591509098-f4fdc6d0ff04'),
      image('photo-1447933601403-0c6688de566e'),
      image('photo-1517701604599-bb29b565090c'),
      image('photo-1534778101976-62847782c213'),
      image('photo-1442512595331-e89e73853f31'),
      image('photo-1499636136210-6f4ee915583e'),
    ],
    story: image('photo-1501339847302-ac426a4a7cbb'),
    gallery: [
      image('photo-1495774856032-8b90bbb32b32'),
      image('photo-1497636577773-f1231844b336'),
      image('photo-1498804103079-a6351b050096'),
    ],
  },
  'corner-cafe': {
    hero: image('photo-1571997478779-2adcbbe9ab2f'),
    menu: [
      image('photo-1601050690597-df0568f70950'),
      image('photo-1508737027454-e6454ef45afd'),
      image('photo-1486427944299-d1955d23e34d'),
      image('photo-1577968897966-3d4325b36b61'),
      image('photo-1519869325930-281384150729'),
      image('photo-1533089860892-a7c6f0a88666'),
    ],
    story: image('photo-1449247709967-d4461a6a6103'),
    gallery: [
      image('photo-1484101403633-562f891dc89a'),
      image('photo-1519710164239-da123dc03ef4'),
      image('photo-1505693416388-ac5ce068fe85'),
    ],
  },
  'latte-lane': {
    hero: image('photo-1511081692775-05d0f180a065'),
    menu: [
      image('photo-1514432324607-a09d9b4aefdd'),
      image('photo-1509722747041-616f39b57569'),
      image('photo-1513558161293-cdaf765ed2fd'),
      image('photo-1497534446932-c925b458314e'),
      image('photo-1506084868230-bb9d95c24759'),
      image('photo-1587314168485-3236d6710814'),
    ],
    story: image('photo-1514066558159-fc8c737ef259'),
    gallery: [
      image('photo-1504754524776-8f4f37790ca0'),
      image('photo-1541167760496-1628856ab772'),
      image('photo-1516738901171-8eb4fc13bd20'),
    ],
  },
  'the-daily-grind': {
    hero: image('photo-1507133750040-4a8f57021571'),
    menu: [
      image('photo-1517256064527-09c73fc73e38'),
      image('photo-1461023058943-07fcbe16d735'),
      image('photo-1587734195503-904fca47e0e9'),
      image('photo-1511920170033-f8396924c348'),
      image('photo-1559525839-b184a4d698c7'),
      image('photo-1606313564200-e75d5e30476c'),
    ],
    story: image('photo-1524758631624-e2822e304c36'),
    gallery: [
      image('photo-1485955900006-10f4d324d411'),
      image('photo-1497366811353-6870744d04b2'),
      image('photo-1501386761578-eac5c94b800a'),
    ],
  },
}

export const cafeImageEntries = Object.entries(cafeImages).flatMap(([theme, collection]) => [
  { theme, section: 'hero', source: collection.hero },
  ...collection.menu.map((source, index) => ({ theme, section: `menu-${index}`, source })),
  { theme, section: 'story', source: collection.story },
  { theme, section: 'gallery-0', source: collection.gallery[0] },
  { theme, section: 'gallery-1', source: collection.gallery[1] },
  { theme, section: 'gallery-2', source: collection.gallery[2] },
])
