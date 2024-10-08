import RegisterCourseForm from "./RegisterCourseForm";
import Schedule from "@/components/Schedule";
import { getAccessToken, tt } from "@/lib";
import { configAPI, enrollmentsAPI, schedulesAPI } from "@/api";
import { revalidatePath } from "next/cache";
import { getSlots } from "../../page";
import { getCurrentLocale } from "@/locales/server";

export const getEligibleCourses = async () => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/eligible`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch courses");
  revalidatePath("/enroll");

  return response.data;
};

export const getEligibleSchedule = async () => {
  const accessToken = await getAccessToken();

  const response = await schedulesAPI.get("/eligible", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch schedule");
  revalidatePath("/enroll");

  return response.data;
};

async function getCourseEnrollmentIsOpen() {
  const response = await configAPI.get("/");

  if (response.status !== 200)
    throw new Error("Failed to fetch course enrollment status");

  return response.data.config.isCourseEnrollOpen;
}

export default async function Page() {
  const locale = getCurrentLocale();
  const courseEnrollmentIsOpen = await getCourseEnrollmentIsOpen();

  if (!courseEnrollmentIsOpen) {
    return (
      <div>
        {tt(locale, {
          en: "Course enrollment is not open",
          ar: "تسجيل المقررات غير متاح الآن",
        })}
      </div>
    );
  }

  const { courses } = await getEligibleCourses();
  const eligibleCourses = courses.map((c: any) => ({
    course: c.course,
    groups: c.sections.map((s: any) => s.group),
  }));

  const { schedule } = await getEligibleSchedule();
  const { slots, timeRanges, days } = await getSlots();

  return (
    <>
      <RegisterCourseForm courses={eligibleCourses as any} />
      <Schedule
        days={days}
        slots={slots}
        timeRanges={timeRanges}
        schedule={schedule}
      />
    </>
  );
}
