import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/enquiry")({
  component: Enquiry,
  head: () => ({
    meta: [
      { title: "Admission Enquiry — Seth Chhoteylal Academy" },
      { name: "description", content: "Submit an admission enquiry for Seth Chhoteylal Academy — a CBSE senior secondary school in Rath, Hamirpur." },
    ],
    links: [{ rel: "canonical", href: "/enquiry" }],
  }),
});

const inputCls = "w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/60";
const labelCls = "block text-sm font-medium text-navy mb-1.5";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
      <h2 className="font-display text-xl font-semibold text-navy">{title}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Enquiry() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newErrors: Record<string, string> = {};
    const required = ["studentName", "studentClass", "dob", "fatherName", "motherName", "mobile", "email", "address", "city", "state", "pin", "purpose"];
    required.forEach((k) => { if (!String(data.get(k) || "").trim()) newErrors[k] = "Required"; });
    const email = String(data.get("email") || "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email";
    const mobile = String(data.get("mobile") || "");
    if (mobile && !/^\d{10}$/.test(mobile)) newErrors.mobile = "Must be 10 digits";
    const pin = String(data.get("pin") || "");
    if (pin && !/^\d{6}$/.test(pin)) newErrors.pin = "6 digits required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setShowSuccess(true);
      form.reset();
    }
  };

  return (
    <Layout>
      <PageHeader title="Admission Enquiry" subtitle="Tell us a little about your child and we'll get back to you with admission details, fees and next steps." />

      <section className="py-12 bg-soft">
        <form onSubmit={onSubmit} noValidate className="mx-auto max-w-4xl px-4 space-y-6">
          <Section title="Student Details">
            <div>
              <label className={labelCls}>Student Name *</label>
              <input name="studentName" className={inputCls} maxLength={100} />
              {errors.studentName && <p className="text-xs text-destructive mt-1">{errors.studentName}</p>}
            </div>
            <div>
              <label className={labelCls}>Class / Grade *</label>
              <input name="studentClass" placeholder="e.g. Class V" className={inputCls} maxLength={30} />
              {errors.studentClass && <p className="text-xs text-destructive mt-1">{errors.studentClass}</p>}
            </div>
            <div>
              <label className={labelCls}>Date of Birth *</label>
              <input name="dob" type="date" className={inputCls} />
              {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob}</p>}
            </div>
            <div>
              <label className={labelCls}>Previous School</label>
              <input name="previousSchool" className={inputCls} maxLength={120} />
            </div>
          </Section>

          <Section title="Parent Details">
            <div>
              <label className={labelCls}>Father's Name *</label>
              <input name="fatherName" className={inputCls} maxLength={100} />
              {errors.fatherName && <p className="text-xs text-destructive mt-1">{errors.fatherName}</p>}
            </div>
            <div>
              <label className={labelCls}>Mother's Name *</label>
              <input name="motherName" className={inputCls} maxLength={100} />
              {errors.motherName && <p className="text-xs text-destructive mt-1">{errors.motherName}</p>}
            </div>
            <div>
              <label className={labelCls}>Mobile Number *</label>
              <input name="mobile" inputMode="numeric" className={inputCls} maxLength={10} placeholder="10-digit number" />
              {errors.mobile && <p className="text-xs text-destructive mt-1">{errors.mobile}</p>}
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input name="email" type="email" className={inputCls} maxLength={120} />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
          </Section>

          <Section title="Address">
            <div className="sm:col-span-2">
              <label className={labelCls}>Address Line *</label>
              <input name="address" className={inputCls} maxLength={200} />
              {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
            </div>
            <div>
              <label className={labelCls}>City *</label>
              <input name="city" className={inputCls} maxLength={60} />
              {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className={labelCls}>State *</label>
              <input name="state" className={inputCls} maxLength={60} />
              {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
            </div>
            <div>
              <label className={labelCls}>Pin Code *</label>
              <input name="pin" inputMode="numeric" className={inputCls} maxLength={6} />
              {errors.pin && <p className="text-xs text-destructive mt-1">{errors.pin}</p>}
            </div>
          </Section>

          <Section title="Enquiry Details">
            <div>
              <label className={labelCls}>Purpose of Enquiry *</label>
              <select name="purpose" className={inputCls} defaultValue="">
                <option value="" disabled>Select…</option>
                <option>Admission</option>
                <option>Fees</option>
                <option>Transfer</option>
                <option>Other</option>
              </select>
              {errors.purpose && <p className="text-xs text-destructive mt-1">{errors.purpose}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>How did you hear about us?</label>
              <div className="flex flex-wrap gap-4 text-sm">
                {["Website", "Friend", "Social Media", "Hoarding / Flyer", "Other"].map((s) => (
                  <label key={s} className="inline-flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="source" value={s} className="accent-teal" /> {s}
                  </label>
                ))}
              </div>
            </div>
          </Section>

          <div className="text-center">
            <button type="submit" className="inline-flex items-center gap-2 bg-navy text-white font-semibold rounded-md px-8 py-3 hover:bg-teal hover:text-navy transition hover:shadow-lg hover:shadow-teal/30">
              Submit Enquiry
            </button>
          </div>
        </form>
      </section>

      {showSuccess && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowSuccess(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <CheckCircle2 className="h-14 w-14 text-teal mx-auto" />
            <h3 className="mt-4 font-display text-2xl font-bold text-navy">Thank you!</h3>
            <p className="mt-2 text-muted-foreground">Your enquiry has been submitted successfully. Our team will get in touch with you shortly.</p>
            <button onClick={() => setShowSuccess(false)} className="mt-6 inline-flex bg-navy text-white rounded-md px-6 py-2.5 font-medium hover:bg-teal hover:text-navy transition">Close</button>
          </div>
        </div>
      )}
    </Layout>
  );
}
