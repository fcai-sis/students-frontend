import { getProfileAction } from "./actions";
import ProfileDisplay from "./ProfileDisplay";

export default async function Page() {
  const profileDataResponse = await getProfileAction();

  return (
    <>
      <ProfileDisplay profileData={profileDataResponse} />
    </>
  );
}
