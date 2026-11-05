import {useRef} from 'react';
import {Link} from 'react-router-dom';
import {motion,useScroll,useTransform} from 'framer-motion';
import {Page,Reveal,useSettings} from '../components/Motion';
import PageMeta from '../components/PageMeta';
import {journey,journeyCopy as copy} from '../data';

function TypeIcon({type}){
  const paths={education:'M3 9 12 4l9 5-9 5-9-5Zm4 3v5q5 4 10 0v-5M21 9v9',hackathon:'M7 3h10v6a5 5 0 0 1-10 0V3Zm0 2H3v3q0 5 5 5m9-8h4v3q0 5-5 5m-4 1v5m-5 2h10',course:'M12 5Q6 2 3 4v15q4-2 9 1 5-3 9-1V4q-3-2-9 1Zm0 0v15',achievement:'m8 7-5 5 5 5m8-10 5 5-5 5m-3-12-2 14',certification:'m12 2 3 2 4 1 1 4 2 3-2 3-1 4-4 1-3 2-3-2-4-1-1-4-2-3 2-3 1-4 4-1 3-2Zm-5 10 3 3 7-7'};
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[type]}/></svg>;
}

function Train({position}){
  const y=useTransform(position,value=>`${(0.5+value)/journey.length*100}%`);
  return <motion.div className="journey-train-rail" style={{y}} aria-hidden="true"><div className="journey-train">
    <span className="journey-steam"><i/><i/><i/></span>
    <svg viewBox="0 0 56 88" fill="none"><path d="M8 68h40l5 14H3Z" fill="#D3A625" stroke="#1A0A0A" strokeWidth="2"/><path d="M7 29v37m42-37v37" stroke="#D3A625" strokeWidth="7"/><rect x="12" y="23" width="32" height="49" rx="8" fill="#740001" stroke="#EEBA30" strokeWidth="2"/><path d="M16 39h24M16 57h24" stroke="#D3A625" strokeWidth="3"/><rect x="8" y="6" width="40" height="24" rx="5" fill="#AE0001" stroke="#EEBA30" strokeWidth="2"/><path d="M15 12h10v11H15zm16 0h10v11H31z" fill="#1A0A0A"/><circle cx="28" cy="48" r="6" fill="#EEBA30"/><path d="M23 61h10v9H23z" fill="#1A0A0A"/></svg>
  </div></motion.div>;
}

function Station({stop,index,position,quiet}){
  const glow=useTransform(position,value=>Math.max(0,1-Math.abs(value-index)*2));
  return <li className={`journey-stop ${stop.featured?'journey-featured':''} ${stop.expected?'journey-destination':''}`}>
    <span className="journey-marker" aria-hidden="true">{!quiet&&<motion.span style={{opacity:glow}}/>}</span>
    <Reveal className="journey-card-wrap"><article className="journey-card" aria-labelledby={`stop-${stop.id}`}>
      <div className="journey-station-top"><span className="journey-type"><TypeIcon type={stop.type}/></span><span className="journey-date">{stop.displayDate}</span></div>
      {stop.expected&&<p className="journey-platform-label">{copy.destination} · <strong>{copy.expected}</strong></p>}
      <h2 id={`stop-${stop.id}`}>{stop.title}</h2><p>{stop.description}</p>
      {stop.link&&<Link className="btn btn-outline journey-visit" to={stop.link} aria-label={`${copy.visit}: ${stop.title}`}>{copy.visit}<span aria-hidden="true"> ↗</span></Link>}
    </article></Reveal>
  </li>;
}

export default function Journey(){
  const ref=useRef(null);const {quiet}=useSettings();
  const {scrollYProgress}=useScroll({target:ref,offset:['start center','end center']});
  // Equal grid rows align the track without any scroll-time layout measurements.
  // Flat intervals hold the locomotive at each platform before it continues.
  const input=[0],output=[0];
  journey.forEach((_,i)=>{const center=(i+.5)/journey.length;input.push(center-.022,center+.022);output.push(i,i)});
  input.push(1);output.push(journey.length-1);
  const position=useTransform(scrollYProgress,input,output);
  return <Page title={copy.title} eyebrow={copy.eyebrow} className="journey-page">
    <PageMeta description={copy.meta}/><p className="journey-intro">{copy.intro}</p>
    <div ref={ref} className={`journey-railway ${quiet?'journey-quiet':''}`}>
      <svg className="journey-track" width="32" height="100%" aria-hidden="true"><defs><pattern id="journey-sleepers" width="32" height="28" patternUnits="userSpaceOnUse"><path d="M2 14h28" stroke="currentColor" strokeWidth="4"/></pattern></defs><rect width="32" height="100%" fill="url(#journey-sleepers)"/><path d="M9 0V10000M23 0V10000" stroke="currentColor" strokeWidth="2"/></svg>
      {!quiet&&<Train position={position}/>}
      <ol className="journey-stations">{journey.map((stop,index)=><Station key={stop.id} stop={stop} index={index} position={position} quiet={quiet}/>)}</ol>
    </div>
  </Page>;
}
