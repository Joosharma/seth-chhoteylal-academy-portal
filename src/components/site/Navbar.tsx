import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { SCHOOL } from "@/lib/school";

type NavLink = { to: string; label: string; hasDropdown?: boolean };
const links: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/#campus", label: "Campus" },
  { to: "/mpd", label: "MPD", hasDropdown: true },
  { to: "/enquiry", label: "Enquiry" },
  { to: "/contact", label: "Contact" },
];

const mpdItems = [
  { to: "/mpd", label: "Fee Structure" },
  { to: "/mpd", label: "Academic Calendar" },
  { to: "/mpd", label: "Fire Safety" },
  { to: "/mpd", label: "Building Safety" },
  { to: "/mpd", label: "Trust Deed" },
  { to: "/mpd", label: "SMC" },
  { to: "/tc-download", label: "TC Download" },
  { to: "/mpd", label: "Water Analysis" },
  { to: "/mpd", label: "Certificates" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mpdOpen, setMpdOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all ${scrolled ? "bg-white/85 backdrop-blur-md shadow-md" : "bg-white/95 backdrop-blur-sm shadow-sm"}`}>
      <nav className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <img src={logo} alt="Seth Chhoteylal Academy logo" width={40} height={40} className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <div className="font-display font-bold text-navy text-[13px] sm:text-sm">{SCHOOL.name}</div>
            <div className="text-[10px] text-slate-500 hidden sm:block">{SCHOOL.subtitle}</div>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center whitespace-nowrap">
          {links.map((l) => (
            <li
              key={l.label}
              className="relative"
              onMouseEnter={() => l.hasDropdown && setMpdOpen(true)}
              onMouseLeave={() => l.hasDropdown && setMpdOpen(false)}
            >
              {l.hasDropdown ? (
                <button
                  className="inline-flex items-center gap-1 px-3 py-2 text-[13px] font-medium text-slate-700 hover:text-teal rounded-md transition"
                >
                  {l.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mpdOpen ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  to={l.to}
                  className="px-3 py-2 text-[13px] font-medium text-slate-700 hover:text-teal rounded-md transition"
                  activeProps={{ className: "px-3 py-2 text-[13px] font-semibold text-teal rounded-md" }}
                >
                  {l.label}
                </Link>
              )}

              {l.hasDropdown && mpdOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 z-50">
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200/70 rounded-xl shadow-xl shadow-slate-900/10 p-2">
                    {mpdItems.map((m) => (
                      <Link
                        key={m.label}
                        to={m.to}
                        className="block px-3 py-2 text-[13px] text-slate-700 rounded-lg hover:bg-aqua-soft hover:text-teal transition"
                      >
                        {m.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center shrink-0">
          <Link to="/enquiry" className="inline-flex items-center gap-1.5 bg-teal text-white font-semibold rounded-full px-4 py-2 text-[13px] hover:bg-teal-dark transition shadow-md shadow-teal/20">
            Enquiry Now <ArrowRight className="h-3.5 w-3.5" />
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
              <li key={l.label}>
                {l.hasDropdown ? (
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer px-3 py-2.5 rounded-md text-sm font-medium text-slate-800 hover:bg-aqua-soft hover:text-teal">
                      {l.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="pl-3 mt-1 space-y-0.5">
                      {mpdItems.map((m) => (
                        <Link key={m.label} to={m.to} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-[13px] text-slate-700 hover:bg-aqua-soft hover:text-teal">
                          {m.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-md text-sm font-medium text-slate-800 hover:bg-aqua-soft hover:text-teal"
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="grid grid-cols-2 gap-2 pt-2">
              <Link to="/teacher-login" onClick={() => setOpen(false)} className="text-center border border-slate-200 rounded-full px-3 py-2 text-[13px] font-medium text-slate-700 hover:text-teal">Teacher Login</Link>
              <Link to="/student-login" onClick={() => setOpen(false)} className="text-center border border-slate-200 rounded-full px-3 py-2 text-[13px] font-medium text-slate-700 hover:text-teal">Student Login</Link>
            </li>
            <li className="pt-2">
              <Link to="/enquiry" onClick={() => setOpen(false)} className="block text-center bg-teal text-white font-semibold rounded-full px-4 py-2.5 text-sm hover:bg-teal-dark transition">
                Enquiry Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
