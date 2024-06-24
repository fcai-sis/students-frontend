import { dummyCourses } from "@/dummy/courses";
import dummySchedule from "@/dummy/schedule";
import { dummySlotsByDay, dummyTimeRanges } from "@/dummy/slots";
import { fakeResponse } from "@/dummy/utils";
import RegisterCourseForm from "./RegisterCourseForm";
import Schedule from "@/components/Schedule";

export default async function Page() {
  const _eligibleCourses = dummyCourses;
  const _schedule = dummySchedule;

  const { data: eligibleCoursesData } = await fakeResponse({
    status: 200,
    data: {
      eligibleCourses: _eligibleCourses,
    },
  });
  const { eligibleCourses } = eligibleCoursesData;

  const { data: scheduleData } = await fakeResponse({
    status: 200,
    data: {
      schedule: _schedule,
    },
  });
  const { schedule } = scheduleData;

  const _slots = dummySlotsByDay;
  const _timeRanges = dummyTimeRanges;

  const { data: slotData } = await fakeResponse({
    status: 200,
    data: {
      slots: _slots,
      timeRanges: _timeRanges,
    },
  });
  const { slots, timeRanges } = slotData;

  return (
    <>
      <h1>Enroll</h1>
      <Schedule slots={slots} timeRanges={timeRanges} schedule={schedule} />
      <RegisterCourseForm courses={eligibleCourses as any} />
    </>
  );
}
