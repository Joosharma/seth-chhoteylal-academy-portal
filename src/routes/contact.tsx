import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { SCHOOL } from "@/lib/school";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Seth Chhoteylal Academy" },
      { name: "description", content: "Get in touch with Seth Chhoteylal Academy in Rath, Hamirpur — address, phone, email and contact form." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const inputCls = "w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/60";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    ["name", "email", "phone", "subject", "message"].forEach((k) => {
      if (!String(data.get(k) || "").trim()) next[k] = "Required";
    });
    const email = String(data.get("email") || "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Invalid email";
    const phone = String(data.get("phone") || "");
    if (phone && !/^\d{10}$/.test(phone)) next.phone = "Must be 10 digits";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSuccess(true);
      form.reset();
      setTimeout(() => setSuccess(false), 4000);
    }
  };

  return (
    <Layout>
      <PageHeader title="Contact Us" subtitle="We're happy to hear from parents, students and visitors. Reach out any time." />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <div className="bg-soft rounded-2xl p-6 border border-border">
              <h2 className="font-display text-xl font-bold text-navy">School Information</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3"><MapPin className="h-5 w-5 text-teal shrink-0 mt-0.5" /><span>{SCHOOL.address}</span></li>
                <li className="flex gap-3"><Phone className="h-5 w-5 text-teal shrink-0 mt-0.5" /><a href={`tel:${SCHOOL.phoneTel}`} className="hover:text-teal">{SCHOOL.phone}</a></li>
                <li className="flex gap-3"><Mail className="h-5 w-5 text-teal shrink-0 mt-0.5" /><div>
                  <div><a href={`mailto:${SCHOOL.emailPrincipal}`} className="hover:text-teal">{SCHOOL.emailPrincipal}</a></div>
                  <div><a href={`mailto:${SCHOOL.emailAdmin}`} className="hover:text-teal">{SCHOOL.emailAdmin}</a></div>
                </div></li>
                <li className="flex gap-3"><Clock className="h-5 w-5 text-teal shrink-0 mt-0.5" /><span>{SCHOOL.hours}</span></li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border aspect-[4/3] bg-soft">
              <iframe
                title="Seth Chhoteylal Academy on Google Maps"
                src="https://www.google.com/maps?q=Rath%2C+Hamirpur%2C+Uttar+Pradesh+210431&output=embed"
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="bg-white rounded-2xl border border-border p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-navy">Send us a Message</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-navy">Name *</label>
                <input name="name" className={`mt-1.5 ${inputCls}`} maxLength={100} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-navy">Email *</label>
                <input name="email" type="email" className={`mt-1.5 ${inputCls}`} maxLength={120} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-navy">Phone *</label>
                <input name="phone" inputMode="numeric" className={`mt-1.5 ${inputCls}`} maxLength={10} />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-navy">Subject *</label>
                <input name="subject" className={`mt-1.5 ${inputCls}`} maxLength={120} />
                {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-navy">Message *</label>
                <textarea name="message" rows={5} className={`mt-1.5 ${inputCls}`} maxLength={1000} />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
            </div>
            <button type="submit" className="mt-6 inline-flex bg-navy text-white font-semibold rounded-md px-6 py-3 hover:bg-teal hover:text-navy transition">
              Send Message
            </button>
            {success && <p className="mt-4 text-sm text-teal font-medium">Thank you! Your message has been sent.</p>}
          </form>
        </div>
      </section>
    </Layout>
  );
}
