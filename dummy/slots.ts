import { DayEnum } from "@fcai-sis/shared-models";

export const slots = [
  ...Array.from({ length: Object.keys(DayEnum).length / 2 }, (_, index) => {
    const day = DayEnum[index];
    const slotsPerDay = 6;
    const slotDuration = 90; // in minutes
    const breakDuration = 15; // in minutes
    const startTime = { hour: 8, minute: 0 };
    const slots = [];

    for (let i = 0; i < slotsPerDay; i++) {
      const startHour =
        startTime.hour + Math.floor((i * (slotDuration + breakDuration)) / 60);
      const startMinute =
        startTime.minute + ((i * (slotDuration + breakDuration)) % 60);
      const endHour = startHour + Math.floor(slotDuration / 60);
      const endMinute = startMinute + (slotDuration % 60);

      slots.push({
        day: day,
        startTime: { hour: startHour, minute: startMinute },
        endTime: { hour: endHour, minute: endMinute },
      });
    }

    return slots;
  }).flat(),
] as const;
