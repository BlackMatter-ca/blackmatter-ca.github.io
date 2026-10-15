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
    <button type="button" className="theme-toggle label" onClick={flip} aria-label="Switch between light and dark">
      <span className="if-dark">Light</span><span className="if-light">Dark</span>
    </button>
  );
}
