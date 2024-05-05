import Button from "@/components/Button";
import { H5, P } from "@/components/H";

export default function CourseEnrollmentPage() {
  return (
    <div className='flex flex-col'>
      {/* Main section */}
      <div className='flex flex-row justify-center items-center gap-4'>
        <div className='flex flex-col gap-4 items-center'>
          <div className='flex flex-row gap-4 justify-between items-center'>
            <H5 className='text-center'>
              Enrolled courses
            </H5>
            <Button variant='primary' className="p-2">
              Add Course
            </Button>
          </div>
          <CourseList />
        </div>
        <Schedule /
      </div>

      {/* Buttons section */}
      <div className='flex flex-row justify-start'></div>
    </div>
  );
}

function CourseList() {
  return (
    <div className='flex flex-col overflow-y-auto gap-4 px-3 h-[500px] w-80 bg-slate-100 rounded-lg'>
      <CourseItem />
      <CourseItem />
      <CourseItem />
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
  );
}

function CourseItem() {
  return (
    <div className='flex flex-col p-4 bg-slate-200 rounded-lg gap-6 justify-between'>
      {/* break course name with hypjen */}
      <P className='break-words break-all'>
        Course Name coursecoursecourse WTFWTF
      </P>
      <div className='flex flex-row gap-2 justify-end'>
        <Button variant="secondary" className='p-2 bg-slate-50 text-blue-500 rounded-lg h-min'>
          S1/S2
        </Button>
        <Button variant="danger" className='p-2 bg-red-500 text-white rounded-lg h-min'>
          Unenroll
        </Button>
      </div>
    </div>
  );
}

function Slot() {
  return (
    <div
      className='flex flex-col w-32 h-20 bg-slate-100 border-slate-300 border rounded-lg justify-center items-center hover:bg-blue-200 transition-colors duration-200 cursor-pointer'>
    </div>
  );
}

// Grid of slots
function Schedule() {
  const slots = Array.from({ length: 7 }, (_, __) => [
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
    <div className='grid grid-cols-8 gap-2'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col w-32 h-20' />
        {days.map((day, j) => (
          <div
            key={j}
            className='flex flex-col w-32 h-20 bg-slate-200 border-slate-300 border rounded-lg justify-center items-center'
          >
            {day.name}
          </div>
        ))}
      </div>
      {slots.map((slot, i) => (
        <div key={i} className='flex flex-col gap-2'>
          <div className='flex w-32 h-20 bg-slate-200 border-slate-300 border rounded-lg justify-center items-center'>
            {slot[i].startTime.hour}:{slot[i].startTime.minute} -{" "}
            {slot[i].endTime.hour}:{slot[i].endTime.minute}
          </div>
          {days.map((_, j) => (
            <Slot key={j} />
          ))}
        </div>
      ))}
    </div>
  );
}
