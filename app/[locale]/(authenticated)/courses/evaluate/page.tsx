import { dummyEnrollments } from "@/dummy/enrollments";
import { dummyEvaluationQuestions } from "@/dummy/evaluationQuestions";
import { fakeResponse } from "@/dummy/utils";
import { EnrollmentStatusEnum } from "@fcai-sis/shared-models";
import Link from "next/link";

export default async function Page() {
  const _passedEnrollments = dummyEnrollments.filter(
    (enrollment) => enrollment.status === EnrollmentStatusEnum[1]
  );

  const { data: evaluationData } = await fakeResponse({
    status: 200,
    data: {
      passedEnrollments: _passedEnrollments,
    },
  });

  const { passedEnrollments } = evaluationData;

  return (
    <>
      <h1>Course Evaluation</h1>
      {passedEnrollments.map((enrollment: any, i: number) => (
        <div key={i} className="border border-black">
          <p>{enrollment.course.name.en}</p>
          <Link href={`/courses/evaluate/${enrollment.course.code}`}>
            Evaluate
          </Link>
        </div>
      ))}
    </>
  );
}
