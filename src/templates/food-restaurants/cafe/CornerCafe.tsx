import React from 'react';
import CornerCafeTheme from '../../../themes/CornerCafeTheme';
import { restaurantThemePresets } from '../../../themes/RestaurantTheme';

export default function CornerCafe() {
  const theme = restaurantThemePresets['corner-cafe'];
  return <CornerCafeTheme theme={theme} />;
}


