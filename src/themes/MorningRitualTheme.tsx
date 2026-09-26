import { useState } from 'react'
import './morning-ritual.css'
import './cafe-interaction-feedback.css'
import './cafe-mobile-navigation.css'
import './cafe-image-motion.css'
import './cafe-depth-additions.css'
import { useCafeReveal } from './useCafeReveal'

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`
const menu = [
  ['House Latte', 'Velvety espresso, oat milk & a little cloud of foam.', '$5.50', image('photo-1517701604599-bb29b565090c')],
  ['Honey Cinnamon Toast', 'Sourdough, whipped ricotta and local honey.', '$8.00', image('photo-1525351484163-7529414344d8')],
  ['Morning Croissant', 'Golden, flaky, and still warm from the oven.', '$4.50', image('photo-1555507036-ab1f4038808a')],
  ['Seasonal Pour Over', 'A bright rotating single-origin coffee.', '$6.00', image('photo-1495474472287-4d71bcdd2085')],
  ['Jammy Berry Scone', 'Buttermilk scone with blackberry jam and clotted cream.', '$5.00', image('photo-1486427944299-d1955d23e34d')],
  ['Garden Breakfast Bowl', 'Soft egg, herbs, avocado and toasted seeds.', '$11.00', image('photo-1498837167922-ddd27525d352')],
]

function Doodle({ type = 'leaf' }: { type?: 'leaf' | 'arrow' | 'cup' }) {
  if (type === 'cup') return <svg className="mr-doodle mr-doodle--cup" viewBox="0 0 90 70" aria-hidden="true"><path d="M17 22h48v28c0 11-10 16-24 16S17 61 17 50V22Zm49 7h7c10 0 11 18-7 18M14 18h54M25 11c3-5 7-5 10 0m6 0c3-5 7-5 10 0" /></svg>
  if (type === 'arrow') return <svg className="mr-doodle mr-doodle--arrow" viewBox="0 0 100 70" aria-hidden="true"><path d="M5 10c35-8 68 4 72 38M62 36l16 13-21 7" /></svg>
  return <svg className="mr-doodle" viewBox="0 0 80 90" aria-hidden="true"><path d="M37 80C15 64 8 37 20 12c21 7 30 31 17 68ZM44 81c4-28 17-47 33-57 7 23-5 47-33 57ZM39 78 35 19M43 77l27-42" /></svg>
}

export default function MorningRitualTheme() {
  useCafeReveal()
  const [subscribed, setSubscribed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ritual, setRitual] = useState('Oat milk')
  const [added, setAdded] = useState(false)
  return <article className="morning-ritual cafe-page">
    <div className="mr-promo">Fresh coffee. Slow mornings. Every day. <a href="#visit">Find your table →</a></div>
    <header className="mr-header"><a href="#home" className="mr-brand">Morning <i>Ritual</i><small>CAFÉ & BAKERY</small></a><nav><a href="#home">Home</a><a href="#menu">Menu</a><a href="#story">Our Story</a><a href="#visit">Visit Us</a></nav><a className="mr-button mr-button--dark" href="#menu">Order coffee</a><button className="mr-menu-toggle" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? '×' : 'MENU'}</button>{mobileOpen && <div className="mr-mobile-nav"><a onClick={() => setMobileOpen(false)} href="#menu">Menu</a><a onClick={() => setMobileOpen(false)} href="#story">Our story</a><a onClick={() => setMobileOpen(false)} href="#visit">Visit us</a></div>}</header>
    <main id="home">
      <section className="mr-hero"><img src={image('photo-1509042239860-f550ce710b93')} alt="Latte on a sunlit café table" /><div className="mr-hero-copy"><span className="mr-label">YOUR DAILY PAUSE</span><h1>Start Your<br /><em>Morning Slowly.</em></h1><p>Freshly brewed coffee, warm pastries, and a little more time to enjoy the moment.</p><div><a className="mr-button mr-button--dark" href="#menu">View menu</a><a className="mr-text-link" href="#visit">Visit us <b>→</b></a></div></div><Doodle type="cup" /><Doodle type="arrow" /></section>
      <section className="mr-menu" id="menu"><div className="mr-section-heading"><span className="mr-label">MORNING FAVOURITES</span><h2>Good Morning,<br /><em>Good Coffee</em></h2><p>Little rituals made with care, served every day.</p></div><div className="mr-menu-grid">{menu.map(([name, description, price, src]) => <article key={name}><img src={src} alt={name} /><div><h3>{name}</h3><p>{description}</p><strong>{price}</strong></div></article>)}</div></section>
      <section className="mr-ritual-builder"><div><span className="mr-label">MAKE IT YOUR RITUAL</span><h2>Your cup,<br /><em>your pace.</em></h2><p>Choose a milk for today’s House Latte, then we’ll have it ready at the bar.</p></div><div className="mr-ritual-card"><span>HOUSE LATTE <b>{ritual === 'Almond milk' ? '$6.00' : '$5.50'}</b></span><fieldset><legend>CHOOSE YOUR MILK</legend>{['Whole milk', 'Oat milk', 'Almond milk'].map(option => <button key={option} className={ritual === option ? 'active' : ''} onClick={() => { setRitual(option); setAdded(false) }}>{option}</button>)}</fieldset><button className="mr-button mr-button--dark" onClick={() => setAdded(true)}>{added ? 'SAVED FOR THE BAR ✓' : 'ADD TO MY MORNING →'}</button></div></section>
      <section className="mr-coffee"><div className="mr-coffee-image"><img src={image('photo-1442512595331-e89e73853f31')} alt="Freshly brewed coffee" /><Doodle /></div><div><span className="mr-label">OUR COFFEE</span><h2>Made for<br /><em>Slow Mornings.</em></h2><p>We roast with softness and sweetness in mind—then brew every cup with the attention it deserves. Because the best part of a morning is rarely the rush.</p><a className="mr-text-link" href="#story">Discover our coffee <b>→</b></a></div></section>
      <section className="mr-oven"><div className="mr-section-heading"><span className="mr-label">THE BAKERY COUNTER</span><h2>Fresh From <em>The Oven.</em></h2></div><div className="mr-oven-grid"><figure><img src={image('photo-1509440159596-0249088772ff')} alt="Freshly baked croissants" /><figcaption>Buttery pastries<br />from 7am</figcaption></figure><figure><img src={image('photo-1555507036-ab1f4038808a')} alt="Pastries on a café counter" /><figcaption>Sweet little<br />weekend things</figcaption></figure><figure><img src={image('photo-1498837167922-ddd27525d352')} alt="Seasonal breakfast toast" /><figcaption>Seasonal plates<br />until 2pm</figcaption></figure></div></section>
      <section className="mr-story" id="story"><img src={image('photo-1501339847302-ac426a4a7cbb')} alt="Bright neighbourhood café interior" /><div><Doodle /><span className="mr-label">OUR STORY</span><h2>A Little Place for Your <em>Everyday Ritual.</em></h2><p>Morning Ritual began with a shared belief: a neighbourhood café should feel a bit like an exhale. Come alone with a book, bring your favourite people, or simply collect something warm for the walk home.</p><a className="mr-button mr-button--peach" href="#visit">Come say hello</a></div></section>
      <section className="mr-moments"><div className="mr-section-heading"><span className="mr-label">AROUND THE CAFÉ</span><h2>Morning <em>moments.</em></h2></div><div className="mr-collage"><img className="mr-collage__tall" src={image('photo-1495474472287-4d71bcdd2085')} alt="Coffee being made" /><img src={image('photo-1511081692775-05d0f180a065')} alt="Latte in morning light" /><div>Take your<br /><em>time.</em><Doodle type="arrow" /></div><img src={image('photo-1497935586351-b67a49e012bf')} alt="Café plants and coffee" /></div></section>
      <section className="mr-visit" id="visit"><div><span className="mr-label">VISIT US</span><h2>Come Say <em>Hello.</em></h2><p>21 Willow Lane, Corner District<br />New York, NY 10013</p><a className="mr-button mr-button--dark" href="https://maps.google.com" target="_blank" rel="noreferrer">Get directions</a></div><dl><div><dt>Monday–Friday</dt><dd>7:00 AM – 7:00 PM</dd></div><div><dt>Saturday–Sunday</dt><dd>8:00 AM – 8:00 PM</dd></div><div><dt>For gatherings</dt><dd>hello@morningritual.cafe</dd></div></dl></section>
      <section className="mr-newsletter"><Doodle type="cup" /><div><span className="mr-label">A LITTLE NOTE FROM US</span><h2>Keep Your <em>Mornings Fresh.</em></h2><p>Get seasonal specials, new coffee drops, and café news.</p></div>{subscribed ? <p className="mr-signup-success" role="status">You’re on the list. A little note is on its way.</p> : <form onSubmit={event => { event.preventDefault(); setSubscribed(true) }}><label className="sr-only" htmlFor="mr-email">Email address</label><input id="mr-email" type="email" required placeholder="Your email address" /><button className="mr-button mr-button--dark">Join us</button></form>}</section>
      <section className="mr-review"><span className="mr-label">FROM OUR EARLY BIRDS</span><blockquote>“The one place in the city that makes my mornings feel unhurried.”</blockquote><p>— MAYA R., A MORNING RITUAL REGULAR</p></section>
    </main>
    <footer className="mr-footer"><div><a href="#home" className="mr-brand">Morning <i>Ritual</i><small>CAFÉ & BAKERY</small></a><p>A soft place to start your day.</p></div><div><strong>Explore</strong><a href="#menu">Menu</a><a href="#story">Our Story</a><a href="#visit">Visit Us</a></div><div><strong>Follow along</strong><a href="#home">Instagram</a><a href="#home">Pinterest</a><a href="mailto:hello@morningritual.cafe">Email us</a></div><small>© 2026 Morning Ritual Café</small></footer>
  </article>
}
