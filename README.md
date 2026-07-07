# AdSense Sites Lab

This is a zero-dependency static publishing lab for building small, high-quality content sites with clear sourcing, editorial notes, and review-ready policy pages.

## Project Memory

This folder is the shared workspace for the whole multi-site project. See `PROJECT_MEMORY.md` for the persistent project notes, GitHub setup, content rules, and candidate next sites.

## Multi-Site Convention

- Keep every AdSense-oriented site in this repository until deployment choices are finalized.
- Put source data in `content/`.
- Put shared visual assets in `public/assets/`.
- Generate publishable static output into `dist/<site-slug>/`.
- Add one strong site at a time, then extract the parts that repeat well.

## Current Site

- `midnight-archive`: a dark literary archive for public-domain strange tales, source-led retellings, and editorial notes.
- Public preview: `https://zhengtai123.github.io/midnight-archive/`
- English edition: `https://zhengtai123.github.io/midnight-archive/en/`
- The English edition uses independent `/en/` URLs, self-canonical pages, and hreflang alternates. It currently covers all 18 story guides in edited English form instead of bulk machine translation.
- `seasonal-observatory`: a bilingual solar-term, poetry calendar, and urban phenology site with original observation guides, 24 individual solar-term pages, 4 expanded core term essays, public-domain poem notes, an interactive term wheel, a poem-card generator, source cards, and policy pages.
- Seasonal preview: `https://zhengtai123.github.io/midnight-archive/seasonal-observatory/`
- Seasonal English edition: `https://zhengtai123.github.io/midnight-archive/seasonal-observatory/en/`
- The Seasonal English edition uses independent `/seasonal-observatory/en/` URLs, self-canonical pages, visible language switching, and zh-CN/en/x-default hreflang alternates across home, topic, article, and policy pages.

## Commands

Use the bundled Node runtime in this Codex desktop environment:

```powershell
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/build.mjs
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/check.mjs
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/sync-docs.mjs
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/build-seasonal.mjs
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/check-seasonal.mjs
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/sync-docs.mjs
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/serve.mjs
```

Then open `http://127.0.0.1:4173/midnight-archive/`.
The second site local preview is `http://127.0.0.1:4173/seasonal-observatory/`.
The second site English preview is `http://127.0.0.1:4173/seasonal-observatory/en/`.

## GitHub

See `GITHUB_SETUP.md`. The project can be pushed to GitHub after this computer has GitHub authentication configured.

GitHub Pages publishes directly from the `docs/` folder on `main`. Run both site builds, then `tools/sync-docs.mjs`, before pushing public preview changes.

`tools/check.mjs --strict-docs` verifies the Midnight root output while allowing the Seasonal subsite under `docs/seasonal-observatory/`. `tools/check-seasonal.mjs` verifies the Seasonal bilingual output and its own docs sync.

## Content Rules

- Use public-domain, Creative Commons, or explicitly licensed sources only.
- Never copy modern blog, forum, social media, or newsletter stories unless there is clear written permission.
- Keep source URL, author, era, license note, and editorial mode for every story.
- Prefer source-led retellings, commentary, and annotations over raw copying.
- Add an editorial page, privacy page, contact page, sitemap, and RSS feed before review.

## Why Zero Dependency First

The workspace does not expose system Node/npm by default. This project uses plain Node.js for the first implementation so it can build locally without network installs. The content schema is intentionally Astro-ready, so it can later migrate to Astro/MDX when package installation and deployment targets are decided.
