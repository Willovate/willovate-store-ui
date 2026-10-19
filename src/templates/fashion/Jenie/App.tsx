import React from 'react'
import { JenieFashionStorefront } from './JenieFashionStorefront'
import type { JenieStorefrontProps } from './types'

export const App: React.FC<JenieStorefrontProps> = (props) => {
  return <JenieFashionStorefront {...props} />
}

export default App
