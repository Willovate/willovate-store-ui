import { useState } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import { cafeImages } from './cafe-images'
import { getCafeMenu } from './cafe-menu-data'
import './cafe-collections.css'
import './corner-cafe.css'
import './cafe-mobile-navigation.css'
import './cafe-image-motion.css'
import './cafe-depth-additions.css'
import { useCafeReveal } from './useCafeReveal'

export default function CornerCafeTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [open, setOpen] = useState<string | null>('Drinks')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const menu = getCafeMenu(theme.id)
  const image = cafeImages[theme.id]
  return <article className="corner-site cafe-page">
    <header className="cc-nav"><a href="#corner-top">CORNER CAFÉ</a><p>21 WILLOW LANE<br />NEW YORK</p><nav><a href="#philosophy">PHILOSOPHY</a><a href="#seasonal">MENU</a><a href="#corner-visit">VISIT</a></nav><button className="cc-menu-toggle" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? '×' : 'MENU'}</button>{mobileOpen && <div className="cc-mobile-nav"><a onClick={() => setMobileOpen(false)} href="#philosophy">Philosophy</a><a onClick={() => setMobileOpen(false)} href="#seasonal">Seasonal menu</a><a onClick={() => setMobileOpen(false)} href="#corner-visit">Visit</a></div>}</header>
    <main id="corner-top"><section className="cc-hero"><img src={image.hero} alt="A quiet coffee moment at Corner Café" /><div><span>EST. 2011 · A NEIGHBOURHOOD COFFEE HOUSE</span><h1>MORNING,<br />MADE <i>QUIET.</i></h1><p>Good coffee. Sunlit tables. A slower rhythm for the middle of the city.</p><a href="#seasonal">VIEW TODAY’S MENU ↓</a></div></section>
      <section className="cc-philosophy" id="philosophy"><p>WE BELIEVE A CAFÉ CAN BE A PAUSE, NOT A PERFORMANCE.</p><div><span>01 / THE CORNER WAY</span><h2>Less noise.<br /><i>More notice.</i></h2><p>We work with growers who take their time, serve a concise seasonal menu, and leave room for the smallest details to land.</p></div></section>
      <section className="cc-seasonal" id="seasonal"><header><span>02 / SEASONAL MENU</span><h2>Simple, in<br />its <i>best form.</i></h2></header><div className="cc-accordions">{menu.map(item => <article key={item.name}><button aria-expanded={open === item.category} onClick={() => setOpen(open === item.category ? null : item.category)}><span>{item.category}</span><b>{open === item.category ? '−' : '+'}</b></button>{open === item.category && <div><img src={item.image} alt={item.name} /><h3>{item.name} <strong>{item.price}</strong></h3><p>{item.detail}</p></div>}</article>)}</div></section>
      <section className="cc-methods"><div><span>03 / BREWING METHODS</span><ol><li><b>01</b> Espresso <small>Short, balanced, exact.</small></li><li><b>02</b> Filter <small>Clean, bright, unhurried.</small></li><li><b>03</b> Tea <small>Steeped to a quiet pace.</small></li></ol></div><img src={image.story} alt="Corner Café brewing coffee" /></section>
      <section className="cc-origin"><img src={image.gallery[0]} alt="Coffee and a book in the café" /><div><span>04 / OUR ORIGINS</span><h2>Chosen with<br /><i>care.</i></h2><p>Our coffee list changes with the harvest. Every bag comes with a clear story, a careful roast and a reason for being on the bar.</p><a href="#corner-visit">MEET US AT THE COUNTER →</a></div></section>
      <section className="cc-visit" id="corner-visit"><span>05 / VISIT</span><h2>Find a seat.<br />Stay <i>awhile.</i></h2><p>21 Willow Lane, Corner District<br />Every day, 7am—7pm</p><a href="https://maps.google.com" target="_blank" rel="noreferrer">GET DIRECTIONS ↗</a></section>
      <section className="cc-notes"><div><b>7am</b><span>First pour at the bar</span></div><div><b>12pm</b><span>Seasonal kitchen plates</span></div><div><b>7pm</b><span>Last quiet coffee</span></div></section><section className="cc-social"><span>FROM THE CORNER</span><blockquote>“A small calm pocket of the city, with exactly the right coffee.”</blockquote><p>— JULES, WILLOW LANE</p></section><section className="cc-newsletter"><span>THE CORNER NOTE</span><h2>A thoughtful note, once in a while.</h2>{subscribed ? <p role="status">Thank you — we’ll save you a seat in the inbox.</p> : <form className="cafe-depth-signup" onSubmit={event => { event.preventDefault(); setSubscribed(true) }}><input aria-label="Email address" type="email" required placeholder="your@email.com" /><button>SIGN ME UP →</button></form>}</section>
    </main><footer className="cc-footer"><b>CORNER CAFÉ</b><span>COFFEE · KITCHEN · COMPANY</span><a href="#corner-top">↑</a></footer>
  </article>
}
