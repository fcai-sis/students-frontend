"use server";

import { getAccessToken } from "@/lib";
import { EvaluationFormValues } from "./EvaluationForm";
import { courseEvaluationAPI } from "@/api";

export async function evaluateCourse(data: EvaluationFormValues) {
  const accessToken = await getAccessToken();

  const evaluationAnswers = [
    ...data.course.map((q) => ({
      question: q.questionId,
      answer: parseInt(q.rating),
    })),
    ...data.instructor.map((q) => ({
      question: q.questionId,
      answer: parseInt(q.rating),
    })),
    ...(data.ta
      ? data.ta.map((q) => ({
          question: q.questionId,
          answer: parseInt(q.rating),
        }))
      : []),
  ];

  const payload = {
    enrollment: data.enrollmentId,
    evaluationAnswers,
  };

  const response = await courseEvaluationAPI.post(
    `/evaluation-answer/submit-answers`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 201) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  return { success: true };
}
