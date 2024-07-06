import { departmentsAPI, instructorsAPI } from "@/api";
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

export const getInstructors = async (
  page: number,
  department: DepartmentType,
  search: string,
  title: string
) => {
  const accessToken = await getAccessToken();
  const response = await instructorsAPI.get(`/`, {
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
  console.log(response.data);

  if (response.status !== 200) throw new Error("Failed to fetch instructors");

  revalidatePath("/instructors");

  return response.data;
};

export const getDepartments = async () => {
  const accessToken = await getAccessToken();
  const response = await departmentsAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

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

  const response = await getInstructors(
    page,
    departmentSelected,
    searchParams.search,
    searchParams.title
  );
  const instructors = response.instructors;
  const total = response.totalInstructors;

  const departmentResponse = await getDepartments();
  const departments = departmentResponse.departments;

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
          title={tt(locale, {
            en: "Instructors",
            ar: "الدكاترة",
          })}
          actions={[]}
        />
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex gap-4">
            <SelectFilter name={"department"} options={departmentOptions} />
            <SelectFilter name={"title"} options={titleOptions} />
            <TextFilter name={"search"} />
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {instructors.map((instructor: any, i: number) => (
            <div
              className="border border-gray-300 p-4 rounded-lg shadow-md"
              key={i}
            >
              <p className="text-gray-700 mb-2">
                <b>
                  {tt(locale, {
                    en: "Full Name",
                    ar: "الاسم بالكامل",
                  })}
                </b>
                {": "}
                {instructor.fullName}
              </p>
              <p className="text-gray-700 mb-2">
                <b>
                  {tt(locale, {
                    en: "Title",
                    ar: "اللقب",
                  })}
                </b>
                {": "}
                {tt(
                  locale,
                  localizedTitleEnum[instructor.title as TitleEnumType]
                )}
              </p>
              <p className="text-gray-700 mb-2">
                <b>
                  {tt(locale, {
                    en: "Email",
                    ar: "البريد الإلكتروني",
                  })}
                  {": "}
                </b>
                {instructor.email}
              </p>
              <p className="text-gray-700 mb-2">
                <b>
                  {tt(locale, {
                    en: "Department",
                    ar: "القسم",
                  })}
                </b>
                {": "}
                {tt(locale, instructor.department.name)}
              </p>
              {instructor.officeHours && (
                <p className="text-gray-700 mb-2">
                  <b>
                    {tt(locale, {
                      en: "Office Hours",
                      ar: "ساعات العمل",
                    })}
                    {": "}
                  </b>
                  {instructor.officeHours}
                </p>
              )}
              {instructor.office && (
                <p className="text-gray-700 mb-2">
                  <b>
                    {tt(locale, {
                      en: "Office",
                      ar: "المكتب",
                    })}
                    {": "}
                  </b>
                  {instructor.office}
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
