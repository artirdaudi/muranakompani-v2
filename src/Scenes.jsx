import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from './motion';
import { assets } from './content';

export function ProductBlueprint({ index, lang }) {
  const label = lang === 'mk' ? 'Концептуален приказ' : 'Paraqitje konceptuale';
  return <div className="product-blueprint" aria-hidden="true"><svg viewBox="0 0 300 185" fill="none">
    <g className="blueprint-guides" stroke="currentColor" strokeWidth=".6"><path d="M30 145H260M48 30V150M255 30V150M150 14V157" strokeDasharray="3 5"/><path d="M50 159H250M50 154V164M250 154V164M269 39V140M264 39H274M264 140H274"/></g>
    <g className="blueprint-object" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      {index === 0 && <><ellipse cx="150" cy="48" rx="70" ry="23"/><ellipse cx="150" cy="48" rx="53" ry="15"/><path d="M80 48V117C80 148 220 148 220 117V48M80 93C80 124 220 124 220 93"/></>}
      {index === 1 && <><ellipse cx="150" cy="40" rx="36" ry="13"/><ellipse cx="150" cy="40" rx="24" ry="8"/><path d="M114 40L76 119C76 151 224 151 224 119L186 40M76 119C76 90 224 90 224 119"/></>}
      {index === 2 && <><path d="M77 57L152 29L226 57L151 88ZM77 57V117L151 146L226 117V57M151 88V146M97 57L151 38L205 57L151 76Z"/><path d="M97 57V65M205 57V65"/></>}
      {index === 3 && <><ellipse cx="150" cy="85" rx="83" ry="31"/><path d="M67 85V106C67 147 233 147 233 106V85M133 79V65Q150 53 167 65V79M138 78V68Q150 59 162 68V78"/></>}
    </g><text x="150" y="177" textAnchor="middle" fill="currentColor" fontSize="8" letterSpacing="1.6">{index === 2 ? 'L × W × H' : 'Ø / H'} · 0{index+1}</text>
  </svg><span>{label}</span></div>;
}

export function RouteCurtain() {
  const { pathname } = useLocation();
  const firstPath = useRef(pathname);
  const hasNavigated = useRef(false);
  const reduced = useReducedMotion();
  if (pathname !== firstPath.current) hasNavigated.current = true;
  if (reduced || !hasNavigated.current) return null;
  return <div key={pathname} className="route-curtain" aria-hidden="true"><div className="transition-logo"><img src={assets.logo} alt="" width="200" height="110"/></div></div>;
}

export function useConstructionScene() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const desktop = matchMedia('(min-width: 901px) and (min-height: 650px)');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!desktop.matches) { el.removeAttribute('data-construction'); return; }
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (120 - rect.top) / Math.max(1, rect.height - innerHeight + 140)));
      const phase = (start, end) => Math.max(0, Math.min(1, (progress - start) / (end - start)));
      el.dataset.construction = 'active';
      el.dataset.stage = progress < .32 ? '0' : progress < .76 ? '1' : '2';
      el.style.setProperty('--drill-y', `${phase(0, .28) * 205}px`);
      el.style.setProperty('--drill-opacity', 1 - phase(.28, .38));
      for (let i = 0; i < 4; i++) {
        const p = phase(.3 + (3-i) * .095, .46 + (3-i) * .095);
        el.style.setProperty(`--ring-${i}-y`, `${(1-p) * -230}px`);
        el.style.setProperty(`--ring-${i}-opacity`, p);
      }
      el.style.setProperty('--water', phase(.76, .96));
      el.style.setProperty('--construction-progress', progress);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); el.removeAttribute('data-construction'); };
  }, [reduced]);
  return ref;
}
