import { dummyCourses } from "@/dummy/courses";
import dummySchedule from "@/dummy/schedule";
import { DummySlot, dummySlotsByDay, dummyTimeRanges } from "@/dummy/slots";
import { fakeResponse } from "@/dummy/utils";
import { DayEnumType } from "@fcai-sis/shared-models";
import LectureSlot from "./LectureSlot";
import SectionSlot from "./SectionSlot";
import RegisterCourseForm from "./RegisterCourseForm";

/**
 * e.g.
 * formatSlotTime({
 *   day: DayEnum[0],
 *   startTime: { hour: 19, minute: 0 },
 *   endTime: { hour: 20, minute: 30 }
 * })
 * @param slot - The slot to format its time
 * @returns 7:00 PM - 8:30 PM
 */
function formatSlotTime(slot: DummySlot) {
  const startTimeAmPm = slot.start.hour >= 12 ? "PM" : "AM";
  const endTimeAmPm = slot.end.hour >= 12 ? "PM" : "AM";
  const startTimeHour = slot.start.hour % 12 || 12;
  const endTimeHour = slot.end.hour % 12 || 12;

  return `${startTimeHour}:${slot.start.minute
    .toString()
    .padStart(2, "0")} ${startTimeAmPm} - ${endTimeHour}:${slot.end.minute
    .toString()
    .padStart(2, "0")} ${endTimeAmPm}`;
}

function isSameSlot(slot1: DummySlot, slot2: DummySlot): boolean {
  return (
    slot1.day === slot2.day &&
    slot1.start.hour === slot2.start.hour &&
    slot1.start.minute === slot2.start.minute &&
    slot1.end.hour === slot2.end.hour &&
    slot1.end.minute === slot2.end.minute
  );
}

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
      <div className="table">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell"></div>
            {timeRanges.map((timeRange) => (
              <div
                className="table-cell border border-black"
                key={JSON.stringify(timeRange)}
              >
                {formatSlotTime(timeRange as unknown as DummySlot)}
              </div>
            ))}
          </div>
        </div>
        {Object.keys(slots).map((currentDay) => (
          <div className="table-row" key={currentDay}>
            <div className="table-cell border border-black">{currentDay}</div>
            {slots[currentDay as DayEnumType].map((currentTimeRange) => (
              <div
                className="table-cell border border-black   "
                key={JSON.stringify(currentTimeRange)}
              >
                {(() => {
                  // find all items that have the same slot and check if they are lectures or sections
                  const items = schedule.filter((item) =>
                    isSameSlot(item.slot, currentTimeRange as DummySlot)
                  );

                  if (items.length === 0) {
                    return "No lecture";
                  }

                  // map each item to a form based on its type
                  return items.map((item, index) => {
                    if (item.type === "lecture") {
                      return (
                        <LectureSlot
                          key={index}
                          lecture={item.lecture}
                          hall={item.hall}
                        />
                      );
                    } else if (item.type === "section") {
                      return (
                        <SectionSlot
                          key={index}
                          section={item.secion}
                          hall={item.hall}
                        />
                      );
                    } else {
                      return "Invalid type";
                    }
                  });
                })()}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div>
        <RegisterCourseForm courses={eligibleCourses as any} />
      </div>
    </>
  );
}
