import {useId} from 'react';
import {motion} from 'framer-motion';
import {useSettings} from './Motion';
export default function ArchitectureDiagram({diagram,projectTitle}){
 const {quiet}=useSettings();const uid=useId().replace(/:/g,'');const lookup=Object.fromEntries(diagram.nodes.map(n=>[n.id,n]));
 return <figure className="architecture"><figcaption>{projectTitle} · documented architecture</figcaption><div className="architecture-scroll" tabIndex={0} role="region" aria-label={`${projectTitle} architecture diagram`}><svg viewBox={`0 0 ${diagram.width} ${diagram.height}`} role="img" aria-label={`${projectTitle}: ${diagram.steps.join(' ')}`}>
 <defs><marker id={`arrow-${uid}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10Z" fill="#D3A625"/></marker></defs>
 {diagram.edges.map((e,i)=>{const a=lookup[e.from],b=lookup[e.to];const d=`M${a.x} ${a.y+28} L${b.x} ${b.y-28}`;return <g key={`${e.from}-${e.to}`}><motion.path d={d} fill="none" stroke="#D3A625" strokeWidth="2" markerEnd={`url(#arrow-${uid})`} initial={quiet?false:{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:quiet?0:.45,delay:quiet?0:i*.12}}/>{!quiet&&<motion.circle r="4" fill="#EEBA30" initial={{cx:a.x,cy:a.y+28,opacity:0}} whileInView={{cx:[a.x,b.x],cy:[a.y+28,b.y-28],opacity:[0,1,0]}} viewport={{once:true}} transition={{duration:.7,delay:i*.12+.25}}/>}</g>})}
 {diagram.nodes.map((n,i)=><motion.g key={n.id} initial={quiet?false:{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:quiet?0:.3,delay:quiet?0:i*.12}}><rect x={n.x-100} y={n.y-28} width="200" height="56" rx="3" fill="#291512" stroke="#b08c40"/><text x={n.x} y={n.y+6} textAnchor="middle" fill="#F4E9CD" fontSize="17" fontFamily="Inter, sans-serif">{n.label}</text></motion.g>)}
 </svg></div><ol className="sr-only">{diagram.steps.map(step=><li key={step}>{step}</li>)}</ol></figure>;
}
