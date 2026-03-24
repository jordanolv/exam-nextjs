"use client";

import { useState } from "react";
import JobCard from "@/components/ui/JobCard/JobCard";
import type { Job } from "@/types/job";

const PAGE_SIZE = 9;

type OffresClientProps = {
  jobs: Job[];
  tags: string[];
};

export default function OffresClient({ jobs, tags }: OffresClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = activeTag
    ? jobs.filter((job) => job.technologies.includes(activeTag))
    : jobs;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const displayed = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function selectTag(tag: string) {
    setActiveTag(activeTag === tag ? null : tag);
    setPage(1);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Offres d&apos;emploi</h1>
        <span className="text-[#2563eb] text-sm font-medium">
          {filtered.length} offre{filtered.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="w-16 h-1 bg-[#2563eb] mb-6" />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => selectTag(tag)}
              className={`text-sm px-3 py-1 rounded border transition-colors ${
                activeTag === tag
                  ? "bg-[#2563eb] text-white border-[#2563eb]"
                  : "border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white"
              }`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>
      )}

{filtered.length === 0 ? (
        <p className="text-gray-500">Aucune offre pour cette recherche.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((job) => (
              <JobCard key={job.uid} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 text-sm rounded border transition-colors ${
                    p === page
                      ? "bg-[#2563eb] text-white border-[#2563eb]"
                      : "border-gray-300 text-gray-600 hover:border-[#2563eb] hover:text-[#2563eb]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
