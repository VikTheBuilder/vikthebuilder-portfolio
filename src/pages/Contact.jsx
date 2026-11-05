import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {Page,useSettings} from '../components/Motion';
import PageMeta from '../components/PageMeta';
import {contactPage as copy,contactSecurity as security} from '../data';
import {formLimiter,retryDelay,LIMIT_KEY} from '../lib/formRateLimit';
const Captcha=lazy(()=>import('../components/ContactCaptcha'));
const Magic=lazy(()=>import('../components/ContactMagic'));
const blank={name:'',email:'',subject:'',message:'',website:''};
const accessKey=import.meta.env.VITE_WEB3FORMS_KEY?.trim();
const resumeAvailable=Object.keys(import.meta.glob('/public/Vikramaditya_Singh_Resume.pdf')).length>0;
export default function Contact(){
 const {quiet}=useSettings();const [values,setValues]=useState(blank),[errors,setErrors]=useState({}),[state,setState]=useState('idle'),[blockedUntil,setBlockedUntil]=useState(()=>formLimiter.deadline()),[toast,setToast]=useState(''),[flight,setFlight]=useState(0);
 const [captchaToken,setCaptchaToken]=useState(''),[captchaUnavailable,setCaptchaUnavailable]=useState(false),[captchaReset,setCaptchaReset]=useState(0);
 const form=useRef(null),busy=useRef(false),controller=useRef(null);
 const cooldown=blockedUntil>Date.now();
 useEffect(()=>{let timer;const refresh=()=>{clearTimeout(timer);const until=formLimiter.deadline();setBlockedUntil(until>Date.now()?until:0);if(until>Date.now())timer=setTimeout(refresh,until-Date.now()+20)};const changed=e=>{if(e.key===LIMIT_KEY||e.key===null)refresh()};const unsubscribe=formLimiter.subscribe(refresh);window.addEventListener('storage',changed);window.addEventListener('focus',refresh);refresh();return()=>{clearTimeout(timer);unsubscribe();window.removeEventListener('storage',changed);window.removeEventListener('focus',refresh);controller.current?.abort()}},[]);
 const mailto=`mailto:${copy.email}?subject=${encodeURIComponent('Portfolio message from '+values.name.trim()+(values.subject?' — '+values.subject:''))}&body=${encodeURIComponent('From: '+values.name.trim()+' <'+values.email.trim()+'>\n\n'+values.message.trim())}`;
 function success(){setState('success');setValues({...blank});setErrors({});setFlight(n=>n+1);formLimiter.block(30000)}
 async function submit(event){
  event.preventDefault();if(busy.current)return;if(formLimiter.deadline()>Date.now()){setBlockedUntil(formLimiter.deadline());setState('limited');return}
  if(values.website){success();return}
  const invalid={};
  if(!values.name.trim())invalid.name=copy.errors.name;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))invalid.email=copy.errors.email;
  if(values.message.trim().length<10||values.message.length>2000)invalid.message=copy.errors.message;
  setErrors(invalid);
  if(Object.keys(invalid).length){form.current.elements.namedItem(Object.keys(invalid)[0]).focus();return}
  if(!accessKey){setState('draft');window.location.href=mailto;return}
  if(!captchaToken){setErrors({captcha:security.required});document.getElementById('owl-captcha').focus();return}
  busy.current=true;
  let reserved;try{reserved=await formLimiter.reserve()}catch{busy.current=false;setState('error');return}
  if(!reserved){busy.current=false;setState('limited');setBlockedUntil(formLimiter.deadline());return}
  setState('sending');controller.current=new AbortController();const timeout=setTimeout(()=>controller.current.abort(),15000);
  try{
   const response=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},signal:controller.current.signal,body:JSON.stringify({access_key:accessKey,name:values.name.trim(),email:values.email.trim(),message:values.message.trim(),subject:'Portfolio message from '+values.name.trim()+(values.subject?' — '+values.subject:''),botcheck:false,'h-captcha-response':captchaToken})});
   if(response.status===429){formLimiter.block(retryDelay(response.headers.get('Retry-After')));setState('limited');return}
   const result=await response.json();if(!response.ok||result.success!==true)throw new Error('Delivery failed');success();
  }catch{setState('error')}finally{clearTimeout(timeout);busy.current=false;setCaptchaToken('');setCaptchaReset(n=>n+1)}
 }
 function change(event){const {name,value}=event.target;setValues(v=>({...v,[name]:value}));if(errors[name])setErrors(e=>({...e,[name]:undefined}))}
 async function copyEmail(){try{await navigator.clipboard.writeText(copy.email);setToast(copy.copied)}catch{setToast(copy.copyFailed)}}
 const notice=state==='limited'?security.rateLimited:state==='success'?copy.success:state==='error'?copy.failure:state==='draft'?copy.draft:state==='sending'?copy.labels.sending:'';
 return <Page title={copy.title} eyebrow={copy.eyebrow} className="owl-post-page"><PageMeta description={copy.meta}/><p className="owl-intro">{copy.intro}</p><div className="owl-post-grid">
 <div className="owl-parchment"><form ref={form} onSubmit={submit} noValidate aria-busy={state==='sending'}>
 {['name','email'].map(name=><div className="owl-field" key={name}><label htmlFor={`owl-${name}`}>{copy.labels[name]}</label><input id={`owl-${name}`} name={name} type={name==='email'?'email':'text'} autoComplete={name} required maxLength={name==='email'?254:100} value={values[name]} onChange={change} aria-invalid={!!errors[name]} aria-describedby={errors[name]?`owl-${name}-error`:undefined}/>{errors[name]&&<p id={`owl-${name}-error`} className="owl-error">{errors[name]}</p>}</div>)}
 <div className="owl-field"><label htmlFor="owl-subject">{copy.labels.subject}</label><select id="owl-subject" name="subject" value={values.subject} onChange={change}><option value="">{copy.labels.choose}</option>{copy.subjects.map(subject=><option key={subject}>{subject}</option>)}</select></div>
 <div className="owl-field"><label htmlFor="owl-message">{copy.labels.message}</label><textarea id="owl-message" name="message" rows={7} required minLength={10} maxLength={2000} value={values.message} onChange={change} aria-invalid={!!errors.message} aria-describedby={`owl-message-hint${errors.message?' owl-message-error':''}`}/><small id="owl-message-hint">{copy.hint}</small>{errors.message&&<p id="owl-message-error" className="owl-error">{errors.message}</p>}</div>
 <div hidden aria-hidden="true"><label htmlFor="owl-website">Website</label><input id="owl-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={change}/></div>
 {accessKey&&<div id="owl-captcha" className="owl-captcha" tabIndex={-1} role="group" aria-label={security.label} aria-describedby={errors.captcha?'owl-captcha-error':undefined}><p className="owl-note">{security.label}</p><Suspense fallback={<p className="owl-note">{security.loading}</p>}><Captcha onVerify={token=>{setCaptchaToken(token);if(token)setErrors(previous=>({...previous,captcha:undefined}))}} onUnavailable={setCaptchaUnavailable} resetKey={captchaReset}/></Suspense>{errors.captcha&&<p id="owl-captcha-error" className="owl-error">{errors.captcha}</p>}{captchaUnavailable&&<button type="button" className="btn btn-ghost owl-fallback" onClick={()=>setCaptchaReset(n=>n+1)}>{security.retry}</button>}<p className="owl-note">{security.policy}</p></div>}
 {!accessKey&&<p className="owl-note">{copy.missingKey}</p>}
 <button className="btn btn-primary owl-submit" disabled={state==='sending'||cooldown} type="submit">{state==='sending'&&<span className={quiet?'owl-spinner static':'owl-spinner'} aria-hidden="true"/>}{state==='sending'?copy.labels.sending:state==='error'?copy.labels.retry:copy.labels.send}</button>
 <div className="owl-status" aria-live="polite" aria-atomic="true"><p>{notice}</p>{cooldown&&<p>{security.rateWait.replace('{time}',new Date(blockedUntil).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'}))}</p>}</div>
 {(state==='error'||state==='draft'||state==='limited'||cooldown||captchaUnavailable)&&<a className="btn btn-ghost owl-fallback" href={mailto}>{copy.fallback} ↗</a>}
 </form></div>
 <section className="floo-fireplace" aria-labelledby="floo-heading"><svg className="floo-stone" viewBox="0 0 400 490" preserveAspectRatio="none" aria-hidden="true"><path d="M14 20h372v40H14zm16 40h340v400h-45V155Q200 52 75 155v305H30zM8 460h384v24H8z" fill="#433d35" stroke="#958267" strokeWidth="3"/><path d="M30 120h60m-60 65h45m-45 65h45m-45 65h45m-45 65h45m250-260h45m-45 65h45m-45 65h45m-45 65h45m-45 65h45M95 60v55m70-55v30m70-30v30m70-30v55" stroke="#958267" strokeWidth="2"/></svg>
 <h2 id="floo-heading">{copy.network}</h2><div className="floo-flame" aria-hidden="true"><svg viewBox="0 0 120 110"><path d="M58 105C-5 91 32 55 28 37c25 15 9 28 27 33C37 32 79 25 70 4c50 47 30 54 26 67 27-10 18-24 18-24 20 34-10 63-56 58Z" fill="#76c995"/><path d="M62 102c-28-18 0-35 3-52 27 29 29 42-3 52Z" fill="#d5efaa"/></svg></div>
 <div className="btn-row floo-actions"><a className="btn btn-outline" href={`mailto:${copy.email}`}>{copy.labels.emailLink} ↗</a>{copy.profiles.map(item=><a className="btn btn-outline" key={item.label} href={item.url} target="_blank" rel="noopener noreferrer">{item.label} ↗<span className="sr-only"> (opens in a new tab)</span></a>)}{resumeAvailable?<a className="btn btn-outline" href={copy.resume} download>{copy.labels.resume} ↓</a>:<button className="btn btn-outline" disabled>{copy.labels.resume} ↓</button>}</div>
 {!resumeAvailable&&<p className="floo-note">{copy.resumeMissing}</p>}<a className="floo-address" href={`mailto:${copy.email}`}>{copy.email}</a><button className="btn btn-outline floo-copy" onClick={copyEmail}>{copy.labels.copy}</button><p role="status" className="floo-toast">{toast}</p>
 </section></div>{!quiet&&<Suspense fallback={null}><Magic flight={flight}/></Suspense>}</Page>;
}
