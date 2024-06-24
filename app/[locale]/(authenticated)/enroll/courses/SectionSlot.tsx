"use client";

import { DummyHall, DummySection } from "@/dummy/schedule";

type SelectSectionFormProps = Readonly<{
  section: DummySection;
  hall: DummyHall;
}>;
export default function SectionSlot({ section, hall }: SelectSectionFormProps) {
  return (
    <div className="bg-slate-100 p-1  rounded-lg">
      <p>{section.course.name.en}</p>
      <p>{section.course.code}</p>
      <p>{section.instructor.fullName}</p>
      <p>{hall.name}</p>
      <p>
        <b>{section.group}</b>
      </p>
    </div>
  );
}
