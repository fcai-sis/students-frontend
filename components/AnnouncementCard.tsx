import { AnnouncementSeveritiesEnum } from "@fcai-sis/shared-models";
import { CreatedAt } from "./CreatedAt";

export default async function AnnouncementCard({
  announcement,
}: {
  announcement: any;
}) {
  const severityColor =
    announcement.severity === AnnouncementSeveritiesEnum[0]
      ? "bg-blue-100"
      : announcement.severity === AnnouncementSeveritiesEnum[1]
      ? "bg-yellow-100"
      : "bg-red-100";
  return (
    <div className={`border border-black w-72 p-4 ${severityColor}`}>
      <h3>{announcement.title}</h3>
      <p>{announcement.content}</p>
      <p>
        Level: <b>{announcement.level ?? "All"}</b>
      </p>
      Department:{" "}
      <b>
        {announcement.departments
          ? announcement.departments
              .map((department: any) => department.code)
              .join(", ")
          : "All"}
      </b>
      <CreatedAt date={announcement.createdAt} />
    </div>
  );
}
