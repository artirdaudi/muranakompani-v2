import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { copy } from './content';
import { servicePageContent } from './ServicePages';
import { notFoundCopy } from './NotFound';

const origin = 'https://muranakompani.mk';
const routes = {
  '/': {
    al: ['Murana Kompani | Elemente Betoni dhe Hapje Pusesh', 'Elemente betoni të qëndrueshme dhe hapje profesionale e puseve të ujit në Zhelinë, me mbi 30 vjet përvojë.'],
    mk: ['Мурана Компани | Бетонски елементи и дупчење бунари', 'Издржливи бетонски елементи и професионално дупчење бунари во Желино, со повеќе од 30 години искуство.'],
  },
  '/produkte': {
    al: ['Produkte Betoni | Murana Kompani', 'Gypa betoni, elemente konike, elemente katrore dhe kapakë betoni për kanalizim, ujitje dhe projekte infrastrukturore.'],
    mk: ['Бетонски производи | Мурана Компани', 'Бетонски цевки, конусни и квадратни елементи и бетонски капаци за канализација, наводнување и инфраструктура.'],
  },
  '/sherbimet': {
    al: ['Hapja e Puseve të Ujit | Murana Kompani', 'Shërbim profesional për hapjen e puseve të ujit, nga shqyrtimi i vendndodhjes te realizimi me pajisje dhe gypa betoni.'],
    mk: ['Дупчење бунари | Мурана Компани', 'Професионално дупчење бунари, од разгледување на локацијата до реализација со опрема и бетонски цевки.'],
  },
  '/rreth-nesh': {
    al: ['Rreth Nesh | Murana Kompani', 'Njihuni me Murana Kompani, një kompani familjare nga Zhelina me mbi 30 vjet përvojë në beton dhe hapjen e puseve.'],
    mk: ['За нас | Мурана Компани', 'Запознајте ја Мурана Компани, семејна компанија од Желино со повеќе од 30 години искуство во бетон и бунари.'],
  },
  '/pyetje-te-shpeshta': {
    al: ['Pyetje të Shpeshta | Murana Kompani', 'Përgjigje për hapjen e puseve, produktet e betonit, dimensionet, transportin, porositë dhe kërkesat për ofertë.'],
    mk: ['Чести прашања | Мурана Компани', 'Одговори за дупчење бунари, бетонски производи, димензии, транспорт, нарачки и барања за понуда.'],
  },
  '/kontakt': {
    al: ['Kontakt dhe Vendndodhje | Murana Kompani', 'Kontaktoni Murana Kompani në Zhelinë me telefon ose email dhe gjeni vendndodhjen tonë në Google Maps.'],
    mk: ['Контакт и локација | Мурана Компани', 'Контактирајте ја Мурана Компани во Желино по телефон или е-пошта и најдете ја нашата локација на Google Maps.'],
  },
  '/oferte': {
    al: ['Kërko Ofertë | Murana Kompani', 'Përshkruani projektin tuaj dhe përgatitni një kërkesë për ofertë për elemente betoni ose hapjen e puseve të ujit.'],
    mk: ['Побарај понуда | Мурана Компани', 'Опишете го вашиот проект и подгответе барање за понуда за бетонски елементи или дупчење бунари.'],
  },
};

function setMeta(selector, attribute, value) {
  let node = document.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
    if (!match) return;
    node.setAttribute(match[1], match[2]);
    document.head.appendChild(node);
  }
  node.setAttribute(attribute, value);
}

function pageSchema(pathname, lang, title, description) {
  const url = `${origin}${pathname === '/' ? '/' : pathname}`;
  const mk = lang === 'mk';
  const breadcrumbNames = mk ? ['Почетна', title.split(' | ')[0]] : ['Ballina', title.split(' | ')[0]];
  const graph = [{
    '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description,
    inLanguage: mk ? 'mk-MK' : 'sq-MK', isPartOf: { '@id': `${origin}/#website` },
  }];
  if (pathname !== '/') graph.push({
    '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: breadcrumbNames[0], item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: breadcrumbNames[1], item: url },
    ],
  });
  if (pathname === '/produkte') graph.push({
    '@type': 'ItemList', name: title.split(' | ')[0],
    itemListElement: copy[lang].productData.map(([name, desc], index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Product', name, description: desc, url: `${url}#product-${index}` } })),
  });
  if (pathname === '/sherbimet') graph.push({
    '@type': 'Service', name: copy[lang].about[0], description: copy[lang].about[2],
    provider: { '@id': `${origin}/#business` }, areaServed: { '@type': 'Country', name: 'North Macedonia' }, url,
  });
  if (pathname === '/pyetje-te-shpeshta') graph.push({
    '@type': 'FAQPage', mainEntity: servicePageContent[lang].groups.flatMap(group => group.items).map(([question, answer]) => ({
      '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  });
  if (pathname === '/kontakt') graph.push({
    '@type': 'ContactPage', name: title, mainEntity: { '@id': `${origin}/#business` },
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function SEO({ lang }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const known = Boolean(routes[pathname]);
    const [title, description] = known
      ? routes[pathname][lang]
      : [`404 — ${notFoundCopy[lang].title} | Murana Kompani`, notFoundCopy[lang].description];
    const canonicalPath = pathname;
    const url = `${origin}${canonicalPath === '/' ? '/' : canonicalPath}`;
    document.title = title;
    document.documentElement.lang = lang === 'mk' ? 'mk' : 'sq';
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:locale"]', 'content', lang === 'mk' ? 'mk_MK' : 'sq_MK');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = url;
    const schema = document.querySelector('#page-schema') || Object.assign(document.createElement('script'), { id: 'page-schema', type: 'application/ld+json' });
    schema.textContent = JSON.stringify(pageSchema(canonicalPath, lang, title, description));
    if (!schema.parentNode) document.head.appendChild(schema);
  }, [pathname, lang]);
  return null;
}

export { routes as seoRoutes };
