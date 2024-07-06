import { dummyEnrollments } from "@/dummy/enrollments";
import {
  dummyCourseEvaluationQuestions,
  dummyInstructorEvaluationQuestions,
  dummyTAEvaluationQuestions,
} from "@/dummy/evaluationQuestions";
import { fakeResponse } from "@/dummy/utils";
import { getI18n } from "@/locales/server";
import EvaludationForm from "./EvaluationForm";
import { I18nProviderClient } from "@/locales/client";
import { courseEvaluationAPI } from "@/api";

interface IQuestion {
  _id: string;
  question: any;
  type: string;
}

export default async function Page({
  params: { locale, enrollmentId },
}: Readonly<{
  params: { locale: string; enrollmentId: string };
}>) {
  const t = await getI18n();

  const _enrollment = dummyEnrollments[0]; // TODO: Find the enrollment by enrollment id

  const { data: response } = await courseEvaluationAPI.get(
    `/questions`
    // {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // }
  );
  const questions: IQuestion[] = response.evaluationQuestions;

  const formattedQuestions = {
    course: questions
      .filter((q) => q.type === "course")
      .map((q: IQuestion) => ({
        questionId: q._id,
        question: q.question,
      })),
    instructor: questions
      .filter((q) => q.type === "instructor")
      .map((q: IQuestion) => ({
        questionId: q._id,
        question: q.question,
      })),
    ta: questions
      .filter((q) => q.type === "ta")
      .map((q: IQuestion) => ({
        questionId: q._id,
        question: q.question,
      })),
  };

  const enrollment = _enrollment;

  const options = [
    {
      label: { en: "Strongly disagree", ar: "لا أوافق على الإطلاق" },
      value: 1,
    },
    {
      label: { en: "Disagree", ar: "لا أوافق" },
      value: 2,
    },
    {
      label: { en: "Neutral", ar: "محايد" },
      value: 3,
    },
    {
      label: { en: "Agree", ar: "أوافق" },
      value: 4,
    },
    {
      label: { en: "Strongly agree", ar: "أوافق تماماً" },
      value: 5,
    },
  ];

  return (
    <>
      <h1>Evaluating {enrollment.course.name.ar}</h1>
      <I18nProviderClient locale={locale}>
        <EvaludationForm
          questions={formattedQuestions}
          enrollmentId={enrollment._id}
          options={options}
        />
      </I18nProviderClient>
    </>
  );
}
