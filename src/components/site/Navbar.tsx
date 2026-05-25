import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { SCHOOL } from "@/lib/school";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/mpd", label: "MPD" },
  { to: "/enquiry", label: "Enquiry" },
  { to: "/marksheet", label: "Marksheet" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all ${scrolled ? "bg-white/85 backdrop-blur-md shadow-md" : "bg-white/95 backdrop-blur-sm shadow-sm"}`}>
      <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Seth Chhoteylal Academy logo" width={52} height={52} className="h-12 w-12 object-contain" />
          <div className="leading-tight">
            <div className="font-display font-bold text-navy text-sm sm:text-base">{SCHOOL.name}</div>
            <div className="text-[10px] sm:text-xs text-slate-500">{SCHOOL.subtitle}</div>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-teal rounded-md transition"
                activeProps={{ className: "px-3 py-2 text-sm font-semibold text-teal rounded-md relative after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-teal after:rounded-full" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/enquiry" className="inline-flex items-center gap-1.5 bg-teal text-white font-semibold rounded-full px-4 py-2 text-sm hover:bg-teal-dark transition shadow-md shadow-teal/20">
            Apply Now <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button aria-label="Menu" onClick={() => setOpen((s) => !s)} className="lg:hidden p-2 text-navy">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t bg-white">
          <ul className="px-4 py-2 space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-slate-800 hover:bg-aqua-soft hover:text-teal"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/enquiry" onClick={() => setOpen(false)} className="block text-center bg-teal text-white font-semibold rounded-full px-4 py-2.5 text-sm hover:bg-teal-dark transition">
                Apply Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
