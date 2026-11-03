import {Page,Reveal} from '../components/Motion';
import {skills} from '../data';
export default function Skills(){return <Page title="Ollivanders" eyebrow="SKILLS · TOOLS OF THE CRAFT"><h2>My technical <em>spellbook.</em></h2><p className="muted">The wands I reach for when an idea needs to become real.</p><div className="skills">{Object.entries(skills).map(([category,items],i)=><Reveal key={category} index={i}><div className="skill-row"><h2>{category}</h2><ul className="badges">{items.map(t=><li key={t}><span aria-hidden="true">◇</span> {t}</li>)}</ul></div></Reveal>)}</div></Page>}
