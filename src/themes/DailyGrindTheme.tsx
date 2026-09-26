import { useState } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import { cafeImages } from './cafe-images'
import { getCafeMenu } from './cafe-menu-data'
import './daily-grind.css'
import './cafe-interaction-feedback.css'
import './cafe-mobile-navigation.css'
import './cafe-image-motion.css'
import './cafe-depth-additions.css'
import { useCafeReveal } from './useCafeReveal'

export default function DailyGrindTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [feature, setFeature] = useState(0); const [cart, setCart] = useState(0); const [bagOpen, setBagOpen] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); const [subscribed, setSubscribed] = useState(false)
  const menu = getCafeMenu(theme.id); const image = cafeImages[theme.id]
  const addToBag = () => { setCart(cart + 1); setBagOpen(true) }
  return <article className="dg-site"><header className="dg-nav"><a href="#grind-top">THE<br />DAILY GRIND</a><nav><a href="#products">SHOP</a><a href="#origin">ORIGIN</a><a href="#process">PROCESS</a></nav><button className="dg-bag" onClick={() => setBagOpen(!bagOpen)}>BAG <b>{cart}</b></button><button className="dg-menu-toggle" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? '×' : 'MENU'}</button>{mobileOpen && <div className="dg-mobile-nav"><a onClick={() => setMobileOpen(false)} href="#products">Shop</a><a onClick={() => setMobileOpen(false)} href="#origin">Origin</a><a onClick={() => setMobileOpen(false)} href="#process">Process</a></div>}</header><main id="grind-top">
    <section className="dg-hero"><img src={image.hero} alt="Iced coffee at The Daily Grind"/><div><span>NO WEAK COFFEE</span><h1>COFFEE<br />WITHOUT<br /><i>COMPROMISE.</i></h1><button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}>SHOP THE DROP ↓</button></div><p>SCROLL TO ENTER<br />THE ROASTERY</p></section>
    <section className="dg-products" id="products"><header><span>01 / FEATURED DROP</span><h2>Made for<br />the <i>motion.</i></h2><div><button onClick={()=>setFeature((feature+menu.length-1)%menu.length)}>←</button><button onClick={()=>setFeature((feature+1)%menu.length)}>→</button></div></header><article><img src={menu[feature].image} alt={menu[feature].name}/><div><span>{menu[feature].category}</span><h3>{menu[feature].name}</h3><p>{menu[feature].detail}</p><strong>{menu[feature].price}</strong><button onClick={addToBag}>ADD TO BAG +</button></div></article><div className="dg-index">{menu.map((item,index)=><button key={item.name} className={feature===index?'active':''} onClick={()=>setFeature(index)}>0{index+1} {item.name}</button>)}</div></section>
    <section className="dg-origin" id="origin"><div><span>02 / TRACE THE CUP</span><h2>FROM<br />GROUND<br />TO <i>GRIND.</i></h2><p>We work backwards from a great cup—through roasting, sourcing and a long list of small decisions worth making.</p></div><img src={image.story} alt="The Daily Grind coffee bar"/></section>
    <section className="dg-process" id="process"><span>03 / THE DAILY PROCESS</span><div><article><b>01</b><h3>SOURCE</h3><p>Coffees selected for energy, sweetness and clarity.</p></article><article><b>02</b><h3>ROAST</h3><p>Roasted weekly in the city, never months ago.</p></article><article><b>03</b><h3>MOVE</h3><p>Brewing hard for commutes, meetings and late starts.</p></article></div></section>
    <section className="dg-image"><img src={image.gallery[0]} alt="Coffee in a modern workspace"/><p>KEEP<br />MOVING.</p></section>
    <section className="dg-cta"><span>YOUR DAILY, DELIVERED</span><h2>Never run<br />on <i>empty.</i></h2><button onClick={addToBag}>START A COFFEE PLAN →</button></section>
    <section className="dg-menu-grid">{menu.map(item => <article key={item.name}><img src={item.image} alt={item.name} /><h3>{item.name}</h3><p>{item.detail}</p><strong>{item.price}</strong><button onClick={addToBag}>ADD +</button></article>)}</section><section className="dg-social"><span>BUILT FOR THE DAILY</span><blockquote>“The only subscription I’ve never thought of skipping.”</blockquote><p>— NOAH, ROAST CLUB MEMBER</p></section><section className="dg-newsletter"><span>GET THE NEXT DROP</span><h2>Keep the good stuff moving.</h2>{subscribed ? <p role="status">You’re on the list.</p> : <form className="cafe-depth-signup" onSubmit={event => { event.preventDefault(); setSubscribed(true) }}><input aria-label="Email address" type="email" required placeholder="your@email.com" /><button>GET UPDATES →</button></form>}</section>
  </main><footer className="dg-footer"><b>THE DAILY GRIND</b><span>NYC / EST. 2018</span><a href="#grind-top">BACK TO TOP ↑</a></footer>{bagOpen && <aside className="dg-bag-feedback" role="status"><b>{cart} {cart === 1 ? 'item' : 'items'} in your bag.</b><button onClick={() => setBagOpen(false)} aria-label="Close bag summary">×</button></aside>}</article>
}
