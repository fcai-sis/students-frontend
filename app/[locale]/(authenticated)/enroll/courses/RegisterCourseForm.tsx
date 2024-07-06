"use client";
import { CourseType } from "@fcai-sis/shared-models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { enrollInCourseAction } from "./actions";
import { PageHeader } from "@/components/PageBuilder";
import { tt } from "@/lib";
import { useCurrentLocale } from "@/locales/client";
import { Button } from "@/components/Buttons";
import Spinner from "@/components/Spinner";

const enrollInCourseFormSchema = z.object({
  courses: z.array(
    z.object({ course: z.string(), group: z.string().optional() })
  ),
});

export type enrollInCourseFormValues = z.infer<typeof enrollInCourseFormSchema>;

export default function RegisterCourseForm({
  courses,
}: {
  courses: { course: CourseType; groups: string[] }[];
}) {
  const locale = useCurrentLocale();
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<enrollInCourseFormValues>({
    resolver: zodResolver(enrollInCourseFormSchema),
    defaultValues: {
      courses: [],
    },
  });

  const {
    fields: courseFields,
    append: addCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: "courses",
  });

  const handleCourseChange = (index: number, value: string) => {
    const newSelectedCourses = [...selectedCourses];
    newSelectedCourses[index] = value;
    setSelectedCourses(newSelectedCourses);
  };

  const onSubmit = async (values: enrollInCourseFormValues) => {
    const enrollInCourseResponse = await enrollInCourseAction(values);

    if (!enrollInCourseResponse.success) {
      return toast.error(
        enrollInCourseResponse.error?.message ?? "Failed to enroll in course"
      );
    }

    toast.success("Enrolled into selected courses successfully");
    router.push(`/courses/enrolled`);
  };

  return (
    <>
      <PageHeader
        title={tt(locale, {
          en: "Register Courses",
          ar: "تسجيل المقررات",
        })}
        actions={[]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {courseFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <select
              {...register(`courses.${index}.course` as const)}
              defaultValue={field.course}
              onChange={(e) => handleCourseChange(index, e.target.value)}
            >
              <option value="" disabled>
                {tt(locale, {
                  en: "Select a course",
                  ar: "اختر مقرراً",
                })}
              </option>
              {courses
                .filter(
                  (course) =>
                    !selectedCourses.includes(course.course.code) ||
                    course.course.code === selectedCourses[index]
                )
                .map((course) => (
                  <option key={course.course.code} value={course.course.code}>
                    ({course.course.code}) {tt(locale, course.course.name)}
                  </option>
                ))}
            </select>
            {errors.courses && errors.courses[index] && (
              <span>{errors.courses[index]?.message}</span>
            )}
            {courses.find(
              (course) => course.course.code === selectedCourses[index]
            )?.groups.length !== 0 && (
              <select
                {...register(`courses.${index}.group` as const)}
                defaultValue={field.group}
              >
                <option value="" disabled>
                  {tt(locale, {
                    en: "Select a group",
                    ar: "اختر مجموعة",
                  })}
                </option>
                {courses
                  .find(
                    (course) => course.course.code === selectedCourses[index]
                  )
                  ?.groups?.map((group: string) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
              </select>
            )}
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                removeCourse(index);
                const newSelectedCourses = [...selectedCourses];
                newSelectedCourses.splice(index, 1);
                setSelectedCourses(newSelectedCourses);
              }}
            >
              {tt(locale, {
                en: "Remove Course",
                ar: "إزالة المقرر",
              })}
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => addCourse({ course: "", group: "" })}
        >
          {tt(locale, {
            en: "Add Course",
            ar: "إضافة مقرر",
          })}
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner />
          ) : (
            tt(locale, {
              en: "Enroll",
              ar: "تسجيل",
            })
          )}
        </Button>
      </form>
    </>
  );
}
