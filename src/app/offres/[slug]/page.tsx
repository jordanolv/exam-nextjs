import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getJobBySlug, getAllJobs } from "@/libs/prismic";

export async function generateStaticParams() {
  const { jobs } = await getAllJobs({ pageSize: 100 });
  return jobs.map((job) => ({ slug: job.uid }));
}
import CandidatureForm from "@/components/forms/CandidatureForm/CandidatureForm";
import PinButton from "@/components/ui/PinButton/PinButton";

type JobPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};
  return { title: `${job.title} — DEV` };
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) notFound();

  const formattedDate = job.publicationDate
    ? new Date(job.publicationDate).toLocaleDateString("fr-FR")
    : "";

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/offres"
        className="inline-block bg-[#2563eb] text-white text-sm px-4 py-1.5 rounded mb-8 hover:bg-blue-700 transition-colors"
      >
        &lt; Voir toutes les offres
      </Link>

      {formattedDate && (
        <div className="flex items-center gap-1 text-xs text-[#2563eb] mb-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {formattedDate}
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
        <PinButton job={{ uid: job.uid, title: job.title, technologies: job.technologies, pinnedAt: "" }} />
      </div>
      <div className="w-16 h-1 bg-[#2563eb] mb-6" />

      {job.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {job.technologies.map((tech) => (
            <Link
              key={tech}
              href={`/offres?tag=${encodeURIComponent(tech)}`}
              className="border border-[#2563eb] text-[#2563eb] text-sm px-3 py-1 rounded hover:bg-[#2563eb] hover:text-white transition-colors"
            >
              {tech}
            </Link>
          ))}
        </div>
      )}

      <div className="text-gray-700 text-sm leading-relaxed mb-12 space-y-4">
        {Array.isArray(job.description)
          ? job.description.map((block: { text?: string }, i: number) => (
              <p key={i}>{block.text}</p>
            ))
          : <p>{String(job.description)}</p>}
      </div>

      <div className="border-t border-gray-200 pt-8">
        <CandidatureForm
          jobUid={job.uid}
          jobTitle={job.title}
          adminEmails={job.adminEmails}
        />
      </div>
    </div>
  );
}
