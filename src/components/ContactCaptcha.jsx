import {useEffect,useRef,useState} from 'react';
import {contactSecurity as copy} from '../data';
let loading;
function loadCaptcha(){
 if(window.hcaptcha?.render)return Promise.resolve(window.hcaptcha);
 if(loading)return loading;
 loading=new Promise((resolve,reject)=>{
  const script=document.createElement('script');
  const fail=()=>{clearTimeout(timer);script.remove();loading=null;reject(new Error('Captcha unavailable'))};
  const timer=setTimeout(fail,15000);
  window.portfolioCaptchaReady=()=>{clearTimeout(timer);resolve(window.hcaptcha)};
  script.src='https://js.hcaptcha.com/1/api.js?onload=portfolioCaptchaReady&render=explicit&recaptchacompat=off';script.async=true;script.defer=true;script.onerror=fail;document.head.append(script);
 });return loading;
}
export default function ContactCaptcha({onVerify,onUnavailable,resetKey}){
 const container=useRef(null),callbacks=useRef({onVerify,onUnavailable});
 callbacks.current={onVerify,onUnavailable};
 const [status,setStatus]=useState('loading');
 useEffect(()=>{let active=true,id,api;setStatus('loading');callbacks.current.onVerify('');
  loadCaptcha().then(loaded=>{if(!active)return;api=loaded;id=api.render(container.current,{sitekey:'50b2fe65-b00b-4b9e-ad62-3ba471098be2',size:'compact',theme:'light',callback:token=>{if(active){callbacks.current.onVerify(token);callbacks.current.onUnavailable(false)}},'expired-callback':()=>{if(active)callbacks.current.onVerify('')},'error-callback':()=>{if(active){setStatus('error');callbacks.current.onVerify('');callbacks.current.onUnavailable(true)}}});setStatus('ready');callbacks.current.onUnavailable(false)}).catch(()=>{if(active){setStatus('error');callbacks.current.onUnavailable(true)}});
  return()=>{active=false;if(id!==undefined)api?.remove(id)};
 },[resetKey]);
 return <><div ref={container} className="owl-captcha-widget"/><p className="owl-note" role="status">{status==='loading'?copy.loading:status==='error'?copy.unavailable:''}</p></>;
}
