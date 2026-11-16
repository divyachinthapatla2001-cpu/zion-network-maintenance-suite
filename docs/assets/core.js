function publicRepo(value) { try { const u = new URL(value); return u.protocol === 'https:' && u.hostname === 'github.com' && !u.username && !u.password && !u.search && !u.hash && /^\/[\w.-]+\/[\w.-]+\/?$/.test(u.pathname); } catch { return false; } }
export function validateManifest(value) {
  const issues = [], warnings = [], missingEdges = [];
  if (!value || typeof value !== 'object' || !Array.isArray(value.apps)) return {kind:'network-manifest', valid:false, issues:['Expected an object with an apps array.'], warnings, missingEdges};
  if (value.version !== 1) issues.push('Supported registry version is 1.');
  if (typeof value.owner !== 'string' || !/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(value.owner)) issues.push('Use a valid GitHub owner name.');
  const apps = value.apps;
  if (!apps.length || apps.length > 100) issues.push('Use between 1 and 100 apps.');
  const ids = new Set(), repos = new Set();
  for (const a of apps) {
    if (!a || typeof a !== 'object' || typeof a.id !== 'string' || !/^[\w.-]+$/.test(a.id)) { issues.push('Every app needs a safe nonempty id.'); continue; }
    if (ids.has(a.id)) issues.push(`Duplicate id: ${a.id}`); ids.add(a.id);
    if (!publicRepo(a.repository)) issues.push(`Invalid public GitHub repository URL: ${a.id}`);
    else {
      const u = new URL(a.repository), canonical = u.pathname.replace(/\/$/, '').toLowerCase();
      if (repos.has(canonical)) issues.push(`Duplicate repository: ${a.id}`); repos.add(canonical);
      if (canonical !== `/${value.owner}/${a.id}`.toLowerCase()) issues.push(`Repository does not match owner/id: ${a.id}`);
    }
    if (typeof a.description !== 'string' || !a.description.trim()) warnings.push(`Add a description: ${a.id}`);
    if (a.demo != null) {
      try { const u = new URL(a.demo); if (u.protocol !== 'https:' || u.hostname !== `${value.owner}.github.io`.toLowerCase() || u.pathname !== `/${a.id}/` || u.username || u.password || u.search || u.hash) throw new Error(); }
      catch { issues.push(`Expected an HTTPS project Pages URL under the registry owner: ${a.id}`); }
    }
    if (!Array.isArray(a.related) || a.related.some(id => typeof id !== 'string')) issues.push(`related must be an array of ids: ${a.id}`);
  }
  for (const a of apps) {
    if (!a || typeof a.id !== 'string' || !Array.isArray(a.related)) continue;
    const related = new Set(a.related);
    if (related.size !== a.related.length) issues.push(`Duplicate related entries: ${a.id}`);
    for (const id of related) { if (!ids.has(id)) issues.push(`Unknown related id ${id} in ${a.id}`); if (id === a.id) warnings.push(`Self-link: ${a.id}`); }
    for (const id of ids) if (id !== a.id && !related.has(id)) missingEdges.push({from:a.id,to:id});
  }
  if (missingEdges.length) issues.push(`${missingEdges.length} directed cross-links missing for an all-to-all network.`);
  return {kind:'network-manifest', valid:issues.length === 0, appCount:apps.length, expectedDirectedEdges:ids.size * (ids.size - 1), issues, warnings, missingEdges, limits:'Validates declared data only. Does not fetch repositories, prove permissions, test remote links, or confirm deployments.'};
}
export function normalizePath(path) {
  const parts = [];
  for (const part of path.split('/')) { if (!part || part === '.') continue; if (part === '..') { if (!parts.length) return null; parts.pop(); } else parts.push(part); }
  return parts.join('/');
}
export function auditReadme(markdown, inventory, manifest) {
  const source = markdown.replace(/^\s*(```|~~~)[\s\S]*?^\s*\1[^\n]*$/gm, '');
  const files = new Set(inventory.map(p => normalizePath(String(p).trim())).filter(Boolean));
  const issues = [], warnings = [], localLinks = [], externalLinks = [];
  for (const match of source.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const href = match[1].replace(/^<|>$/g, '');
    if (href.startsWith('#')) continue;
    if (/^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//')) {
      try { const u = new URL(href.startsWith('//') ? `https:${href}` : href); if (!['https:','http:','mailto:'].includes(u.protocol)) issues.push(`Unsupported link scheme: ${href}`); else { externalLinks.push(href); if (u.protocol === 'http:') warnings.push(`Prefer HTTPS if available: ${href}`); } }
      catch { issues.push(`Malformed URL: ${href}`); }
      continue;
    }
    let path;
    try { path = normalizePath(decodeURIComponent(href.split(/[?#]/)[0])); } catch { issues.push(`Malformed path encoding: ${href}`); continue; }
    if (!path) { issues.push(`Invalid or out-of-root path: ${href}`); continue; }
    const exists = files.has(path) || [...files].some(file => file.startsWith(`${path}/`));
    localLinks.push({href,path,inInventory:exists});
    if (!exists) issues.push(`Not found in the supplied inventory: ${path}`);
  }
  for (const [name,pattern] of [['Quick start',/^#{1,3}\s+(quick start|getting started|installation)/im],['Usage',/^#{1,3}\s+usage/im],['Deployment',/^#{1,3}\s+deployment/im],['Limitations',/^#{1,3}\s+limitations/im]]) if (!pattern.test(source)) warnings.push(`Consider a ${name} section.`);
  const missingRepositories = (manifest?.apps || []).filter(a => a && typeof a.repository === 'string' && !externalLinks.some(url => url.replace(/\/$/,'').toLowerCase() === a.repository.replace(/\/$/,'').toLowerCase())).map(a => a.repository);
  if (missingRepositories.length) warnings.push(`${missingRepositories.length} network repository links are missing.`);
  return {kind:'readme-links', valid:issues.length===0, issues, warnings, localLinks, externalLinks, missingRepositories, limits:'Checks inline Markdown links against a user-supplied repository-root file inventory. Reference-style links, nested Markdown, HTML links, and fragment existence are not parsed. Remote URLs are listed, not fetched.'};
}
