import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Box, ChevronRight, Factory, Handshake, Mail, MapPin, Menu, PackageCheck, Phone, ShieldCheck, Truck, Users, X } from 'lucide-react';

const A='/media_to_use/';
const assets={
  logo:A+'logo_oztpuu_c_scale,w_200.png',
  hero:A+'hero-img3_z2aqye_c_scale,w_960.webp',
  pipe:A+'concrete-pipes-photo_ic8qmm_c_scale,w_612.webp',
  cone:A+'concrete-pipe-cones-photo_mgk5fv_c_scale,w_683.webp',
  square:A+'concrete-pipe-katror-photo_pikkei_c_scale,w_638.webp',
  cover:A+'concrete-pipe-kapak-photo_g8pqdx_c_scale,w_882.webp',
  drilling:A+'kamioni-maqina_dkax6r_c_scale,w_1109.webp'
};

const copy={
  al:{
    nav:['Ballina','Produkte','Rreth Nesh','Kontakt'],
    hero:['Partneri juaj i','besueshëm','për elemente','të betonit','Me gypa betoni të qëndrueshëm dhe shërbim të përkushtuar për hapjen e puseve të ujit, Murana Kompani sjell siguri dhe efikasitet në çdo ndërtim.'],
    products:['PRODUKTET TONA','Zgjidhja e duhur për çdo projekt'],
    productData:[
      ['Gypa Betoni','Të qëndrueshëm dhe cilësor për sisteme të kanalizimeve dhe ujitjes.',assets.pipe],
      ['Gypa Betoni Kon','Të krijuar për të plotësuar kërkesat unike inxhinierike dhe për performancë maksimale.',assets.cone],
      ['Gypa Betoni Katror','Zgjidhja jonë me formë katrore dhe kubike për stabilitet maksimal.',assets.square],
      ['Kapakë Betoni','Të prodhuar për të siguruar dhe mbrojtur instalimet tuaja të betonit.',assets.cover]
    ],
    values:[['Profesionalizëm','Ekipi i specializuar me përvojë të gjatë në prodhimin dhe shërbimin e elementeve të betonit.'],['Cilësi e Garantuar','Produkte cilësore të testuara për rezistencë dhe qëndrueshmëri afatgjatë.'],['Partner i Besueshëm','Jemi pranë jush për çdo projekt, me shërbim të shpejtë dhe të sigurt.']],
    about:['HAPJA E PUSEVE TË UJIT','Shërbim profesional për hapjen e puseve të ujit','Tek Murana Kompani ofrojmë shërbim të specializuar për hapjen e puseve të ujit, një zgjidhje e rëndësishme për familjet, komunitetet dhe bizneset që kërkojnë furnizim të qëndrueshëm me ujë të pastër.','Përdorim pajisje profesionale dhe gypat tanë të betonit me cilësi të lartë për të ndërtuar puse të forta, të sigurta dhe të qëndrueshme.'],
    stats:[['5000+','Projekte të realizuara'],['100000+','Produkte të prodhuara'],['30+','Vjet përvojë']],
    cta:['Keni një projekt?','Na kontaktoni për ofertë të personalizuar dhe zgjidhjen më të mirë për nevojat tuaja.'],
    buttons:['SHIKO PRODUKTET','SHIKO SHËRBIMET','MË SHUMË','MËSO MË SHUMË','KËRKO OFERTË'],
    footer:['Partneri juaj i besueshëm për elemente të betonit dhe shërbime profesionale në ndërtim dhe ujësjellës.','LIDHJE TË SHPEJTA','PRODUKTET','KONTAKT','Të gjitha të drejtat e rezervuara.','Zhvilluar nga AD Solutions'],
    pages:{products:['Produktet tona','Elemente betoni të punuara me standarde të larta për projekte që zgjasin.'],about:['Rreth Murana Kompani','Përvojë, cilësi dhe përgjegjësi në çdo projekt.'],benefits:['Pse të na zgjidhni','Kapacitet, përvojë dhe cilësi që i japin siguri projektit tuaj.'],projects:['Projektet tona','Nga prodhimi te instalimi, puna jonë flet për ne.'],contact:['Na kontaktoni','Le të flasim për projektin tuaj të ardhshëm.'],quote:['Kërko ofertë','Na tregoni çfarë ju nevojitet dhe do t’ju përgjigjemi shpejt.']}
    ,company:['Kompani me traditë mbi 30-vjeçare','Murana Kompani është kompani familjare me mbi 30 vjet përvojë në prodhimin e elementeve të betonit dhe hapjen profesionale të puseve të ujit. Me bazë në Zhelinë, u shërbejmë klientëve privatë, bizneseve dhe projekteve të ndërtimit me përkushtim dhe përgjegjësi.','Procesi ynë mbështetet në përvojë, pajisje profesionale dhe kontroll të vazhdueshëm të cilësisë. Nga përzgjedhja e materialit deri te prodhimi dhe realizimi në terren, synimi ynë është të ofrojmë zgjidhje të sigurta, të qëndrueshme dhe të përshtatura për çdo projekt.']
  },
  mk:{
    nav:['Почетна','Производи','За нас','Контакт'],
    hero:['Вашиот','доверлив','партнер за','бетонски елементи','Со издржливи бетонски цевки и посветена услуга за дупчење бунари, Мурана Компани носи сигурност и ефикасност во секој проект.'],
    products:['НАШИТЕ ПРОИЗВОДИ','Вистинско решение за секој проект'],
    productData:[['Бетонски цевки','Издржливи и квалитетни за канализациски и системи за наводнување.',assets.pipe],['Конусни бетонски цевки','Создадени за уникатни инженерски барања и максимални перформанси.',assets.cone],['Квадратни бетонски цевки','Квадратно и кубично решение за максимална стабилност.',assets.square],['Бетонски капаци','Произведени за сигурност и заштита на бетонските инсталации.',assets.cover]],
    values:[['Професионалност','Специјализиран тим со долгогодишно искуство во бетонски елементи.'],['Гарантиран квалитет','Тестирани производи за долгорочна отпорност и издржливост.'],['Доверлив партнер','Тука сме за секој проект со брза и сигурна услуга.']],
    about:['ДУПЧЕЊЕ БУНАРИ','Професионална услуга за дупчење бунари','Мурана Компани нуди специјализирана услуга за дупчење бунари за семејства, заедници и компании на кои им е потребно стабилно снабдување со чиста вода.','Користиме професионална опрема и сопствени висококвалитетни бетонски цевки за цврсти, безбедни и долготрајни бунари.'],
    stats:[['5000+','Завршени проекти'],['100000+','Произведени производи'],['30+','Години искуство']],
    cta:['Имате проект?','Контактирајте нè за персонализирана понуда и најдобро решение за вашите потреби.'],
    buttons:['ВИДИ ПРОИЗВОДИ','ВИДИ УСЛУГИ','ПОВЕЌЕ','ДОЗНАЈ ПОВЕЌЕ','ПОБАРАЈ ПОНУДА'],
    footer:['Вашиот доверлив партнер за бетонски елементи и професионални услуги во градежништвото и водоснабдувањето.','БРЗИ ЛИНКОВИ','ПРОИЗВОДИ','КОНТАКТ','Сите права се задржани.','Изработено од AD Solutions'],
    pages:{products:['Нашите производи','Бетонски елементи изработени по високи стандарди за долготрајни проекти.'],about:['За Мурана Компани','Искуство, квалитет и одговорност во секој проект.'],benefits:['Зошто ние','Капацитет, искуство и квалитет што му даваат сигурност на вашиот проект.'],projects:['Нашите проекти','Од производство до монтажа, нашата работа зборува за нас.'],contact:['Контактирајте нè','Ајде да разговараме за вашиот следен проект.'],quote:['Побарај понуда','Кажете ни што ви треба и брзо ќе ви одговориме.']}
    ,company:['Компанија со традиција подолга од 30 години','Мурана Компани е семејна компанија со повеќе од 30 години искуство во производство на бетонски елементи и професионално дупчење бунари. Од нашата база во Желино им служиме на приватни клиенти, компании и градежни проекти со посветеност и одговорност.','Нашиот процес се темели на искуство, професионална опрема и постојана контрола на квалитетот. Од изборот на материјал до производството и работата на терен, нудиме безбедни и долготрајни решенија приспособени на секој проект.']
  }
};

