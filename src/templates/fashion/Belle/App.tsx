import React from 'react'
import { BelleFashionStorefront } from './BelleFashionStorefront'
import type { BelleStorefrontProps } from './types'

export const App: React.FC<BelleStorefrontProps> = (props) => {
  return <BelleFashionStorefront {...props} />
}

export default App