import { H1, H6 } from "@/components/H";
import TextInputField from "@/components/TextInputField";
import { getI18n } from "@/locales/server";

export default function Home() {
  return (
    <div>
      <GlobalSearch />
      <MyStats />
      <Schedule />
      <Announcements />
    </div>
  );
}

async function GlobalSearch() {
  const t = await getI18n();
  return (
    <div>
      <H1>{t("globalSearch")}</H1>
      <TextInputField placeholder={t("search")} />
    </div>
  );
}

function MyStats() {
  return (
    <div>
      <div>
        <H6>My GPA</H6>
        <p>4.0</p>
      </div>
      <div>
        <H6>Completed Credit Hours</H6>
        <p>120</p>
      </div>
    </div>
  );
}

function Schedule() {
  return (
    <div>
      <h1>Schedule</h1>

    </div>
  );
}

function Announcements() {
  return (
    <div>
      <h1>Announcements</h1>
    </div>
  );
}


