import Dust from './Dust';

export default function Home() {
  return (
    <main className="stage">
      <header className="top">
        <img className="stone-small" src="/logos/blackmatter-stone-berry.svg" alt="" aria-hidden="true" />
        <span className="label meta">Yellowknife · Northwest Territories</span>
      </header>

      <div className="stone-field" aria-hidden="true">
        <img className="stone" src="/logos/blackmatter-stone-berry.svg" alt="" />
      </div>

      <section className="mark-block">
        <Dust>
          <img className="wordmark" src="/logos/blackmatter-logo-dark.svg" alt="BlackMatter" />
        </Dust>
        <p className="line display-lg">A consultancy. Yellowknife, Northwest Territories.</p>
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
