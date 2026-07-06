# AdSense Sites Lab

This is a zero-dependency static publishing lab for building small, high-quality content sites with clear sourcing, editorial notes, and review-ready policy pages.

## Current Site

- `midnight-archive`: a dark literary archive for public-domain strange tales, source-led retellings, and editorial notes.

## Commands

Use the bundled Node runtime in this Codex desktop environment:

```powershell
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/build.mjs
& 'C:\Users\陈彦至\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools/serve.mjs
```

Then open `http://127.0.0.1:4173/midnight-archive/`.

## GitHub

See `GITHUB_SETUP.md`. The project can be pushed to GitHub after this computer has GitHub authentication configured.

## Content Rules

- Use public-domain, Creative Commons, or explicitly licensed sources only.
- Never copy modern blog, forum, social media, or newsletter stories unless there is clear written permission.
- Keep source URL, author, era, license note, and editorial mode for every story.
- Prefer source-led retellings, commentary, and annotations over raw copying.
- Add an editorial page, privacy page, contact page, sitemap, and RSS feed before review.

## Why Zero Dependency First

The workspace does not expose system Node/npm by default. This project uses plain Node.js for the first implementation so it can build locally without network installs. The content schema is intentionally Astro-ready, so it can later migrate to Astro/MDX when package installation and deployment targets are decided.
