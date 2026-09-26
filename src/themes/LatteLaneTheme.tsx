import { useState } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import { cafeImages } from './cafe-images'
import { getCafeMenu } from './cafe-menu-data'
import './latte-lane.css'
import './cafe-interaction-feedback.css'
import './cafe-mobile-navigation.css'
import './cafe-image-motion.css'
import './cafe-depth-additions.css'
import { useCafeReveal } from './useCafeReveal'

export default function LatteLaneTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [milk, setMilk] = useState('Oat'); const [extra, setExtra] = useState('Cinnamon'); const [added, setAdded] = useState(false); const [pick, setPick] = useState(0); const [galleryPick, setGalleryPick] = useState(0); const [subscribed, setSubscribed] = useState(false); const [mobileOpen, setMobileOpen] = useState(false)
  const menu = getCafeMenu(theme.id); const image = cafeImages[theme.id]
  const price = 6 + (milk === 'Almond' ? .5 : 0) + (extra === 'Vanilla' ? .5 : extra === 'Extra shot' ? 1 : 0)
  const galleryNotes = ['A sunny corner and a slow second cup.', 'A shared table, a sweet bite, no hurry.', 'A final pour before the city starts again.']
  return <article className="ll-site"><header className="ll-nav"><a href="#lane-top">latte<br /><i>lane</i></a><nav><a href="#specials">specials</a><a href="#make">make it yours</a><a href="#club">the club</a></nav><a href="#make" className="ll-order">ORDER A SIP →</a><button className="ll-menu-toggle" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? '×' : 'MENU'}</button>{mobileOpen && <div className="ll-mobile-nav"><a onClick={() => setMobileOpen(false)} href="#specials">Today’s specials</a><a onClick={() => setMobileOpen(false)} href="#make">Build a latte</a><a onClick={() => setMobileOpen(false)} href="#club">Join the club</a></div>}</header><main id="lane-top">
    <section className="ll-hero"><div className="ll-sticker">GOOD MOOD<br />BREWED DAILY</div><div className="ll-copy"><span>YOUR HAPPY LITTLE COFFEE STOP</span><h1>COFFEE<br />YOUR <i>WAY.</i></h1><p>Bright pours, handmade bakes and a counter where every order has a little personality.</p><a href="#make">MAKE A LATTE →</a></div><img src={image.hero} alt="Latte Lane signature latte" /><b className="ll-star">✳</b></section>
    <section className="ll-specials" id="specials"><header><span>TODAY’S LITTLE WINS</span><h2>Pick your<br /><i>treat.</i></h2></header><div>{menu.map((item,index)=><button className={pick===index?'active':''} onClick={()=>setPick(index)} key={item.name}><img src={item.image} alt={item.name}/><span>{item.category}</span><h3>{item.name}</h3><p>{item.price}</p></button>)}</div><p className="ll-detail">{menu[pick].detail}</p></section>
    <section className="ll-make" id="make"><div><span>BUILD YOUR CUP</span><h2>Make it<br /><i>more you.</i></h2><p>Start with our house espresso, then play with the good bits.</p></div><div className="ll-builder"><h3>Terracotta Latte <b>${price.toFixed(2)}</b></h3><fieldset><legend>MILK</legend>{['Whole','Oat','Almond'].map(v=><button className={milk===v?'active':''} onClick={()=>{setMilk(v);setAdded(false)}} key={v}>{v}</button>)}</fieldset><fieldset><legend>EXTRA</legend>{['Cinnamon','Vanilla','Extra shot'].map(v=><button className={extra===v?'active':''} onClick={()=>{setExtra(v);setAdded(false)}} key={v}>{v}</button>)}</fieldset><button className="ll-add" onClick={()=>setAdded(true)}>{added?`ADDED — $${price.toFixed(2)} AT THE BAR!`:'ADD TO MY ORDER →'}</button></div></section>
    <section className="ll-popular"><img src={image.story} alt="Friends enjoying coffee"/><div><span>THE PEOPLE’S PICKS</span><h2>Meet the<br /><i>regulars.</i></h2><p>“The cardamom bun is my entire personality now.”</p><b>— NINA, SATURDAY CREW</b></div></section>
    <section className="ll-gallery"><header><span>THE AFTERNOON EDIT</span><h2>Little moments,<br /><i>on repeat.</i></h2></header><div>{image.gallery.map((src,index)=><button className={galleryPick===index?'active':''} onClick={()=>setGalleryPick(index)} key={src}><img src={src} alt={`Latte Lane café moment ${index + 1}`} /></button>)}</div><p>{galleryNotes[galleryPick]}</p></section><section className="ll-social"><span>THE WORD ON THE LANE</span><blockquote>“Warm coffee, bright people, and the kind of counter that remembers you.”</blockquote><p>— IZZY, AFTERNOON REGULAR</p></section>
    <section className="ll-club" id="club"><span>THE LATTE LANE CLUB</span><h2>More good<br />things in your inbox.</h2>{subscribed ? <p className="ll-signup-success" role="status">You’re in! Look out for the next delicious update.</p> : <form onSubmit={e=>{e.preventDefault();setSubscribed(true)}}><input aria-label="Email address" type="email" placeholder="your@email.com" required/><button>COUNT ME IN →</button></form>}</section>
  </main><footer className="ll-footer"><b>latte lane</b><span>OPEN EVERY DAY · 7—7</span><a href="#lane-top">BACK UP ↑</a></footer></article>
}
