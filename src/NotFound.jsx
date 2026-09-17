import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';

export const notFoundCopy = {
  al: { title: 'Faqja nuk u gjet', description: 'Adresa mund të jetë shkruar gabim ose faqja nuk është më në dispozicion.', home: 'KTHEHU NË BALLINË', contact: 'Na kontaktoni' },
  mk: { title: 'Страницата не е пронајдена', description: 'Адресата можеби е погрешно внесена или страницата повеќе не е достапна.', home: 'НАЗАД НА ПОЧЕТНА', contact: 'Контактирајте нè' },
};

export function NotFound({ lang }) {
  const c = notFoundCopy[lang];
  return <section className="not-found"><div className="wrap">
    <span className="not-found-code" aria-hidden="true">404</span>
    <small className="eyebrow">MURANA KOMPANI / 404</small>
    <h1>{c.title}</h1><p>{c.description}</p>
    <div className="not-found-actions"><Link className="button" to="/"><Home size={17} aria-hidden="true"/>{c.home}</Link><Link className="text-link" to="/kontakt">{c.contact}<ArrowRight size={17} aria-hidden="true"/></Link></div>
  </div></section>;
}
