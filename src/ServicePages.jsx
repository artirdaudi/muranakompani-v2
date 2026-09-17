import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Reveal } from './motion';
import { Photo } from './Media';
import { WellStory } from './Experience';
import { assets } from './content';

const content = {
  al: {
    intro: 'Nga vendndodhja te realizimi',
    title: 'Një shërbim i plotë për pusin tuaj',
    body: 'Hapja e një pusi fillon me vendndodhjen dhe nevojën tuaj për ujë. Murana Kompani ofron hapjen e puseve me pajisje profesionale dhe elemente betoni nga prodhimi i vet.',
    points: ['Shqyrtimi i vendndodhjes dhe kërkesës suaj', 'Hapja e pusit me pajisje profesionale', 'Përdorimi i gypave tanë të betonit'],
    caption: 'Pajisjet tona për punë në terren',
    prepare: 'LE TA NISIM ME INFORMACIONIN E DUHUR',
    prepareTitle: 'Çfarë të na tregoni për projektin tuaj',
    cards: [['Vendndodhja', 'Na tregoni ku ndodhet parcela dhe si mund të hyjnë pajisjet në vendin e punës.'], ['Nevoja juaj', 'Përshkruani për çfarë do të përdoret pusi dhe çfarë dëshironi të realizoni.'], ['Koha e planifikuar', 'Tregoni kur dëshironi të filloni. Afatin dhe mundësinë e realizimit i diskutoni me ekipin.']],
    note: 'Detajet teknike, kostoja dhe afati përcaktohen për projektin tuaj. Na kontaktoni për të diskutuar vendndodhjen dhe kërkesat.',
    faqLink: 'Keni pyetje? Shikoni përgjigjet',
    faqIntro: 'PËRGJIGJE PARA SE TË FILLONI',
    faqTitle: 'Informacion i dobishëm për projektin tuaj',
    helpTitle: 'Pyetja juaj nuk është këtu?',
    helpBody: 'Për një përgjigje që lidhet me vendndodhjen, sasinë ose nevojën tuaj, flisni drejtpërdrejt me ekipin.',
    contact: 'Na kontaktoni',
    groups: [
      { id: 'puset', title: 'Puset dhe shërbimet', items: [
        ['Çfarë shërbimi ofroni për puset?', 'Ofrojmë hapjen e puseve të ujit me pajisje profesionale dhe përdorim gypat tanë të betonit për ndërtimin e tyre. Procesi nis me shqyrtimin e vendndodhjes dhe nevojave të projektit.'],
        ['Çfarë informacioni duhet të jap për një pus?', 'Na dërgoni vendndodhjen, përdorimin e planifikuar të pusit dhe informacion për hyrjen në parcelë. Nëse keni fotografi të terrenit ose të dhëna nga punë të mëparshme, përmendini kur na kontaktoni.'],
        ['Sa kushton hapja e një pusi dhe sa kohë zgjat?', 'Për çmimin dhe afatin, kërkoni një ofertë për vendndodhjen dhe punën tuaj. Këto detaje duhen konfirmuar me ekipin përpara se të planifikoni fillimin e punimeve.'],
      ]},
      { id: 'produktet', title: 'Produktet dhe porosia', items: [
        ['Çfarë elementesh betoni ofroni?', 'Në faqen e produkteve gjeni gypa betoni, elemente konike, elemente katrore dhe kapakë betoni. Për përzgjedhjen dhe disponueshmërinë, na tregoni çfarë kërkon projekti juaj.'],
        ['Si i konfirmoj dimensionet dhe sasitë?', 'Na tregoni produktin, sasinë dhe dimensionet që kërkoni. Nëse keni një skicë ose kërkesa të projektit, përmendini gjatë kontaktit. Përmasat dhe disponueshmëria konfirmohen drejtpërdrejt me ekipin.'],
        ['Si të diskutoj transportin deri në vendndodhjen time?', 'Dërgoni adresën e dorëzimit, produktin dhe sasinë. Diskutoni me ekipin mundësinë e transportit, hyrjen në vendndodhje, shkarkimin, koston dhe afatin përpara porosisë.'],
      ]},
      { id: 'kontakti', title: 'Oferta dhe kontakti', items: [
        ['Si funksionon kërkesa për ofertë në faqe?', 'Plotësoni emrin, emailin dhe përshkrimin e projektit. Telefoni është opsional. Butoni “Përgatit kërkesën” krijon një përmbledhje. Pastaj “Hap emailin” hap aplikacionin tuaj të emailit, ku duhet ta dërgoni vetë mesazhin. Formulari nuk e dërgon automatikisht.'],
        ['Ku ndodheni dhe si mund t’ju kontaktoj?', 'Ndodhemi në ul. Klisura bb, Zhelinë, 1226, Maqedonia e Veriut. Kontaktoni Elvir Alii në +389 70 209 863, Rakip Alii në +389 70 209 638 ose shkruani në murana.kompani@hotmail.com.'],
      ]},
    ],
  },
  mk: {
    intro: 'Од локација до реализација',
    title: 'Целосна услуга за вашиот бунар',
    body: 'Изградбата на бунар започнува со локацијата и вашата потреба за вода. Мурана Компани нуди дупчење бунари со професионална опрема и бетонски елементи од сопствено производство.',
    points: ['Разгледување на локацијата и вашето барање', 'Дупчење на бунарот со професионална опрема', 'Употреба на нашите бетонски цевки'],
    caption: 'Нашата опрема за работа на терен',
    prepare: 'ДА ПОЧНЕМЕ СО ВИСТИНСКИТЕ ИНФОРМАЦИИ',
    prepareTitle: 'Што да ни кажете за вашиот проект',
    cards: [['Локација', 'Кажете ни каде се наоѓа парцелата и каков е пристапот за опремата.'], ['Вашата потреба', 'Опишете за што ќе се користи бунарот и што сакате да реализирате.'], ['Планирано време', 'Кажете ни кога сакате да започнете. Рокот и можноста за реализација се договараат со тимот.']],
    note: 'Техничките детали, цената и рокот се одредуваат за вашиот проект. Контактирајте нè за да разговараме за локацијата и барањата.',
    faqLink: 'Имате прашања? Погледнете ги одговорите',
    faqIntro: 'ОДГОВОРИ ПРЕД ДА ЗАПОЧНЕТЕ',
    faqTitle: 'Корисни информации за вашиот проект',
    helpTitle: 'Вашето прашање не е тука?',
    helpBody: 'За одговор поврзан со вашата локација, количина или потреба, разговарајте директно со тимот.',
    contact: 'Контактирајте нè',
    groups: [
      { id: 'puset', title: 'Бунари и услуги', items: [
        ['Каква услуга нудите за бунари?', 'Нудиме дупчење бунари со професионална опрема и користиме сопствени бетонски цевки за нивна изградба. Процесот започнува со разгледување на локацијата и потребите на проектот.'],
        ['Кои информации се потребни за бунар?', 'Испратете ја локацијата, планираната употреба на бунарот и информации за пристапот до парцелата. Доколку имате фотографии од теренот или податоци од претходни работи, споменете ги при контактот.'],
        ['Колку чини дупчењето бунар и колку трае?', 'За цена и рок побарајте понуда за вашата локација и работа. Овие детали треба да се потврдат со тимот пред да го планирате почетокот на работите.'],
      ]},
      { id: 'produktet', title: 'Производи и нарачки', items: [
        ['Какви бетонски елементи нудите?', 'На страницата со производи ќе најдете бетонски цевки, конусни елементи, квадратни елементи и бетонски капаци. За избор и достапност, кажете ни што бара вашиот проект.'],
        ['Како да ги потврдам димензиите и количините?', 'Кажете ни кој производ, количина и димензии ви се потребни. Доколку имате скица или проектни барања, споменете ги при контактот. Димензиите и достапноста се потврдуваат директно со тимот.'],
        ['Како да разговарам за транспорт до мојата локација?', 'Испратете ја адресата за испорака, производот и количината. Разговарајте со тимот за можноста за транспорт, пристапот, истоварот, цената и рокот пред нарачката.'],
      ]},
      { id: 'kontakti', title: 'Понуда и контакт', items: [
        ['Како функционира барањето понуда на страницата?', 'Внесете име, е-пошта и опис на проектот. Телефонот е незадолжителен. „Подготви барање“ создава преглед. Потоа „Отвори е-пошта“ ја отвора вашата апликација за е-пошта, од каде што треба сами да ја испратите пораката. Формуларот не ја испраќа автоматски.'],
        ['Каде се наоѓате и како да ве контактирам?', 'Се наоѓаме на ул. Клисура бб, Желино, 1226, Северна Македонија. Контактирајте го Елвир Алии на +389 70 209 863, Ракип Алии на +389 70 209 638 или пишете на murana.kompani@hotmail.com.'],
      ]},
    ],
  },
};

