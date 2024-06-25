import AnnouncementCard from "@/components/AnnouncementCard";
import { getCurrentLocale, getI18n } from "@/locales/server";
import Pagination from "@/components/Pagination";
import { fakeResponse, localizedLevel } from "@/dummy/utils";
import { getCurrentPage, tt } from "@/lib";
import { SelectFilter } from "@/components/SetQueryFilter";
import { dummyAnnouncements } from "@/dummy/announcements";
import { dummyDepartments } from "@/dummy/departments";

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: { page: string; department: string; level: string };
}>) {
  const locale = getCurrentLocale();
  const t = await getI18n();

  const _filtered = dummyAnnouncements.filter((announcement) => {
    const selectedDepartment = searchParams.department;
    const selectedLevel = searchParams.level;
    const departmentMatch =
      !selectedDepartment ||
      !announcement.departments ||
      announcement.departments.length === 0 ||
      announcement.departments.some(
        (department) => department.code === selectedDepartment
      );

    // Check if the announcement should be matched for the selected level
    const levelMatch =
      !selectedLevel ||
      !announcement.levels ||
      announcement.levels.length === 0 ||
      announcement.levels.some((level) => level === parseInt(selectedLevel));

    // Return true if both department and level match the criteria
    return departmentMatch && levelMatch;
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
      label: tt(locale, {
        en: "All Departments",
        ar: "جميع الأقسام",
      }),
      value: "",
    },
    ...departments.map((department: any) => ({
      label: tt(locale, department.name),
      value: department.code,
    })),
  ];

  const levelOptions = [
    {
      label: tt(locale, {
        en: "All Levels",
        ar: "جميع المستويات",
      }),
      value: "",
    },
    {
      label: tt(locale, localizedLevel(1)),
      value: "1",
    },
    {
      label: tt(locale, localizedLevel(2)),
      value: "2",
    },
    {
      label: tt(locale, localizedLevel(3)),
      value: "3",
    },
    {
      label: tt(locale, localizedLevel(4)),
      value: "4",
    },
  ];

  return (
    <>
      <h1>{t("announcements.title")}</h1>
      <div className="flex gap-4 py-4">
        <div className="flex gap-2 items-center">
          <label htmlFor="department" className="">
            {tt(locale, {
              en: "Filter by department:",
              ar: "حسب القسم:",
            })}
          </label>
          <SelectFilter name="department" options={departmentOptions} />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="level" className="">
            {tt(locale, {
              en: "Filter by level:",
              ar: "حسب المستوى:",
            })}
          </label>
          <SelectFilter name="level" options={levelOptions} />
        </div>
      </div>
      <div>
        {announcements.map((announcement: any, i: number) => (
          <AnnouncementCard key={i} announcement={announcement} />
        ))}
      </div>
      <Pagination totalPages={total / limit} />
    </>
  );
}
