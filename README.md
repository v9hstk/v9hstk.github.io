# v9hstk.github.io

Personal verification hub and case study site for Vinay Kumar.

**Live:** https://v9hstk.github.io

## Structure

```
index.html          Landing EN — hero, video, proof links, case cards, resumes
ko/ ja/ de/         Locale landings (KO / JA / DE)
hashstack.html      Hashstack case study (Pass 1 published; EN)
parashar.html       Parashar case study (Pass 1 published; EN)
guardrail.html      Guardrail case study (live-infra, principal-only; EN)
css/styles.css      Shared styles (light default, dark toggle, exhibit components)
js/theme.js         Theme toggle (sessionStorage + prefers-color-scheme)
js/lang.js          Language select + one-time system-locale redirect
assets/             certik_report.pdf, whitepaper.pdf, resume PDFs
og.png              Open Graph image (light theme)
```

No build step — GitHub Pages serves `main` from the repo root.


## Languages (i18n MVP)

Parallel static locale pages — no build step, no i18n framework.

| Locale | Path |
|--------|------|
| English (default) | `/` (`index.html`) |
| Korean | `/ko/` |
| Japanese | `/ja/` |
| German | `/de/` |

Header language `<select>` (EN · 한국어 · 日本語 · Deutsch) on landings and case studies. First visit to `/` auto-redirects once from `navigator.language(s)` (`ko*`/`ja*`/`de*`) unless `localStorage` already has `v9hstk-lang-pref` or `v9hstk-lang-auto`. Dropdown choice sets `v9hstk-lang-pref` and navigates to `/`, `/ko/`, `/ja/`, or `/de/`. `hreflang` + `lang` kept on each landing locale.

**Not translated yet:** case study bodies (`hashstack.html`, `parashar.html`, `guardrail.html`) remain English; locale landings and case headers note “case studies EN for now.” Resume PDFs remain English.

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
