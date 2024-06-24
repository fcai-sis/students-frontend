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
      <div className="py-24 px-8">{children}</div>
    </>
  );
}
