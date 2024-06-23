"use server";

import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import { enrollInCourseFormValues } from "./RegisterCourseForm";
import { enrollmentsAPI } from "@/api";

export const enrollInCourseAction = async (data: enrollInCourseFormValues) => {
  const accessToken = await getAccessToken();

  // map the form data to the request body, turn it into an actual array, remove any empty values and duplicates
  const requestBody = {
    courses: data.courses.map((course) => course.course).filter(Boolean),
  };
  console.log(requestBody);

  const response = await enrollmentsAPI.post(`/`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 201) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/enroll");

  return { success: true };
};
