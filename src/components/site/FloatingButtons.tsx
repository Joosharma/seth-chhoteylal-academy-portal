import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { SCHOOL } from "@/lib/school";

export function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const half = (document.documentElement.scrollHeight - window.innerHeight) / 2;
      setShow(window.scrollY > half);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={SCHOOL.social.whatsapp}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="fixed z-50 bottom-5 right-5 inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg px-4 py-3 hover:scale-105 transition"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline font-medium text-sm">WhatsApp</span>
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed z-50 bottom-20 right-5 sm:bottom-5 sm:right-40 bg-navy text-white rounded-full shadow-lg p-3 hover:bg-teal hover:text-navy transition"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
