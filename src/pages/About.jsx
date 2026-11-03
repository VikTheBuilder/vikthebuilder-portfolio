import {Page,Reveal} from '../components/Motion';
import CourseScrolls from '../components/CourseScrolls';
import {profile,education} from '../data';
export default function About(){return <Page title="Great Hall" eyebrow="ABOUT · THE WIZARD BEHIND THE CODE"><div className="about"><Reveal><h2>Curiosity is the<br/><em>real magic.</em></h2><article className="timeline-item"><span className="eyebrow">{education.period}</span><h3>{education.degree}</h3><p>{education.school}</p></article></Reveal><Reveal className="about-copy" index={1}>{profile.summary.map(p=><p key={p}>{p}</p>)}<p className="seeking">✦ {profile.seeking}</p></Reveal></div><Reveal className="content-block"><h2>Certifications</h2><CourseScrolls/></Reveal></Page>}
