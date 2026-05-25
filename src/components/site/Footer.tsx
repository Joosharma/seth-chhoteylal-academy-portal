import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { SCHOOL } from "@/lib/school";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white/90 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Seth Chhoteylal Academy" width={52} height={52} className="h-12 w-12 object-contain bg-white rounded-lg p-1" />
            <div className="font-display font-bold text-white text-sm">{SCHOOL.name}</div>
          </div>
          <p className="mt-4 text-sm text-white/65 max-w-xs leading-relaxed">
            Excellence in Education. Empowering future leaders through knowledge, discipline and holistic growth.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="text-white/70 hover:text-teal transition">Home</Link></li>
            <li><Link to="/about" className="text-white/70 hover:text-teal transition">About</Link></li>
            <li><Link to="/mpd" className="text-white/70 hover:text-teal transition">Principal's Desk</Link></li>
            <li><Link to="/enquiry" className="text-white/70 hover:text-teal transition">Admission Enquiry</Link></li>
            <li><Link to="/marksheet" className="text-white/70 hover:text-teal transition">Marksheet</Link></li>
            <li><Link to="/contact" className="text-white/70 hover:text-teal transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Connect</h3>
          <div className="flex items-center gap-3">
            <a aria-label="Facebook" href={SCHOOL.social.facebook} target="_blank" rel="noopener" className="h-9 w-9 rounded-full bg-white/10 hover:bg-teal flex items-center justify-center transition"><Facebook className="h-4 w-4" /></a>
            <a aria-label="Instagram" href={SCHOOL.social.instagram} target="_blank" rel="noopener" className="h-9 w-9 rounded-full bg-white/10 hover:bg-teal flex items-center justify-center transition"><Instagram className="h-4 w-4" /></a>
            <a aria-label="YouTube" href={SCHOOL.social.youtube} target="_blank" rel="noopener" className="h-9 w-9 rounded-full bg-white/10 hover:bg-teal flex items-center justify-center transition"><Youtube className="h-4 w-4" /></a>
            <a aria-label="WhatsApp" href={SCHOOL.social.whatsapp} target="_blank" rel="noopener" className="h-9 w-9 rounded-full bg-white/10 hover:bg-teal flex items-center justify-center transition"><MessageCircle className="h-4 w-4" /></a>
          </div>
          <p className="mt-5 text-xs text-white/55">{SCHOOL.hours}</p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-2.5"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-teal" /> <span className="leading-relaxed">{SCHOOL.address}</span></li>
            <li className="flex gap-2.5"><Phone className="h-4 w-4 mt-0.5 text-teal" /> <a href={`tel:${SCHOOL.phoneTel}`} className="hover:text-teal">{SCHOOL.phone}</a></li>
            <li className="flex gap-2.5"><Mail className="h-4 w-4 mt-0.5 text-teal" /> <a href={`mailto:${SCHOOL.emailAdmin}`} className="hover:text-teal break-all">{SCHOOL.emailAdmin}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-white/55">
          © {new Date().getFullYear()} {SCHOOL.name} — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
