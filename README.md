# Zion Network Maintenance Suite

App-network JSON validation, all-to-all relationship checks, README inline-link and inventory diagnostics, and downloadable JSON reports.

**[Live demo](https://divyachinthapatla2001-cpu.github.io/zion-network-maintenance-suite/)** · [Usage](docs/USAGE.md) · [Deployment](docs/DEPLOYMENT.md) · [Network](NETWORK.md)

## Quick start

Requirements: Python 3 for a local static server; Node.js 22 or later only for development checks. The demo has no third-party runtime packages and needs no API key.

```bash
git clone https://github.com/divyachinthapatla2001-cpu/zion-network-maintenance-suite.git
cd zion-network-maintenance-suite
python3 -m http.server 8080 --directory docs
```

Open `http://localhost:8080/`. Use HTTP rather than `file://` for module loading and the bundled registry.

## Usage

1. Serve the `docs` folder over HTTP so the bundled registry can load from the same origin.
2. Select **Validate network**. The bundled four-app registry has twelve directed relationships.
3. Remove a related app id, rerun, and inspect the exact missing source/target pair.
4. Paste a root README and a complete repository-root file inventory. Select **Check README links**. The example intentionally includes `docs/MISSING.md`, which is absent from its inventory.
5. Download the latest JSON report. Exports contain only the most recently run check.

Use `git ls-tree -r --name-only HEAD` in a trusted local checkout to produce a file inventory. No GitHub token is needed or accepted by the demo.

See [the usage guide](docs/USAGE.md) for scope and manual verification.

## Development checks

```bash
npm test
npm run check
```

No `npm install` is required: these commands use the Node standard library only. The checker validates local links and network navigation; it deliberately does not fetch external URLs.

## Deployment

Publish `main:/docs` using GitHub Pages (Deploy from a branch). The demo is project-path-safe and uses relative asset paths. There is no build step, custom domain, service worker, secret, or backend. See [the deployment guide](docs/DEPLOYMENT.md).

## Limitations

Registry validation checks declared data, not actual repository ownership, permissions, uptime, or deployment state. README parsing supports basic inline Markdown links only; reference-style links, HTML links, nested Markdown, and fragment targets require manual review. Missing-path results depend on the supplied inventory being complete.

Do not paste secrets or personal information. Inputs are processed in the browser without application-level remote requests; hosting still receives normal page requests. Network Maintenance Suite fetches only its bundled registry from the same origin. No result should be read as proof that a remote URL is available.

## Related repositories

| Project | Purpose | Source | Demo |
| --- | --- | --- | --- |
| Network gateway fork | Existing Zion Tech Group gateway source fork. | [Repository](https://github.com/divyachinthapatla2001-cpu/zion-support.github.io) | Not deployed from this fork |
| SEO Optimizer fork | Existing standalone SEO landing-page source fork. | [Repository](https://github.com/divyachinthapatla2001-cpu/zion-seo-optimizer) | Not deployed from this fork |
| Web Quality Suite | Inspect pasted HTML, inventory links, and calculate WCAG contrast. | [Repository](https://github.com/divyachinthapatla2001-cpu/zion-web-quality-suite) | [Open demo](https://divyachinthapatla2001-cpu.github.io/zion-web-quality-suite/) |
| Network Maintenance Suite | Validate app-network manifests, reciprocal links, and README paths. | [Repository](https://github.com/divyachinthapatla2001-cpu/zion-network-maintenance-suite) | [Open demo](https://divyachinthapatla2001-cpu.github.io/zion-network-maintenance-suite/) |

## Contributing, security, and license

Read [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and the [MIT license](LICENSE). This suite is maintained under `divyachinthapatla2001-cpu` and does not imply official endorsement by the upstream Zion Tech Group organization.
