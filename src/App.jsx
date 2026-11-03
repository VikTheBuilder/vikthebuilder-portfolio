import {lazy,Suspense} from 'react';
import {Routes,Route,useLocation} from 'react-router-dom';
import {AnimatePresence,LayoutGroup,motion} from 'framer-motion';
import Layout from './components/Layout';
import {SettingsProvider,useSettings} from './components/Motion';
const Home=lazy(()=>import('./pages/Home'));
const About=lazy(()=>import('./pages/About'));
const Projects=lazy(()=>import('./pages/Projects'));
const ProjectDetail=lazy(()=>import('./pages/ProjectDetail'));
const Skills=lazy(()=>import('./pages/Skills'));
const Trophies=lazy(()=>import('./pages/Trophies'));
const Journey=lazy(()=>import('./pages/Journey'));
const Contact=lazy(()=>import('./pages/Contact'));
const NotFound=lazy(()=>import('./pages/NotFound'));
function RoutedApp(){const location=useLocation();const {quiet}=useSettings();return <LayoutGroup><Layout><AnimatePresence mode="wait" initial={false}><motion.div key={location.pathname} className="candle-curtain" initial={quiet||location.pathname==='/'?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={quiet||location.pathname==='/'?{opacity:1}:{opacity:0,y:-6}} transition={{duration:quiet?0:.18}}><Suspense fallback={<div className="section-wrap route-loading" role="status">Opening this chapter…</div>}><Routes location={location}><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/projects" element={<Projects/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="/skills" element={<Skills/>}/><Route path="/trophies" element={<Trophies/>}/><Route path="/journey" element={<Journey/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense></motion.div></AnimatePresence></Layout></LayoutGroup>}
export default function App(){return <SettingsProvider><RoutedApp/></SettingsProvider>}
