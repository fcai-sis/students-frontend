"use client";

import { DummyHall, DummyLecture } from "@/dummy/schedule";

type EnrollInCourseFormProps = Readonly<{
  lecture: DummyLecture;
  hall: DummyHall;
}>;
export default function EnrollInCourseForm({
  lecture,
  hall,
}: EnrollInCourseFormProps) {
  return (
    <button className="bg-blue-100">
      <p>{lecture.course.name.en}</p>
      <p>{lecture.course.code}</p>
      <p>{lecture.instructor.fullName}</p>
      <p>{hall.name}</p>
    </button>
  );
}