const paths=['/','/produkte','/rreth-nesh','/kontakt'];

function Button({to,children,light=false,outline=false}){return <Link className={`button ${light?'light':''} ${outline?'outline':''}`} to={to}>{children}<ArrowRight size={17}/></Link>}

function Header({lang,setLang}){
  const [open,setOpen]=useState(false); const t=copy[lang];
  return <header className="header"><div className="nav wrap"><Link to="/" className="brand" onClick={()=>setOpen(false)}><img src={assets.logo}/></Link><nav className={open?'open':''}>{t.nav.map((n,i)=><NavLink key={n} to={paths[i]} end={i===0} onClick={()=>setOpen(false)}>{n}</NavLink>)}<div className="mobile-actions"><button onClick={()=>setLang(lang==='al'?'mk':'al')}>{lang==='al'?'MK':'AL'}</button><Button to="/oferte">{t.buttons[4]}</Button></div></nav><div className="nav-actions"><button className="lang" onClick={()=>setLang(lang==='al'?'mk':'al')}>{lang==='al'?'AL / MK':'MK / AL'}</button><Button to="/oferte">{t.buttons[4]}</Button></div><button className="menu" aria-label="Menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>
}

function Hero({t}){return <section className="hero" style={{backgroundImage:`url(${assets.hero})`}}><div className="wrap hero-inner"><div className="hero-copy"><h1>{t.hero[0]} <span>{t.hero[1]}</span><br/>{t.hero[2]}<br/>{t.hero[3]}</h1><div className="red-line"/><p>{t.hero[4]}</p><div className="hero-buttons"><Button to="/produkte">{t.buttons[0]}</Button><Button to="/rreth-nesh" outline>{t.buttons[1]}</Button></div></div></div></section>}

