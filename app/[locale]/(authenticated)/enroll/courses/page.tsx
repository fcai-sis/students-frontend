import RegisterCourseForm from "./RegisterCourseForm";
import Schedule from "@/components/Schedule";
import { getAccessToken } from "@/lib";
import { enrollmentsAPI, schedulesAPI } from "@/api";
import { revalidatePath } from "next/cache";
import { getSlots } from "../../page";

export const getEligibleEnrollments = async () => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/eligible`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch enrollments");

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

export default async function Page() {
  const response = await getEligibleEnrollments();
  const enrollments = response.courses;
  const eligibleCourses = enrollments.map(
    (enrollment: any) => enrollment.course
  );

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
