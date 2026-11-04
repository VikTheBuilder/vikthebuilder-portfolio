export default function CredentialLink({name,url}){
 if(!url?.trim())return null;
 return <a className="credential-verify" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${name}`}><span className="credential-seal" aria-hidden="true">◇</span><span>Verify</span><span aria-hidden="true">↗</span></a>;
}
