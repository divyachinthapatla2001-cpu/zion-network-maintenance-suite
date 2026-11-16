# Deployment

## GitHub Pages

1. Confirm this repository is public and all intended files are committed to `main`.
2. Open repository **Settings → Pages**.
3. Select **Deploy from a branch**, branch **main**, folder **/docs**, and save.
4. Wait for GitHub's Pages build and deployment to finish. A successful commit is not a successful deployment.
5. Open `https://divyachinthapatla2001-cpu.github.io/zion-network-maintenance-suite/` and verify that the title is **Zion Network Maintenance Suite**, both forms respond, JSON export works, and the related-source navigation contains all four repositories.
6. Check all three local asset requests and, for the maintenance suite, `network.json`; do not treat a generic HTTP 200 or a different page as proof of deployment.

The repository root is not the published site root. Use relative paths in `docs/index.html`. `docs/.nojekyll` prevents Jekyll processing. No custom domain or CNAME is needed. Do not copy the upstream `ziontechgroup.com` CNAME into these projects.

## Local verification

```bash
npm test
npm run check
python3 -m http.server 8080 --directory docs
```

Run a keyboard-only pass and inspect the browser console as well. Automated Node tests cover pure diagnostics; browser interactions and actual Pages availability need separate verification. The source-file checker skips external URLs.

## Updating and rolling back

Commit tested updates to `main`; GitHub rebuilds the branch source. Record the commit SHA and Pages build status. Revert a bad commit and wait for another successful deployment; avoid force-pushing history. Never represent the upstream production domain as this fork's or this suite's deployment.
