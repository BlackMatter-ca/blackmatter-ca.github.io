# blackmatter.ca

The BlackMatter site: a static Next.js export, deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.

- `design/tokens.json` is the BlackMatter design system's token file (Darkberry's Blackwater flavour). `npm run tokens` compiles it to `app/tokens.css`; the build runs it for you. Edit the JSON, not the CSS.
- `public/logos/` holds the wordmark and the stone in their light, dark and berry editions.
- `npm install`, then `npm run dev` to work locally and `npm run build` to export `out/`.

Setup once in the repository's Settings > Pages: set the source to **GitHub Actions**, and enter the custom domain there (GitHub writes the `CNAME` file for you on the next deploy, or add one at the repository root with the bare domain on one line).
