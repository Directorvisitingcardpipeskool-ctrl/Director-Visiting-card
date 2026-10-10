import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { directorsQuery } from '@/lib/directors.functions';
import { pageMeta } from '@/lib/directors';
import { DirectorCard } from '@/components/director-card';
import { SiteHeader, SiteFooter } from '@/components/brand';

export const Route = createFileRoute('/card/$slug')({
  loader: async ({ context, params }) => { const directors = await context.queryClient.ensureQueryData(directorsQuery); const director = directors.find(d => d.slug === params.slug); if (!director) throw notFound(); return director; },
  head: ({ loaderData }) => pageMeta(loaderData ? `${loaderData.name} — Pipeskool` : 'Card unavailable — Pipeskool', loaderData ? `${loaderData.designation}. Connect with ${loaderData.name}, save contact details and share their Pipeskool digital card.` : 'This director card is unavailable.'),
  component: CardPage,
});
function CardPage() {
  const { slug } = Route.useParams(); const { data } = useSuspenseQuery(directorsQuery); const d = data.find(d => d.slug === slug); if (!d) return null;
  return <><SiteHeader /><main className="page-shell"><div className="breadcrumb"><Link to="/">Our directors</Link><ChevronRight size={12} /><span>{d.name}</span></div><div className="mx-auto max-w-[670px] mt-8"><DirectorCard director={d} /></div><div className="connection-note mx-auto"><ShieldCheck size={12} /> A personal connection. Always one tap away.</div></main><SiteFooter /></>;
}