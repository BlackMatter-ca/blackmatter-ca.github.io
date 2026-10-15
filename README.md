# blackmatter.ca

The BlackMatter site: a static Next.js export, deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.

- `design/tokens.json` is the BlackMatter design system's token file (the BlackMatter palette). `npm run tokens` compiles it to `app/tokens.css`; the build runs it for you. Edit the JSON, not the CSS.
- The site is one site in two grounds. Dark is the default, light follows the system preference, and the toggle in the top bar pins either one (stored in the browser). `app/globals.css` maps the palette onto a few semantic variables (ground, ink, rule, accent) per theme; everything else reads those.
- Tailwind CSS v4 (`@tailwindcss/postcss`) handles layout utilities. `app/tokens.css` exposes every token to it (`bg-berry`, `text-crust`, `font-display`, `p-4`), so Tailwind and the design system share one source.
- `app/Marks.jsx` draws the wordmark and the stone as inline SVG with `currentColor` ink, so they follow the theme. `public/logos/` keeps the fixed-colour editions for favicons, mail and anywhere outside the site.
- `public/textures/grit.webp` is the dust-and-grit texture screened across the foot of every page. Supplied by the owner; free for commercial use under its source licence.
- `npm install`, then `npm run dev` to work locally and `npm run build` to export `out/`.

Setup once in the repository's Settings > Pages: set the source to **GitHub Actions**, and enter the custom domain there (GitHub writes the `CNAME` file for you on the next deploy, or add one at the repository root with the bare domain on one line).
