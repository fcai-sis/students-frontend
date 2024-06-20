"use server";

import { studentsAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { getI18n } from "@/locales/server";

export default async function Page() {
  const t = await getI18n();

  const getMeResponse = await studentsAPI.get("/me", {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });

  if (getMeResponse.status !== 200) {
    throw new Error("Failed to fetch student data");
  }

  const { student } = getMeResponse.data;

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <p>
        <b>Student ID: </b>
        {student.studentId}
      </p>
      <p>
        <b>Full Name: </b>
        {student.fullName}
      </p>
      <p>
        <b>GPA: </b>
        {student.currentGpa}
      </p>
      <p>
        <b>Level: </b>
        {student.currentLevel}
      </p>
    </div>
  );
}
