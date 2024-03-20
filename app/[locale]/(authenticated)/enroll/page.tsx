import Button from "@/components/Button";
import { H1, H3, P } from "@/components/H";

export default function CourseEnrollmentPage() {
  return (
    <div className="flex flex-col">
      <H1>Course Enrollment</H1>

      {/* Main section */}
      <div className="flex flex-row justify-start gap-4 h-[680px]">
        <CourseList />
        <Schedule />
      </div>

      {/* Buttons section */}
      <div className="flex flex-row justify-start">
      </div>
    </div>
  );
}

function CourseList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <H3>Courses</H3>
        <Button variant="primary">
          Add Course
        </Button>
      </div>

      {/* Vertically scrollable div */}
      <div className="flex flex-col overflow-y-auto gap-4 px-3">
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </div>
    </div>
  );
}

function CourseItem() {
  return (
    <div className="flex flex-col p-4 bg-slate-200 rounded-lg gap-6">
      <P>Course Name</P>
      <div className="flex flex-row gap-4">
        <Button variant="secondary">
          S1/S2
        </Button>
        <Button variant="danger">
          Remove
        </Button>
      </div>
    </div>
  );
}

// Grid of slots
function Schedule() {
  const slots = Array.from({ length: 6 }, (_, i) => [
    {
      startTime: { hour: 8, minute: 0 },
      endTime: { hour: 9, minute: 30 },
    },
    {
      startTime: { hour: 9, minute: 30 },
      endTime: { hour: 11, minute: 0 },
    },
    {
      startTime: { hour: 11, minute: 0 },
      endTime: { hour: 12, minute: 30 },
    },
    {
      startTime: { hour: 12, minute: 30 },
      endTime: { hour: 14, minute: 0 },
    },
    {
      startTime: { hour: 14, minute: 0 },
      endTime: { hour: 15, minute: 30 },
    },
    {
      startTime: { hour: 15, minute: 30 },
      endTime: { hour: 17, minute: 0 },
    },
    {
      startTime: { hour: 17, minute: 0 },
      endTime: { hour: 18, minute: 30 },
    },
  ]);

  const days = [
    { name: "Saturday", value: 0 },
    { name: "Sunday", value: 1 },
    { name: "Monday", value: 2 },
    { name: "Tuesday", value: 3 },
    { name: "Wednesday", value: 4 },
    { name: "Thursday", value: 5 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full py-4">
        <H3>Schedule</H3>
      </div>

      <div className="grid grid-rows-7 gap-2">
        <div className="flex flex-row gap-2">
          <P className="flex items-center min-w-24 rounded-lg">
            Time
          </P>
          {slots[0].map((slot, i) => (
            <P key={i} className="flex items-center min-w-24 rounded-lg">
              {slot.startTime.hour}:{slot.startTime.minute} - {slot.endTime.hour}:{slot.endTime.minute}
            </P>
          ))}
        </div>
        {days.map((day) => (
          <div key={day.value} className="flex flex-row gap-2">
            <P className="flex items-center min-w-24 rounded-lg">
              {day.name}
            </P>
            <div className="flex flex-row gap-2">
              {slots.map((slot, i) => (
                <Slot key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slot() {
  return (
    <div className="flex flex-col p-4 bg-slate-100 border-slate-300 border rounded-lg">
      <P>Course Name</P>
      <P>Teacher Name</P>
    </div>
  );
}
