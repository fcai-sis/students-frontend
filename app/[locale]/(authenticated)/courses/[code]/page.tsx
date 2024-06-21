import { dummyCourses } from "@/dummy/courses";
import { fakeResponse } from "@/dummy/utils";

export default async function Page({
  params: { code },
}: Readonly<{
  params: { code: string };
}>) {
  const _course = dummyCourses[0];
  const { data } = await fakeResponse({
    status: 200,
    data: {
      course: _course,
    },
  });

  const { course } = data;

  return (
    <>
      <h1>{course.name.en}</h1>
      <p>{course.description.en}</p>
    </>
  );
}
