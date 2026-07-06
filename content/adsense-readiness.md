# AdSense Readiness Notes

This project should not ship fake ad code. Keep AdSense disabled until a real publisher ID exists.

## Already Implemented

- About page
- Contact page
- Privacy policy
- Terms page
- Editorial policy
- Advertising and sponsorship disclosure page
- Sources page
- Author/editor page
- Sitemap
- RSS feed
- Robots file
- Custom 404 page
- Safe `ads.txt` placeholder
- Config-gated AdSense script injection
- Per-story source metadata
- Thin-content quality check
- Independent English `/en/` URLs with self-canonical metadata and hreflang alternates
- Eighteen edited English story guides with source, author, era, rights, editorial mode, and translator/editor notes
- Seasonal Observatory bilingual `/seasonal-observatory/` and `/seasonal-observatory/en/` pages with visible language switching
- Seasonal English articles with source links, rights notes, editorial mode, and editor notes
- Multilingual sitemap alternates for both the story archive and Seasonal Observatory
- GitHub Pages preview from `docs/`

## Before Applying

- Decide whether to keep the GitHub Pages preview URL or move to a custom domain.
- Confirm every source URL and source-rights note.
- Add more substantive original commentary before scaling.
- For Seasonal Observatory, expand beyond the 6 starter essays toward all 24 solar terms plus evergreen topic pages before serious review.
- Do not enable ads before the site has enough polished content and navigation depth.

## Current Optimization Priorities

- Move serious review candidates to focused custom domains or separate properties once the content direction is stable. The GitHub Pages preview is useful for testing, but a dedicated domain will make branding, contact email, sitemap submission, and policy pages clearer.
- Expand content before applying: Midnight Archive should grow beyond 18 stories toward 25-35 substantial source-led articles; Seasonal Observatory should complete the 24 solar terms and add 8-12 evergreen topic articles.
- Keep visible language switching and hreflang in sync whenever a new page is added. A page should not expose a language switch unless the matching page exists.
- Add a real editorial contact email after the custom domain is chosen. GitHub Issues is acceptable for the preview, but a domain email is stronger for a public review.
- Before enabling AdSense, update consent and privacy handling for the intended audience and regions. The privacy pages now disclose Google advertising technologies, but ad scripts should remain disabled until there is a real publisher ID and a consent plan.
- When ads are eventually enabled, keep them away from navigation, language switches, source panels, reading controls, and observation checklists. Ads should never look like menu items, download buttons, recommended-story cards, or source links.

## After Approval

- Set `site.adsense.enabled` to `true`.
- Set `site.adsense.publisherId` to the approved `ca-pub-...` value.
- Rebuild so `ads.txt` and the AdSense script are generated.
