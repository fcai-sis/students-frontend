import SignOutButton from "@/components/SignOutButton";
import { I18nProviderClient } from "@/locales/client";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import Dropdown from "./Dropdown";

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getI18n();
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white flex justify-center items-center p-4 shadow-md gap-4">
      <Link href="/">{t("home.title")}</Link>
      <Link href="/courses/enrolled">{t("myCourses.title")}</Link>
      <Link href="/announcements">{t("announcements.title")}</Link>
      <Link href="/requests">{t("serviceRequests.title")} </Link>
      <I18nProviderClient locale={locale}>
        <Dropdown label={t("nav.more")}>
          <Link href="/instructors" className="block w-full">
            {t("nav.instructors")}
          </Link>
          <Link href="/ta" className="block w-full">
            {t("nav.teacherAssistants")}
          </Link>
          <Link href="/profile" className="block w-full">
            {t("profile.title")}
          </Link>
        </Dropdown>
        <SignOutButton />
      </I18nProviderClient>
    </nav>
  );
}
