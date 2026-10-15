export default function Home() {
  return (
    <main className="stage">
      <header className="top">
        <img className="stone-small" src="/logos/blackmatter-stone-berry.svg" alt="" aria-hidden="true" />
        <span className="label meta">Yellowknife · on the Shield</span>
      </header>

      <div className="stone-field" aria-hidden="true">
        <img className="stone" src="/logos/blackmatter-stone-berry.svg" alt="" />
      </div>

      <section className="mark-block">
        <img className="wordmark" src="/logos/blackmatter-logo-dark.svg" alt="BlackMatter" />
        <p className="line display-lg">Darkest. Blood in bog water.</p>
      </section>

      <footer className="strip label">
        <span>Magna Mater</span>
        <span>The black stone</span>
        <span>The pink triangle</span>
        <span>Shield country</span>
      </footer>
    </main>
  );
}
