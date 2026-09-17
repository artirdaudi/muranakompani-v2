import { ArrowUpRight, MapPin } from 'lucide-react';

// Google Maps listing matched by business name, phone, website and Klisura address.
const businessId = '15570016804997985607';
const placeId = 'ChIJS7i26-P3UxMRR3XEaMrPE9g';
const directions = `https://www.google.com/maps/dir/?api=1&destination=Murana%20Kompani&destination_place_id=${placeId}`;

export function ContactMap({ lang }) {
  const mk = lang === 'mk';
  return <section className="contact-map" aria-labelledby="contact-map-title">
    <div className="contact-map-heading"><div><small className="eyebrow">{mk ? 'ПОСЕТЕТЕ НÈ' : 'NA VIZITONI'}</small><h2 id="contact-map-title">{mk ? 'Нашата локација' : 'Vendndodhja jonë'}</h2></div><MapPin aria-hidden="true"/></div>
    <div className="contact-map-frame"><iframe
      title={mk ? 'Мурана Компани на Google Maps' : 'Murana Kompani në Google Maps'}
      src={`https://maps.google.com/maps?cid=${businessId}&output=embed&hl=${mk ? 'mk' : 'sq'}`}
      width="600" height="380" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
    /></div>
    <div className="contact-map-bottom"><p>ul. Klisura bb, {mk ? 'Желино' : 'Zhelinë'}, 1226</p><a className="text-link" href={directions} target="_blank" rel="noopener noreferrer">{mk ? 'Насоки на Google Maps' : 'Udhëzime në Google Maps'}<ArrowUpRight size={17} aria-hidden="true"/></a></div>
  </section>;
}
