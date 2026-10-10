import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronRight, MapPin, ShieldCheck } from 'lucide-react';
import { directorsQuery } from '@/lib/directors.functions';
import { initials, pageMeta } from '@/lib/directors';
import { Button } from '@/components/ui/button';
import { SiteHeader, SiteFooter } from '@/components/brand';
import { DirectorCard } from '@/components/director-card';

export const Route = createFileRoute('/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(directorsQuery),
  head: () => pageMeta('Our Directors — Pipeskool', 'Connect with the directors of Pipeskool. Save contact details, share digital business cards, and get in touch.'),
  component: Index,
});
function Index() {
  const { data } = useSuspenseQuery(directorsQuery); const [selected, setSelected] = useState(''); const director = data.find(d => d.slug === selected) ?? data[0];
  return <><SiteHeader /><main className="page-shell"><div className="breadcrumb">Pipeskool <ChevronRight size={11} /><span>Our people</span></div><div className="page-heading"><div><div className="eyebrow">THE PEOPLE BEHIND THE PROJECTS</div><h1>Strong connections.<br />Stronger foundations.</h1><p className="heading-copy">Meet our directors. A direct connection to the people who make it happen.</p></div><div className="company-location"><MapPin size={13} /> Ahmedabad, India</div></div><div className="directory-layout"><aside className="director-nav"><div className="section-label">OUR DIRECTORS <span>{String(data.length).padStart(2, '0')}</span></div><div className="director-options">{data.map(d => <Button key={d.id} variant="ghost" className={`director-choice ${director?.id === d.id ? 'selected' : ''}`} onClick={() => setSelected(d.slug)} aria-pressed={director?.id === d.id}><span className="small-avatar">{d.photo_url ? <img src={d.photo_url} alt="" /> : initials(d.name)}</span><span className="choice-copy"><strong>{d.name}</strong><small>{d.designation.replace('Director — ', '')}</small></span><ArrowRight className="choice-arrow" /></Button>)}</div><div className="company-note"><h3>Precision in every connection.</h3><p>Engineered piping solutions.<br />From the first plan to the final connection.</p><a href="https://pipeskoolprojects.com" target="_blank" rel="noreferrer">Discover Pipeskool <ArrowUpRight size={12} /></a></div></aside>{director ? <DirectorCard key={director.id} director={director} /> : <p>No director cards yet.</p>}</div><div className="connection-note"><ShieldCheck size={12} /> A personal connection. Always one tap away.</div></main><SiteFooter /></>;
}
