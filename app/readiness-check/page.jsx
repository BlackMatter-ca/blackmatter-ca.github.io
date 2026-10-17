import { Backdrop, Top, Foot } from '../Chrome';
import { readiness } from '../site';
import Wizard from './Wizard';

export const metadata = {
  title: 'Project readiness check · BlackMatter',
  description: 'About twenty questions, ten minutes. Find out what to settle before you spend money on a technology project, and leave with a brief you can hand to anyone.',
};

export default function ReadinessCheck() {
  return (
    <main className="page">
      <Backdrop />
      <Top current="/readiness-check/" />

      <section className="wrap rc-intro">
        <p className="eyebrow">Project readiness check</p>
        <h1 className="h1">Is your project ready to scope?</h1>
        <p className="p-lg measure-wide">{readiness.body}</p>
        <p className="p-sm" style={{ color: 'var(--ink-3)' }}>{readiness.note}</p>
      </section>

      <section className="wrap" style={{ paddingBottom: 112 }}>
        <Wizard />
      </section>

      <Foot />
    </main>
  );
}
