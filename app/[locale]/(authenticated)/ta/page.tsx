import Pagination from "@/components/Pagination";
import { SelectFilter } from "@/components/SetQueryFilter";
import { dummyDepartments } from "@/dummy/departments";
import { dummyTeacherAssistants } from "@/dummy/teacherAssistants";
import { fakeResponse } from "@/dummy/utils";
import { getCurrentPage } from "@/lib";


export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; department: string } }>) {
  const page = getCurrentPage(searchParams);
  const limit = 5;

  const _filtered = dummyTeacherAssistants.filter((ta: any) => {
    if (!searchParams.department || searchParams.department === "") return true;
    if (
      ta.department.code === searchParams.department
    )
      return true;
    return false;
  }
  );

  const _total = _filtered.length;

  const _paginated = _filtered.slice((page - 1) * limit, page * limit);

  const { data: tasData } = await fakeResponse({
    status: 200,
    data: {
      tas: _paginated,
      total: _total,
    },
  });

  const { tas, total } = tasData;

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
        <h1>teacher Assistants</h1>
        <SelectFilter name="department" options={departmentOptions} />
        <div>
          {tas.map((ta: any) => (
            <div className="border border-black w-80">
            <p>
              <b>Name: </b>
              {ta.name}
            </p>
            <p>
              <b>Email: </b>
              {ta.email}
            </p>
            <p>
              <b>Department: </b>
              {ta.department.name.en}
            </p>
            {ta.officeHours && (
                <p>
                  <b>Office Hours: </b>
                  {ta.officeHours}
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
