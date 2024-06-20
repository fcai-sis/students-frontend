import moment from "moment";

export async function CreatedAt({ date }: { date: string }) {
  const createdAtMoment = moment(date);
  return (
    <p>
      <i>
        {createdAtMoment.isSame(moment(), "day")
          ? createdAtMoment.fromNow()
          : createdAtMoment.format("MMMM Do YYYY")}
      </i>
    </p>
  );
}
