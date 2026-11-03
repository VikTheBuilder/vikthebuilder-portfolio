import {useEffect,useRef,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {motion,useAnimationControls} from 'framer-motion';
import {mapCopy,mapRooms} from '../data';
import {useSettings} from './Motion';

export default function MaraudersMap({pathname,onDismiss,onNavigate}){
  const {quiet}=useSettings();
  const navigate=useNavigate();
  const dialog=useRef(null),closeButton=useRef(null),alive=useRef(true),busy=useRef(false);
  const originalPath=useRef(pathname);
  const closing=useRef(false);
  const paper=useAnimationControls(),ink=useAnimationControls(),exit=useAnimationControls(),walk=useAnimationControls();
  const [phase,setPhase]=useState(quiet?'ready':'opening');
  const [hovered,setHovered]=useState(null);
  const [trip,setTrip]=useState(null);
  const current=mapRooms.find(r=>r.path===pathname||(r.path==='/projects'&&pathname.startsWith('/projects/')));

  useEffect(()=>{
    alive.current=true;
    const element=dialog.current;
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    element.showModal();closeButton.current.focus();
    async function unfold(){
      if(!quiet){await ink.start({strokeDashoffset:0,fill:'#59371f',transition:{duration:.45}});if(!alive.current)return;await paper.start({rotateX:0,scaleY:1,opacity:1,transition:{duration:.35}})}
      if(alive.current)setPhase('ready');
    }
    unfold();
    return()=>{alive.current=false;ink.stop();paper.stop();exit.stop();walk.stop();element.close();document.body.style.overflow=overflow};
  },[]);

  useEffect(()=>{if(pathname!==originalPath.current&&!busy.current)close()},[pathname]);
  useEffect(()=>{if(quiet){ink.set({strokeDashoffset:0,fill:'#59371f'});paper.set({rotateX:0,scaleY:1,opacity:1});setPhase('ready')}},[quiet]);

  async function finish(){
    closing.current=true;
    if(!alive.current)return;
    if(!quiet){
      setPhase('closing');
      await paper.start({rotateX:75,scaleY:.08,opacity:0,transition:{duration:.24}});
      if(!alive.current)return;
      setPhase('managed');
      await new Promise(resolve=>requestAnimationFrame(resolve));
      if(!alive.current)return;
      await exit.start({opacity:[0,1,1,0],transition:{duration:.45,times:[0,.2,.8,1]}});
    }
    if(alive.current){dialog.current.close();onDismiss()}
  }
  function close(){if(closing.current)return;closing.current=true;busy.current=true;ink.stop();paper.stop();walk.stop();finish()}
  function trap(event){
    if(event.key==='Escape'){event.preventDefault();close();return}
    if(event.key!=='Tab')return;
    const items=[...dialog.current.querySelectorAll('button:not([disabled]),a[href]')];
    const first=items[0],last=items.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
  async function select(event,room){
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
    event.preventDefault();
    if(busy.current)return;
    busy.current=true;
    ink.stop();paper.stop();paper.set({rotateX:0,scaleY:1,opacity:1});
    if(!quiet&&current&&current.path!==room.path){
      const from={x:current.x*10,y:current.y*6.2},to={x:room.x*10,y:room.y*6.2};
      const control={x:500,y:310};
      const points=Array.from({length:19},(_,i)=>{const t=i/18;return{x:(1-t)**2*from.x+2*(1-t)*t*control.x+t*t*to.x,y:(1-t)**2*from.y+2*(1-t)*t*control.y+t*t*to.y}});
      setTrip({d:`M${from.x} ${from.y} Q500 310 ${to.x} ${to.y}`,points});
      setPhase('walking');
      // Allow the footprint group to mount before starting its controller.
      await new Promise(resolve=>requestAnimationFrame(resolve));
      if(!alive.current)return;
      await walk.start({x:points.map(p=>p.x),y:points.map(p=>p.y),opacity:1,transition:{duration:.72,ease:'linear'}});
    }
    if(!alive.current)return;
    onNavigate(room.path);
    navigate(room.path);
    await finish();
  }
  return <dialog className="marauder-overlay" ref={dialog} aria-modal="true" aria-labelledby="marauder-title" onKeyDown={trap} onCancel={e=>{e.preventDefault();close()}}>
    <button className="map-dismiss" ref={closeButton} onClick={close} autoFocus>{mapCopy.close} ×</button>
    <h2 id="marauder-title" className="sr-only">{mapCopy.title}</h2>
    <div className="atlas-stage">
      <svg className="map-oath" viewBox="0 0 800 90" role="img" aria-label={mapCopy.oath}>
        {mapCopy.oathLines.map((line,i)=><motion.text key={line} x="400" y={33+i*38} textAnchor="middle" initial={quiet?false:{strokeDashoffset:400,fill:'transparent'}} animate={ink} stroke="#59371f" strokeWidth=".6" strokeDasharray="400" fill="#59371f">{line}</motion.text>)}
      </svg>
      <motion.div className="atlas-paper" initial={quiet?false:{rotateX:-75,scaleY:.1,opacity:0}} animate={paper}>
        <svg className="atlas-art" viewBox="0 0 1000 620" aria-hidden="true">
          <defs><pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#83633b" strokeWidth=".4" opacity=".2"/></pattern></defs>
          <rect x="12" y="12" width="976" height="596" fill="url(#map-grid)" stroke="#967447"/>
          <path d="M24 24H976V596H24Z M333 12V608 M666 12V608" fill="none" stroke="#9f8154" opacity=".35"/>
          <path d="M500 100V185L210 223V422L500 527L810 440V217L500 100 M210 223L500 316L810 217 M500 316V527" fill="none" stroke="#775739" strokeWidth="2" strokeDasharray="3 9"/>
          <path d="M50 70h120v45H50z M60 70V45h20v25m15 0V45h20v25m15 0V45h20v25 M860 55h80v75h-80z M850 55l50-30 50 30 M70 535h130v35H70z M75 535v-30h120v30 M855 515h95v45h-95z M865 515v-35h75v35" fill="none" stroke="#87633c" strokeWidth="2"/>
          <path d="M425 260h150v110H425z M440 260v-18h20v18m30 0v-18h20v18m30 0v-18h20v18 M455 370v30m90-30v30 M380 400h240 M380 410h240 M380 420h240" fill="none" stroke="#87633c" opacity=".45"/>
          <g transform="translate(915 330)" stroke="#87633c" fill="none"><circle r="30"/><path d="M0-40V40M-40 0H40M0-28 8 0 0 28-8 0Z"/></g>
        </svg>
        <nav className="atlas-rooms" aria-label={mapCopy.title}>
          {mapRooms.map(room=><Link key={room.path} to={room.path} className={`atlas-room ${current?.path===room.path?'is-current':''}`} style={{left:`${room.x}%`,top:`${room.y}%`}} aria-current={current?.path===room.path?'page':undefined} aria-describedby={`map-description-${room.path.slice(1)||'home'}`} onClick={e=>select(e,room)} onMouseEnter={()=>setHovered(room.path)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(room.path)} onBlur={()=>setHovered(null)}>
            <span className="room-title">{room.room}</span>{current?.path===room.path&&<small className="here-label">{mapCopy.here}</small>}
            <span id={`map-description-${room.path.slice(1)||'home'}`} className={`room-description ${hovered===room.path?'shown':''}`}>{room.description}</span>
          </Link>)}
        </nav>
        {trip&&!quiet&&<svg className="atlas-travel" viewBox="0 0 1000 620" aria-hidden="true"><path d={trip.d} fill="none" stroke="#740001" strokeWidth="2" strokeDasharray="3 8"/><motion.g initial={{x:trip.points[0].x,y:trip.points[0].y,opacity:0}} animate={walk} fill="#740001"><ellipse cx="-6" cy="-9" rx="4" ry="8" transform="rotate(-20)"/><circle cx="-3" cy="4" r="3"/><ellipse cx="7" cy="3" rx="4" ry="8" transform="rotate(20)"/><circle cx="9" cy="16" r="3"/></motion.g></svg>}
      </motion.div>
      <p className="atlas-hint">{mapCopy.hint}</p>
    </div>
    {phase==='managed'&&<motion.p className="managed-message" initial={{opacity:0}} animate={exit} role="status">{mapCopy.managed}</motion.p>}
  </dialog>;
}
