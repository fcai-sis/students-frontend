export default async function AnnouncementCard({
  announcement,
}: {
  announcement: any;
}) {
  const severityColor =
    announcement.severity === "info"
      ? "bg-blue-100"
      : announcement.severity === "warning"
      ? "bg-yellow-100"
      : "bg-red-100";
  return (
    <div className={`border border-black w-64 p-4 ${severityColor}`}>
      <h3>{announcement.title}</h3>
      <p>{announcement.content}</p>
    </div>
  );
}
