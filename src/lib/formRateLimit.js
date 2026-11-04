export const LIMIT_KEY='portfolio-owl-post-rate-v1';
export const COOLDOWN_MS=30_000;
export const WINDOW_MS=15*60_000;
export const MAX_ATTEMPTS=3;
// Client-side friction only. Web3Forms must enforce its own server-side limits.
export function createFormLimiter({storage=()=>globalThis.localStorage,now=()=>Date.now(),lock=callback=>globalThis.navigator?.locks?.request?globalThis.navigator.locks.request(LIMIT_KEY,callback):Promise.resolve().then(callback)}={}){
 let memory={attempts:[],blockedUntil:0};
 const listeners=new Set();
 function read(){let record=memory;try{const stored=storage()?.getItem(LIMIT_KEY);if(stored)record=JSON.parse(stored)}catch{}const time=now();return {attempts:Array.isArray(record?.attempts)?record.attempts.filter(t=>Number.isFinite(t)&&t>time-WINDOW_MS&&t<=time).slice(-MAX_ATTEMPTS):[],blockedUntil:Number.isFinite(record?.blockedUntil)?record.blockedUntil:0}}
 function write(record){memory=record;try{storage()?.setItem(LIMIT_KEY,JSON.stringify(record))}catch{}listeners.forEach(fn=>fn())}
 function deadline(record=read()){return Math.max(record.blockedUntil,record.attempts.length?record.attempts.at(-1)+COOLDOWN_MS:0,record.attempts.length>=MAX_ATTEMPTS?record.attempts[0]+WINDOW_MS:0)}
 return {deadline,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},async reserve(){return lock(()=>{const record=read();if(deadline(record)>now())return false;record.attempts.push(now());write(record);return true})},block(duration){const record=read();record.blockedUntil=Math.max(record.blockedUntil,now()+duration);write(record)}};
}
export function retryDelay(header,now=Date.now()){if(!header)return 60*60_000;const numeric=Number(header);const delay=Number.isFinite(numeric)?numeric*1000:Date.parse(header)-now;return Number.isFinite(delay)?Math.min(24*60*60_000,Math.max(COOLDOWN_MS,delay)):60*60_000}
export const formLimiter=createFormLimiter();
