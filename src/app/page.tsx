import Link from "next/link";
import Image from "next/image";
import { getLatestJobs } from "@/libs/prismic";
import JobCard from "@/components/ui/JobCard/JobCard";

export default async function HomePage() {
  const jobs = await getLatestJobs(6);

  return (
    <div>
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src="/hero.png"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Nos dernières opportunités
        </h1>
        <div className="w-16 h-1 bg-[#2563eb] mb-8" />

        {jobs.length === 0 ? (
          <p className="text-gray-500">Aucune offre disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <JobCard key={job.uid} job={job} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link
            href="/offres"
            className="bg-[#2563eb] text-white px-6 py-2.5 text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Voir toutes les offres
          </Link>
        </div>
      </div>
    </div>
  );
}
