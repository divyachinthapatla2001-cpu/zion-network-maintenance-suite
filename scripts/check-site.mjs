import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd(), errors = [], files = [];
function walk(dir) { for (const item of fs.readdirSync(dir,{withFileTypes:true})) { if (['.git','node_modules'].includes(item.name)) continue; const f = path.join(dir,item.name); if(item.isDirectory()) walk(f); else files.push(f); } }
walk(root);
for (const file of files.filter(f=>/\.(md|html)$/.test(f))) {
  const text=fs.readFileSync(file,'utf8');
  const links = file.endsWith('.html') ? [...text.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map(m=>m[1]) : [...text.replace(/^```[\s\S]*?^```/gm,'').matchAll(/!?\[[^\]]*\]\(([^\s)]+)\)/g)].map(m=>m[1]);
  for(const href of links) {
    if(/^(?:https?:|mailto:|tel:|#|data:)/i.test(href)) continue;
    const target=path.resolve(path.dirname(file),href.split(/[?#]/)[0]);
    if(!target.startsWith(root+path.sep) || !fs.existsSync(target)) errors.push(`${path.relative(root,file)} -> ${href}`);
  }
}
const registry = JSON.parse(fs.readFileSync('docs/network.json','utf8'));
const readme=fs.readFileSync('README.md','utf8'), html=fs.readFileSync('docs/index.html','utf8');
for(const app of registry.apps) for(const [name,text] of [['README.md',readme],['docs/index.html',html]]) if(!text.includes(app.repository)) errors.push(`${name} misses ${app.repository}`);
if(!fs.existsSync('docs/.nojekyll')) errors.push('Missing docs/.nojekyll');
if(errors.length) { console.error(errors.join('\n')); process.exitCode=1; } else console.log(`PASS: local links, Pages entrypoint, and four-repository cross-links (${files.length} files). External URLs were not fetched.`);
