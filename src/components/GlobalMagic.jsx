import {useEffect,useRef,useState} from 'react';
import {motion} from 'framer-motion';
import {useSettings} from '../context/SettingsContext';
import {sitePolish} from '../data';
function WandTrail(){
 const canvas=useRef(null);
 useEffect(()=>{
  const media=matchMedia('(hover: hover) and (pointer: fine)');const element=canvas.current,ctx=element.getContext('2d');if(!ctx)return;
  let particles=[],frame=0,last=0,previous=0;const root=document.documentElement;
  function size(){const dpr=Math.min(devicePixelRatio||1,2);element.width=innerWidth*dpr;element.height=innerHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  function draw(now){frame=0;if(document.hidden||!media.matches)return;const delta=Math.min((now-previous)||16,40);previous=now;ctx.clearRect(0,0,innerWidth,innerHeight);particles=particles.filter(p=>p.life>0);for(const p of particles){p.life-=delta;p.y+=delta*.018;ctx.globalAlpha=Math.max(0,p.life/500);ctx.fillStyle='#D3A625';ctx.beginPath();ctx.moveTo(p.x,p.y-4);ctx.lineTo(p.x+1,p.y-1);ctx.lineTo(p.x+4,p.y);ctx.lineTo(p.x+1,p.y+1);ctx.lineTo(p.x,p.y+4);ctx.lineTo(p.x-1,p.y+1);ctx.lineTo(p.x-4,p.y);ctx.lineTo(p.x-1,p.y-1);ctx.closePath();ctx.fill()}if(particles.length)frame=requestAnimationFrame(draw)}
  function move(e){if(!media.matches||document.hidden||e.target.closest('input,textarea,select,[contenteditable],a:focus,button:focus-visible'))return;const now=performance.now();if(now-last<24)return;last=now;particles.push({x:e.clientX,y:e.clientY,life:500});if(particles.length>20)particles.shift();if(!frame)frame=requestAnimationFrame(draw)}
  function visibility(){cancelAnimationFrame(frame);frame=0;particles=[];ctx.clearRect(0,0,innerWidth,innerHeight)}
  function enabled(){root.dataset.wand=String(media.matches);visibility()}
  size();enabled();media.addEventListener('change',enabled);window.addEventListener('resize',size);window.addEventListener('pointermove',move,{passive:true});document.addEventListener('visibilitychange',visibility);
  return()=>{delete root.dataset.wand;cancelAnimationFrame(frame);media.removeEventListener('change',enabled);window.removeEventListener('resize',size);window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',visibility)};
 },[]);
 return <canvas ref={canvas} className="wand-trail" aria-hidden="true"/>;
}
export default function GlobalMagic(){
 const {quiet}=useSettings();const [running,setRunning]=useState(false),[toast,setToast]=useState(false);const locked=useRef(false);
 useEffect(()=>{let buffer='',last=0;const timers=[];function key(e){if(e.ctrlKey||e.metaKey||e.altKey||e.isComposing||e.target.closest('input,textarea,select,[contenteditable],[role=textbox]')){buffer='';return}if(e.key.length!==1)return;const now=Date.now();if(now-last>4000)buffer='';last=now;buffer=(buffer+e.key.toLowerCase()).slice(-16);if(buffer.endsWith('expecto patronum')&&!locked.current){buffer='';locked.current=true;setRunning(!quiet);if(quiet)setToast(true);else timers.push(setTimeout(()=>{setRunning(false);setToast(true)},2300));timers.push(setTimeout(()=>{setToast(false);locked.current=false},quiet?4500:6800))}}window.addEventListener('keydown',key);return()=>{window.removeEventListener('keydown',key);timers.forEach(clearTimeout);locked.current=false;setRunning(false);setToast(false)}},[quiet]);
 return <>{!quiet&&<WandTrail/>}{running&&!quiet&&<motion.div className="patronus" aria-hidden="true" initial={{x:'-35vw',opacity:0}} animate={{x:'110vw',opacity:[0,1,1,0],y:[0,-12,0,-12,0]}} transition={{duration:2.3,ease:'linear'}}><svg viewBox="0 0 280 180" fill="none" stroke="#c6e9ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M55 95Q95 65 149 86l26-30 20-5 22 12-24 16-13 32-30 6-55-6-29 15-31-9z" fill="#b9e6ff30"/><path d="m173 57-4-29-21-19m22 22-23 2m20-7 1-21m16 50 15-28 24-12m-22 15 21 4m-16-9 2-20M66 115l-20 29-30 15m68-43 1 28-20 23m81-51 29 20 29 18m-39-42 28 4 29 25M47 95l-25-14"/><circle cx="195" cy="63" r="2" fill="#fff"/><path d="M83 92q27 18 54 4" strokeWidth="1"/></svg></motion.div>}<div className="patronus-toast" role="status" aria-live="polite">{toast&&sitePolish.patronusToast}</div></>;
}
