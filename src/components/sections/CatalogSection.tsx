import { useEffect, useState } from 'react'
import { getProducts } from '../../lib/api'
import { ProductCard } from '../ProductCard'
import type { Product } from '../../types'
import { useCart } from '../../hooks/useCart'
import { SectionContainer } from './SectionContainer'

export function CatalogSection({ title = 'Curated Collection', products: customProducts }: { title?: string, products?: Product[] }) {
  const [products, setProducts] = useState<Product[]>(customProducts || [])
  const cart = useCart()

  useEffect(() => {
    if (!customProducts) {
      getProducts().then(res => setProducts(res.items.slice(0, 4))).catch(() => {})
    } else {
      setProducts(customProducts)
    }
  }, [customProducts])

  return (
    <section style={{ paddingBlock: '60px', width: '100%' }}>
      <SectionContainer>
        <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2rem', marginBottom: '40px' }}>{title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} onAdd={(product) => cart.add(product)} />
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}

