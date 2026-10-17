'use client';

// Pins light or dark on <html data-theme>. With nothing pinned the site follows the system preference;
// the inline script in layout.jsx applies the stored choice before first paint so there is no flash.
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export function ThemeToggle() {
  function flip() {
    const root = document.documentElement;
    const pinned = root.getAttribute('data-theme');
    const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const isLight = pinned ? pinned === 'light' : systemLight;
    const next = isLight ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
  }
  return (
    <button type="button" className="theme-toggle" onClick={flip} aria-label="Switch between light and dark">
      <svg className="if-dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      <svg className="if-light" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
    </button>
  );
}
