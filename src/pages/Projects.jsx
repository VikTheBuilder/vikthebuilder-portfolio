import {useSearchParams} from 'react-router-dom';
import {AnimatePresence,motion} from 'framer-motion';
import {Page,useSettings} from '../components/Motion';
import ProjectCard from '../components/ProjectCard';
import {projects,projectTags,spellCopy} from '../data';
export default function Projects(){
 const [params,setParams]=useSearchParams();const {quiet}=useSettings();const selected=params.get('tag')||'all';
 const visible=projects.filter(p=>selected==='all'||p.tags.includes(selected));
 function filter(tag){const next=new URLSearchParams(params);next.delete('category');tag==='all'?next.delete('tag'):next.set('tag',tag);setParams(next)}
 return <Page title="Spell Book" eyebrow="PROJECTS · THE PROJECT GRIMOIRE" className="spellbook-page"><div className="section-heading"><h2>Ideas, made <em>real.</em></h2><p>Creative spell names.<br/>Real engineering underneath.</p></div><h3 className="filter-label">Room of Requirement <span>Find a project by discipline</span></h3><div className="btn-row filters" role="group" aria-label="Room of Requirement project filter">{projectTags.map(t=><button className="btn btn-outline" key={t.id} aria-pressed={selected===t.id} onClick={()=>filter(t.id)}>{t.label}</button>)}</div><p className="sr-only" role="status">{visible.length?`${projectTags.find(t=>t.id===selected)?.label||selected} projects shown`:spellCopy.empty}</p><div className="open-spellbook"><div className="book-binding" aria-hidden="true"/><motion.div className="spell-grid" layout={!quiet}><AnimatePresence initial={false} mode="popLayout">{visible.map(p=><motion.div key={p.slug} className={p.flagship?'flagship-slot':''} layout={!quiet} initial={quiet?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={quiet?{opacity:1}:{opacity:0,y:-10}} transition={{duration:quiet?0:.25}}><ProjectCard project={p}/></motion.div>)}</AnimatePresence></motion.div>{!visible.length&&<div className="empty-spells"><h2>The room is quiet.</h2><p>{spellCopy.empty}</p><button className="btn btn-primary" onClick={()=>filter('all')}>Show all spells</button></div>}</div></Page>;
}
