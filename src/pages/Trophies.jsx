import {Link} from 'react-router-dom';
import {Page,Reveal} from '../components/Motion';
import CourseScrolls from '../components/CourseScrolls';
import {award,team,achievements} from '../data';
export default function Trophies(){return <Page title="Trophy Room" eyebrow="RECOGNITION · CHAPTERS WORTH REMEMBERING"><Reveal><article className="certificate featured-award"><span className="eyebrow">{award.date} · {award.result}</span><h2>{award.name}</h2><p>{award.event} · {award.project}</p><p>Team: {team.join(', ')}.</p><Link className="button primary" to={`/projects/${award.slug}`}>Explore PRAHARI →</Link></article></Reveal><div className="journey-grid">{achievements.map((a,i)=><Reveal index={i} key={a.title}><h2>{a.title}</h2><p>{a.description}</p></Reveal>)}</div><Reveal className="content-block"><h2>Course scrolls</h2><CourseScrolls/></Reveal></Page>}
