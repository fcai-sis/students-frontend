import Navbar from "@/components/Navbar";
import { ensureAuthenticated } from "@/lib";

export default async function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  await ensureAuthenticated();
  return (
    <>
      <Navbar locale={locale} />
      {children}
    </>
  );
}
