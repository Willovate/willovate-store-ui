import React from 'react';
import LatteLaneTheme from '../../../themes/LatteLaneTheme';
import { restaurantThemePresets } from '../../../themes/RestaurantTheme';

export default function LatteLane() {
  const theme = restaurantThemePresets['latte-lane'];
  return <LatteLaneTheme theme={theme} />;
}

