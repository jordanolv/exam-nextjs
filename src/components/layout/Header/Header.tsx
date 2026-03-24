"use client";

import Link from "next/link";
import Image from "next/image";
import { useProfilStore } from "@/store/profil.store";

export default function Header() {
  const pinnedCount = useProfilStore((state) => state.pinnedJobs.length);

  return (
    <header className="bg-[#0d1b3e] border-b-2 border-[#2563eb]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="DEV" width={80} height={32} priority />
        </Link>

        <Link href="/profil" className="flex items-center gap-2 text-white text-sm">
          {pinnedCount > 0 ? (
            <>
              <span>{pinnedCount}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </Link>
      </div>
    </header>
  );
}
