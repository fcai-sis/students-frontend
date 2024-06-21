import Pagination from "@/components/Pagination";
import { SelectFilter } from "@/components/SetQueryFilter";
import { dummyCourses } from "@/dummy/courses";
import { dummyDepartments } from "@/dummy/departments";
import { fakeResponse } from "@/dummy/utils";
import { getCurrentPage } from "@/lib";
import Link from "next/link";

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; department: string } }>) {
  const page = getCurrentPage(searchParams);
  const limit = 5;

  const _filtered = dummyCourses.filter((course: any) => {
    if (!searchParams.department || searchParams.department === "") return true;
    if (
      course.departments
        ?.map((d: any) => d.code)
        .includes(searchParams.department)
    )
      return true;
    return false;
  });
  const _total = _filtered.length;

  const _paginated = _filtered.slice((page - 1) * limit, page * limit);

  const { data: coursesData } = await fakeResponse({
    status: 200,
    data: {
      courses: _paginated,
      total: _total,
    },
  });

  const { courses, total } = coursesData;

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
      <h1>Courses</h1>
      <SelectFilter name="department" options={departmentOptions} />
      <div>
        {courses.map((course: any) => (
          <div className="border border-black w-80">
            <p>
              <b>Code: </b>
              {course.code}
            </p>
            <p>
              <b>Name: </b>
              {course.name.en}
            </p>
            <p>
              <b>Departments: </b>
              {course.departments?.map((department: any) => (
                <span key={department.code}>{department.name.en}, </span>
              ))}
            </p>
            <Link href={`/courses/${course.code}`}>View details</Link>
          </div>
        ))}
        <Pagination totalPages={total / limit} />
      </div>
    </>
  );
}
