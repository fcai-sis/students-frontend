"use server";

import { redirect } from "next/navigation";

export default async function loginAction(_: any, formData: FormData) {
  console.log("FORM DATA:", formData);

  const body = JSON.stringify({
    studentId: formData.get("studentId"),
    password: formData.get("password"),
  });

  console.log("BODY:", body);

  const response = await fetch(`${process.env.AUTH_API_URL}/student`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("RESPONSE:", await response.json());

  if (response.ok) {
    return redirect("/");
  }
}
