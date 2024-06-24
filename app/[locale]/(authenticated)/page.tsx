"use server";

import AnnouncementCard from "@/components/AnnouncementCard";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { dummyAnnouncements } from "@/dummy/announcements";
import { dummyServiceRequests } from "@/dummy/serviceRequests";
import { dummyStudents } from "@/dummy/students";
import { fakeResponse } from "@/dummy/utils";
import { getI18n } from "@/locales/server";
import { studentLocalizedFields } from "@fcai-sis/shared-models";

export default async function Page() {
  const t = await getI18n();

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

  return (
    <>
      <div>
        <h1>{t("home.title")}</h1>
        <p>
          <b>{studentLocalizedFields.studentId.ar}: </b>
          {student.studentId}
        </p>
        <p>
          <b>Full Name: </b>
          {student.fullName}
        </p>
        <p>
          <b>Department: </b>
          {student.currentDepartment}
        </p>
        <p>
          <b>Completed Credit Hours: </b>
          {student.completedCreditHours}
        </p>
        <p>
          <b>Level: </b>
          {student.currentLevel}
        </p>
        <p>
          <b>GPA: </b>
          {student.currentGpa}
        </p>
      </div>
      <div>
        <h2>{t("announcements.title")}</h2>
        {announcements.map((announcement, index) => (
          <AnnouncementCard key={index} announcement={announcement} />
        ))}
      </div>
      <div>
        <h2>{t("serviceRequests.title")}</h2>
        {serviceRequests.map((serviceRequest: any, i: number) => (
          <ServiceRequestCard key={i} serviceRequest={serviceRequest} />
        ))}
      </div>
    </>
  );
}
