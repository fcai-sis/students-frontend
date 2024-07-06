import { enrollmentsAPI } from "@/api";
import { ButtonLink } from "@/components/Buttons";
import Card from "@/components/Card";
import { CardGrid, PageHeader } from "@/components/PageBuilder";
import { getAccessToken, tt } from "@/lib";
import { getCurrentLocale } from "@/locales/server";
import { revalidatePath } from "next/cache";

export const getPassedEnrollments = async () => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/enrolled`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch enrollments");

  revalidatePath("/courses");

  return response.data;
};

export default async function Page() {
  const locale = getCurrentLocale();
  const { passedEnrollments } = await getPassedEnrollments();

  return (
    <>
      <PageHeader
        title={tt(locale, {
          en: "Course Evaluation",
          ar: "تقييم المقررات",
        })}
        actions={[]}
      />
      <CardGrid>
        {passedEnrollments.map((enrollment: any, i: number) => (
          <Card>
            <p>{tt(locale, enrollment.course.name)}</p>
            <ButtonLink href={`/evaluate/${enrollment._id}`}>
              {tt(locale, {
                en: "Evaluate",
                ar: "تقييم",
              })}
            </ButtonLink>
          </Card>
        ))}
      </CardGrid>
    </>
  );
}
