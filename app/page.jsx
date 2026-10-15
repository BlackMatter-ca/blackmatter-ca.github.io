import tokens from '../design/tokens.json';

const neutrals = ['text', 'subtext1', 'subtext0', 'overlay2', 'overlay1', 'overlay0', 'surface2', 'surface1', 'surface0', 'base', 'mantle', 'crust'];
const berries = ['blossom', 'petal', 'berry', 'plum', 'cranberry', 'cherry', 'apricot', 'honey', 'gooseberry', 'juniper', 'frost', 'bilberry', 'blueberry', 'lavender', 'jam'];
const value = (name) => tokens.color.tokens.find((t) => t.name === name).value;

function Swatches({ names }) {
  return (
    <div className="swatches">
      {names.map((n) => (
        <div className="swatch" key={n}>
          <i style={{ background: `var(--${n})` }} />
          <span>{n}<br />{value(n)}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="wrap">
        <img className="mark" src="/logos/blackmatter-logo-dark.svg" alt="BlackMatter" />
      </header>
      <main className="wrap">
        <div className="hero">
          <h1 className="display-xl">BlackMatter</h1>
          <p className="body">Darkest. Deeper surfaces, the same berries at full strength. Built on the Blackwater flavour of Darkberry. <span className="muted">Blood in bog water.</span></p>
        </div>

        <section>
          <h2 className="heading">The name</h2>
          <ul className="name-list body">
            <li><strong><span className="tri" />Magna Mater</strong>Cybele, the mountain mother, whose cult was carried from Phrygia to Rome as a black stone.</li>
            <li><strong><span className="tri" />The black stone</strong>The mark is that stone: the A of the wordmark cut as a single wedge.</li>
            <li><strong><span className="tri" />The pink triangle</strong>Reclaimed by the gay rights movement, and cut in berry into each A.</li>
            <li><strong><span className="tri" />Shield country</strong>The Precambrian rock of the Canadian Shield, on which Yellowknife sits.</li>
          </ul>
        </section>

        <section>
          <h2 className="heading">Neutrals</h2>
          <Swatches names={neutrals} />
        </section>

        <section>
          <h2 className="heading">The berries</h2>
          <Swatches names={berries} />
        </section>

        <section>
          <h2 className="heading">Built with Darkberry</h2>
          <p className="body">Every colour here is Darkberry's Blackwater flavour, unchanged: twelve neutrals, fourteen berries, and jam for the fills. The theme ships for terminals, editors and browsers.</p>
          <p className="row" style={{ marginTop: 'var(--space-4)' }}>
            <a className="btn btn-primary" href="https://github.com/shythulu/DarkBerry">Darkberry on GitHub</a>
            <a className="btn" href="https://github.com/BlackMatter-ca">BlackMatter on GitHub</a>
          </p>
        </section>
        <footer>BlackMatter · Yellowknife, on the Shield.</footer>
      </main>
    </>
  );
}
