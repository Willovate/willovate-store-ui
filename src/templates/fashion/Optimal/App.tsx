import React from 'react'
import { OptimalFashionStorefront } from './OptimalFashionStorefront'
import type { OptimalStorefrontProps } from './types'

export const App: React.FC<OptimalStorefrontProps> = (props) => {
  return <OptimalFashionStorefront {...props} />
}

export default App
