// Compiles design/tokens.json (the BlackMatter design system's tokens) into app/tokens.css.
// Edit the JSON, never the CSS.
import { readFileSync, writeFileSync } from 'node:fs';
const t = JSON.parse(readFileSync(new URL('../design/tokens.json', import.meta.url), 'utf8'));
const theme = t.color.themes[0].id;
const lines = [`/* ${t.name} — generated from design/tokens.json; do not edit */`, ':root {'];
for (const c of t.color.tokens) {
  const raw = typeof c.value === 'string' ? c.value : c.value[theme];
  const v = raw.startsWith('{') ? `var(--${raw.slice(1, -1)})` : raw;
  lines.push(`  --${c.name}: ${v};`);
}
for (const fam of ['spacing', 'radius', 'shadow']) for (const c of t[fam].tokens) lines.push(`  --${c.name}: ${c.value};`);
for (const [k, v] of Object.entries(t.type.families)) lines.push(`  --font-${k}: ${v};`);
lines.push('}');
for (const g of t.type.groups) for (const s of g.styles) {
  const d = [`font-family: var(--font-${g.family})`, `font-size: ${s.fontSize}`, `line-height: ${s.lineHeight}`, `font-weight: ${s.fontWeight}`];
  if (s.letterSpacing) d.push(`letter-spacing: ${s.letterSpacing}`);
  lines.push(`.${s.name} { ${d.join('; ')}; }`);
}
writeFileSync(new URL('../app/tokens.css', import.meta.url), lines.join('\n') + '\n');
console.log(`tokens.css: ${t.color.tokens.length} colours`);
