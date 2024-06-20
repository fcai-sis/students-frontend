"use server";

import { serviceRequestsAPI } from "@/api";
import { getAccessToken } from "@/lib";

export async function createServiceRequest(data: FormData) {
  const accessToken = await getAccessToken();
  const response = await serviceRequestsAPI.post("/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 201) {
    return response.data;
  }

  return { success: true };
}
