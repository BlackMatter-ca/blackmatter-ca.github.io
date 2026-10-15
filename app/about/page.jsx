import { Top, Strip, Corner } from '../Chrome';
import { record } from '../site';

export const metadata = { title: 'About · BlackMatter' };

export default function About() {
  return (
    <main className="stage">
      <Top current="/about/" />
      <section className="relative px-4 py-12 md:py-16">
        <Corner />
        <div className="relative z-[1]">
          <div className="prose">
            <h1 className="display page-title mb-8">About</h1>
            <p>BlackMatter is an independent technology consultancy in Yellowknife, Northwest Territories. It exists for one kind of client: an organization with a clear need, the backing to meet it, and no appetite for doing it twice.</p>
            <p>The practice behind it is twenty years inside federal policing and territorial government systems, where the radio network could not go down, the nearest spare part was a flight away, and the evidence had to be recoverable. That work left three habits. Capture the requirement before touching anything. Build what holds without a technician standing beside it. Write it down so the next person can run it.</p>
            <p>We measure an engagement by whether you need to call us again. The aim is that you do not.</p>
          </div>
          <h2 className="display text-[clamp(28px,4vw,44px)] mt-16 mb-6">The record</h2>
          <ol className="ledger record list-none p-0 max-w-[880px]">
            {record.map((r, i) => (
              <li key={i}>
                <span className="label n">{String(i + 1).padStart(2, '0')}</span>
                <span className="r">{r}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Strip />
    </main>
  );
}