const picons=[PackageCheck,Factory,Box,BadgeCheck];
function Products({t,full=false}){return <section className={`products ${full?'page-products':''}`}><div className="wrap"><div className="section-heading"><small>{t.products[0]}</small><h2>{t.products[1]}</h2><i/></div><div className="product-grid">{t.productData.map(([name,desc,img],i)=>{const Icon=picons[i];return <article className="product-card" key={name}><img src={img}/><div className="product-body"><div className="round-icon"><Icon/></div><h3>{name}</h3><p>{desc}</p><Link to="/produkte">{t.buttons[2]} <ArrowRight size={14}/></Link></div></article>})}</div></div></section>}

function Values({t}){const icons=[ShieldCheck,BadgeCheck,Handshake];return <section className="values"><div className="wrap values-grid">{t.values.map(([name,desc],i)=>{const Icon=icons[i];return <article key={name}><div className="value-icon"><Icon/></div><div><h3>{name}</h3><p>{desc}</p></div></article>})}</div></section>}

function About({t}){return <section className="about wrap"><div className="about-copy"><small>{t.about[0]}</small><h2>{t.about[1]}</h2><i/><p>{t.about[2]}</p><p>{t.about[3]}</p></div><div className="about-image"><img src={assets.drilling}/><div className="experience"><div className="round-icon"><Users/></div><div><b>{t.values[2][0]}</b><strong>30+</strong><span>{t.stats[2][1]}</span></div></div></div></section>}

function Stats({t}){const icons=[Truck,PackageCheck,Users];return <section className="stats wrap">{t.stats.map(([num,label],i)=>{const Icon=icons[i];return <article key={label}><Icon/><div><strong>{num}</strong><span>{label}</span></div></article>})}</section>}

function CTA({t}){return <section className="cta" style={{backgroundImage:`linear-gradient(90deg,rgba(174,0,5,.94),rgba(174,0,5,.84)),url(${assets.hero})`}}><div><h2>{t.cta[0]}</h2><p>{t.cta[1]}</p><Button to="/oferte" light>{t.buttons[4]}</Button></div></section>}

function Footer({t}){return <footer><div className="wrap footer-grid"><div className="footer-brand"><img src={assets.logo}/><p>{t.footer[0]}</p><div className="social"><a href="https://www.facebook.com/p/Murana-Kompani-100058614226299/" target="_blank" rel="noreferrer" aria-label="Facebook"><span>f</span></a><a href="https://www.instagram.com/murana.kompani/" target="_blank" rel="noreferrer" aria-label="Instagram"><span>◎</span></a></div></div><div><h4>{t.footer[1]}</h4>{t.nav.map((x,i)=><Link key={x} to={paths[i]}>{x}<ChevronRight/></Link>)}</div><div><h4>{t.footer[2]}</h4>{t.productData.map(x=><Link key={x[0]} to="/produkte">{x[0]}<ChevronRight/></Link>)}</div><div className="footer-contact"><h4>{t.footer[3]}</h4><a href="tel:+38970209863"><Phone/>Elvir Alii: +389 70 209 863</a><a href="tel:+38970209638"><Phone/>Rakip Alii: +389 70 209 638</a><a href="mailto:murana.kompani@hotmail.com"><Mail/>murana.kompani@hotmail.com</a><a><MapPin/>ul. Klisura bb, Zhelinë,<br/>Republic of Macedonia, 1226</a></div></div><div className="copyright wrap"><span>© 2026 Murana Kompani. {t.footer[4]}</span><a href="https://www.adsolutions.mk" target="_blank" rel="noreferrer">{t.footer[5]}</a></div></footer>}

function Home({t}){return <><Hero t={t}/><Products t={t}/><Values t={t}/><About t={t}/><Stats t={t}/><CTA t={t}/></>}

