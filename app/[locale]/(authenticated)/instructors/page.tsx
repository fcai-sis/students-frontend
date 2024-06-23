import Pagination from "@/components/Pagination";
import { SelectFilter } from "@/components/SetQueryFilter";
import { dummyDepartments } from "@/dummy/departments";
import { dummyInstructors } from "@/dummy/instructors";
import { fakeResponse } from "@/dummy/utils";
import { getCurrentPage } from "@/lib";


export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; department: string } }>) {
  const page = getCurrentPage(searchParams);
  const limit = 5;

  const _filtered = dummyInstructors.filter((instructor: any) => {
    if (!searchParams.department || searchParams.department === "") return true;
    if (
      instructor.department.code === searchParams.department
    )
      return true;
    return false;
  }
  );

  const _total = _filtered.length;

  const _paginated = _filtered.slice((page - 1) * limit, page * limit);

  const { data: instructorsData } = await fakeResponse({
    status: 200,
    data: {
      instructors: _paginated,
      total: _total,
    },
  });

  const { instructors, total } = instructorsData;

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
      <div>
        <h1>Instructors</h1>
        <SelectFilter name="department" options={departmentOptions} />
        <div>
          {instructors.map((instructor: any) => (
            <div className="border border-black w-80">
            <p>
              <b>Name: </b>
              {instructor.name}
            </p>
            <p>
              <b>Email: </b>
              {instructor.email}
            </p>
            <p>
              <b>Department: </b>
              {instructor.department.name.en}
            </p>
            {instructor.officeHours && (
                <p>
                  <b>Office Hours: </b>
                  {instructor.officeHours}
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
