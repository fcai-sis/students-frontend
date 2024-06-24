"use client";

import { DummyHall, DummyLecture } from "@/dummy/schedule";

type EnrollInCourseFormProps = Readonly<{
  lecture: DummyLecture;
  hall: DummyHall;
}>;
export default function LectureSlot({
  lecture,
  hall,
}: EnrollInCourseFormProps) {
  return (
    <div className="bg-slate-100 p-1  rounded-lg">
      <p>{lecture.course.name.en}</p>
      <p>{lecture.course.code}</p>
      <p>{lecture.instructor.fullName}</p>
      <p>{hall.name}</p>
    </div>
  );
}
