import React from 'react'
import { VogalFashionStorefront } from './VogalFashionStorefront'
import type { VogalStorefrontProps } from './types'

export const App: React.FC<VogalStorefrontProps> = (props) => {
  return <VogalFashionStorefront {...props} />
}

export default App
