import AnnouncementCard from "@/components/AnnouncementCard";
import { getI18n } from "@/locales/server";
import Pagination from "@/components/Pagination";
import { fakeResponse } from "@/dummy/utils";
import { getCurrentPage } from "@/lib";
import { SelectFilter } from "@/components/SetQueryFilter";
import { dummyAnnouncements } from "@/dummy/announcements";
import { dummyDepartments } from "@/dummy/departments";

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; department: string } }>) {
  const t = await getI18n();

  const _filtered = dummyAnnouncements.filter((announcement) => {
    if (searchParams.department) {
      return announcement.departments?.some(
        (department) => department.code === searchParams.department
      );
    }
    return true;
  });
  const _total = _filtered.length;

  const page = getCurrentPage(searchParams);
  const limit = 2;

  const _paginated = _filtered.slice((page - 1) * limit, page * limit);

  const { data: announcementData } = await fakeResponse({
    status: 200,
    data: {
      announcements: _paginated,
      total: _total,
    },
  });

  const { announcements, total } = announcementData;

  const _departments = dummyDepartments;

  const { data: departmentData } = await fakeResponse({
    status: 200,
    data: {
      departments: _departments,
    },
  });

  const { departments } = departmentData;

  const departmentOptions = [
    {
      label: "All",
      value: "",
    },
    ...departments.map((department: any) => ({
      label: department.name.en,
      value: department.code,
    })),
  ];

  return (
    <>
      <h1>{t("announcements.title")}</h1>
      <SelectFilter name="department" options={departmentOptions} />
      <div>
        {announcements.map((announcement: any, i: number) => (
          <AnnouncementCard key={i} announcement={announcement} />
        ))}
      </div>
      <Pagination totalPages={total / limit} />
    </>
  );
}
