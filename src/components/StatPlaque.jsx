import {useEffect,useRef,useState} from 'react';
import {animate,useInView} from 'framer-motion';
import {useSettings} from './Motion';
export default function StatPlaque({stat}){
 const ref=useRef(null),played=useRef(false);const visible=useInView(ref,{once:true,amount:.4});const {quiet}=useSettings();const [count,setCount]=useState(0);
 useEffect(()=>{if(quiet){played.current=true;setCount(stat.value);return}if(!visible||played.current)return;played.current=true;const animation=animate(0,stat.value,{duration:1,ease:'easeOut',onUpdate:setCount});return()=>animation.stop()},[visible,quiet,stat.value]);
 const display=quiet?stat.display:`${stat.decimals?count.toFixed(stat.decimals):Math.floor(count)}${stat.suffix}`;
 return <article className="stat-plaque" ref={ref}><p className="plaque-value" aria-hidden="true">{display}</p><span className="sr-only">{stat.display}</span><h2>{stat.label}</h2><p>{stat.detail}</p></article>;
}
