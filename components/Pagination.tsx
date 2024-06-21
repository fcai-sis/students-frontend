"use client";

import {
  I18nProviderClient,
  useCurrentLocale,
  useI18n,
} from "@/locales/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function _Pagination({
  totalPages,
}: Readonly<{
  totalPages: number;
}>) {
  const t = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const currentPage = parseInt(searchParams.get("page") ?? "1");

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div>
      {prevPage && (
        <button
          className="btn"
          onClick={() => {
            router.push(
              pathname + "?" + createQueryString("page", prevPage.toString())
            );
          }}
        >
          {t("pagination.previous")}
        </button>
      )}
      <span>{currentPage}</span>
      {nextPage && (
        <button
          className="btn"
          onClick={() => {
            router.push(
              pathname + "?" + createQueryString("page", nextPage.toString())
            );
          }}
        >
          {t("pagination.next")}
        </button>
      )}
    </div>
  );
}

export default function Pagination({
  totalPages,
}: Readonly<{
  totalPages: number;
}>) {
  const locale = useCurrentLocale();
  return (
    <I18nProviderClient locale={locale}>
      <_Pagination totalPages={totalPages} />
    </I18nProviderClient>
  );
}
