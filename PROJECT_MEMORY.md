# Project Memory

This repository is the working lab for building multiple high-quality content sites that can later be deployed and reviewed for AdSense. Keep new sites in this folder so the same generator, editorial rules, GitHub workflow, and quality checks can be reused.

## Owner And GitHub

- GitHub user: `ZhenGtai123`
- Repository: `https://github.com/ZhenGtai123/midnight-archive`
- GitHub Pages preview: `https://zhengtai123.github.io/midnight-archive/`
- Git remote currently uses HTTPS because GitHub CLI is authenticated and Windows SSH host verification had a compatibility issue.
- Git identity on this computer:
  - `user.name`: `ZhenGtai123`
  - `user.email`: `1755061678@qq.com`

## Current Strategy

- Use `C:\app\adsense-sites-lab` as a multi-site publishing lab.
- Build one strong site first, then replicate the proven structure into new niches.
- Do not promise AdSense approval. Build toward review readiness: original editorial value, clear sourcing, policy pages, navigation, contact information, sitemap, RSS, and no copied modern copyrighted stories.
- Prefer public-domain texts, clearly licensed sources, interviews, link commentary, or original editorial writing.
- Modern online stories must not be copied unless permission is clear. Use commentary, summaries, interviews, or links instead.

## Active Site

- Slug: `midnight-archive`
- Name: `子夜故事档案馆`
- Topic: public-domain Chinese strange tales, source-led retellings, editorial reading notes.
- Current content shape: 18 substantial story pages and 6 themed reading routes.
- Biggest content goal before AdSense review: expand toward 25-35 substantial articles, ideally 1200-1800 Chinese characters each, with visible source and editorial-mode metadata.
- Temporary preview deployment uses GitHub Pages from the `docs/` folder on `main`. A custom domain can replace it later before serious AdSense review.

## Reusable Site Pattern

- Content data lives in `content/`.
- Shared static assets live in `public/assets/`.
- Generated output lives in `dist/<site-slug>/`.
- Public preview output is copied into `docs/` for GitHub Pages.
- Build command: `node tools/build.mjs`
- Quality command: `node tools/check.mjs`
- The quality check now validates required static pages, all story pages, all theme pages, source URLs, article thickness, and broken theme-to-story references.
- Commit and push after each meaningful milestone.

## Candidate Next Sites

- Public-domain folktale atlas: regional legends with source notes and map-like navigation.
- Classical poetry night desk: public-domain poems with translation notes, imagery index, and author pages.
- Old craft and object archive: public-domain manuals, museum links, object histories, and image-led explainers.
- Historical mystery notes: public-domain cases, court records where available, and source-aware commentary.

## Product Direction

- Make each site feel premium and editorial, not like a thin content farm.
- Fancy UI is welcome when it helps reading: subtle motion, rich typography, image-led hero sections, progress indicators, thematic navigation.
- Avoid fake AI features. AI API features can be added later only when they create real value, such as reading-route generation, glossary assistance, source comparison, or editorial draft review.
