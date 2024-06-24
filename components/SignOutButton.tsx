"use client";

import { useI18n } from "@/locales/client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const t = useI18n();
  return (
    <button
      className="text-red-500"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      {t("nav.signOut")}
    </button>
  );
}
