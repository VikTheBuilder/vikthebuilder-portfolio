import {certification,courses} from '../data';
export default function CourseScrolls(){return <><article className="certificate"><span className="eyebrow">{certification.provider}</span><h3>{certification.title}</h3><p>{certification.description}</p></article><ul className="cert-list">{courses.map(([name,provider])=><li key={name}><span>{name}</span><span>{provider}</span></li>)}</ul></>}
