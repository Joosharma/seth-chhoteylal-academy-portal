import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { SCHOOL } from "@/lib/school";

export function Footer() {
  return (
    <footer className="bg-navy text-white/90 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Seth Chhoteylal Academy" width={48} height={48} className="h-12 w-12 object-contain bg-white rounded p-1" />
            <div className="font-display font-bold text-white">{SCHOOL.name}</div>
          </div>
          <p className="mt-4 text-sm text-white/70 max-w-xs">
            Excellence in Education. Empowering future leaders through knowledge, discipline and success.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-teal">Home</Link></li>
            <li><Link to="/about" className="hover:text-teal">About</Link></li>
            <li><Link to="/mpd" className="hover:text-teal">Principal's Desk</Link></li>
            <li><Link to="/enquiry" className="hover:text-teal">Admission Enquiry</Link></li>
            <li><Link to="/marksheet" className="hover:text-teal">Marksheet Download</Link></li>
            <li><Link to="/contact" className="hover:text-teal">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-teal" /> {SCHOOL.address}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-teal" /> <a href={`tel:${SCHOOL.phoneTel}`} className="hover:text-teal">{SCHOOL.phone}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-teal" /> <a href={`mailto:${SCHOOL.emailAdmin}`} className="hover:text-teal">{SCHOOL.emailAdmin}</a></li>
          </ul>
          <div className="mt-4 flex items-center gap-3">
            <a aria-label="Facebook" href={SCHOOL.social.facebook} target="_blank" rel="noopener" className="hover:text-teal"><Facebook className="h-5 w-5" /></a>
            <a aria-label="Instagram" href={SCHOOL.social.instagram} target="_blank" rel="noopener" className="hover:text-teal"><Instagram className="h-5 w-5" /></a>
            <a aria-label="YouTube" href={SCHOOL.social.youtube} target="_blank" rel="noopener" className="hover:text-teal"><Youtube className="h-5 w-5" /></a>
            <a aria-label="WhatsApp" href={SCHOOL.social.whatsapp} target="_blank" rel="noopener" className="hover:text-teal"><MessageCircle className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {SCHOOL.name} — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
