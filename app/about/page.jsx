import { Top, Strip, Corner } from '../Chrome';

export const metadata = { title: 'About · BlackMatter' };

export default function About() {
  return (
    <main className="stage">
      <Top current="/about/" />
      <section className="relative px-4 py-12 md:py-16">
        <Corner />
        <div className="prose relative z-[1]">
          <h1 className="display page-title mb-8">About</h1>
          <p>BlackMatter is an independent technology consultancy based in Yellowknife, Northwest Territories. It is built on more than twenty years of systems, security and infrastructure work inside federal policing and territorial government, where downtime was not an option and the nearest spare part was a flight away.</p>
          <p>That background shapes how we work. We plan for failure before it happens, we write things down so the next person can run them, and we favour solutions that hold up in small teams with long supply lines. We have worked in nearly every community in the territory and understand what the North asks of its technology.</p>
          <p>We are rooted here. Our principal has served more than a decade on not-for-profit boards in Yellowknife, and the work we take on is measured by what it leaves behind for the people who live and work in the North.</p>
        </div>
      </section>
      <Strip />
    </main>
  );
}
