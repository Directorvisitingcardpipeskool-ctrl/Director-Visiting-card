import type { Tables } from '@/integrations/supabase/types';

export type Director = Tables<'directors'>;
export const company = { name: 'Pipeskool', tagline: 'Engineered piping. Executed at scale.' };
export function initials(name: string) { return name.split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join(''); }
export function cardLink(slug: string, origin: string) { return `${origin}/card/${encodeURIComponent(slug)}`; }
export function vcard(d: Director) {
  const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
  return ['BEGIN:VCARD', 'VERSION:3.0', `FN:${escape(d.name)}`, `ORG:${company.name}`, `TITLE:${escape(d.designation)}`, `TEL;TYPE=CELL:${d.phone}`, `TEL;TYPE=WORK:${d.office_phone}`, `EMAIL:${d.email}`, `URL:${d.website}`, `ADR;TYPE=WORK:;;${escape(d.address)};;;;`, 'END:VCARD'].join('\r\n');
}
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function pageMeta(title: string, description: string) { return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }