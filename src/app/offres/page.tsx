import { getAllJobs, getAllTags } from "@/libs/prismic";
import OffresClient from "./_components/OffresClient";

export default async function OffresPage() {
  const [{ jobs }, tags] = await Promise.all([
    getAllJobs({ pageSize: 100 }),
    getAllTags(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Offres d&apos;emploi
      </h1>
      <div className="w-16 h-0.5 bg-[#2563eb] mb-6" />
      <OffresClient jobs={jobs} tags={tags} />
    </div>
  );
}
