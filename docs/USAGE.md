# Usage

1. Serve the `docs` folder over HTTP so the bundled registry can load from the same origin.
2. Select **Validate network**. The bundled four-app registry has twelve directed relationships.
3. Remove a related app id, rerun, and inspect the exact missing source/target pair.
4. Paste a root README and a complete repository-root file inventory. Select **Check README links**. The example intentionally includes `docs/MISSING.md`, which is absent from its inventory.
5. Download the latest JSON report. Exports contain only the most recently run check.

Use `git ls-tree -r --name-only HEAD` in a trusted local checkout to produce a file inventory. No GitHub token is needed or accepted by the demo.

## Limitations

Registry validation checks declared data, not actual repository ownership, permissions, uptime, or deployment state. README parsing supports basic inline Markdown links only; reference-style links, HTML links, nested Markdown, and fragment targets require manual review. Missing-path results depend on the supplied inventory being complete.

## Privacy and persistence

No inputs are persisted to storage or sent to remote services by application code. Reloading clears your work. Downloaded JSON may contain your supplied link and repository information, so review it before sharing.

## Related projects

See [the maintained network](../NETWORK.md).
