import {useState} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useSettings} from './Motion';
import {spellCopy} from '../data';
export default function ProjectCard({project:p}){
 const {quiet}=useSettings();const [flipped,setFlipped]=useState(false);
 return <article className={`project spell-card ${p.flagship?'flagship':''}`}>
  <motion.div className="spell-card-heading" layoutId={quiet?undefined:`project-${p.slug}`}>
   <div className="project-top"><span className="eyebrow">{p.flagship?'FLAGSHIP SPELL':'THE PROJECT GRIMOIRE'}</span>{p.isContributor&&<span className="role">Contributor</span>}</div>
   <p className="spell-name">{p.spellName}</p><h2><Link to={`/projects/${p.slug}`}>{p.realTitle}</Link></h2><p className="project-type">{p.type}</p>
  </motion.div>
  <p className="project-description">{p.effect}</p>
  <ul className="badges" aria-label={`${p.realTitle} technology stack`}>{p.wandMovement.map(t=><li key={t}><span aria-hidden="true">◇ </span>{t}</li>)}</ul>
  {p.slug==='prahari'&&<Link className="spell-award" to="/trophies">✦ {spellCopy.winner}</Link>}
  {p.flagship&&(quiet?<ul className="resume-bullets">{p.bullets.map(b=><li key={b}>{b}</li>)}</ul>:<>
   <button className="flip-button" aria-expanded={flipped} aria-controls="vaultify-bullets" onClick={()=>setFlipped(!flipped)}>{flipped?'Flip back':'Flip · reveal the build'} <span aria-hidden="true">↻</span></button>
   <div className="flip-scene"><motion.div className="flip-inner" animate={{rotateY:flipped?180:0}} transition={{duration:.45}}>
    <div className="flip-face flip-front" aria-hidden={flipped}><span aria-hidden="true" className="spell-sigil">◇</span><p>Cloud infrastructure, unified.</p><span>Reveal the engineering behind Vaultify.</span></div>
    <div className="flip-face flip-back" id="vaultify-bullets" aria-hidden={!flipped}><ul className="resume-bullets">{p.bullets.map(b=><li key={b}>{b}</li>)}</ul></div>
   </motion.div></div>
  </>)}
  <div className="project-links"><Link className="repo-link" to={`/projects/${p.slug}`}>Read the spell →</Link><a className="button github-button" href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.realTitle} on GitHub (opens new tab)`}>GitHub ↗</a></div>
 </article>;
}
