import {teammateProfiles} from '../data';
export default function TeamMember({name}){
 const url=teammateProfiles[name];
 return url?<a className="teammate-link" href={url} target="_blank" rel="noopener noreferrer">{name}<span aria-hidden="true"> ↗</span><span className="sr-only"> (LinkedIn, opens in a new tab)</span></a>:name;
}
