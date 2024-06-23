"use client";

import { DummyHall, DummySection } from "@/dummy/schedule";

type SelectSectionFormProps = Readonly<{
  section: DummySection;
  hall: DummyHall;
}>;
export default function SelectSectionForm({
  section,
  hall,
}: SelectSectionFormProps) {
  return (
    <button className="bg-green-100">
      <p>{section.course.name.en}</p>
      <p>{section.course.code}</p>
      <p>{section.instructor.fullName}</p>
      <p>{hall.name}</p>
      <p>
        <b>{section.group}</b>
      </p>
    </button>
  );
}
