import EvaludationForm from "./EvaluationForm";
import { I18nProviderClient } from "@/locales/client";
import { courseEvaluationAPI, enrollmentsAPI, questionsAPI } from "@/api";
import { tt } from "@/lib";
import { getCurrentLocale } from "@/locales/server";
import { getPassedEnrollments } from "../page";

interface IQuestion {
  _id: string;
  question: any;
  type: string;
}

export default async function Page({
  params: { enrollmentId },
}: Readonly<{
  params: { enrollmentId: string };
}>) {
  const locale = getCurrentLocale();
  const { passedEnrollments } = await getPassedEnrollments();

  const enrollment = passedEnrollments.find(
    (e: any) => e._id.toString() === enrollmentId
  );

  console.log("enrollment", enrollment);
  const courseName = enrollment.course.name;

  const { data } = await questionsAPI.get(`/`);

  console.log("DARATATATATATA", data);

  const questions: IQuestion[] = data.evaluationQuestions;

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
      <I18nProviderClient locale={locale}>
        <EvaludationForm
          questions={formattedQuestions}
          courseName={courseName}
          enrollmentId={enrollmentId}
          options={options}
        />
      </I18nProviderClient>
    </>
  );
}
