import { getAccessToken } from "@/lib";

export type AnnouncementModel = {
  authorId: {
    username: string;
  };
  title: string;
  content: string;
  academicLevel: string | null;
  department: string[];
  updatedAt: string | null;
  severity: string;
  createdAt: string;
};

export async function getAnnouncements(): Promise<AnnouncementModel[]> {
  const response = await fetch(`${process.env.ANNOUNCEMENTS_API_URL}/?page=1&pageSize=10`);

  const announcements = await response.json();

  return announcements.announcements;
}

export async function getSchedule(): Promise<any> {
  const accessToken = await getAccessToken();
  const response = await fetch(`${process.env.SCHEDULE_API_URL}/schedules/student/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const schedule = await response.json();

  console.log(schedule);

  return schedule.schedule;
}
