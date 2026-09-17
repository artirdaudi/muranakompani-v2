import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';

const motionQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
const subscribe = callback => {
  motionQuery?.addEventListener('change', callback);
  return () => motionQuery?.removeEventListener('change', callback);
};
const MotionContext = createContext({ disabled: false, setDisabled: () => {} });
function useSystemReducedMotion() {
  return useSyncExternalStore(subscribe, () => motionQuery?.matches ?? true, () => true);
}
export function useReducedMotion() {
  const { disabled } = useContext(MotionContext);
  return useSystemReducedMotion() || disabled;
}
export function MotionProvider({ children }) {
  const systemReduced = useSystemReducedMotion();
  const [disabled, setDisabled] = useState(() => {
    try { return localStorage.getItem('murana-motion') === 'reduced'; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.motion = disabled || systemReduced ? 'reduced' : 'full';
    try { localStorage.setItem('murana-motion', disabled ? 'reduced' : 'full'); } catch { /* Optional preference persistence. */ }
  }, [disabled, systemReduced]);
  return <MotionContext.Provider value={{ disabled, setDisabled }}>{children}</MotionContext.Provider>;
}
export function MotionToggle({ lang }) {
  const { disabled, setDisabled } = useContext(MotionContext);
  const systemReduced = useSystemReducedMotion();
  const mk = lang === 'mk';
  return <button className="motion-toggle" disabled={systemReduced} aria-pressed={disabled || systemReduced} onClick={() => setDisabled(!disabled)}>
    <span className="motion-indicator" aria-hidden="true"/>
    {systemReduced ? (mk ? 'Намалени анимации · систем' : 'Lëvizje të reduktuara · sistemi') : disabled ? (mk ? 'Анимации: исклучени' : 'Lëvizjet: joaktive') : (mk ? 'Анимации: вклучени' : 'Lëvizjet: aktive')}
  </button>;
}

// Content is visible by default; only enhance it after the observer is available.
export function Reveal({ as: Tag = 'div', children, className = '', delay = 0, kind = 'rise', ...props }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (reduced || !('IntersectionObserver' in window)) {
      element.dataset.reveal = 'visible';
      return;
    }
    element.dataset.reveal = 'pending';
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.dataset.reveal = 'visible';
        observer.disconnect();
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    observer.observe(element);
    return () => { observer.disconnect(); element.dataset.reveal = 'visible'; };
  }, [reduced]);
  return <Tag ref={ref} className={`reveal reveal-${kind} ${className}`} style={{ '--delay': `${delay}ms` }} {...props}>{children}</Tag>;
}

export function Counter({ value }) {
  const ref = useRef(null);
  const played = useRef(false);
  const reduced = useReducedMotion();
  const target = Number.parseInt(value, 10);
  const [number, setNumber] = useState(target);
  useEffect(() => {
    if (reduced || played.current || !('IntersectionObserver' in window)) {
      setNumber(target);
      return;
    }
    let frame;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      played.current = true;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / 1100, 1);
        setNumber(Math.round(target * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [target, reduced]);
  return <strong ref={ref} className="counter"><span className="sr-only">{value}</span><span aria-hidden="true">{number}{value.endsWith('+') ? '+' : ''}</span></strong>;
}

// One passive scroll listener per scene; React stays out of the animation loop.
export function useScrollScene() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
      element.style.setProperty('--scene', progress.toFixed(4));
      element.style.setProperty('--drift', `${(progress - .5) * 65}px`);
      element.dataset.scene = 'ready';
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      element.removeAttribute('data-scene');
      element.style.removeProperty('--drift');
      element.style.removeProperty('--scene');
    };
  }, [reduced]);
  return ref;
}

export function usePointerSurface() {
  const reduced = useReducedMotion();
  return {
    onPointerMove(event) {
      if (reduced || event.pointerType !== 'mouse') return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`);
      el.style.setProperty('--ry', `${(x - 0.5) * 8}deg`);
      el.style.setProperty('--px', `${x * 100}%`);
      el.style.setProperty('--py', `${y * 100}%`);
    },
    onPointerLeave(event) {
      for (const name of ['--rx', '--ry', '--px', '--py']) event.currentTarget.style.removeProperty(name);
    },
  };
}

