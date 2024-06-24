import { dummyDepartments } from "@/dummy/departments";
import { fakeResponse } from "@/dummy/utils";
import { I18nProviderClient } from "@/locales/client";
import DepartmentPreferenceForm from "./DepartmentPreferenceForm";

export default async function Page() {
  const _departments = dummyDepartments;

  const { data: departmentData } = await fakeResponse({
    status: 200,
    data: {
      departments: _departments,
    },
  });

  const { departments } = departmentData;

  return (
    <>
      <I18nProviderClient locale="en">
        <DepartmentPreferenceForm departments={departments as any} />
      </I18nProviderClient>
    </>
  );
}
