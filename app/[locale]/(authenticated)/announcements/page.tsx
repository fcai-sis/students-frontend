import { announcementsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import AnnouncementCard from "@/components/AnnouncementCard";
import { getI18n } from "@/locales/server";
import { getCurrentPage } from "@/lib";

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string } }>) {
  const t = await getI18n();

  const page = getCurrentPage(searchParams);
  const pageSize = 5;

  const { data } = await announcementsAPI.get("/", {
    params: {
      page,
      pageSize,
    },
  });
  const { announcements, totalAnnouncements } = data;

  return (
    <>
      <h1>{t("announcements.title")}</h1>
      <div>
        {announcements.map((announcement: any, i: number) => (
          <AnnouncementCard key={i} announcement={announcement} />
        ))}
      </div>
      <Pagination
        route="/announcements"
        currentPage={page}
        totalPages={totalAnnouncements / pageSize}
      />
    </>
  );
}
