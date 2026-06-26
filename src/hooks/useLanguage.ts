import { useLanguageStore } from "@/stores/useLanguageStore";
import { translations } from "@/data/translations";

export function useLanguage() {
  const { lang, toggle, isRTL } = useLanguageStore();

  const t = (path: string): string => {
    const keys = path.split(".");
    let value: unknown = translations[lang];
    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        value = (value as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }
    return typeof value === "string" ? value : path;
  };

  return { lang, toggle, isRTL: isRTL(), t, dir: isRTL() ? "rtl" : ("ltr" as "rtl" | "ltr") };
}
