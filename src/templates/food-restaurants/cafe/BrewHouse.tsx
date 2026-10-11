import React from 'react';
import BrewHouseTheme from '../../../themes/BrewHouseTheme';
import { restaurantThemePresets } from '../../../themes/RestaurantTheme';

export default function BrewHouse() {
  const theme = restaurantThemePresets['brew-house'];
  return <BrewHouseTheme theme={theme} />;
}

