import { getAllJobs, getAllTags } from "@/libs/prismic";
import OffresClient from "./_components/OffresClient";

export default async function OffresPage() {
  const [{ jobs }, tags] = await Promise.all([
    getAllJobs({ pageSize: 100 }),
    getAllTags(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <OffresClient jobs={jobs} tags={tags} />
    </div>
  );
}
