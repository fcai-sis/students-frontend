"use client";

import { H6 } from "@/components/H";
import TextInputField from "@/components/TextInputField";
import { useI18n } from "@/locales/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const t = useI18n();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const signInReponse = await signIn('credentials', {
      studentId: formData.get('studentId'),
      password: formData.get("password"),
      redirect: false
    });

    if (!signInReponse?.error) {
      router.push("/");
      router.refresh();
    } else {
      // TODO: Show error message
    }
  }

  return (
    <form className="flex flex-col gap-8 items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <H6>{t("studentId")}</H6>
          <TextInputField placeholder={t("studentIdHint")} name="studentId" />
        </div>
        <div className="flex flex-col gap-4">
          <H6>{t("password")}</H6>
          <TextInputField obscure placeholder={t("passwordHint")} name="password" />
        </div>
      </div>
      <button type="submit">
        {t("login")}
      </button>
    </form>
  );
}
