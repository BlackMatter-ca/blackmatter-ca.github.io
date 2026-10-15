'use client';
import { useEffect, useRef, useState } from 'react';

// Grit blown off the wordmark on load: the mark is revealed left to right while
// a scatter of small particles lifts from its surface and streams off to the right.
export default function Dust({ children }) {
  const [grains, setGrains] = useState([]);
  const [ready, setReady] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setReady(true); return; }
    const r = box.current.getBoundingClientRect();
    const count = Math.max(48, Math.min(160, Math.round(r.width / 9)));
    const seed = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random();
      seed.push({
        id: i,
        x: x * 100,
        y: 18 + Math.random() * 64,
        s: 1 + Math.round(Math.random() * 3),
        dx: 60 + Math.random() * 260,
        dy: -(10 + Math.random() * 90),
        d: 0.9 + Math.random() * 1.3,
        delay: x * 0.9 + Math.random() * 0.25,
        pink: Math.random() < 0.3,
      });
    }
    setGrains(seed);
    setReady(true);
  }, []);

  return (
    <div ref={box} className={`dust${ready ? ' dust-ready' : ''}`}>
      {children}
      <div className="grains" aria-hidden="true">
        {grains.map((g) => (
          <i
            key={g.id}
            className={g.pink ? 'grain pink' : 'grain'}
            style={{
              left: `${g.x}%`, top: `${g.y}%`, width: g.s, height: g.s,
              '--dx': `${g.dx}px`, '--dy': `${g.dy}px`,
              animationDuration: `${g.d}s`, animationDelay: `${g.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
