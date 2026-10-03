import React from 'react'
import { MrTevorFashionStorefront } from './MrTevorFashionStorefront'
import type { MrTevorStorefrontProps } from './types'

export const App: React.FC<MrTevorStorefrontProps> = (props) => {
  return <MrTevorFashionStorefront {...props} />
}

export default App
