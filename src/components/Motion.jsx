import {useLayoutEffect} from 'react';
import {motion} from 'framer-motion';
import {useLocation} from 'react-router-dom';
import {profile} from '../data';
import {useSettings} from '../context/SettingsContext';
export {SettingsProvider,useSettings,readSetting,saveSetting} from '../context/SettingsContext';
export function Page({title,eyebrow,children,className=''}){const {pathname}=useLocation();useLayoutEffect(()=>{document.title=title===profile.name?`${profile.name} | ${profile.handle}`:`${title} | ${profile.name}`;window.scrollTo({top:0,behavior:'instant'});document.querySelector('main h1')?.focus({preventScroll:true});window.dispatchEvent(new CustomEvent('portfolio:page-ready',{detail:pathname}))},[pathname,title]);return <section className={`section-wrap route-page ${className}`}><p className="eyebrow">{eyebrow}</p><h1 tabIndex={-1}>{title}</h1>{children}</section>}
export function Reveal({children,index=0,className=''}){const {quiet}=useSettings();return <motion.div className={className} initial={quiet?false:{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:quiet?0:.3,delay:quiet?0:Math.min(index*.06,.24)}}>{children}</motion.div>}
