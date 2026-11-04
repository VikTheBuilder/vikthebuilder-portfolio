import fs from 'node:fs';
import path from 'node:path';
import {navigation,projects,routeSeo,siteSeo} from '../src/data.js';
const routes=[...navigation.map(n=>n.path),...projects.map(p=>'/projects/'+p.slug)];
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
export function headFor(route){
 const data=routeSeo(route);
 const metas={'description':data.description,'robots':data.notFound?'noindex,follow':'index,follow','twitter:card':'summary_large_image','twitter:title':data.title,'twitter:description':data.description,'twitter:image':siteSeo.origin+siteSeo.image,'twitter:image:alt':siteSeo.imageAlt};
 const og={'og:type':'website','og:title':data.title,'og:description':data.description,'og:url':data.canonical,'og:image':siteSeo.origin+siteSeo.image,'og:image:alt':siteSeo.imageAlt,'og:image:width':'1200','og:image:height':'630'};
 return '<title>'+escape(data.title)+'</title><link rel="canonical" href="'+escape(data.canonical)+'"/>'+Object.entries(metas).map(([name,content])=>'<meta name="'+name+'" content="'+escape(content)+'"/>').join('')+Object.entries(og).map(([name,content])=>'<meta property="'+name+'" content="'+escape(content)+'"/>').join('');
}
export function seoPlugin(){return {name:'portfolio-seo',transformIndexHtml(html){return html.replace(/<title>.*?<\/title>/,'').replace(/<meta name="description"[^>]*>/,'').replace('</head>',headFor('/')+'</head>')},closeBundle(){
 const base=fs.readFileSync('dist/index.html','utf8');
 const clean=base.replace(/<title>.*?<\/title>/,'').replace(/<link rel="canonical"[^>]*>/g,'').replace(/<meta (?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/g,'');
 for(const route of routes.filter(r=>r!=='/')){const folder=path.join('dist',route.slice(1));fs.mkdirSync(folder,{recursive:true});fs.writeFileSync(path.join(folder,'index.html'),clean.replace('</head>',headFor(route)+'</head>'))}
 fs.writeFileSync('dist/404.html',clean.replace('</head>',headFor('/404')+'</head>'));
 fs.writeFileSync('dist/robots.txt','User-agent: *\nAllow: /\nSitemap: '+siteSeo.origin+'/sitemap.xml\n');
 fs.writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(route=>'<url><loc>'+siteSeo.origin+route+'</loc></url>').join('')+'</urlset>');
}}}
