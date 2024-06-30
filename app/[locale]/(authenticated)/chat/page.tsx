import { getAccessToken } from "@/lib";
import Chat, { ContactType } from "./Chat";
import {
  InstructorModel,
  TeachingAssistantModel,
} from "@fcai-sis/shared-models";
import dbConnect from "@/database";

export default async function Page() {
  await dbConnect();
  const accessToken = await getAccessToken();

  const [instructors, tas] = await Promise.all([
    InstructorModel.find(),
    TeachingAssistantModel.find(),
  ]);

  const contacts: ContactType[] = [
    ...instructors.map((instructor) => ({
      fullName: instructor.fullName,
      role: "instructor",
      _id: instructor._id,
    })),
    ...tas.map((ta) => ({
      fullName: ta.fullName,
      role: "ta",
      _id: ta._id,
    })),
  ];

  return (
    <>
      <h1>Chat</h1>
      <Chat accessToken={accessToken} contacts={contacts} />
    </>
  );
}
