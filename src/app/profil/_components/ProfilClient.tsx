"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfilStore } from "@/store/profil.store";
import JobCard from "@/components/ui/JobCard/JobCard";
import { checkJobsAvailability } from "@/app/actions/checkJobs";
import type { Job } from "@/types/job";

export default function ProfilClient() {
  const pinnedJobs = useProfilStore((state) => state.pinnedJobs);
  const unpinJob = useProfilStore((state) => state.unpinJob);
  const candidatures = useProfilStore((state) => state.candidatures);
  const [unavailableUids, setUnavailableUids] = useState<string[]>([]);

  useEffect(() => {
    if (pinnedJobs.length === 0) return;
    const uids = pinnedJobs.map((j) => j.uid);
    checkJobsAvailability(uids).then((availableUids) => {
      const unavailable = uids.filter((uid) => !availableUids.includes(uid));
      setUnavailableUids(unavailable);
    });
  }, [pinnedJobs.length]);

  const pinnedAsJobs: Job[] = pinnedJobs.map((p) => ({
    uid: p.uid,
    title: p.title,
    description: [],
    technologies: p.technologies,
    adminEmails: [],
    publicationDate: p.pinnedAt,
  }));

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenue</h1>
      <div className="w-16 h-1 bg-[#2563eb] mb-10" />

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[#2563eb] mb-6">
          Offres enregistrées
        </h2>

        {pinnedAsJobs.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Aucune offre enregistrée.{" "}
            <Link href="/offres" className="text-[#2563eb] underline">
              Parcourir les offres
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pinnedAsJobs.map((job) =>
              unavailableUids.includes(job.uid) ? (
                <div
                  key={job.uid}
                  className="bg-white rounded border border-red-200 p-5 flex flex-col gap-2 opacity-60"
                >
                  <p className="font-bold text-gray-900 text-base">{job.title}</p>
                  <p className="text-xs text-red-500">Cette offre n&apos;est plus disponible</p>
                  <button
                    onClick={() => unpinJob(job.uid)}
                    className="text-xs text-gray-400 hover:text-red-500 underline text-left"
                  >
                    Retirer
                  </button>
                </div>
              ) : (
                <JobCard key={job.uid} job={job} />
              )
            )}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#2563eb] mb-6">
          Historique des candidatures
        </h2>

        {candidatures.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucune candidature envoyée.</p>
        ) : (
          <div className="flex flex-col divide-y divide-gray-200 border-t border-gray-200">
            {candidatures.map((c, i) => (
              <div key={i} className="py-4">
                <p className="text-xs text-[#2563eb] mb-1">
                  {new Date(c.sentAt).toLocaleDateString("fr-FR")}
                </p>
                <Link
                  href={`/offres/${c.uid}`}
                  className="font-semibold text-gray-900 hover:underline"
                >
                  {c.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
