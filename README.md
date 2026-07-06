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

## Commands

Use the bundled Node runtime in this Codex desktop environment:

```powershell
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/build.mjs
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/check.mjs
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/sync-docs.mjs
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/serve.mjs
```

Then open `http://127.0.0.1:4173/midnight-archive/`.

## GitHub

See `GITHUB_SETUP.md`. The project can be pushed to GitHub after this computer has GitHub authentication configured.

GitHub Pages publishes directly from the `docs/` folder on `main`. Run `tools/build.mjs`, `tools/check.mjs`, and `tools/sync-docs.mjs` before pushing public preview changes.

## Content Rules

- Use public-domain, Creative Commons, or explicitly licensed sources only.
- Never copy modern blog, forum, social media, or newsletter stories unless there is clear written permission.
- Keep source URL, author, era, license note, and editorial mode for every story.
- Prefer source-led retellings, commentary, and annotations over raw copying.
- Add an editorial page, privacy page, contact page, sitemap, and RSS feed before review.

## Why Zero Dependency First

The workspace does not expose system Node/npm by default. This project uses plain Node.js for the first implementation so it can build locally without network installs. The content schema is intentionally Astro-ready, so it can later migrate to Astro/MDX when package installation and deployment targets are decided.
