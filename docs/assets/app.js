import { validateManifest, auditReadme } from './core.js';
const $ = id => document.getElementById(id);
let lastReport = null;
function show(value) { lastReport = value; $('results').textContent = JSON.stringify(value, null, 2); $('status').textContent = 'Analysis complete. Review the report below.'; }
async function loadSample() {
  try {
    const response = await fetch('./network.json');
    if (!response.ok) throw new Error(`Registry returned HTTP ${response.status}`);
    const data = await response.json();
    $('manifest').value = JSON.stringify(data, null, 2);
    $('readme').value = '# Example app\n\n## Quick start\n\nServe the docs folder locally.\n\n## Usage\n\nRun browser checks.\n\n## Deployment\n\nUse GitHub Pages.\n\n## Limitations\n\nNo remote checks.\n\n[Usage](docs/USAGE.md)\n\n[Missing guide](docs/MISSING.md)\n\n'+data.apps.map(a => `[${a.name}](${a.repository})`).join('\n');
    $('status').textContent = 'Sample registry loaded. The sample README deliberately contains a missing guide.';
  } catch (error) { $('status').textContent = `${error.message}. Serve this folder over HTTP rather than opening file://, or paste a registry manually.`; }
}
$('manifest-form').addEventListener('submit', event => { event.preventDefault(); try { show(validateManifest(JSON.parse($('manifest').value))); } catch (error) { $('status').textContent = `Invalid JSON: ${error.message}`; } });
$('readme-form').addEventListener('submit', event => {
  event.preventDefault();
  try { const registry = JSON.parse($('manifest').value); const validation = validateManifest(registry); if (!validation.valid) throw new Error('Fix the registry first so the network-link comparison is meaningful.'); show(auditReadme($('readme').value, $('inventory').value.split(/\r?\n/), registry)); }
  catch (error) { $('status').textContent = error.message; }
});
$('reset').addEventListener('click', loadSample);
$('export').addEventListener('click', () => {
  if (!lastReport) { $('status').textContent = 'Run a check before exporting.'; return; }
  const url = URL.createObjectURL(new Blob([JSON.stringify(lastReport, null, 2)],{type:'application/json'}));
  const a = document.createElement('a'); a.href = url; a.download = 'zion-network-maintenance-report.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
});
loadSample();
