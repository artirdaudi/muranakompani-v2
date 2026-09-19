import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Box, ChevronDown, ChevronRight, Factory, Handshake, Mail, MapPin, PackageCheck, Phone, ShieldCheck, Truck, Users } from 'lucide-react';
import { assets, copy } from './content';
import { Photo } from './Media';
import { Counter, Reveal, usePointerSurface } from './motion';
import { ProductBlueprint, RouteCurtain } from './Scenes';
import { PageIntro } from './PageIntro';
import { NotFound } from './NotFound';
import { SEO } from './SEO';
import { ContactMap } from './ContactMap';
import { ServicesContent, FAQContent } from './ServicePages';
import { CompanyJourney, QuoteForm, WellStory } from './Experience';

const paths = ['/', '/produkte', '/sherbimet', '/rreth-nesh', '/pyetje-te-shpeshta', '/kontakt'];
const navLabels = t => [t.nav[0], t.nav[1], t.pages.services[0], t.nav[2], t.pages.faq[0], t.nav[3]];

function Button({ to, children, light = false, outline = false }) {
  return <Link className={`button ${light ? 'light' : ''} ${outline ? 'outline' : ''}`} to={to}>{children}<ArrowRight size={17} aria-hidden="true"/></Link>;
}

function Header({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = useRef(null);
  const menu = useRef(null);
  const header = useRef(null);
  const location = useLocation();
  const t = copy[lang];
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOutside = event => { if (!header.current?.contains(event.target)) setOpen(false); };
    const escape = event => { if (event.key === 'Escape') { setOpen(false); menu.current?.focus(); } };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', escape);
    const desktop = window.matchMedia('(min-width: 1101px)');
    const resize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', resize);
    return () => { document.removeEventListener('pointerdown', closeOutside); document.removeEventListener('keydown', escape); desktop.removeEventListener('change', resize); };
  }, [open]);
  return <header ref={header} className={`header ${scrolled ? 'scrolled' : ''}`} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <div className="nav wrap"><Link to="/" className="brand" aria-label="Murana Kompani" onClick={() => setOpen(false)}><img src={assets.logo} alt="Murana Kompani" width="154" height="85"/></Link>
      <button ref={menu} className={`menu ${open ? 'is-open' : ''}`} aria-label={lang === 'mk' ? 'Мени' : 'Menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><span/><span/><span/></button>
      <nav ref={nav} id="main-navigation" aria-label={lang === 'mk' ? 'Главна навигација' : 'Navigimi kryesor'} className={open ? 'open' : ''}>
        {navLabels(t).map((name, i) => <NavLink key={paths[i]} to={paths[i]} end={i === 0} style={{ '--item': i }} onClick={() => setOpen(false)}>{name}</NavLink>)}
        <div className="mobile-actions"><button aria-label={lang === 'al' ? 'Промени на македонски' : 'Ndrysho në shqip'} onClick={() => setLang(lang === 'al' ? 'mk' : 'al')}>{lang === 'al' ? 'MK' : 'AL'}</button><Button to="/oferte">{t.buttons[4]}</Button></div>
      </nav>
      <div className="nav-actions"><button className="lang" aria-label={lang === 'al' ? 'Промени на македонски' : 'Ndrysho në shqip'} onClick={() => setLang(lang === 'al' ? 'mk' : 'al')}>{lang === 'al' ? 'AL / MK' : 'MK / AL'}</button><Button to="/oferte">{t.buttons[4]}</Button></div>
    </div>
  </header>;
}

function Hero({ t }) {
  return <section className="hero"><Photo className="hero-photo" src={assets.hero} alt="" eager sizes="(max-width: 600px) 960px, 100vw"/><div className="wrap hero-inner"><div className="hero-copy">
    <h1 key={t.hero[0]} className="hero-title">{t.hero.slice(0, 4).map((line, i) => <span className={`title-mask ${i === 1 ? "accent" : ""}`} key={i}><span style={{ "--line": i }}>{line}</span></span>)}</h1><div className="red-line"/><p>{t.hero[4]}</p>
    <div className="hero-buttons"><Button to="/produkte">{t.buttons[0]}</Button><Button to="/sherbimet" outline>{t.buttons[1]}</Button></div>
  </div></div></section>;
}

