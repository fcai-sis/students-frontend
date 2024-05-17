import { H1, P } from "@/components/H";

import Image from "next/image";
import { getI18n } from "@/locales/server";
import LoginForm from "./LoginForm";
import { I18nProviderClient } from "@/locales/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  const t = await getI18n();

  return (
    <div className="flex flex-row items-center justify-center h-96 gap-32">
      <I18nProviderClient locale={locale}>
        <LoginForm />
      </I18nProviderClient>
      <div className="w-0.5 h-full bg-slate-300 rounded-full" />
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-row gap-16">
          <Image src="/fcai.png" alt="FCAI Logo" height={200} width={222} />
          <Image src="/cu.png" alt="Cairo University Logo" height={200} width={155} />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <H1>{t("studentsGateway")}</H1>
          <P className={`text-slate-400 text-center ${locale === "ar" ? "w-64" : "w-96"}`}>
            {t("forFCAICU")}
          </P>
        </div>
      </div>
    </div >
  );
}
