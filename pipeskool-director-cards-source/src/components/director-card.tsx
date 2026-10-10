import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { toast } from 'sonner';
import { ArrowUpRight, Download, FlipHorizontal2, Globe, Mail, MapPin, MessageCircle, Phone, Share2, ShieldCheck, Smartphone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand } from './brand';
import { type Director, cardLink, downloadBlob, initials, vcard } from '@/lib/directors';

export function DirectorCard({ director: d }: { director: Director }) {
  const [flipped, setFlipped] = useState(false); const [qr, setQr] = useState(''); const [busy, setBusy] = useState(false); const [showQr, setShowQr] = useState(false);
  const front = useRef<HTMLDivElement>(null); const tilt = useRef<HTMLDivElement>(null);
  useEffect(() => { setFlipped(false); QRCode.toDataURL(cardLink(d.slug, window.location.origin), { width: 600, margin: 2, errorCorrectionLevel: 'M' }).then(setQr).catch(() => toast.error('QR code could not be created')); }, [d.slug]);
  async function share() { const url = cardLink(d.slug, window.location.origin); try { if (navigator.share) await navigator.share({ title: `${d.name} — Pipeskool`, url }); else { await navigator.clipboard.writeText(url); toast.success('Card link copied'); } } catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) toast.error('Could not share this card'); } }
  async function downloadCard() { if (!front.current || !qr) return; setBusy(true); try { const { toBlob } = await import('html-to-image'); const blob = await toBlob(front.current, { pixelRatio: 3, skipFonts: true }); if (!blob) throw new Error('Image unavailable'); downloadBlob(blob, `${d.slug}-card.png`); } catch { toast.error('Card download failed. Please try again.'); } finally { setBusy(false); } }
  function downloadQr() { if (!qr) return; const a = document.createElement('a'); a.href = qr; a.download = `${d.slug}-qr.png`; a.click(); }
  return <div className="director-experience">
    <div className="card-meta"><span><span className="status-dot" /> DIRECTOR’S CARD</span><span><ShieldCheck size={13} /> Official company contact</span></div>
    <div className="card-perspective" onPointerMove={e => { if (e.pointerType !== 'mouse' || !tilt.current) return; const r = e.currentTarget.getBoundingClientRect(); tilt.current.style.setProperty('--tilt-x', `${(e.clientY - r.top - r.height / 2) / -85}deg`); tilt.current.style.setProperty('--tilt-y', `${(e.clientX - r.left - r.width / 2) / 100}deg`); }} onPointerLeave={() => { tilt.current?.style.setProperty('--tilt-x', '0deg'); tilt.current?.style.setProperty('--tilt-y', '0deg'); }}>
      <div ref={tilt} className="card-tilt"><div className={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
        <div ref={front} className="business-card card-front" aria-hidden={flipped} inert={flipped}>
          <div className="card-top"><Brand large /><span className="card-edition">PIPESKOOL / PEOPLE</span></div>
          <div className="card-middle"><div className="card-person"><div className="avatar">{d.photo_url ? <img src={d.photo_url} alt={d.name} /> : initials(d.name)}</div><span className="name-rule" /><h2>{d.name}</h2><p>{d.designation}</p></div><div className="qr-block">{qr ? <img src={qr} alt={`QR code for ${d.name}'s card`} /> : <div className="qr-placeholder" />}<span>LET’S CONNECT <ArrowUpRight size={12} /></span></div></div>
          <div className="card-bottom"><span>Engineered piping.<br /><strong>Executed at scale.</strong></span><span>pipeskoolprojects.com <ArrowUpRight size={13} /></span></div>
          <div className="pipe-pattern" aria-hidden="true"><i /><i /><i /></div>
        </div>
        <div className="business-card card-back" aria-hidden={!flipped} inert={!flipped}>
          <div className="back-title"><Brand /><span>CONTACT DETAILS</span></div><h2>{d.name}</h2><p className="back-designation">{d.designation}</p>
          <div className="back-links"><a href={`tel:${d.phone.replace(/\s/g, '')}`}><Phone />{d.phone}<ArrowUpRight /></a><a href={`mailto:${d.email}`}><Mail />{d.email}<ArrowUpRight /></a><a href={d.website} target="_blank" rel="noreferrer"><Globe />{d.website.replace(/^https?:\/\//, '')}<ArrowUpRight /></a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.address)}`} target="_blank" rel="noreferrer"><MapPin /><span>{d.address}</span><ArrowUpRight /></a></div>
        </div>
      </div></div>
    </div>
    <div className="flip-control"><Button variant="ghost" size="sm" onClick={() => setFlipped(!flipped)}><FlipHorizontal2 />{flipped ? 'Show front' : 'Flip for contact details'}</Button><span className="card-side">{flipped ? '02' : '01'} <span>/ 02</span></span></div>
    <div className="primary-actions"><Button size="lg" onClick={() => downloadBlob(new Blob([vcard(d)], { type: 'text/vcard;charset=utf-8' }), `${d.slug}.vcf`)}><Download /> Save contact</Button><Button size="lg" variant="outline" onClick={share}><Share2 /> Share card</Button></div>
    <div className="quick-actions"><a href={`tel:${d.phone.replace(/\s/g, '')}`}><span><Phone /></span>Call</a><a href={`mailto:${d.email}`}><span><Mail /></span>Email</a><a href={`https://wa.me/${d.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="whatsapp-action"><span><MessageCircle /></span>WhatsApp</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.address)}`} target="_blank" rel="noreferrer"><span><MapPin /></span>Directions</a></div>
    <div className="download-actions"><Button variant="ghost" size="sm" onClick={downloadQr} disabled={!qr}><Download /> Download QR</Button><span /><Button variant="ghost" size="sm" onClick={downloadCard} disabled={busy || !qr}><Download /> {busy ? 'Creating image…' : 'Download card'}</Button><Button variant="ghost" size="icon" title="View QR code" aria-label="View QR code" onClick={() => setShowQr(true)}><Smartphone /></Button></div>
    {showQr && <div className="modal-backdrop" onClick={() => setShowQr(false)}><div className="qr-modal" role="dialog" aria-modal="true" aria-label="Director QR code" onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="modal-close" aria-label="Close QR code" onClick={() => setShowQr(false)}><X /></Button><h2>{d.name}</h2><p>{d.designation}</p><img src={qr} alt="Scan to open card" /><Button onClick={downloadQr}><Download /> Download QR</Button></div></div>}
  </div>;
}