function PageHero({title,desc}){return <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(15,15,15,.84),rgba(15,15,15,.32)),url(${assets.hero})`}}><div className="wrap"><small>MURANA KOMPANI</small><h1>{title}</h1><p>{desc}</p></div></section>}

function AboutPage({t}){return <><PageHero title={t.pages.about[0]} desc={t.pages.about[1]}/><section className="benefit-detail wrap"><div><small>MURANA KOMPANI</small><h2>{t.company[0]}</h2><p>{t.company[1]}</p><p>{t.company[2]}</p></div><img src={assets.hero} alt="Murana Kompani"/></section><Values t={t}/><Stats t={t}/><CTA t={t}/></>}
function BenefitsPage({t}){return <><PageHero title={t.pages.benefits[0]} desc={t.pages.benefits[1]}/><Values t={t}/><section className="benefit-detail wrap"><div><small>{t.about[0]}</small><h2>{t.about[1]}</h2><p>{t.about[2]}</p><p>{t.about[3]}</p></div><img src={assets.drilling}/></section><Stats t={t}/><CTA t={t}/></>}
function ProjectsPage({t}){return <><PageHero title={t.pages.projects[0]} desc={t.pages.projects[1]}/><section className="projects wrap">{[assets.drilling,assets.hero,assets.pipe,assets.square,assets.cone,assets.cover].map((im,i)=><article key={im}><img src={im}/><div><small>0{i+1}</small><h3>{t.productData[i%4][0]}</h3><p>{t.productData[i%4][1]}</p></div></article>)}</section><CTA t={t}/></>}

function ContactPage({t,quote=false}){const p=quote?t.pages.quote:t.pages.contact;return <><PageHero title={p[0]} desc={p[1]}/><section className="contact contact-only wrap"><div className="contact-info"><small>MURANA KOMPANI</small><h2>{p[0]}</h2><p>{t.cta[1]}</p><a href="tel:+38970209863"><Phone/> <span><b>Elvir Alii</b><small>+389 70 209 863</small></span></a><a href="tel:+38970209638"><Phone/> <span><b>Rakip Alii</b><small>+389 70 209 638</small></span></a><a href="mailto:murana.kompani@hotmail.com"><Mail/> <span><b>murana.kompani@hotmail.com</b><small>Email</small></span></a><a><MapPin/> <span><b>ul. Klisura bb, Zhelinë</b><small>Republic of Macedonia, 1226</small></span></a></div></section></>}

function ScrollTop(){const {pathname}=useLocation();useEffect(()=>window.scrollTo(0,0),[pathname]);return null}

function SEO({lang}){const {pathname}=useLocation();useEffect(()=>{const t=copy[lang];const key=pathname==='/produkte'?'products':pathname==='/rreth-nesh'?'about':pathname==='/kontakt'?'contact':pathname==='/oferte'?'quote':null;const title=key?`${t.pages[key][0]} | Murana Kompani`:'Murana Kompani | Elemente Betoni dhe Hapje Pusesh';const description=key?t.pages[key][1]:(lang==='al'?'Murana Kompani në Zhelinë: prodhim i elementeve të betonit dhe shërbim profesional për hapjen e puseve të ujit me mbi 30 vjet përvojë.':'Мурана Компани во Желино: бетонски елементи и професионално дупчење бунари со повеќе од 30 години искуство.');document.title=title;document.querySelector('meta[name="description"]')?.setAttribute('content',description);document.querySelector('meta[property="og:title"]')?.setAttribute('content',title);document.querySelector('meta[property="og:description"]')?.setAttribute('content',description);document.querySelector('meta[name="twitter:title"]')?.setAttribute('content',title);document.querySelector('meta[name="twitter:description"]')?.setAttribute('content',description)},[pathname,lang]);return null}

export default function App(){const [lang,setLang]=useState(()=>localStorage.getItem('murana-lang')||'al');useEffect(()=>{localStorage.setItem('murana-lang',lang);document.documentElement.lang=lang==='al'?'sq':'mk'},[lang]);const t=copy[lang];return <><ScrollTop/><SEO lang={lang}/><Header lang={lang} setLang={setLang}/><main><Routes><Route path="/" element={<Home t={t}/>}/><Route path="/produkte" element={<><PageHero title={t.pages.products[0]} desc={t.pages.products[1]}/><Products t={t} full/><CTA t={t}/></>}/><Route path="/rreth-nesh" element={<AboutPage t={t}/>}/><Route path="/perfitimet" element={<BenefitsPage t={t}/>}/><Route path="/projekte" element={<ProjectsPage t={t}/>}/><Route path="/kontakt" element={<ContactPage t={t}/>}/><Route path="/oferte" element={<ContactPage t={t} quote/>}/><Route path="*" element={<Home t={t}/>}/></Routes></main><Footer t={t}/></>}
