import Pagination from "@/components/Pagination";
import { dummyEnrollments } from "@/dummy/enrollments";
import { fakeResponse } from "@/dummy/utils";
import { getCurrentPage } from "@/lib";
import { getI18n } from "@/locales/server";
import { EnrollmentStatusEnum } from "@fcai-sis/shared-models";
import Link from "next/link";

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string } }>) {
  const t = await getI18n();

  const page = getCurrentPage(searchParams);
  const limit = 5;

  const _filtered = dummyEnrollments;
  const _total = _filtered.length;

  const _paginated = _filtered.slice((page - 1) * limit, page * limit);

  const { data: coursesData } = await fakeResponse({
    status: 200,
    data: {
      enrollments: _paginated,
      total: _total,
    },
  });

  const { enrollments, total } = coursesData;

  return (
    <>
      <h1>{t("myCourses.title")}</h1>
      <div>
        {enrollments.map((enrollment: any) => (
          <div className="border border-black w-80">
            <h2>{enrollment.course.name.ar}</h2>
            <p>{enrollment.course.code} </p>
            <p>
              <b>Credit Hours: </b>
              {enrollment.course.creditHours}
            </p>
            {enrollment.exam ? (
              <>
                <p>
                  <b>Exam Hall: </b>
                  {enrollment.exam.hall.name.en}
                </p>
                <p>
                  <b>Seat Number: </b>
                  {enrollment.exam.seatNumber}
                </p>
              </>
            ) : null}
            {enrollment.status !== EnrollmentStatusEnum[0] ? (
              <>
                <p>
                  <b>Mark: </b>
                  {enrollment.mark}
                </p>
                <p>
                  <b>Final Exam Grade: </b>
                  {enrollment.grades.finalExam}
                </p>
                <p>
                  <b>Term Work Grade: </b>
                  {enrollment.grades.termWork}
                </p>
                <p>
                  <b>Total Grade: </b>
                  {enrollment.grades.finalExam + enrollment.grades.termWork}
                </p>
              </>
            ) : null}
            <Link href={`/courses/${enrollment.course.code}`}>
              View details
            </Link>
          </div>
        ))}
        <Pagination totalPages={total / limit} />
      </div>
    </>
  );
}
