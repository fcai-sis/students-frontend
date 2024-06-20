import { getI18n } from "@/locales/server";
import Link from "next/link";

export default async function Pagination({
  route,
  currentPage,
  totalPages,
}: Readonly<{ route: string; currentPage: number; totalPages: number }>) {
  const t = await getI18n();

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div>
      {prevPage && (
        <Link href={`${route}?page=${prevPage}`}>
          {t("pagination.previous")}
        </Link>
      )}
      <span>{currentPage}</span>
      {nextPage && (
        <Link href={`${route}?page=${nextPage}`}>{t("pagination.next")}</Link>
      )}
    </div>
  );
}
