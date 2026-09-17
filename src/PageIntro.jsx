import { CircleHelp, FileText, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { copy } from './content';

export function PageIntro({ title, desc, variant, lang }) {
  const mk = lang === 'mk';
  const labels = {
    products: mk ? 'БЕТОНСКИ ЕЛЕМЕНТИ' : 'ELEMENTE BETONI',
    services: mk ? 'ОД ЛОКАЦИЈА ДО РЕАЛИЗАЦИЈА' : 'NGA VENDNDODHJA TE REALIZIMI',
    about: mk ? 'ЛУЃЕ. ИСКУСТВО. ПОСВЕТЕНОСТ.' : 'NJERËZ. PËRVOJË. PËRKUSHTIM.',
    faq: mk ? 'ДА ГИ РАЗЈАСНИМЕ ДЕТАЛИТЕ' : 'T’I SQAROJMË DETAJET',
    contact: mk ? 'ДА РАЗГОВАРАМЕ' : 'LE TË FLASIM',
    quote: mk ? 'ПРВИОТ ЧЕКОР НА ВАШИОТ ПРОЕКТ' : 'HAPI I PARË I PROJEKTIT TUAJ',
  };
  return <section className={`page-intro intro-${variant}`}>
    <div className="wrap intro-layout">
      <div className="intro-copy"><small>{labels[variant]}</small><h1>{title}</h1><p>{desc}</p>
        {variant === 'contact' && <div className="intro-address"><MapPin size={16} aria-hidden="true"/>ul. Klisura bb · {mk ? 'Желино' : 'Zhelinë'}</div>}
        {variant === 'quote' && <ol className="intro-steps">{(mk ? ['Вашите податоци', 'Вашиот проект', 'Барање по е-пошта'] : ['Të dhënat tuaja', 'Projekti juaj', 'Kërkesa me email']).map((step, i) => <li key={step}><span>0{i+1}</span>{step}</li>)}</ol>}
      </div>
      {variant === 'products' && <nav className="intro-product-index" aria-label={mk ? 'Изберете производ' : 'Zgjidhni produktin'}>{copy[lang].productData.map(([name], i) => <Link key={i} to={`/produkte#product-${i}`}><span>0{i+1}</span><strong>{name}</strong><ArrowUpRight size={18} aria-hidden="true"/></Link>)}</nav>}
      {variant === 'about' && <div className="intro-years"><strong>30<span>+</span></strong><span>{mk ? 'ГОДИНИ ИСКУСТВО' : 'VJET PËRVOJË'}</span><i/></div>}
      {variant === 'faq' && <div className="intro-question" aria-hidden="true"><span>?</span><CircleHelp/></div>}
      {variant === 'contact' && <div className="intro-location" aria-hidden="true"><div/><MapPin strokeWidth={.8}/><span>ZHELINË / MK</span></div>}
      {variant === 'quote' && <div className="intro-paper" aria-hidden="true"><FileText strokeWidth={.9}/><i/><i/><i/><span>MURANA KOMPANI</span></div>}
    </div>
  </section>;
}
