import Locale from "intl-locale-textinfo-polyfill";
import { Rubik } from "next/font/google";
import "../globals.css";
import { Metadata } from "next";
import ChangeLanguageButton from "@/components/ChangeLanguageButton";

const rubik = Rubik({ subsets: ["latin", "arabic"] });

export const metadata: Metadata = {
  title: "lol",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { direction: dir } = new Locale(locale).textInfo;

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${rubik.className} h-screen flex items-center justify-center`}
      >
        {children}
        <ChangeLanguageButton />
      </body>
    </html>
  );
}
