import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PinnedJob, CandidatureRecord } from "@/types/job";

type ProfilState = {
  pinnedJobs: PinnedJob[];
  candidatures: CandidatureRecord[];
  pinJob: (job: PinnedJob) => void;
  unpinJob: (uid: string) => void;
  isPinned: (uid: string) => boolean;
  addCandidature: (candidature: CandidatureRecord) => void;
};

export const useProfilStore = create<ProfilState>()(
  persist(
    (set, get) => ({
      pinnedJobs: [],
      candidatures: [],

      pinJob: (job) =>
        set((state) => ({
          pinnedJobs: state.pinnedJobs.some((j) => j.uid === job.uid)
            ? state.pinnedJobs
            : [...state.pinnedJobs, job],
        })),

      unpinJob: (uid) =>
        set((state) => ({
          pinnedJobs: state.pinnedJobs.filter((job) => job.uid !== uid),
        })),

      isPinned: (uid) => get().pinnedJobs.some((job) => job.uid === uid),

      addCandidature: (candidature) =>
        set((state) => ({
          candidatures: [candidature, ...state.candidatures],
        })),
    }),
    { name: "dev-profil" }
  )
);
