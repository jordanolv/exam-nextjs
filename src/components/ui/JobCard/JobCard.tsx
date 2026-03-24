"use client";

import Link from "next/link";
import clsx from "clsx";
import { useProfilStore } from "@/store/profil.store";
import type { Job } from "@/types/job";

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const pinnedJobs = useProfilStore((state) => state.pinnedJobs);
  const pinJob = useProfilStore((state) => state.pinJob);
  const unpinJob = useProfilStore((state) => state.unpinJob);

  const pinned = pinnedJobs.some((j) => j.uid === job.uid);

  function togglePin(e: React.MouseEvent) {
    e.preventDefault();
    if (pinned) {
      unpinJob(job.uid);
    } else {
      pinJob({
        uid: job.uid,
        title: job.title,
        technologies: job.technologies,
        pinnedAt: new Date().toISOString(),
      });
    }
  }

  const formattedDate = job.publicationDate
    ? new Date(job.publicationDate).toLocaleDateString("fr-FR")
    : "";

  return (
    <Link
      href={`/offres/${job.uid}`}
      className="bg-white rounded border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-bold text-gray-900 text-base">{job.title}</h2>
        <button
          onClick={togglePin}
          aria-label={pinned ? "Retirer des favoris" : "Enregistrer l'offre"}
          className="shrink-0 text-gray-400 hover:text-[#2563eb] transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={pinned ? "#2563eb" : "none"}
            stroke={pinned ? "#2563eb" : "currentColor"}
            strokeWidth="2"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {formattedDate && (
        <div className="flex items-center gap-1 text-xs text-[#2563eb]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {formattedDate}
        </div>
      )}

      {job.technologies.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap text-xs text-[#2563eb]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          {job.technologies.join(", ")}
        </div>
      )}

      <p className={clsx("text-sm text-gray-600 leading-relaxed line-clamp-2")}>
        {typeof job.description === "string"
          ? job.description
          : Array.isArray(job.description) && job.description[0]
          ? (job.description[0] as { text?: string }).text ?? ""
          : ""}
      </p>
    </Link>
  );
}
