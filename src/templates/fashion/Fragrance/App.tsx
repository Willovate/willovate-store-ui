import React from 'react'
import { FragranceFashionStorefront } from './FragranceFashionStorefront'
import type { FragranceStorefrontProps } from './types'

export const App: React.FC<FragranceStorefrontProps> = (props) => {
  return <FragranceFashionStorefront {...props} />
}

export default App
