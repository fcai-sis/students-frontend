import LectureSlot from "@/app/[locale]/(authenticated)/enroll/courses/LectureSlot";
import SectionSlot from "@/app/[locale]/(authenticated)/enroll/courses/SectionSlot";
import { DummySlot } from "@/dummy/slots";
import { DayEnumType } from "@fcai-sis/shared-models";

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

export type ScheduleProps = {
  slots: Record<DayEnumType, DummySlot[]>;
  timeRanges: {
    day: undefined;
    start: {
      hour: number;
      minute: number;
    };
    end: {
      hour: number;
      minute: number;
    };
  }[];
  schedule: any[];
};

export default function Schedule({
  timeRanges,
  slots,
  schedule,
}: ScheduleProps) {
  return (
    <div className="table p-1 ">
      <div className="table-header-group p-1 ">
        <div className="table-row p-1 ">
          <div className="table-cell p-1 "></div>
          {timeRanges.map((timeRange) => (
            <div className="table-cell p-1 " key={JSON.stringify(timeRange)}>
              <p className="text-center p-1 border border-slate-300 rounded-lg">
                {formatSlotTime(timeRange as unknown as DummySlot)}
              </p>
            </div>
          ))}
        </div>
      </div>
      {Object.keys(slots).map((currentDay) => (
        <div className="table-row p-1 " key={currentDay}>
          <div className="table-cell border border-slate-300 p-1  rounded-lg">
            {currentDay}
          </div>
          {slots[currentDay as DayEnumType].map((currentTimeRange) => (
            <div
              className="table-cell p-1 "
              key={JSON.stringify(currentTimeRange)}
            >
              {(() => {
                // find all items that have the same slot and check if they are lectures or sections
                const items = schedule.filter((item) =>
                  isSameSlot(item.slot, currentTimeRange as DummySlot)
                );

                if (items.length === 0) return null;

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
  );
}
