import Locale from "intl-locale-textinfo-polyfill";
import { Rubik } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { SupportedLocale, tt } from "@/lib";

const rubik = Rubik({ subsets: ["latin", "arabic"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: SupportedLocale };
}) {
  return {
    title: tt(locale, {
      en: "FCAI - Students Portal",
      ar: "كلية الحاسبات والذكاء الصناعي - بوابة الطلاب",
    }),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { direction: dir } = new Locale(locale).textInfo;

  return (
    <html
      lang={locale}
      dir={dir}
      className="w-full h-full flex items-center justify-center"
    >
      <body
        className={`${rubik.className} w-full h-full flex justify-center items-center`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
