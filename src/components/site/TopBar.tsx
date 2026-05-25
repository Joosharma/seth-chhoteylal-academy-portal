import { Phone, Mail, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SCHOOL } from "@/lib/school";

export function TopBar() {
  return (
    <div className="hidden md:block bg-navy text-white text-xs">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <a href={`tel:${SCHOOL.phoneTel}`} className="flex items-center gap-1.5 hover:text-teal transition">
            <Phone className="h-3.5 w-3.5" /> {SCHOOL.phone}
          </a>
          <a href={`mailto:${SCHOOL.emailPrincipal}`} className="flex items-center gap-1.5 hover:text-teal transition">
            <Mail className="h-3.5 w-3.5" /> {SCHOOL.emailPrincipal}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a aria-label="Facebook" href={SCHOOL.social.facebook} target="_blank" rel="noopener" className="hover:text-teal"><Facebook className="h-4 w-4" /></a>
          <a aria-label="Instagram" href={SCHOOL.social.instagram} target="_blank" rel="noopener" className="hover:text-teal"><Instagram className="h-4 w-4" /></a>
          <a aria-label="YouTube" href={SCHOOL.social.youtube} target="_blank" rel="noopener" className="hover:text-teal"><Youtube className="h-4 w-4" /></a>
          <a aria-label="X / Twitter" href={SCHOOL.social.twitter} target="_blank" rel="noopener" className="hover:text-teal font-bold">X</a>
          <a aria-label="WhatsApp" href={SCHOOL.social.whatsapp} target="_blank" rel="noopener" className="hover:text-teal"><MessageCircle className="h-4 w-4" /></a>
          <Link to="/enquiry" className="ml-2 inline-flex items-center rounded-md bg-teal text-navy font-semibold px-3 py-1 hover:bg-white transition">
            Admission Open
          </Link>
        </div>
      </div>
    </div>
  );
}
