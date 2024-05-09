export type AnnouncementModel = {
  /**
   *{
      "authorId": {
        "username": "ayman"
      },
      "title": "This is a test announcement",
      "content": "yo",
      "academicLevel": null,
      "department": [],
      "updatedAt": null,
      "severity": "info",
      "createdAt": "2024-05-09T12:15:13.001Z"
    }
   */
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

  console.log(announcements);

  return announcements.announcements;
}
