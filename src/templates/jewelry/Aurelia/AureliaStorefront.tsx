import React from 'react'
import { DiamondJewelryStorefront } from '../Diamond/DiamondJewelryStorefront'
import type { AureliaStorefrontProps } from './types'

export const AureliaStorefront: React.FC<AureliaStorefrontProps> = (props) => {
  return <DiamondJewelryStorefront {...(props as any)} />
}

export default AureliaStorefront
