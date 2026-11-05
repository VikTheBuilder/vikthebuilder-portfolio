import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import {navigation,projects,journey,links,routeSeo,siteSeo} from '../src/data.js';
const routes=[...navigation.map(n=>n.path),...projects.map(p=>'/projects/'+p.slug)];
assert.equal(links.find(([name])=>name==='Codeforces')[1],'https://codeforces.com/profile/VikTheBuiler');
assert.equal(links.find(([name])=>name==='LeetCode')[1],'https://leetcode.com/u/VikTheBuilder');
assert.deepEqual(journey.map(s=>s.displayDate),['2024','Summer 2025','Summer 2025','September 2025','Early December 2025','December 2025','January 2026','Summer 2026','2028']);
assert.equal(projects.filter(p=>p.isContributor).map(p=>p.slug).join(','),'equilibria,prahari');
assert(projects.every(p=>!p.incantation.includes('TODO')));
const titles=new Set(),descriptions=new Set();
for(const route of routes){const html=fs.readFileSync(path.join('dist',route.slice(1),'index.html'),'utf8');const seo=routeSeo(route);assert(html.includes(seo.canonical));assert(html.includes('property="og:image"'));assert(html.includes('name="twitter:card"'));assert(html.includes('rel="canonical"'));titles.add(seo.title);descriptions.add(seo.description)}
assert.equal(titles.size,routes.length);assert.equal(descriptions.size,routes.length);
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');assert.equal((sitemap.match(/<url>/g)||[]).length,routes.length);assert(fs.readFileSync('dist/robots.txt','utf8').includes(siteSeo.origin));
assert(fs.existsSync('dist/og-image.png'));assert(fs.existsSync('dist/favicon.svg'));
assert.deepEqual(fs.readFileSync('.env.example','utf8').trim().split(/\r?\n/),['VITE_WEB3FORMS_KEY=','VITE_UMAMI_WEBSITE_ID=']);
assert(fs.readFileSync('.gitignore','utf8').split(/\r?\n/).includes('.env'));
const config=JSON.parse(fs.readFileSync('vercel.json'));assert(config.rewrites.some(r=>r.destination==='/index.html'));for(const key of ['X-Content-Type-Options','Referrer-Policy','X-Frame-Options'])assert(config.headers[0].headers.some(h=>h.key===key));
function files(root){return fs.readdirSync(root,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(root,e.name)):[path.join(root,e.name)])}
for(const file of [...files('src'),...files('dist').filter(f=>/\.(html|js|css|xml|txt|svg)$/.test(f))]){
 const text=fs.readFileSync(file,'utf8');
 assert(!/href=["']tel:|<audio\b|new Audio\(/i.test(text),file+' contains phone/audio markup');
 assert(!/\b(?:AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{30,}|sk-proj-[A-Za-z0-9_-]{20,})\b/.test(text),file+' contains a credential-shaped string');
 assert(!/(?<![\w.])[6-9]\d{9}(?![\w.])/.test(text),file+' contains a phone-shaped number');
}
const chunks=fs.readdirSync('dist/assets').filter(f=>f.endsWith('.js')).map(file=>{const bytes=fs.readFileSync('dist/assets/'+file);return {chunk:file,bytes:bytes.length,gzip:gzipSync(bytes).length}});
console.log(JSON.stringify({routes:routes.length,checks:'passed',chunks},null,2));
