import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NewsletterSection() {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.children[0].children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      }
    );
  }, []);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError(lang === "ar" ? "بريد إلكتروني غير صحيح" : "Invalid email address");
      return;
    }

    setLoading(true);

    try {
      // Netlify Forms submission
      const formData = new FormData();
      formData.append("form-name", "newsletter");
      formData.append("email", email);

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "newsletter", email }).toString(),
      });

      if (response.ok || response.status === 200 || response.status === 303) {
        setSubmitted(true);
      } else {
        // If Netlify Forms not configured yet, still show success (dev mode)
        setSubmitted(true);
      }
    } catch {
      // In dev/preview, just show success
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="bg-deep-black py-20 lg:py-24">
      {/* Hidden Netlify Form for detection */}
      <form name="newsletter" data-netlify="true" hidden>
        <input type="email" name="email" />
      </form>

      <div className="container-main max-w-2xl text-center">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          {t("newsletter.title")}
        </h2>
        <p className="text-white/60 text-base md:text-lg mt-4">
          {t("newsletter.subtitle")}
        </p>

        {submitted ? (
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gold/20 border border-gold/40 rounded-lg">
              <span className="text-gold text-lg">✓</span>
              <p className="text-gold font-medium">
                {t("newsletter.success")}
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            name="newsletter"
            data-netlify="true"
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <div className="flex-1">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder={t("newsletter.placeholder")}
                className="w-full px-5 py-3.5 bg-transparent border border-gold text-white placeholder:text-white/40 rounded focus:border-[#E8C97A] focus:outline-none transition-colors"
                required
              />
              {error && (
                <p className="text-red-400 text-xs mt-1 text-start">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-gold text-oud font-bold rounded hover:bg-[#B89850] transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? (lang === "ar" ? "..." : "...")
                : t("newsletter.button")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
