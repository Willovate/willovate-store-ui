import { useState } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import { cafeImages } from './cafe-images'
import { getCafeMenu } from './cafe-menu-data'
import './cafe-collections.css'
import './brew-house-order.css'
import './cafe-mobile-navigation.css'
import './cafe-image-motion.css'
import './cafe-depth-additions.css'
import { useCafeReveal } from './useCafeReveal'

export default function BrewHouseTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [filter, setFilter] = useState('All')
  const [slide, setSlide] = useState(0)
  const [cart, setCart] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const menu = getCafeMenu(theme.id)
  const categories = ['All', ...menu.map(item => item.category)]
  const shown = filter === 'All' ? menu : menu.filter(item => item.category === filter)
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return <article className="brew-site cafe-page">
    <header className="bh-nav"><a href="#brew-top" className="bh-mark">BREW<br />HOUSE<small>ROASTERY / EST. 2014</small></a><nav><a href="#bh-menu">MENU</a><a href="#process">ROASTERY</a><a href="#bh-visit">VISIT</a></nav><button onClick={() => cart ? setDrawerOpen(true) : scroll('bh-menu')}>{cart ? `BAG (${cart})` : 'ORDER AHEAD ↗'}</button><button className="bh-menu-toggle" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? '×' : 'MENU'}</button>{mobileOpen && <div className="bh-mobile-nav"><a onClick={() => setMobileOpen(false)} href="#bh-menu">Menu</a><a onClick={() => setMobileOpen(false)} href="#process">Roastery</a><a onClick={() => setMobileOpen(false)} href="#bh-visit">Visit</a></div>}</header>
    <main id="brew-top">
      <section className="bh-hero"><div><span>INDEPENDENT SPECIALTY COFFEE</span><h1>COFFEE<br /><i>WITH</i> BACKBONE.</h1><p>Small-batch roast, dialled-in espresso and a bar built for the city’s daily rhythm.</p><p className="bh-actions"><button onClick={() => scroll('bh-menu')}>ORDER NOW</button><a href="#process">HOW WE ROAST →</a></p></div><figure><img src={cafeImages[theme.id].hero} alt="Fresh Brew House coffee" /><figcaption>OPEN DAILY / 07:00—19:00</figcaption></figure></section>
      <section className="bh-quick"><span>QUICK ORDER</span>{menu.map((item, index) => <button key={item.name} onClick={() => { setFilter(item.category); scroll('bh-menu') }}><b>0{index + 1}</b>{item.category}<em>→</em></button>)}</section>
      <section className="bh-signatures"><div><span>ON BAR THIS WEEK</span><h2>Three reasons<br />to take a break.</h2><button aria-label="Previous signature drink" onClick={() => setSlide((slide + menu.length - 1) % menu.length)}>←</button><button aria-label="Next signature drink" onClick={() => setSlide((slide + 1) % menu.length)}>→</button></div><article><img src={menu[slide].image} alt={menu[slide].name} /><div><span>{menu[slide].category}</span><h3>{menu[slide].name}</h3><p>{menu[slide].detail}</p><strong>{menu[slide].price}</strong></div></article></section>
      <section className="bh-menu" id="bh-menu"><header><span>THE BOARD</span><h2>Find your<br /><i>usual.</i></h2></header><div className="bh-filters" role="tablist">{categories.map(category => <button key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div><div>{shown.map(item => <article key={item.name}><img src={item.image} alt={item.name} /><span>{item.category}</span><h3>{item.name}</h3><p>{item.detail}</p><strong>{item.price}</strong><button aria-label={`Add ${item.name} to order`} onClick={() => { setCart(cart + 1); setDrawerOpen(true) }}>+</button></article>)}</div></section>
      <section className="bh-process" id="process"><img src={cafeImages[theme.id].story} alt="Brew House roastery" /><div><span>THE ROASTERY</span><h2>Roast for<br />the <i>routine.</i></h2><p>We buy coffees that feel clear in the cup, roast them in small lots, and tune every recipe until it holds up to a busy Tuesday.</p><dl><div><dt>12</dt><dd>origins on rotation</dd></div><div><dt>48h</dt><dd>from roast to bar</dd></div></dl></div></section>
      <section className="bh-reviews"><span>FROM THE NEIGHBOURHOOD</span><blockquote>“No theatre. Just serious coffee and people who remember your order.”</blockquote><p>— ALEX, REGULAR SINCE 2018</p></section>
      <section className="bh-visit" id="bh-visit"><div><span>DROP IN</span><h2>18 Mott Street<br />New York</h2><p>Mon—Fri 07:00—19:00<br />Sat—Sun 08:00—18:00</p></div><img src={cafeImages[theme.id].gallery[0]} alt="Brew House interior" /><a href="https://maps.google.com" target="_blank" rel="noreferrer">GET DIRECTIONS ↗</a></section>
      <section className="bh-newsletter"><span>ROASTERY NOTES</span><h2>Good coffee, sent occasionally.</h2>{subscribed ? <p role="status">You’re on the roast list.</p> : <form className="cafe-depth-signup" onSubmit={event => { event.preventDefault(); setSubscribed(true) }}><input aria-label="Email address" type="email" required placeholder="your@email.com" /><button>JOIN THE LIST →</button></form>}</section>
    </main><footer className="bh-footer"><b>BREW HOUSE</b><span>COFFEE / ROASTERY / NYC</span><a href="#brew-top">BACK TO TOP ↑</a></footer>
    {drawerOpen && <aside className="bh-drawer" role="dialog" aria-modal="true" aria-label="Order bag"><button aria-label="Close order bag" onClick={() => setDrawerOpen(false)}>×</button><span>ORDER BAG</span><h2>{cart} {cart === 1 ? 'item' : 'items'} ready.</h2><p>Your coffee will be prepared when you arrive.</p><button onClick={() => setDrawerOpen(false)}>CONTINUE BROWSING</button></aside>}
  </article>
}
