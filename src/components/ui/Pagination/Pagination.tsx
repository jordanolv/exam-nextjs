"use client";

import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/offres?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors"
      >
        Précédent
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={clsx(
            "px-4 py-2 text-sm border rounded transition-colors",
            page === currentPage
              ? "bg-[#2563eb] text-white border-[#2563eb]"
              : "bg-white border-gray-300 hover:bg-gray-50"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors"
      >
        Suivant
      </button>
    </div>
  );
}
