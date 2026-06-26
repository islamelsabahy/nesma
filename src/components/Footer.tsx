import { useState } from "react";
import { Link } from "react-router-dom";
import { Wind, Phone, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useUIStore } from "@/stores/useUIStore";

// WhatsApp SVG icon — official brand icon
function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer() {
  const { t, isRTL } = useLanguage();
  const { activateEasterEgg } = useUIStore();
  const [breezeMsg, setBreezeMsg] = useState(false);

  const handleBreeze = () => {
    activateEasterEgg();
    setBreezeMsg(true);
    setTimeout(() => setBreezeMsg(false), 3000);
    setTimeout(() => useUIStore.getState().deactivateEasterEgg(), 3500);
  };

  const policyLinks = [
    { label: t("footer.shipping"), href: "#footer" },
    { label: t("footer.returns"), href: "#footer" },
    { label: t("footer.faq"), href: "#footer" },
    { label: t("footer.terms"), href: "#footer" },
    { label: t("footer.privacy"), href: "#footer" },
  ];

  return (
    <footer id="footer" className="bg-deep-black border-t border-gold/20">
      <div className="container-main py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="font-display text-2xl font-bold text-gold tracking-wider">
                NESMA
              </span>
              <span className="text-xs text-white/50 uppercase tracking-[3px] -mt-1">
                Perfumes
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-[280px]">
              {isRTL()
                ? "عطور عربية فاخرة تترك أثراً لا يُنسى. اشعر بنسمة الأناقة."
                : "Luxury Arabian fragrances crafted to leave a lasting impression. Feel the breeze of elegance."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs text-white uppercase tracking-[1px] font-medium mb-5">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: t("nav.home") },
                { to: "/shop", label: t("nav.perfumes") },
                { to: "/#giftsets", label: t("nav.giftSets") },
                { to: "/#footer", label: t("nav.contact") },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service — now real links with tooltip */}
          <div>
            <h4 className="text-xs text-white uppercase tracking-[1px] font-medium mb-5">
              {t("footer.customerService")}
            </h4>
            <ul className="space-y-3">
              {policyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    title={isRTL() ? "قريباً" : "Coming soon"}
                    className="text-sm text-white/40 hover:text-white/60 transition-colors cursor-not-allowed flex items-center gap-1.5 group"
                    onClick={(e) => e.preventDefault()}
                    aria-label={`${item.label} — ${isRTL() ? "قريباً" : "Coming soon"}`}
                  >
                    {item.label}
                    <span className="text-[10px] text-gold/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isRTL() ? "(قريباً)" : "(soon)"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — fixed email */}
          <div>
            <h4 className="text-xs text-white uppercase tracking-[1px] font-medium mb-5">
              {t("footer.contactUs")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone size={14} className="text-gold flex-shrink-0" />
                +20 127 292 0643
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <a
                  href="mailto:info@nesmaperfumes.com"
                  className="hover:text-gold transition-colors text-xs break-all"
                >
                  info@nesmaperfumes.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201272920643"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-green-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon size={14} />
                  <span className="text-gold">WhatsApp:</span> +20 127 292 0643
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 border border-gold/30 text-gold/70 rounded-full">
                {t("footer.payment")}
              </span>
              <span className="text-xs px-3 py-1 border border-gold/30 text-gold/70 rounded-full">
                {t("footer.instapay")}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">{t("footer.copyright")}</p>

          {/* Easter Egg Breeze Icon */}
          <div className="relative">
            <button
              onClick={handleBreeze}
              className="p-2 text-gold/50 hover:text-gold transition-all duration-300 hover:scale-110"
              aria-label="Breeze"
            >
              <Wind size={24} />
            </button>
            {breezeMsg && (
              <div
                className={`absolute bottom-full mb-2 ${
                  isRTL() ? "left-1/2" : "right-1/2"
                } translate-x-1/2 whitespace-nowrap bg-ivory px-4 py-2 rounded-lg shadow-lg border border-gold/30`}
              >
                <p className="text-sm text-gold font-medium">
                  {t("footer.breeze")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
