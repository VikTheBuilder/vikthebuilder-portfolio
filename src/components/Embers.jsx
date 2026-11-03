import {useEffect,useState} from 'react';
import {useSettings} from './Motion';

// Deterministic positions avoid random layout work on every render.
const particles=Array.from({length:18},(_,i)=>({left:`${(i*37+9)%100}%`,delay:`-${i*.73}s`,duration:`${10+i%6}s`,drift:`${(i%2?1:-1)*(15+i*2)}px`}));
export default function Embers(){
  const {quiet}=useSettings();
  const [hidden,setHidden]=useState(()=>document.hidden);
  useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update)},[]);
  if(quiet)return null;
  return <div className="landing-atmosphere" aria-hidden="true" data-paused={hidden}><div className="candle-glow"/>{particles.map((p,i)=><i key={i} className="ember" style={{left:p.left,animationDelay:p.delay,animationDuration:p.duration,'--drift':p.drift}}/>)}</div>;
}
