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
- Independent English `/en/` pilot URLs with self-canonical metadata and hreflang alternates
- Five edited English story guides with source, author, era, rights, editorial mode, and translator/editor notes
- GitHub Pages preview from `docs/`

## Before Applying

- Decide whether to keep the GitHub Pages preview URL or move to a custom domain.
- Confirm every source URL and source-rights note.
- Add more substantive original commentary before scaling.
- Do not enable ads before the site has enough polished content and navigation depth.

## After Approval

- Set `site.adsense.enabled` to `true`.
- Set `site.adsense.publisherId` to the approved `ca-pub-...` value.
- Rebuild so `ads.txt` and the AdSense script are generated.
