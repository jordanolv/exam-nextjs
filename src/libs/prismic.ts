import * as prismic from "@prismicio/client";
import type { Job, JobDocument } from "@/types/job";
import sm from "../../slicemachine.config.json";

const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || sm.repositoryName;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

export const prismicClient = prismic.createClient(repositoryName, {
  accessToken,
});

function documentToJob(doc: JobDocument): Job {
  return {
    uid: doc.uid!,
    title: doc.data.title ?? "",
    description: doc.data.description,
    technologies: (doc.data.technologies ?? [])
      .map((item) => item.technology ?? "")
      .filter(Boolean),
    adminEmails: (doc.data.admin_emails ?? [])
      .map((item) => item.email ?? "")
      .filter(Boolean),
    publicationDate:
      doc.data.publication_date ?? doc.first_publication_date ?? "",
  };
}

export async function getAllJobs(options?: {
  page?: number;
  pageSize?: number;
  tag?: string;
}): Promise<{ jobs: Job[]; totalPages: number }> {
  const filters: string[] = [
    prismic.filter.at("document.type", "job"),
  ];

  if (options?.tag) {
    filters.push(
      prismic.filter.at("my.job.technologies.technology", options.tag)
    );
  }

  const response = await prismicClient.get({
    filters,
    orderings: [
      { field: "my.job.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    pageSize: options?.pageSize ?? 9,
    page: options?.page ?? 1,
  });

  return {
    jobs: response.results.map((doc) => documentToJob(doc as JobDocument)),
    totalPages: response.total_pages,
  };
}

export async function getLatestJobs(limit: number = 6): Promise<Job[]> {
  const response = await prismicClient.get({
    filters: [prismic.filter.at("document.type", "job")],
    orderings: [
      { field: "my.job.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    pageSize: limit,
  });

  return response.results.map((doc) => documentToJob(doc as JobDocument));
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const doc = await prismicClient.getByUID("job", slug);
    return documentToJob(doc as JobDocument);
  } catch {
    return null;
  }
}

export async function getJobsByUids(uids: string[]): Promise<Job[]> {
  if (uids.length === 0) return [];

  const response = await prismicClient.get({
    filters: [
      prismic.filter.at("document.type", "job"),
      prismic.filter.in("my.job.uid", uids),
    ],
  });

  return response.results.map((doc) => documentToJob(doc as JobDocument));
}

export async function getAllTags(): Promise<string[]> {
  const response = await prismicClient.get({
    filters: [prismic.filter.at("document.type", "job")],
    pageSize: 100,
  });

  const allTags = response.results.flatMap((doc) =>
    ((doc as JobDocument).data.technologies ?? [])
      .map((item) => item.technology ?? "")
      .filter(Boolean)
  );

  return [...new Set(allTags)].sort();
}
