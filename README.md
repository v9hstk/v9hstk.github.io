# v9hstk.github.io

Personal verification hub and case study site for Vinay Degavath.

**Live:** https://v9hstk.github.io

## Structure

```
index.html          Landing — hero, video, proof links, case cards, resumes
hashstack.html      Hashstack case study (9 sections, 16 exhibits A–P, skeleton)
parashar.html       Placeholder (noindex)
css/styles.css      Shared styles (light default, dark toggle, exhibit components)
js/theme.js         Theme toggle (sessionStorage + prefers-color-scheme)
assets/             certik_report.pdf, whitepaper.pdf; resume PDFs added manually
og.png              Open Graph image (light theme)
```

No build step — GitHub Pages serves `main` from the repo root.

## hashstack.html sections

1. Executive Summary
2. Industry Context — Exhibits A, B
3. The Thesis — Exhibits D, C
4. Degen Mode — Exhibits E, I
5. Interest Rate Design — Exhibits F, G, H
6. Protocol Metrics — Exhibits J, K
7. Starknet Platform Bet — Exhibit L
8. Wind-Down Decision — Exhibit M
9. Key Takeaways — Exhibits N (Source Log), O (Doc Gaps), P (Discussion Questions)

Hashstack case study published (Pass 1): product narrative + asterisked operator metrics. No peak TVL claimed; DefiLlama linked for public TVL tracking. Parashar remains Coming soon.

## Theme

- **Default:** Light (`#fafafa` background, `#2c5282` accent)
- **Dark mode:** Toggle in header; saves preference to `sessionStorage`
- Respects `prefers-color-scheme` on first visit

## Manual assets

Drop resume PDFs when ready:

- `assets/resume_crypto.pdf`
- `assets/resume_fintech.pdf`

Then update resume button `href` values in `index.html`.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```
