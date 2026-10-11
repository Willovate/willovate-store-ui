import React from 'react';
import MorningRitualTheme from '../../../themes/MorningRitualTheme';
import { restaurantThemePresets } from '../../../themes/RestaurantTheme';

export default function MorningRitual() {
  const theme = restaurantThemePresets['morning-ritual'];
  return <MorningRitualTheme theme={theme} />;
}
