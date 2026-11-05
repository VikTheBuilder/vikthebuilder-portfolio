import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {Link,NavLink,useLocation} from 'react-router-dom';
import {links,navigation,profile,mapCopy,sitePolish} from '../data';
import {useSettings} from './Motion';
import SettingsToggles from './SettingsToggles';
const GlobalMagic=lazy(()=>import('./GlobalMagic'));
const MaraudersMap=lazy(()=>import('./MaraudersMap'));

export default function Layout({children}){
  const {pathname}=useLocation();
  const trigger=useRef(null);
  const header=useRef(null);
  useEffect(()=>{const element=header.current;const update=()=>document.documentElement.style.setProperty("--header-height",`${element.getBoundingClientRect().height}px`);update();const observer=new ResizeObserver(update);observer.observe(element);return()=>observer.disconnect()},[]);
  const restorePath=useRef(null),readyPath=useRef(null),openRef=useRef(false);
  const fallback=useRef(null);
  const [open,setOpen]=useState(false);
  const [small,setSmall]=useState(()=>window.matchMedia('(max-width: 639px)').matches);
  const {muggle}=useSettings();
  const plain=small||muggle;
  useEffect(()=>{const query=window.matchMedia('(max-width: 639px)');const update=()=>setSmall(query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[]);
  useEffect(()=>{if(plain&&open){setOpen(false);requestAnimationFrame(()=>fallback.current?.focus())}},[plain,open]);
  useEffect(()=>{const ready=event=>{readyPath.current=event.detail;if(restorePath.current===event.detail&&!openRef.current){document.querySelector('main h1')?.focus({preventScroll:true});restorePath.current=null}};window.addEventListener('portfolio:page-ready',ready);return()=>window.removeEventListener('portfolio:page-ready',ready)},[]);
  function dismiss(){openRef.current=false;setOpen(false);const navigating=restorePath.current;requestAnimationFrame(()=>{if(navigating){if(readyPath.current===navigating){document.querySelector('main h1')?.focus({preventScroll:true});restorePath.current=null}}else trigger.current?.focus({preventScroll:true})})}
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header ref={header} className="map-header">
      <Link className="header-name" to="/">{profile.name}</Link>
      <div className="header-controls">
        {plain?<a ref={fallback} className="btn btn-outline footer-nav-trigger" href="#footer-navigation">Navigation ↓</a>:<button className="btn btn-outline" ref={trigger} onClick={()=>{openRef.current=true;setOpen(true)}} aria-haspopup="dialog" aria-expanded={open}>{mapCopy.title}</button>}
        <SettingsToggles/>
      </div>
    </header>
    <main id="main" tabIndex={-1}>{children}</main>
    <footer className="section-wrap map-footer">
      <div className="footer-toolbar"><nav id="footer-navigation" className="footer-navigation" aria-label={mapCopy.footerLabel}>{navigation.map(n=><NavLink key={n.path} to={n.path} end={n.path==='/'}>{n.label}</NavLink>)}</nav><div className="btn-row footer-settings"><SettingsToggles/></div></div>
      <div className="footer-meta"><span>{profile.name} <span className="muted">/ {profile.handle}</span></span><div className="socials">{links.map(([label,url])=><a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens new tab)`}>{label} ↗</a>)}</div><p>{sitePolish.spellHint}</p><p>© {new Date().getFullYear()} {profile.name}</p><p>{sitePolish.disclaimer}</p></div>
    </footer>
    <Suspense fallback={null}><GlobalMagic/></Suspense>
    {open&&!plain&&<Suspense fallback={<div className="map-loading" role="status">{mapCopy.loading}<button className="btn btn-outline" onClick={dismiss}>{mapCopy.close}</button></div>}><MaraudersMap pathname={pathname} onDismiss={dismiss} onNavigate={path=>{restorePath.current=path===pathname?null:path}}/></Suspense>}
  </>;
}
