import React from 'react'
import { NaturyaFashionStorefront } from './NaturyaFashionStorefront'
import type { NaturyaStorefrontProps } from './types'

export const App: React.FC<NaturyaStorefrontProps> = (props) => {
  return <NaturyaFashionStorefront {...props} />
}

export default App