export function ServicesContent({ t, lang }) {
  const c = content[lang];
  const icons = [MapPin, MessageCircle, Phone];
  return <>
    <section className="service-intro wrap">
      <Reveal kind="from-left" className="service-copy"><small className="eyebrow">{c.intro}</small><h2>{c.title}</h2><p>{c.body}</p>
        <ul className="service-points">{c.points.map(point => <li key={point}><Check size={18} aria-hidden="true"/>{point}</li>)}</ul>
        <Link className="button" to="/oferte">{t.buttons[4]}<ArrowRight size={17} aria-hidden="true"/></Link>
      </Reveal>
      <Reveal as="figure" kind="from-right" className="service-photo" delay={120}><Photo src={assets.drilling} alt={t.about[0]}/><figcaption>{c.caption}</figcaption></Reveal>
    </section>
    <WellStory t={t} lang={lang}/>
    <section className="service-preparation wrap"><Reveal className="section-heading"><small>{c.prepare}</small><h2>{c.prepareTitle}</h2><i/></Reveal>
      <div className="preparation-grid">{c.cards.map(([title, body], i) => { const Icon = icons[i]; return <Reveal as="article" key={i} delay={i * 90}><span className="preparation-number">0{i+1}</span><Icon size={26} aria-hidden="true"/><h3>{title}</h3><p>{body}</p></Reveal>; })}</div>
      <p className="service-note">{c.note}</p><Link className="text-link" to="/pyetje-te-shpeshta#puset">{c.faqLink}<ArrowRight size={17} aria-hidden="true"/></Link>
    </section>
  </>;
}

