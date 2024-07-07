// const url = "https://ckes.cu.edu.eg/facultypayment.aspx";

import { I18nProviderClient } from "@/locales/client";
import CreateServiceRequestForm from "../CreateServiceRequestForm";
import { getI18n } from "@/locales/server";
import { Link } from "iconoir-react";
import { tt } from "@/lib";

export default async function Page({
  params: { locale },
}: Readonly<{
  params: { locale: "en" | "ar" };
}>) {
  const t = await getI18n();
  return (
    <>
      <h1>{t("serviceRequests.createServiceRequest")}</h1>
      <p className="my-4">
        <span>
          {tt(locale, {
            en: "To create a service request, go to the ",
            ar: "لإنشاء طلب خدمة، اذهب إلى ",
          })}
        </span>
        <a
          href="https://ckes.cu.edu.eg/fci.aspx"
          target="_blank"
          className="text-blue-500 underline"
        >
          {tt(locale, {
            ar: "مركز الخدمات الإلكترونية والمعرفية",
            en: "Center of Knowledge & Electronic Services",
          })}
        </a>
        <span>
          {tt(locale, {
            en: ", choose Student Affairs, and then fill out the form for the service you need.",
            ar: "، اختر شؤون الطلاب، واملأ النموذج للخدمة التي تحتاجها.",
          })}
        </span>
      </p>
      <I18nProviderClient locale={locale}>
        <CreateServiceRequestForm />
      </I18nProviderClient>
    </>
  );
}
