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
  const allDeps = [{ code: "all", name: { en: "All departments" } }];
  const allLevels = ["All levels"];
  return (
    <div className={`rounded-lg w-96 p-4 ${severityColor} shadow-md`}>
      <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
      <p className="text-gray-600 mb-4">{announcement.content}</p>
      <div className="flex flex-wrap gap-2">
        {(announcement.levels ?? allLevels).map((level: any) => (
          <div key={level} className="rounded-full px-2 py-1 text-sm ">
            {level}
          </div>
        ))}
        {(announcement.departments ?? allDeps).map((department: any) => (
          <div key={department.code} className="rounded-full px-2 py-1 text-sm">
            {department.name.en}
          </div>
        ))}
      </div>
      <CreatedAt date={announcement.createdAt} />
    </div>
  );
}
