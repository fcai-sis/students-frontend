import { H1, H6 } from "@/components/H";
import TextInputField from "@/components/TextInputField";
import { getI18n } from "@/locales/server";
import { AnnouncementModel, getAnnouncements } from "./api";

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
      <H6>My Schedule</H6>
    </div>
  );
}

function getAnnouncementColor(announcement: AnnouncementModel): string {
  switch (announcement.severity) {
    case "info":
      return "bg-blue-400";
    case "warning":
      return "bg-yellow-400";
    case "danger":
      return "bg-red-400";
    default:
      return "bg-gray-100";
  }
}


async function Announcements() {
  const announcements = await getAnnouncements();
  return (
    <div>
      <H6>Announcements</H6>
      <ul>
        {announcements.map((announcement) => (
          <div className={`max-w-sm rounded overflow-hidden shadow-lg ${getAnnouncementColor(announcement)}`}
            key={announcement.title}>
            <div className='px-6 py-4'>
              <div>
                <p className='text-gray-700 font-bold'>
                  {announcement.title}
                </p>
                <p className='text-gray-700 text-base'>
                  {announcement.content}
                </p>
              </div>
            </div>
            <div className='px-6 py-4 flex justify-between items-center'>
              <p className='text-gray-200 text-sm '>
                {announcement.createdAt}
              </p>
            </div>
          </div>
        ))}
      </ul >
    </div >
  );
}