const picons = [PackageCheck, Factory, Box, BadgeCheck];
function Products({ t, lang, full = false }) {
  const { hash } = useLocation();
  const surface = usePointerSurface();
  const [expanded, setExpanded] = useState(() => /^#product-[0-3]$/.test(hash) ? Number(hash.slice(-1)) : null);
  useEffect(() => { if (/^#product-[0-3]$/.test(hash)) setExpanded(Number(hash.slice(-1))); }, [hash]);
  return <section className={`products ${full ? 'page-products' : ''}`}><div className="wrap">
    <Reveal className="section-heading"><small>{t.products[0]}</small><h2>{t.products[1]}</h2><i/></Reveal>
    <div className="product-grid">{t.productData.map(([name, desc, img], i) => {
      const Icon = picons[i];
      return <Reveal className="product-shell" key={i} delay={i * 65}>
        <article {...surface} className={`product-card ${expanded === i ? 'expanded' : ''}`} id={full ? `product-${i}` : undefined}>
          <div className="product-photo"><Photo src={img} alt={name} sizes="(max-width: 600px) 42vw, (max-width: 900px) 45vw, 25vw"/><ProductBlueprint index={i} lang={lang}/></div>
          <div className="product-body"><div className="round-icon"><Icon aria-hidden="true"/></div><h3>{name}</h3><p>{desc}</p>
            {full ? <button className="product-toggle" aria-expanded={expanded === i} aria-controls={`detail-${i}`} onClick={() => setExpanded(expanded === i ? null : i)}>{expanded === i ? (lang === 'mk' ? 'ЗАТВОРИ' : 'MBYLL') : t.buttons[2]}<ChevronDown size={15}/></button> : <Link to={`/produkte#product-${i}`}>{t.buttons[2]}<ArrowRight size={14}/></Link>}
          </div>
          {full && <div className="product-detail" id={`detail-${i}`} inert={expanded !== i} aria-hidden={expanded !== i}><div><p>{lang === 'mk' ? 'За достапни димензии, количини и испорака, побарајте понуда за вашиот проект.' : 'Për dimensionet në dispozicion, sasitë dhe transportin, kërkoni ofertë për projektin tuaj.'}</p><Link className="text-link" to="/oferte">{t.buttons[4]}<ArrowRight size={15}/></Link></div></div>}
        </article>
      </Reveal>;
    })}</div>
  </div></section>;
}

function Values({ t }) {
  const icons = [ShieldCheck, BadgeCheck, Handshake];
  return <section className="values"><div className="wrap values-grid">{t.values.map(([name, desc], i) => { const Icon = icons[i]; return <Reveal as="article" key={i} delay={i * 80}><div className="value-icon"><Icon aria-hidden="true"/></div><div><h3>{name}</h3><p>{desc}</p></div></Reveal>; })}</div></section>;
}

function About({ t, detail = false }) {
  return <section className="about wrap" id="sherbimet"><Reveal kind="from-left" className="about-copy"><small>{t.about[0]}</small><h2>{t.about[1]}</h2><i/><p>{t.about[2]}</p><p>{t.about[3]}</p><Button to={detail ? "/oferte" : "/sherbimet"}>{t.buttons[detail ? 4 : 3]}</Button></Reveal>
    <Reveal kind="from-right" className="about-image" delay={120}><div className="parallax-frame"><Photo src={assets.drilling} alt={t.about[0]}/></div><div className="experience"><div className="round-icon"><Users aria-hidden="true"/></div><div><b>{t.values[2][0]}</b><strong>30+</strong><span>{t.stats[2][1]}</span></div></div></Reveal>
  </section>;
}
function Stats({ t }) {
  const icons = [Truck, PackageCheck, Users];
  return <section className="stats wrap">{t.stats.map(([num, label], i) => { const Icon = icons[i]; return <Reveal as="article" key={i} delay={i * 60}><Icon aria-hidden="true"/><div><Counter value={num}/><span>{label}</span></div></Reveal>; })}</section>;
}
function CTA({ t }) {
  return <section className="cta"><Photo className="cta-photo" src={assets.hero} alt="" sizes="100vw"/><Reveal><h2>{t.cta[0]}</h2><p>{t.cta[1]}</p><Button to="/oferte" light>{t.buttons[4]}</Button></Reveal></section>;
}
function Footer({ t, lang }) {
  return <footer><div className="wrap footer-grid"><Reveal className="footer-brand"><img src={assets.logo} alt="Murana Kompani" width="145" height="80" loading="lazy"/><p>{t.footer[0]}</p><div className="social"><a href="https://www.facebook.com/p/Murana-Kompani-100058614226299/" target="_blank" rel="noreferrer" aria-label="Facebook"><span>f</span></a><a href="https://www.instagram.com/murana.kompani/" target="_blank" rel="noreferrer" aria-label="Instagram"><span>◎</span></a></div></Reveal>
    <Reveal delay={40}><h4>{t.footer[1]}</h4>{navLabels(t).map((name, i) => <Link key={paths[i]} to={paths[i]}>{name}<ChevronRight aria-hidden="true"/></Link>)}</Reveal>
    <Reveal delay={80}><h4>{t.footer[2]}</h4>{t.productData.map(([name], i) => <Link key={i} to={`/produkte#product-${i}`}>{name}<ChevronRight aria-hidden="true"/></Link>)}</Reveal>
    <Reveal className="footer-contact" delay={120}><h4>{t.footer[3]}</h4><a href="tel:+38970209863"><Phone/>Elvir Alii: +389 70 209 863</a><a href="tel:+38970209638"><Phone/>Rakip Alii: +389 70 209 638</a><a href="mailto:murana.kompani@hotmail.com"><Mail/>murana.kompani@hotmail.com</a><p className="address"><MapPin/>ul. Klisura bb, Zhelinë,<br/>Republic of Macedonia, 1226</p></Reveal>
  </div><div className="copyright wrap"><span>© 2026 Murana Kompani. {t.footer[4]}</span><a href="https://www.adsolutions.mk" target="_blank" rel="noreferrer">{t.footer[5]}</a></div></footer>;
}
function Home({ t, lang }) { return <><Hero t={t}/><Products t={t} lang={lang}/><Values t={t}/><About t={t}/><Stats t={t}/><WellStory t={t} lang={lang}/><CTA t={t}/></>; }
function AboutPage({ t, lang }) {
  return <><PageIntro variant="about" lang={lang} title={t.pages.about[0]} desc={t.pages.about[1]}/><section className="benefit-detail wrap"><Reveal><small>MURANA KOMPANI</small><h2>{t.company[0]}</h2><p>{t.company[1]}</p><p>{t.company[2]}</p></Reveal><Reveal kind="image" className="parallax-frame"><Photo src={assets.hero} alt={lang === 'mk' ? 'Камион на Мурана Компани со бетонски елементи' : 'Kamioni i Murana Kompani me elemente betoni'}/></Reveal></section><CompanyJourney t={t} lang={lang}/><Values t={t}/><Stats t={t}/><CTA t={t}/></>;
}
function ContactPage({ t, lang, quote = false }) {
  const p = quote ? t.pages.quote : t.pages.contact;
  return <><PageIntro variant={quote ? "quote" : "contact"} lang={lang} title={p[0]} desc={p[1]}/><section className={`contact wrap ${quote ? 'quote-layout' : 'contact-only contact-with-map'}`}><Reveal className="contact-info"><small>MURANA KOMPANI</small><h2>{p[0]}</h2><p>{t.cta[1]}</p><a href="tel:+38970209863"><Phone aria-hidden="true"/><span><b>Elvir Alii</b><small>+389 70 209 863</small></span></a><a href="tel:+38970209638"><Phone aria-hidden="true"/><span><b>Rakip Alii</b><small>+389 70 209 638</small></span></a><a href="mailto:murana.kompani@hotmail.com"><Mail aria-hidden="true"/><span><b>murana.kompani@hotmail.com</b><small>Email</small></span></a><div className="contact-address"><MapPin aria-hidden="true"/><span><b>ul. Klisura bb, Zhelinë</b><small>Republic of Macedonia, 1226</small></span></div></Reveal>{quote ? <QuoteForm t={t} lang={lang}/> : <ContactMap lang={lang}/>}</section></>;
}

function ScrollTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());
  const initial = useRef(true);
  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);
  useLayoutEffect(() => {
    const key = location.key;
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        let anchor = location.hash.slice(1);
        try { anchor = decodeURIComponent(anchor); } catch { /* Invalid fragments simply have no matching anchor. */ }
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
      else window.scrollTo({ top: navigationType === 'POP' ? positions.current.get(key) || 0 : 0, behavior: 'instant' });
      if (!initial.current) document.querySelector('main')?.focus({ preventScroll: true });
      initial.current = false;
    });
    const remember = () => positions.current.set(key, window.scrollY);
    window.addEventListener('scroll', remember, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', remember); };
  }, [location.key, location.pathname, location.hash, navigationType]);
  return null;
}
export default function App() {
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('murana-lang') === 'mk' ? 'mk' : 'al'; } catch { return 'al'; } });
  const [languageVersion, setLanguageVersion] = useState(0);
  const location = useLocation();
  useEffect(() => { try { localStorage.setItem('murana-lang', lang); } catch { /* The site also works without storage. */ } document.documentElement.lang = lang === 'al' ? 'sq' : 'mk'; }, [lang]);
  const changeLanguage = next => {setLang(next); setLanguageVersion(version => version + 1);};
  const t = copy[lang];
  return <><a className="skip-link" href="#main">{lang === 'mk' ? 'До содржината' : 'Kalo te përmbajtja'}</a><ScrollTop/><RouteCurtain/><SEO lang={lang}/><Header lang={lang} setLang={changeLanguage}/><main id="main" tabIndex={-1}><div className={languageVersion % 2 ? 'language-a' : 'language-b'}><div className="route-content" key={location.pathname}><Routes>
    <Route path="/" element={<Home t={t} lang={lang}/>}/>
    <Route path="/produkte" element={<><PageIntro variant="products" lang={lang} title={t.pages.products[0]} desc={t.pages.products[1]}/><Products t={t} lang={lang} full/><CTA t={t}/></>}/>
    <Route path="/sherbimet" element={<><PageIntro variant="services" lang={lang} title={t.pages.services[0]} desc={t.pages.services[1]}/><ServicesContent t={t} lang={lang}/><CTA t={t}/></>}/>
    <Route path="/pyetje-te-shpeshta" element={<><PageIntro variant="faq" lang={lang} title={t.pages.faq[0]} desc={t.pages.faq[1]}/><FAQContent lang={lang}/><CTA t={t}/></>}/>
    <Route path="/rreth-nesh" element={<AboutPage t={t} lang={lang}/>}/>
    <Route path="/kontakt" element={<ContactPage t={t} lang={lang}/>}/>
    <Route path="/oferte" element={<ContactPage t={t} lang={lang} quote/>}/>
    <Route path="*" element={<NotFound lang={lang}/>}/>
  </Routes></div></div></main><Footer t={t} lang={lang}/></>;
}
