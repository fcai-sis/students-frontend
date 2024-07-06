"use client";

import { useCurrentLocale, useI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { evaluateCourse } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { tt } from "@/lib";
import { PageHeader } from "@/components/PageBuilder";

const evaluationFormSchema = z.object({
  enrollmentId: z.string(),
  course: z.array(
    z.object({
      questionId: z.string(),
      rating: z.string().refine((value) => value !== "0", {
        message: "Please select a rating",
      }),
    })
  ),
  instructor: z.array(
    z.object({
      questionId: z.string(),
      rating: z.string().refine((value) => value !== "0", {
        message: "Please select a rating",
      }),
    })
  ),
  ta: z
    .array(
      z.object({
        questionId: z.string(),
        rating: z.string().refine((value) => value !== "0", {
          message: "Please select a rating",
        }),
      })
    )
    .optional(),
});

export type EvaluationFormValues = z.infer<typeof evaluationFormSchema>;

export default function EvaluationForm({
  questions,
  options,
  courseName,
  enrollmentId,
}: {
  questions: any;
  options: any;
  enrollmentId: string;
  courseName: {
    ar: string;
    en: string;
  };
}) {
  const locale = useCurrentLocale();
  const t = useI18n();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EvaluationFormValues>({
    resolver: zodResolver(evaluationFormSchema),
    defaultValues: {
      enrollmentId,
      course: questions.course.map((q: any) => ({
        questionId: q.questionId,
        rating: "0",
      })),
      instructor: questions.instructor.map((q: any) => ({
        questionId: q.questionId,
        rating: "0",
      })),
      ta: questions.ta
        ? questions.ta.map((q: any) => ({
            questionId: q.questionId,
            rating: "0",
          }))
        : undefined,
    },
  });

  const { fields: courseFields } = useFieldArray({
    control,
    name: "course",
  });

  const onSubmit = async (values: EvaluationFormValues) => {
    const result = await evaluateCourse(values);
    if (!result.success) {
      return toast.error(result.error?.message ?? "Failed to evaluate course");
    }
    toast.success("Course evaluated successfully");
    router.push("/evaluate");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageHeader
        title={tt(locale, {
          en: `Evaluate ${courseName.en}`,
          ar: `تقييم ${courseName.ar}`,
        })}
        actions={[]}
      />
      {courseFields.map((field, index) => {
        const { question, questionId } = questions.course[index];
        return (
          <div key={field.id}>
            <label>{tt(locale, question)}</label>
            <select
              {...register(`course.${index}.rating` as const)}
              className={
                !!errors.course &&
                !!errors.course[index] &&
                !!errors.course[index]!.rating
                  ? "ring ring-red-500"
                  : ""
              }
            >
              <option value="0" disabled>
                {tt(locale, {
                  en: "Please select a rating",
                  ar: "يرجى تحديد التقييم",
                })}
              </option>
              {options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {tt(locale, option.label)}
                </option>
              ))}
            </select>
            <input
              type="hidden"
              {...register(`course.${index}.questionId`)}
              value={questionId}
            />
          </div>
        );
      })}
      <h2>Evaluate Instructor</h2>
      {questions.instructor.map(
        ({ question, questionId }: any, index: number) => {
          return (
            <div key={index}>
              <label>{tt(locale, question)}</label>
              <select
                {...register(`instructor.${index}.rating` as const)}
                className={
                  !!errors.instructor &&
                  !!errors.instructor[index] &&
                  !!errors.instructor[index]!.rating
                    ? "ring ring-red-500"
                    : ""
                }
              >
                <option value="0" disabled>
                  {t("evaluation.selectRating")}
                </option>
                {options.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {tt(locale, option.label)}
                  </option>
                ))}
              </select>
              <input
                type="hidden"
                {...register(`instructor.${index}.questionId`)}
                value={questionId}
              />
            </div>
          );
        }
      )}
      {questions.ta && (
        <>
          <h2>Evaluate TA</h2>
          {questions.ta.map(({ question, questionId }: any, index: number) => {
            return (
              <div key={index}>
                <label>{tt(locale, question)}</label>
                <select
                  {...register(`ta.${index}.rating` as const)}
                  className={
                    !!errors.ta &&
                    !!errors.ta[index] &&
                    !!errors.ta[index]!.rating
                      ? "ring ring-red-500"
                      : ""
                  }
                >
                  <option value="0" disabled>
                    {t("evaluation.selectRating")}
                  </option>
                  {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {tt(locale, option.label)}
                    </option>
                  ))}
                </select>
                <input
                  type="hidden"
                  {...register(`ta.${index}.questionId`)}
                  value={questionId}
                />
              </div>
            );
          })}
        </>
      )}
      <button className="btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
}
