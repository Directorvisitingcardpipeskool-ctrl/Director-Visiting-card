import logo from '@/assets/pipeskool-logo.png.asset.json';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Brand({ large = false }: { large?: boolean }) { return <img src={logo.url} alt="Pipeskool" className={large ? 'brand-logo brand-logo-large' : 'brand-logo'} />; }
export function SiteHeader({ admin = false }: { admin?: boolean }) { return <header className="site-header"><Link to="/" aria-label="Pipeskool home"><Brand /></Link><div className="header-right"><span className="header-label">DIGITAL BUSINESS CARDS</span><Button asChild variant="outline" size="sm"><a href="https://pipeskoolprojects.com" target="_blank" rel="noreferrer">Our website <ArrowUpRight /></a></Button></div>{admin && <span className="admin-badge"><LockKeyhole size={13} /> Administration</span>}</header>; }
export function SiteFooter() { return <footer className="site-footer"><span>© {new Date().getFullYear()} Pipeskool. Built on strong connections.</span><Link to="/admin"><LockKeyhole size={12} /> Admin access</Link></footer>; }