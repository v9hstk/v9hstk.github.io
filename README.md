# v9hstk.github.io

Personal verification hub and case study site for Vinay Degavath.

**Live:** https://v9hstk.github.io

## Structure

```
index.html          Landing — hero, video, proof links, case cards, resumes
hashstack.html      Hashstack case study (Pass 1 published)
parashar.html       Parashar case study (Pass 1 published)
guardrail.html      Guardrail case study (live-infra, principal-only)
css/styles.css      Shared styles (light default, dark toggle, exhibit components)
js/theme.js         Theme toggle (sessionStorage + prefers-color-scheme)
assets/             certik_report.pdf, whitepaper.pdf, resume PDFs
og.png              Open Graph image (light theme)
```

No build step — GitHub Pages serves `main` from the repo root.

## Case studies

- **Hashstack** — under-collateralized lending; no peak TVL claimed; DefiLlama linked for TVL tracking; operator metrics asterisked. Primary case.
- **Parashar** — AI product from domain expertise; Swiss Ephemeris + rule systems; visibility Public (2026-08).
- **Guardrail** — SFO systematic trading infra (multi-agent, 7-check risk plane); aligns to https://guardrail.fund (principal-only, no LPs); side finance project for domain versatility; secondary to Hashstack (do not lead cold outreach with Guardrail).

## Theme

- **Default:** Light (`#fafafa` background, `#2c5282` accent)
- **Dark mode:** Toggle in header; saves preference to `sessionStorage`
- Respects `prefers-color-scheme` on first visit

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```
