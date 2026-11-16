# Maintained app network

These four public repositories belong to `divyachinthapatla2001-cpu`. The two original repositories remain forks; upstream content and licensing are preserved. Links to `ziontechgroup.com` refer to the upstream project, not a deployment of these forks.

| Project | Purpose | Source | Demo |
| --- | --- | --- | --- |
| Network gateway fork | Existing Zion Tech Group gateway source fork. | [Repository](https://github.com/divyachinthapatla2001-cpu/zion-support.github.io) | Not deployed from this fork |
| SEO Optimizer fork | Existing standalone SEO landing-page source fork. | [Repository](https://github.com/divyachinthapatla2001-cpu/zion-seo-optimizer) | Not deployed from this fork |
| Web Quality Suite | Inspect pasted HTML, inventory links, and calculate WCAG contrast. | [Repository](https://github.com/divyachinthapatla2001-cpu/zion-web-quality-suite) | [Open demo](https://divyachinthapatla2001-cpu.github.io/zion-web-quality-suite/) |
| Network Maintenance Suite | Validate app-network manifests, reciprocal links, and README paths. | [Repository](https://github.com/divyachinthapatla2001-cpu/zion-network-maintenance-suite) | [Open demo](https://divyachinthapatla2001-cpu.github.io/zion-network-maintenance-suite/) |

## How the suites complement the forks

1. Start with the gateway fork to understand the original network.
2. Use the SEO fork as a small landing-page example.
3. Paste a page's HTML into Web Quality Suite for metadata, basic HTML hygiene, link inventory, and contrast checks.
4. Use Network Maintenance Suite to validate the registry and reciprocal relationships, then check README links against an explicit file inventory.

## Maintenance contract

- Each README links to all four repositories.
- The two suite demos link to all four repositories and both suite demos.
- `docs/network.json` in each new suite contains the same registry, with every app related to the other three.
- Fork repository visibility is not a Pages deployment. No upstream domain or DNS change is required.
- Static diagnostics are not a security audit, a full WCAG audit, an SEO ranking guarantee, an uptime monitor, or evidence that remote links return HTTP 200.
- After changes, run the suite tests and local-path checker, then verify the deployed Pages URLs separately.
