import {createContext,useContext,useLayoutEffect,useState} from 'react';
import {MotionConfig,useReducedMotion} from 'framer-motion';
const SettingsContext=createContext(null);
export function readSetting(key,fallback){try{return localStorage.getItem(key)??fallback}catch{return fallback}}
export function saveSetting(key,value){try{localStorage.setItem(key,value)}catch{}}
export function SettingsProvider({children}){
 const reduced=useReducedMotion();
 const [theme,setTheme]=useState(()=>document.documentElement.dataset.theme==='lumos'?'lumos':'nox');
 const [override,setOverride]=useState(()=>readSetting('muggleMode',readSetting('muggle',null)));
 const muggleMode=override===null?Boolean(reduced):override==='true';
 const setMuggleMode=value=>setOverride(String(typeof value==='function'?value(muggleMode):value));
 const quiet=Boolean(reduced||muggleMode);
 useLayoutEffect(()=>{const root=document.documentElement;root.dataset.theme=theme;root.style.colorScheme=theme==='lumos'?'light':'dark';root.dataset.muggle=String(muggleMode);root.dataset.motion=quiet?'off':'on';saveSetting('theme',theme);if(override!==null)saveSetting('muggleMode',override)},[theme,muggleMode,quiet,override]);
 return <SettingsContext.Provider value={{theme,setTheme,muggleMode,setMuggleMode,quiet,muggle:muggleMode,setMuggle:setMuggleMode,light:theme==='lumos'}}><MotionConfig reducedMotion={quiet?'always':'never'} transition={{duration:quiet?0:.2}}>{children}</MotionConfig></SettingsContext.Provider>;
}
export const useSettings=()=>useContext(SettingsContext);
