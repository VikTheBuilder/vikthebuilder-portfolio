import {useSettings} from '../context/SettingsContext';
import {sitePolish} from '../data';
export default function SettingsToggles(){
 const {theme,setTheme,muggleMode,setMuggleMode}=useSettings();
 return <>
  <button className="btn btn-outline theme-toggle" aria-pressed={theme==='lumos'} onClick={()=>setTheme(theme==='lumos'?'nox':'lumos')}>
   <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 12-12M17 3v3m4 1-2 2m3 4h-3M12 4l2 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="17" cy="8" r="2" fill="currentColor"/></svg>
   <span>{theme==='lumos'?'Lumos':'Nox'}</span>
  </button>
  <button className="btn btn-outline muggle-control" aria-pressed={muggleMode} title={sitePolish.muggleDescription} aria-description={sitePolish.muggleDescription} onClick={()=>setMuggleMode(!muggleMode)}>
   <span>{sitePolish.muggleLabel}</span><span className="btn-state">{muggleMode?'On':'Off'}</span>
  </button>
 </>;
}
