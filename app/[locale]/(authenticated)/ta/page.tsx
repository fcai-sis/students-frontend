import { departmentsAPI, tasAPI } from "@/api";
import { PageHeader } from "@/components/PageBuilder";
import Pagination from "@/components/Pagination";
import { SelectFilter, TextFilter } from "@/components/SetQueryFilter";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import {
  DepartmentType,
  localizedTitleEnum,
  TitleEnum,
  TitleEnumType,
} from "@fcai-sis/shared-models";
import { revalidatePath } from "next/cache";

export const getTeachingAssistants = async (
  page: number,
  department: DepartmentType,
  search: string,
  title: string
) => {
  const accessToken = await getAccessToken();
  const response = await tasAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
      limit,
      department,
      search,
      title,
    },
  });

  if (response.status !== 200)
    throw new Error("Failed to fetch teaching assistants");

  revalidatePath("/ta");

  return response.data;
};

export const getDepartments = async () => {
  const accessToken = await getAccessToken();
  const response = await departmentsAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response.data);

  if (response.status !== 200) throw new Error("Failed to fetch departments");

  revalidatePath("/department");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: {
    page: string;
    department: string;
    search: string;
    title: string;
  };
}>) {
  const page = getCurrentPage(searchParams);
  const t = await getI18n();
  const locale = getCurrentLocale();
  const departmentSelected =
    searchParams.department as unknown as DepartmentType;

  const response = await getTeachingAssistants(
    page,
    departmentSelected,
    searchParams.search,
    searchParams.title
  );
  const teachingAssistants = response.teachingAssistants;
  const total = response.totalTeachingAssistants;

  const { departments } = await getDepartments();

  const departmentOptions = [
    {
      label: tt(locale, { en: "All Departments", ar: "جميع الأقسام" }),
      value: "",
    },
    ...departments.map((department: any) => ({
      label: tt(locale, department.name),
      value: department.code,
    })),
  ];
  const titleOptions = [
    {
      label: tt(locale, { en: "All Titles", ar: "الكل" }),
      value: "",
    },
    ...TitleEnum.map((title: any) => ({
      label: tt(locale, localizedTitleEnum[title as TitleEnumType]),
      value: title,
    })),
  ];

  return (
    <>
      <div>
        <PageHeader
          title={tt(locale, { en: "Assistants", ar: "المعيدين" })}
          actions={[]}
        />
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex gap-4">
            <label className="flex flex-col">
              {tt(locale, { en: "Department", ar: "القسم" })}
              <SelectFilter name={"department"} options={departmentOptions} />
            </label>
            <label className="flex flex-col">
              {tt(locale, { en: "Title", ar: "العنوان" })}
              <SelectFilter name={"title"} options={titleOptions} />
            </label>
            <label className="flex flex-col">
              {tt(locale, { en: "Search", ar: "البحث" })}
              <TextFilter name={"search"} />
            </label>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {teachingAssistants.map((ta: any, i: number) => (
            <div
              className="border border-gray-300 p-4 rounded-lg shadow-md"
              key={i}
            >
              <p className="text-gray-700 mb-2">
                <b>{tt(locale, { en: "Name", ar: "الاسم" })}: </b>
                {ta.fullName}
              </p>
              <p className="text-gray-700 mb-2">
                <b>{tt(locale, { en: "Title", ar: "العنوان" })}: </b>
                {tt(locale, localizedTitleEnum[ta.title as TitleEnumType])}
              </p>
              <p className="text-gray-700 mb-2">
                <b>{tt(locale, { en: "Email", ar: "البريد الإلكتروني" })}: </b>
                {ta.email}
              </p>
              <p className="text-gray-700 mb-2">
                <b>{tt(locale, { en: "Department", ar: "القسم" })}: </b>
                {tt(locale, ta.department.name)}
              </p>
              {ta.officeHours && (
                <p className="text-gray-700 mb-2">
                  <b>
                    {tt(locale, { en: "Office Hours", ar: "ساعات الدوام" })}:{" "}
                  </b>
                  {ta.officeHours}
                </p>
              )}
              {ta.office && (
                <p className="text-gray-700 mb-2">
                  <b>{tt(locale, { en: "Office", ar: "المكتب" })}: </b>
                  {ta.office}
                </p>
              )}
            </div>
          ))}
          <Pagination totalPages={total / limit} />
        </div>
      </div>
    </>
  );
}
