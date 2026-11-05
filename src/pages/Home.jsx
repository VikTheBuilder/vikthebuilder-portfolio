import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {Page,useSettings} from '../components/Motion';
import HeroArt from '../components/HeroArt';
import AcceptanceLetter from '../components/AcceptanceLetter';
import Embers from '../components/Embers';
import {profile,home} from '../data';

const sessionKey='portfolio-acceptance-dismissed';
let dismissedInMemory=false;
function wasDismissed(){try{return sessionStorage.getItem(sessionKey)==='true'||dismissedInMemory}catch{return dismissedInMemory}}
function remember(){dismissedInMemory=true;try{sessionStorage.setItem(sessionKey,'true')}catch{/* In-memory fallback when storage is blocked. */}}
export default function Home(){
  const {quiet}=useSettings();
  const [dismissed,setDismissed]=useState(wasDismissed);
  useEffect(()=>{if(quiet){remember();setDismissed(true)}},[quiet]);
  function dismiss(){remember();setDismissed(true);requestAnimationFrame(()=>document.querySelector('main h1')?.focus({preventScroll:true}))}
  return <>
    <Page title={profile.name} eyebrow={home.eyebrow} className="home-page landing-page">
      <Embers/>
      <div className="hero-grid">
        <div className="landing-copy">
          <p className="hero-role landing-role">{home.role}</p>
          <p className="hero-copy">{profile.intro}</p>
          <div className="btn-row wax-ctas">{home.ctas.map(cta=><Link className="btn btn-outline wax-cta" to={cta.path} key={cta.path}><span className="cta-seal" aria-hidden="true">{cta.rune}</span><span>{cta.label}</span></Link>)}</div>
          <ul className="badges rune-strip" aria-label={home.runeLabel}>{home.runes.map(rune=><li key={rune}><span aria-hidden="true">◇ </span>{rune}</li>)}</ul>
          <Link className="winner-badge" to="/trophies"><span aria-hidden="true">✦</span>{home.winner}<span aria-hidden="true">↗</span></Link>
          <p className="location">⌖ {profile.location}</p>
        </div>
        <HeroArt/>
      </div>
    </Page>
    {!dismissed&&!quiet&&<AcceptanceLetter onDismiss={dismiss}/>}
  </>;
}
