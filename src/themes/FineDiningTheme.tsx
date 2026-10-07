import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css'
import './noir-table-theme.css'
import './fine-dining-responsive.css'
import './fine-dining-unique-sections.css'

const courses = {
  Starters: [['Cured Hamachi', 'Yuzu, shiso and smoked oil', '24'], ['Warm Lobster', 'Saffron, fennel and sea herbs', '31'], ['Garden Beet', 'Goat curd, walnut and black garlic', '18']],
  Mains: [['Dry-aged Duck', 'Morello cherry, celeriac and jus', '42'], ['Market Turbot', 'Brown butter, capers and lemon', '46'], ['Wild Mushroom', 'Pappardelle, truffle and pecorino', '34']],
  Desserts: [['Burnt Honey', 'Milk ice cream and bee pollen', '15'], ['Dark Chocolate', 'Malt, cocoa nib and sea salt', '16'], ['Poached Pear', 'Almond, vanilla and calvados', '14']],
  Wine: [['Chablis Premier Cru', 'Domaine du Petit Château, 2022', '18'], ['Pinot Noir', 'Willamette Valley, 2021', '16'], ['Barolo', 'Piedmont, 2019', '24']],
}
type Course = keyof typeof courses
const journey = [['01', 'Arrival', 'A candlelit welcome and an aperitif chosen for the evening.'], ['02', 'First Course', 'The season’s clearest expression arrives at the table.'], ['03', 'Tasting', 'A considered sequence of flavour, texture and memory.'], ['04', 'Dessert', 'A final note of sweetness, made to linger.'], ['05', 'After Dinner', 'One last glass and a reason to stay a little longer.']]
const quotes = [['“An unforgettable evening from the first course to the last.”', '— Amelia R.'], ['“The room is as memorable as the food—quiet, warm, exceptional.”', '— Theo M.'], ['“A restaurant with genuine soul and extraordinary precision.”', '— Naomi K.']]

