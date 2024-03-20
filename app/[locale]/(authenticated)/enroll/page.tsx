import Button from "@/components/Button";
import { H1, H3 } from "@/components/H";

export default function CourseEnrollmentPage() {
  return (
    <div className="flex flex-col">
      <H1>Course Enrollment</H1>

      {/* Main section */}
      <div className="flex flex-row justify-start">
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
    <div className="flex flex-col">
      <div className="flex flex-row justify-start items-center">
        <H3>Courses</H3>
        <Button variant="primary">
          Add Course
        </Button>
      </div>

      {/* Vertically scrollable div */}
      <div className="flex flex-col overflow-y-auto h-96">
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
    <div className="flex flex-row">
      <div>Course Name</div>
      <div>Course Description</div>
      <div>Course Credits</div>
      <button>Enroll</button>
    </div>
  );
}

// Grid of slots
function Schedule() {
  return (
    <div />
  );
}
