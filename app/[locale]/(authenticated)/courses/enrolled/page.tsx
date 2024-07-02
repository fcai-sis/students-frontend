import { enrollmentsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import { getAccessToken, getCurrentPage, limit } from "@/lib";
import { getI18n } from "@/locales/server";
import { EnrollmentStatusEnum } from "@fcai-sis/shared-models";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const getStudentEnrollments = async (page: number) => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/enrolled`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      skip: page * limit - limit,
      limit,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch enrollments");

  revalidatePath("/courses");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string } }>) {
  const t = await getI18n();

  const page = getCurrentPage(searchParams);

  const response = await getStudentEnrollments(page);
  const enrollments = response.courses;

  const total = response.totalStudentEnrollments;

  return (
    <>
      <h1 className='text-3xl font-bold mb-6'>{t("myCourses.title")}</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Course Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Course Code
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Credit Hours
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Exam Hall
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Seat Number
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Mark
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Final Exam Grade
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Term Work Grade
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Total Grade
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {enrollments.map((enrollment: any, i: number) => (
              <tr key={i}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900'>
                    {enrollment.course.name.ar}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-500'>
                    {enrollment.course.code}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-500'>
                    {enrollment.course.creditHours}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {enrollment.examHall ? (
                    <div className='text-sm text-gray-500'>
                      {enrollment.examHall.name.en}
                    </div>
                  ) : (
                    <div className='text-sm text-gray-500'>N/A</div>
                  )}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {enrollment.seatNumber ? (
                    <div className='text-sm text-gray-500'>
                      {enrollment.seatNumber}
                    </div>
                  ) : (
                    <div className='text-sm text-gray-500'>N/A</div>
                  )}
                </td>
                {enrollment.status !== EnrollmentStatusEnum[0] ? (
                  <>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>
                        {enrollment.grade}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>
                        {enrollment.finalExamMark}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>
                        {enrollment.termWorkMark}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>
                        {enrollment.finalExamMark + enrollment.termWorkMark}
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>N/A</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>N/A</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>N/A</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>N/A</div>
                    </td>
                  </>
                )}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link
                    href={`/courses/${enrollment.course.code}`}
                    className='text-blue-500 hover:underline'
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={total / limit} />
      </div>
    </>
  );
}
