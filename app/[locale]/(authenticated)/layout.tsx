import Navbar from "@/components/Navbar";
import { ensureAuthenticated, SupportedLocale } from "@/lib";

export default async function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: SupportedLocale };
}>) {
  await ensureAuthenticated();
  return (
    <>
      <Navbar locale={locale} />
      <div className="py-28 px-16 w-full h-full">{children}</div>
    </>
  );
}
