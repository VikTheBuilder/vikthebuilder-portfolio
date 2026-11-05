import {useEffect,useRef,useState} from 'react';
import {motion,useAnimationControls} from 'framer-motion';
import {home} from '../data';

export default function AcceptanceLetter({onDismiss}){
  const dialog=useRef(null);
  const sealButton=useRef(null);
  const active=useRef(true);
  const opening=useRef(false);
  const [cracked,setCracked]=useState(false);
  const seal=useAnimationControls();
  const paper=useAnimationControls();
  const overlay=useAnimationControls();

  useEffect(()=>{
    active.current=true;
    const element=dialog.current;
    element.showModal();
    sealButton.current?.focus({preventScroll:true});
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    return ()=>{
      active.current=false;
      seal.stop();paper.stop();overlay.stop();
      element.close();
      document.body.style.overflow=previousOverflow;
    };
  },[seal,paper,overlay]);

  function dismiss(){if(!active.current)return;active.current=false;dialog.current?.close();onDismiss();}
  function trapFocus(event){
    if(event.key!=='Tab')return;
    const controls=[...dialog.current.querySelectorAll('a[href],button:not([disabled])')];
    const first=controls[0],last=controls[controls.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
  async function open(){
    if(opening.current)return;
    opening.current=true;
    setCracked(true);
    await seal.start({rotate:[0,-5,4,0],scale:.95,transition:{duration:.2}});
    if(!active.current)return;
    await paper.start({rotateX:[-7,0],scaleY:[.94,1],transition:{duration:.45,ease:'easeOut'}});
    if(!active.current)return;
    await overlay.start({opacity:0,transition:{duration:.3}});
    if(active.current)dismiss();
  }

  return <dialog ref={dialog} className="acceptance-overlay" aria-labelledby="acceptance-title" aria-describedby="acceptance-summary" onKeyDown={trapFocus} onCancel={event=>{event.preventDefault();dismiss();}}>
    <motion.div className="letter-stage" animate={overlay}>
      <a className="btn btn-ghost intro-skip" href="#main" onClick={event=>{event.preventDefault();dismiss();}}>{home.intro.skip}</a>
      <motion.article className="parchment-letter" animate={paper}>
        <p className="eyebrow">{home.intro.eyebrow}</p>
        <h2 id="acceptance-title">{home.intro.title}</h2>
        <div id="acceptance-summary">{home.intro.lines.map(line=><p key={line}>{line}</p>)}</div>
        <p className="letter-signature">{home.intro.signature}</p>
        <motion.button ref={sealButton} className={`btn btn-outline intro-wax-seal ${cracked?'is-cracked':''}`} aria-label={home.intro.seal} aria-disabled={cracked} onClick={open} animate={seal} autoFocus>
          <span className="intro-seal-icon" aria-hidden="true"><span className="seal-half seal-left" aria-hidden="true"/>
          <span className="seal-half seal-right" aria-hidden="true"/>
          <span className="seal-letter" aria-hidden="true">{home.intro.sealMark}</span></span><span>{home.intro.seal}</span>
        </motion.button>
      </motion.article>
    </motion.div>
  </dialog>;
}

