"use client";

import { useChangeLocale, useCurrentLocale } from "../locales/client";

export default function ChangeLanguageButton() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const to = locale === "ar" ? "en" : "ar";
  const position = locale === "ar" ? "left-6 bottom-6" : "right-6 bottom-6";

  return (
    <button
      onClick={() => changeLocale(to)}
      className={`btn fixed ${position}`}
    >
      {locale === "ar" ? "English" : "العربية"}
    </button>
  );
}
