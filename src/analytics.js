import {siteSeo} from './data';

export function loadAnalytics() {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim();
  if (!import.meta.env.PROD || !websiteId || window.location.origin !== siteSeo.origin || navigator.doNotTrack === '1') return;
  if (document.getElementById('umami-analytics')) return;

  const script = document.createElement('script');
  script.id = 'umami-analytics';
  script.src = 'https://cloud.umami.is/script.js';
  script.async = true;
  script.dataset.websiteId = websiteId;
  script.dataset.domains = new URL(siteSeo.origin).hostname;
  script.dataset.doNotTrack = 'true';
  script.dataset.excludeSearch = 'true';
  script.dataset.excludeHash = 'true';
  document.head.appendChild(script);
}
