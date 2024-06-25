import AnnouncementCard from "@/components/AnnouncementCard";
import RadialProgress from "@/components/RadialProgress";
import Schedule from "@/components/Schedule";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { dummyAnnouncements } from "@/dummy/announcements";
import { dummyCourses } from "@/dummy/courses";
import dummySchedule from "@/dummy/schedule";
import { dummyServiceRequests } from "@/dummy/serviceRequests";
import { dummySlotsByDay, dummyTimeRanges } from "@/dummy/slots";
import { dummyStudents } from "@/dummy/students";
import { fakeResponse, localizedLevel } from "@/dummy/utils";
import { tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";

export default async function Page() {
  const t = await getI18n();
  const locale = getCurrentLocale();

  const _me = dummyStudents[0];
  const getMeResponse = await fakeResponse({
    status: 200,
    data: {
      student: _me,
    },
  });

  if (getMeResponse.status !== 200) {
    throw new Error("Failed to fetch student data");
  }

  const { student } = getMeResponse.data;

  const { data: announcementData } = await fakeResponse({
    status: 200,
    data: {
      announcements: dummyAnnouncements.slice(0, 3),
    },
  });

  const { announcements } = announcementData;

  const { data } = await fakeResponse({
    status: 200,
    data: {
      serviceRequests: dummyServiceRequests.slice(0, 3),
    },
  });

  const { serviceRequests } = data;

  const _eligibleCourses = dummyCourses;
  const _schedule = dummySchedule;

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
      <div className="flex items-center justify-between pb-4 w-full">
        <div className="flex flex-col gap-4">
          <h2 className="flex gap-4 items-center">
            {t("home.greeting", {
              name: student.fullName.split(" ")[0],
            })}
          </h2>
          <div className="flex gap-2">
            <p className="rounded-lg bg-slate-100 text-slate-500 px-4 py-2">
              {student.studentId}
            </p>
            <p className="rounded-lg bg-blue-100 text-blue-500 px-4 py-2">
              {tt(locale, localizedLevel(student.level))}
            </p>
            <p className="rounded-lg bg-blue-100 text-blue-500 px-4 py-2">
              {tt(locale, student.major.name)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <RadialProgress
              colorize={false}
              value={student.creditHours}
              max={130}
            />
            <p>
              <b>
                {tt(locale, {
                  en: "Credit Hours",
                  ar: "عدد الساعات المعتمدة",
                })}
              </b>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <RadialProgress colorize value={student.gpa} max={4} />
            <p>
              <b>
                {tt(locale, {
                  en: "GPA",
                  ar: "المعدل التراكمي",
                })}
              </b>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-col py-4 w-full">
        <h2>{t("home.schedule")}</h2>
        <Schedule slots={slots} timeRanges={timeRanges} schedule={schedule} />
      </div>
      <div className="flex gap-4 py-4 w-full">
        <div className="w-full">
          <h2>{t("announcements.title")}</h2>
          {announcements.map((announcement, index) => (
            <AnnouncementCard key={index} announcement={announcement} />
          ))}
        </div>
        <div className="w-full">
          <h2>{t("serviceRequests.title")}</h2>
          {serviceRequests.map((serviceRequest: any, i: number) => (
            <ServiceRequestCard key={i} serviceRequest={serviceRequest} />
          ))}
        </div>
      </div>
    </>
  );
}
