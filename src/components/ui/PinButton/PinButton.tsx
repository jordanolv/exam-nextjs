"use client";

import { useProfilStore } from "@/store/profil.store";
import type { PinnedJob } from "@/types/job";

type PinButtonProps = {
  job: PinnedJob;
};

export default function PinButton({ job }: PinButtonProps) {
  const pinnedJobs = useProfilStore((state) => state.pinnedJobs);
  const pinJob = useProfilStore((state) => state.pinJob);
  const unpinJob = useProfilStore((state) => state.unpinJob);

  const pinned = pinnedJobs.some((j) => j.uid === job.uid);

  return (
    <button
      onClick={() => (pinned ? unpinJob(job.uid) : pinJob({ ...job, pinnedAt: new Date().toISOString() }))}
      aria-label={pinned ? "Retirer des favoris" : "Enregistrer l'offre"}
      className="flex items-center gap-2 border border-[#2563eb] text-[#2563eb] text-sm px-4 py-1.5 rounded hover:bg-[#2563eb] hover:text-white transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={pinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {pinned ? "Enregistré" : "Enregistrer"}
    </button>
  );
}
