// const url = "https://ckes.cu.edu.eg/facultypayment.aspx";

import { I18nProviderClient } from "@/locales/client";
import CreateServiceRequestForm from "../CreateServiceRequestForm";

export default async function Page({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  return (
    <>
      <h1>Create Service Request</h1>
      <I18nProviderClient locale={locale}>
        <CreateServiceRequestForm />
      </I18nProviderClient>
    </>
  );
}
