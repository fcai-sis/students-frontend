import { enrollmentsAPI } from "@/api";
import { ButtonLink } from "@/components/Buttons";
import { PageHeader } from "@/components/PageBuilder";
import Pagination from "@/components/Pagination";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { EnrollmentStatusEnum } from "@fcai-sis/shared-models";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const getStudentEnrollments = async (page: number) => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/enrolled`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { page, limit },
  });

  if (response.status !== 200) throw new Error("Failed to fetch enrollments");
  revalidatePath("/courses");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string } }>) {
  const t = await getI18n();

  const locale = getCurrentLocale();
  const page = getCurrentPage(searchParams);

  const { enrollments, total } = await getStudentEnrollments(page);

  return (
    <>
      <PageHeader
        title={tt(locale, {
          en: "My Courses",
          ar: "مقرراتي",
        })}
        actions={[
          <ButtonLink href="/enroll/courses">
            {tt(locale, {
              en: "Enroll in a new course",
              ar: "التسجيل في مقرر جديد",
            })}
          </ButtonLink>,
        ]}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Course Code",
                  ar: "رمز المقرر",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Course Name",
                  ar: "اسم المقرر",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Group",
                  ar: "المجموعة",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Credit Hours",
                  ar: "الساعات المعتمدة",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Exam Hall",
                  ar: "قاعة الامتحان",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Seat Number",
                  ar: "رقم الجلوس",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Grade",
                  ar: "الدرجة",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Final Exam Mark",
                  ar: "درجة الامتحان النهائي",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Term Work Mark",
                  ar: "درجة العمل الفصلي",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Total Mark",
                  ar: "الدرجة الكلية",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {enrollments.map((enrollment: any, i: number) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">
                    {enrollment.course.code}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">
                    {tt(locale, enrollment.course.name)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">
                    {enrollment.group}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">
                    {enrollment.course.creditHours}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {enrollment.examHall ? (
                    <div className="text-sm text-slate-600">
                      {tt(locale, enrollment.examHall.name)}
                    </div>
                  ) : (
                    <div className="text-sm text-slate-600">N/A</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {enrollment.seatNumber ? (
                    <div className="text-sm text-slate-600">
                      {enrollment.seatNumber}
                    </div>
                  ) : (
                    <div className="text-sm text-slate-600">N/A</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">
                    {enrollment.grade ??
                      tt(locale, {
                        en: "Not graded yet",
                        ar: "لم يتم تقييمه بعد",
                      })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">
                    {enrollment.finalExamMark ??
                      tt(locale, { en: "N/A", ar: "غير متوفر" })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">
                    {enrollment.termWorkMark ??
                      tt(locale, { en: "N/A", ar: "غير متوفر" })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">
                    {enrollment.finalExamMark && enrollment.termWorkMark
                      ? enrollment.finalExamMark + enrollment.termWorkMark
                      : tt(locale, { en: "N/A", ar: "غير متوفر" })}
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/courses/${enrollment.course.code}`}
                    className="text-blue-500 hover:underline"
                  >
                    View details
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={total / limit} />
      </div>
    </>
  );
}