export default function FineDiningTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [course, setCourse] = useState<Course>('Starters')
  const [reservation, setReservation] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [image, setImage] = useState<number | null>(null)
  const [moment, setMoment] = useState(0)
  const [quote, setQuote] = useState(0)
  const [signedUp, setSignedUp] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const images = theme.images
  const hasDedicatedSectionImages = images.length >= 15
  const heroImage = images[0]
  const menuImages = hasDedicatedSectionImages ? images.slice(1, 4) : images.slice(0, 3)
  const chefImage = hasDedicatedSectionImages ? images[4] : images[3]
  const galleryImages = hasDedicatedSectionImages ? images.slice(5, 9) : images
  const experienceImages = hasDedicatedSectionImages ? images.slice(9, 14) : images
  const ctaImage = hasDedicatedSectionImages ? images[14] : images[2]
  const dark = theme.layout === 'editorial' || theme.layout === 'rustic'
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 20)
    scroll(); window.addEventListener('scroll', scroll, { passive: true })
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('fd-visible')), { threshold: .1 })
    document.querySelectorAll('.fd-reveal').forEach(element => observer.observe(element))
    return () => { window.removeEventListener('scroll', scroll); observer.disconnect() }
  }, [])
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setImage(null); setReservation(false) }
      if (image !== null && event.key === 'ArrowRight') setImage((image + 1) % galleryImages.length)
      if (image !== null && event.key === 'ArrowLeft') setImage((image + galleryImages.length - 1) % galleryImages.length)
    }
    window.addEventListener('keydown', keyboard)
    return () => window.removeEventListener('keydown', keyboard)
  }, [image, galleryImages.length])
  const openReservation = () => { setConfirmed(false); setReservation(true) }
  const submitReservation = (event: FormEvent) => { event.preventDefault(); setConfirmed(true) }
  return <article className={'fine-theme fine-theme--' + theme.layout + (dark ? ' fine-theme--dark' : '')} style={{ '--fd-ink': theme.palette.ink, '--fd-paper': theme.palette.paper, '--fd-accent': theme.palette.accent, '--fd-muted': theme.palette.muted, '--fd-line': theme.palette.line } as CSSProperties}>
    <header className={'fd-nav ' + (scrolled ? 'fd-nav--solid' : '')}><a className="fd-brand" href="#top">{theme.name}<small>FINE DINING</small></a><nav><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#experience">Experience</a><a href="#visit">Visit</a></nav><button className="fd-reserve" onClick={openReservation}>Reserve a table <b>↗</b></button><button className="fd-hamburger" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}><i /><i /></button>{mobile && <div className="fd-mobile"><a href="#menu" onClick={() => setMobile(false)}>Menu</a><a href="#story" onClick={() => setMobile(false)}>Our story</a><a href="#experience" onClick={() => setMobile(false)}>Experience</a><button onClick={openReservation}>Reserve a table</button></div>}</header>
    <main id="top">
      <section className="fd-hero"><img src={heroImage} alt={theme.name + ' restaurant interior'} /><div className="fd-hero-shade" /><div className="fd-hero-copy fd-reveal"><span>FINE DINING · EST. 1998</span><p>{theme.name}</p><h1>{theme.heroTitle}</h1><div>{theme.heroCopy}</div><section><button onClick={openReservation}>Reserve a table <b>→</b></button><a href="#menu">Explore menu <b>↓</b></a></section></div><a className="fd-scroll" href="#menu">Scroll to discover <i /></a></section>
      <section className="fd-intro fd-reveal"><span>01 · THE RESTAURANT</span><h2>{theme.storyTitle || 'Seasonal cuisine, served with a <em>point of view.</em>'}</h2><p>{theme.storyCopy || 'Our menu follows the season and the people who grow it. Every course is an invitation to slow down and taste more closely.'}</p></section>
      <section className="fd-menu-section" id="menu"><div className="fd-section-title fd-reveal"><span>02 · À LA CARTE</span><h2>The menu,<br /><em>in season.</em></h2><p>Choose a course to explore tonight’s selection.</p></div><div className="fd-tabs" role="tablist">{(Object.keys(courses) as Course[]).map(name => <button key={name} role="tab" aria-selected={course === name} className={course === name ? 'active' : ''} onClick={() => setCourse(name)}>{name}</button>)}</div><div className="fd-dishes">{courses[course].map((dish, index) => <article className="fd-dish fd-reveal" key={dish[0]} style={{ transitionDelay: index * 80 + 'ms' }}><img src={menuImages[index]} alt={dish[0]} loading="lazy" /><div className="fd-dish-hover"><button onClick={openReservation}>Reserve to taste</button></div><div><span>{course === 'Wine' ? '' : index === 2 ? 'V' : 'GF'}</span><h3>{dish[0]}</h3><p>{dish[1]}</p><strong>{'$' + dish[2]}</strong></div></article>)}</div></section>
      <section className="fd-chef" id="story"><div className={'fd-chef-image fd-reveal' + (hasDedicatedSectionImages ? '' : ' fd-chef-image--typographic')}>{hasDedicatedSectionImages && <img src={chefImage} alt="Chef plating a seasonal dish" loading="lazy" />}<p>“Cooking is memory,<br />expressed on a plate.”</p></div><div className="fd-chef-copy fd-reveal"><span>03 · MEET THE CHEF</span><h2>Craft without<br /><em>compromise.</em></h2><p>Chef Elise Laurent brings a quiet precision to each plate: French technique, local ingredients, and a belief that the finest service should always feel effortless.</p><dl><dt>Signature dish</dt><dd>Dry-aged Duck <b>·</b> $42</dd></dl><a href="#experience">The chef’s philosophy <b>→</b></a></div></section>
      <section className="fd-gallery"><div className="fd-section-title fd-reveal"><span>04 · THE ATMOSPHERE</span><h2>A table set for<br /><em>the evening.</em></h2></div>{hasDedicatedSectionImages ? <div className="fd-gallery-grid">{galleryImages.map((src, index) => <button key={src} className={'fd-gallery-image fd-gallery-image--' + index} onClick={() => setImage(index)} aria-label={'Open gallery image ' + (index + 1)}><img src={src} alt="" loading="lazy" /><span>View image ↗</span></button>)}</div> : <div className="fd-atmosphere-notes"><span>SEASONAL FLOWERS</span><span>LOW LIGHT</span><span>AN OPEN KITCHEN</span><span>THE LAST COURSE</span></div>}</section>
      <section className="fd-experience" id="experience"><div className="fd-section-title fd-reveal"><span>05 · THE EXPERIENCE</span><h2>More than a<br /><em>meal.</em></h2></div><div className="fd-experience-grid"><div className="fd-steps" role="tablist">{journey.map((item, index) => <button key={item[0]} className={moment === index ? 'active' : ''} role="tab" aria-selected={moment === index} onClick={() => setMoment(index)}><b>{item[0]}</b>{item[1]}</button>)}</div><div className="fd-step-detail fd-reveal">{hasDedicatedSectionImages && <img src={experienceImages[moment % experienceImages.length]} alt="" loading="lazy" />}<span>{journey[moment][0] + ' · ' + journey[moment][1]}</span><p>{journey[moment][2]}</p></div></div></section>
      <section className="fd-testimonial fd-reveal"><span>GUEST NOTES</span><p>★★★★★</p><blockquote>{quotes[quote][0]}</blockquote><cite>{quotes[quote][1]}</cite><div><button aria-label="Previous testimonial" onClick={() => setQuote((quote + quotes.length - 1) % quotes.length)}>←</button><button aria-label="Next testimonial" onClick={() => setQuote((quote + 1) % quotes.length)}>→</button></div></section>
      <section className={'fd-cta fd-reveal' + (hasDedicatedSectionImages ? '' : ' fd-cta--typographic')}>{hasDedicatedSectionImages && <img src={ctaImage} alt="" loading="lazy" />}<div><span>06 · RESERVATIONS</span><h2>{theme.reserveTitle || 'Your table is <em>waiting.</em>'}</h2><p>{theme.reserveCopy || 'Join us for an evening designed around the moment.'}</p><button onClick={openReservation}>Reserve your table →</button></div></section>
      <section className="fd-visit" id="visit"><div><span>VISIT US</span><h2>Find us at<br /><em>the table.</em></h2><a href="https://maps.google.com" target="_blank" rel="noreferrer">Get directions ↗</a></div><dl><div><dt>Address</dt><dd>18 Mercer Street<br />New York, NY 10013</dd></div><div><dt>Hours</dt><dd>Tuesday–Saturday<br />5:30 PM – Late</dd></div><div><dt>Contact</dt><dd>+1 212 555 0148<br />hello@finedining.example</dd></div></dl></section>
      <section className="fd-newsletter"><span>STAY AT THE TABLE</span><h2>Seasonal news,<br /><em>from our kitchen.</em></h2>{signedUp ? <p className="fd-success">Thank you. Your next note from the kitchen is on its way.</p> : <form onSubmit={event => { event.preventDefault(); setSignedUp(true) }}><label className="sr-only" htmlFor="fine-email">Email address</label><input id="fine-email" required type="email" placeholder="Your email address" /><button>Subscribe →</button></form>}</section>
    </main>
    <footer className="fd-footer"><div className="fd-brand">{theme.name}<small>FINE DINING</small></div><div><strong>Explore</strong><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#experience">Experience</a></div><div><strong>Reservations</strong><button onClick={openReservation}>Reserve a table</button><a href="#visit">Location & hours</a></div><div><strong>Follow</strong><a href="#top">Instagram</a><a href="#top">Journal</a></div><small>© 2026 {theme.name}. All rights reserved.</small></footer>
    {reservation && <div className="fd-modal" role="dialog" aria-modal="true" aria-labelledby="reservation-title"><button className="fd-modal-backdrop" onClick={() => setReservation(false)} aria-label="Close reservation dialog" /><div className="fd-modal-panel">{confirmed ? <><button className="fd-close" onClick={() => setReservation(false)} aria-label="Close">×</button><span>RESERVATION REQUEST RECEIVED</span><h2 id="reservation-title">We’ll see you soon.</h2><p>Our reservations team will confirm your table shortly.</p><button onClick={() => setReservation(false)}>Done</button></> : <form onSubmit={submitReservation}><button type="button" className="fd-close" onClick={() => setReservation(false)} aria-label="Close">×</button><span>MAKE A RESERVATION</span><h2 id="reservation-title">An evening at {theme.name}.</h2><label>Guests<select defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select></label><label>Date<input required type="date" /></label><label>Time<select defaultValue="7:30 PM"><option>6:00 PM</option><option>7:30 PM</option><option>8:30 PM</option><option>9:30 PM</option></select></label><fieldset><legend>Seating preference</legend><label><input defaultChecked type="radio" name="seat" /> Dining room</label><label><input type="radio" name="seat" /> Terrace</label><label><input type="radio" name="seat" /> Chef’s table</label></fieldset><button>Continue reservation →</button></form>}</div></div>}
    {image !== null && <div className="fd-lightbox" role="dialog" aria-modal="true" aria-label="Image gallery"><button className="fd-close" onClick={() => setImage(null)} aria-label="Close gallery">×</button><button className="fd-lightbox-prev" onClick={() => setImage((image + galleryImages.length - 1) % galleryImages.length)} aria-label="Previous image">←</button><img src={galleryImages[image]} alt={theme.name + ' gallery'} /><button className="fd-lightbox-next" onClick={() => setImage((image + 1) % galleryImages.length)} aria-label="Next image">→</button><span>{image + 1} / {galleryImages.length}</span></div>}
  </article>
}