function FAQItem({ question, answer, id }) {
  const [open, setOpen] = useState(false);
  return <article className={`faq-item ${open ? 'is-open' : ''}`}>
    <h3><button id={`${id}-question`} aria-expanded={open} aria-controls={`${id}-answer`} onClick={() => setOpen(value => !value)}>{question}<ChevronDown size={19} aria-hidden="true"/></button></h3>
    <div className="faq-answer" id={`${id}-answer`} role="region" aria-labelledby={`${id}-question`} aria-hidden={!open} inert={!open}><div><p>{answer}</p></div></div>
  </article>;
}

export function FAQContent({ lang }) {
  const c = content[lang];
  return <section className="faq-layout wrap">
    <aside className="faq-sidebar"><small className="eyebrow">{c.faqIntro}</small><h2>{c.faqTitle}</h2>
      <nav aria-label={lang === 'mk' ? 'Категории на прашања' : 'Kategoritë e pyetjeve'}>{c.groups.map((group, i) => <Link to={`#${group.id}`} key={group.id}><span>0{i+1}</span>{group.title}<ArrowRight size={15} aria-hidden="true"/></Link>)}</nav>
      <div className="faq-help"><MessageCircle size={25} aria-hidden="true"/><h3>{c.helpTitle}</h3><p>{c.helpBody}</p><Link to="/kontakt" className="text-link">{c.contact}<ArrowRight size={16} aria-hidden="true"/></Link></div>
    </aside>
    <div className="faq-groups">{c.groups.map((group, index) => <section className="faq-group" id={group.id} aria-labelledby={`${group.id}-heading`} key={group.id}><h2 id={`${group.id}-heading`}><span>0{index+1}</span>{group.title}</h2>{group.items.map(([question, answer], i) => <FAQItem id={`faq-${group.id}-${i}`} question={question} answer={answer} key={i}/>)}</section>)}</div>
  </section>;
}
