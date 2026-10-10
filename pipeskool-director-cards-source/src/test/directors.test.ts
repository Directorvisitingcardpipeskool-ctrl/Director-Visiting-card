import { describe, expect, it } from 'vitest';
import { cardLink, vcard, type Director } from '@/lib/directors';
const d: Director = { id: 'example', slug: 'keyal-shah', name: 'Keyal Shah', designation: 'Director — Commercial & Finance', phone: '+91 98981 59970', office_phone: '+91 82007 35058', email: 'projects@pipeskoolprojects.com', website: 'https://pipeskoolprojects.com', address: '102, Darshak, Punjabi Hall Lane, Navrangpura, Ahmedabad 380009', photo_url: '', sort_order: 0 };
describe('Director contacts', () => {
  it('creates a unique director URL', () => { expect(cardLink('keyal-shah', 'https://example.com')).toBe('https://example.com/card/keyal-shah'); expect(cardLink('ketul-shah', 'https://example.com')).not.toBe(cardLink('keyal-shah', 'https://example.com')); });
  it('exports the supplied director phone and email as a vCard', () => { expect(vcard(d)).toContain('TEL;TYPE=CELL:+91 98981 59970'); expect(vcard(d)).toContain('EMAIL:projects@pipeskoolprojects.com'); expect(vcard(d)).toContain('VERSION:3.0'); });
  it('escapes address separators in vCard', () => { expect(vcard(d)).toContain('102\\, Darshak\\, Punjabi Hall Lane'); });
});