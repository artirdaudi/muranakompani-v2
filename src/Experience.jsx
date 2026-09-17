import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Copy, Mail, Maximize2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from './content';
import { Photo } from './Media';
import { Reveal, useScrollScene } from './motion';
import { useConstructionScene } from './Scenes';

export function WellStory({ t, lang }) {
  const scene = useConstructionScene();
  const mk = lang === 'mk';
  const steps = mk ? [
    ['Професионална опрема', 'Посветена услуга за дупчење бунари.'],
    ['Бетонски елементи', 'Сопствени бетонски цевки за изградба на бунари.'],
    ['Водоснабдување', 'Решенија за семејства, заедници и компании.'],
  ] : [
    ['Pajisje profesionale', 'Shërbim i përkushtuar për hapjen e puseve.'],
    ['Elemente betoni', 'Gypat tanë të betonit për ndërtimin e puseve.'],
    ['Furnizim me ujë', 'Zgjidhje për familje, komunitete dhe biznese.'],
  ];
  return <section ref={scene} className="well-story" aria-labelledby="well-title"><div className="wrap well-grid">
    <Reveal className="well-copy"><small className="eyebrow">{t.about[0]}</small><h2 id="well-title">{mk ? 'Од искуство до решение' : 'Nga përvoja te zgjidhja'}</h2>
      <ol className="process-list">{steps.map(([title, body], i) => <li key={i} data-step={i}><span className="step-number">0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
      <Link className="text-link" to="/oferte">{t.buttons[4]} <ArrowRight size={17}/></Link>
    </Reveal>
    <Reveal kind="well" className="well-visual"><div className="construction-meter" aria-hidden="true"><span>01 / 03</span><i/><span>03 / 03</span></div>
      <svg viewBox="0 0 480 430" role="img" aria-label={mk ? 'Илустрација на бунар со бетонски прстени и вода' : 'Ilustrim i një pusi me unaza betoni dhe ujë'}>
        <defs><pattern id="soil" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M2 18L6 14" stroke="#d9d1c7" strokeWidth="1"/></pattern><linearGradient id="concrete"><stop stopColor="#c8c5bf"/><stop offset=".45" stopColor="#f1eeea"/><stop offset="1" stopColor="#b1ada7"/></linearGradient></defs>
        <rect x="20" y="20" width="440" height="380" rx="20" fill="#f2eee8"/>
        <path d="M20 150H160V375H320V150H460V400H20Z" fill="url(#soil)"/>
        <path className="ground-line" d="M40 150H145M335 150H440" fill="none" stroke="#b30d12" strokeWidth="2"/>
        {[0,1,2,3].map(i => <g className="well-ring" style={{'--ring': i, '--ring-y': `var(--ring-${i}-y, 0px)`, '--ring-opacity': `var(--ring-${i}-opacity, 1)`}} key={i}>
          <path d={`M165 ${150+i*52} Q240 ${172+i*52} 315 ${150+i*52} V${196+i*52} Q240 ${220+i*52} 165 ${196+i*52}Z`} fill="url(#concrete)" stroke="#9d9992"/>
          <ellipse cx="240" cy={150+i*52} rx="75" ry="17" fill="#ddd9d2" stroke="#9d9992"/>
          <ellipse cx="240" cy={150+i*52} rx="61" ry="10" fill="#746f68"/>
        </g>)}
        <g className="well-water"><path d="M180 283Q210 275 240 283T300 283V359Q240 377 180 359Z" fill="#6eabb8"/><path d="M185 285Q215 277 245 285T295 285" stroke="#c3e3e8" fill="none" strokeWidth="2"/></g>
        <g className="drill-tool" aria-hidden="true"><path d="M226 80H254V107H226Z" fill="#b30d12"/><path d="M240 106V155" stroke="#414840" strokeWidth="10"/><path d="M229 115L251 125M229 130L251 140M234 152L240 162L246 152" stroke="#b30d12" strokeWidth="4" fill="none"/></g>
        <text x="240" y="56" textAnchor="middle" fill="#736c63" fontSize="10" letterSpacing="3">MURANA KOMPANI</text>
        <path d="M347 171H383M347 325H383M374 171V325" fill="none" stroke="#aaa197" strokeDasharray="3 4"/>
      </svg>
      <p>{mk ? 'Концептуален приказ · секој проект се планира индивидуално.' : 'Paraqitje konceptuale · çdo projekt planifikohet individualisht.'}</p>
    </Reveal>
  </div></section>;
}

export function CompanyJourney({ t, lang }) {
  const scene = useScrollScene();
  const mk = lang === 'mk';
  const labels = mk ? ['Семејна традиција', 'Сопствено производство', 'Работа на терен'] : ['Traditë familjare', 'Prodhim vetjak', 'Punë në terren'];
  const descriptions = mk ? ['Повеќе од 30 години искуство во Желино.', 'Бетонски елементи со постојана контрола на квалитетот.', 'Професионално дупчење бунари за различни потреби.'] : ['Mbi 30 vjet përvojë, me bazë në Zhelinë.', 'Elemente betoni me kontroll të vazhdueshëm të cilësisë.', 'Hapje profesionale e puseve për nevoja të ndryshme.'];
  const photos = [assets.hero, assets.pipe, assets.drilling];
  return <section ref={scene} className="journey journey-timeline wrap"><Reveal className="section-heading"><small>{mk ? 'НАШАТА ПРИКАЗНА' : 'HISTORIA JONË'}</small><h2>{t.pages.about[1]}</h2><i/></Reveal>
    <div className="timeline-track"><div className="timeline-spine" aria-hidden="true"><i/></div>{labels.map((label, i) => <Reveal as="article" className="timeline-stop" delay={80} key={i}>
      <div className="timeline-photo"><Photo src={photos[i]} alt={label}/><span aria-hidden="true">0{i+1}</span></div>
      <span className="timeline-node" aria-hidden="true"/>
      <div className="timeline-copy"><span className="journey-mark">{i === 0 ? '30+' : `0${i+1}`}</span><h3>{label}</h3><p>{descriptions[i]}</p></div>
    </Reveal>)}</div>
  </section>;
}

export function Gallery({ t, lang }) {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  const closing = useRef(false);
  const titleId = useId();
  const mk = lang === 'mk';
  const items = [[assets.drilling, t.about[0]], [assets.hero, mk ? 'Транспорт на бетонски елементи' : 'Transport i elementeve të betonit'], ...t.productData.map(([name,,img]) => [img,name])];
  useEffect(() => {
    if (selected === null) return;
    if (!dialog.current.open) dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [selected]);
  function close() {
    if (closing.current) return;
    closing.current = true;
    dialog.current.close();
    setSelected(null);
    opener.current?.focus();
    closing.current = false;
  }
  function change(delta) { setSelected(value => (value + delta + items.length) % items.length); }
  return <><section className="projects wrap">{items.map(([src,name], i) => <Reveal as="article" key={src} delay={i % 2 * 80} kind="image">
    <button className="gallery-open" aria-label={`${mk ? 'Отвори фотографија' : 'Hap fotografinë'}: ${name}`} onClick={event => { opener.current = event.currentTarget; setSelected(i); }}>
      <Photo src={src} alt={name}/><span className="gallery-caption"><small>0{i+1}</small><h3>{name}</h3></span><span className="gallery-expand"><Maximize2 size={18}/></span>
    </button>
  </Reveal>)}</section>
  <dialog ref={dialog} className="lightbox" aria-labelledby={titleId} onCancel={event => { event.preventDefault(); close(); }} onClose={() => { if (selected !== null) close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => { if (event.key === 'ArrowRight') {event.preventDefault(); change(1);} if (event.key === 'ArrowLeft') {event.preventDefault(); change(-1);} }}>
    {selected !== null && <div className="lightbox-content"><button autoFocus className="icon-button lightbox-close" onClick={close} aria-label={mk ? 'Затвори' : 'Mbyll'}><X/></button><Photo key={selected} eager src={items[selected][0]} alt={items[selected][1]} sizes="90vw"/><div className="lightbox-bottom"><button className="icon-button" onClick={() => change(-1)} aria-label={mk ? 'Претходна' : 'E mëparshmja'}><ArrowLeft/></button><div aria-live="polite"><h2 id={titleId}>{items[selected][1]}</h2><span>{selected+1} / {items.length}</span></div><button className="icon-button" onClick={() => change(1)} aria-label={mk ? 'Следна' : 'Tjetra'}><ArrowRight/></button></div></div>}
  </dialog></>;
}

export function QuoteForm({ t, lang }) {
  const mk = lang === 'mk';
  const [prepared, setPrepared] = useState(null);
  const [copied, setCopied] = useState(false);
  const summary = useRef(null);
  useEffect(() => { if (prepared) summary.current?.focus(); }, [prepared]);
  function prepare(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `${mk ? 'Барање за понуда' : 'Kërkesë për ofertë'}\n\n${mk ? 'Име' : 'Emri'}: ${data.get('name')}\nEmail: ${data.get('email')}\n${mk ? 'Телефон' : 'Telefoni'}: ${data.get('phone') || '—'}\n\n${data.get('message')}`;
    setPrepared(body); setCopied(false);
  }
  async function copyRequest() {
    try { await navigator.clipboard.writeText(prepared); setCopied(true); }
    catch { summary.current?.focus(); }
  }
  return <Reveal className="quote-panel"><form onSubmit={prepare} onChange={() => {setPrepared(null); setCopied(false);}}>
    <small className="eyebrow">{mk ? 'ВАШИОТ ПРОЕКТ' : 'PROJEKTI JUAJ'}</small><h2>{t.pages.quote[0]}</h2>
    <p className="form-intro">{mk ? 'Подгответе го барањето, потоа испратете го преку вашата е-пошта.' : 'Përgatitni kërkesën, pastaj dërgojeni përmes aplikacionit tuaj të emailit.'}</p>
    <div className="form-row"><label>{mk ? 'Име и презиме' : 'Emri dhe mbiemri'} *<input name="name" autoComplete="name" required maxLength={100}/></label><label>Email *<input name="email" type="email" autoComplete="email" required maxLength={150}/></label></div>
    <label>{mk ? 'Телефон (незадолжително)' : 'Telefoni (opsionale)'}<input name="phone" type="tel" autoComplete="tel" maxLength={40}/></label>
    <label>{mk ? 'Опишете го проектот' : 'Përshkruani projektin'} *<textarea name="message" rows={4} required maxLength={1500} placeholder={mk ? 'Локација, количина и потребни димензии…' : 'Vendndodhja, sasia dhe dimensionet e kërkuara…'}/></label>
    <button type="submit" className="button">{mk ? 'ПОДГОТВИ БАРАЊЕ' : 'PËRGATIT KËRKESËN'}<ArrowRight size={17}/></button>
  </form>
  {prepared && <section className="request-preview" aria-label={mk ? 'Преглед на барањето' : 'Përmbledhja e kërkesës'}><div className="request-seal" aria-hidden="true"><Check/></div><h3>{mk ? 'Подготвено за вашата е-пошта' : 'Gati për emailin tuaj'}</h3><p role="status">{mk ? 'Барањето сè уште не е испратено. Отворете ја е-поштата и испратете го оттаму.' : 'Kërkesa ende nuk është dërguar. Hapni emailin dhe dërgojeni prej aty.'}</p><textarea ref={summary} readOnly value={prepared} aria-label={mk ? 'Текст на барањето' : 'Teksti i kërkesës'} rows={7}/><div className="request-actions"><a className="button" href={`mailto:murana.kompani@hotmail.com?subject=${encodeURIComponent(t.pages.quote[0])}&body=${encodeURIComponent(prepared)}`}><Mail size={17}/>{mk ? 'ОТВОРИ Е-ПОШТА' : 'HAP EMAILIN'}</a><button className="text-link" onClick={copyRequest}>{copied ? <Check size={17}/> : <Copy size={17}/>}<span aria-live="polite">{copied ? (mk ? 'Копирано' : 'U kopjua') : (mk ? 'Копирај текст' : 'Kopjo tekstin')}</span></button></div></section>}
  </Reveal>;
}
