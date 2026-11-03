import {Link} from 'react-router-dom';
import {Page} from '../components/Motion';
export default function NotFound(){return <Page title="This page has vanished" eyebrow="404 · A WRONG TURN IN THE CASTLE"><p className="hero-role">This page has vanished, like Platform 9 3/4 to a Muggle</p><p className="muted">The map still knows the way home.</p><Link className="button primary" to="/">Return to the entrance →</Link></Page>}
