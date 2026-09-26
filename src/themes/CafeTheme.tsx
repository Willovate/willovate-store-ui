import type { RestaurantThemePreset } from './RestaurantTheme'
import BrewHouseTheme from './BrewHouseTheme'
import CornerCafeTheme from './CornerCafeTheme'
import LatteLaneTheme from './LatteLaneTheme'
import DailyGrindTheme from './DailyGrindTheme'

/** Routes café presets to independently composed experiences; no shared café layout. */
export default function CafeTheme({ theme }: { theme: RestaurantThemePreset }) {
  switch (theme.id) {
    case 'brew-house': return <BrewHouseTheme theme={theme} />
    case 'corner-cafe': return <CornerCafeTheme theme={theme} />
    case 'latte-lane': return <LatteLaneTheme theme={theme} />
    case 'the-daily-grind': return <DailyGrindTheme theme={theme} />
    default: throw new Error(`No dedicated café experience for ${theme.id}`)
  }
}
