export default function CredentialLink({name,url}){
 if(!url?.trim())return null;
 return <a className="btn btn-outline credential-verify" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${name}`}><svg viewBox="0 0 18 18" aria-hidden="true"><path d="m9 1 2 2 3-.1.1 3L17 9l-2.9 3.1-.1 3-3-.1-2 2-2-2-3 .1-.1-3L1 9l2.9-3.1.1-3 3 .1Z" fill="none" stroke="currentColor"/><path d="m5.5 9 2.2 2.2 4.8-4.4" fill="none" stroke="currentColor"/></svg><span>Verify</span><span aria-hidden="true">↗</span></a>;
}
