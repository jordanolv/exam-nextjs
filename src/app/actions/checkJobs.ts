"use server";

import { getJobsByUids } from "@/libs/prismic";

export async function checkJobsAvailability(uids: string[]): Promise<string[]> {
  const jobs = await getJobsByUids(uids);
  return jobs.map((job) => job.uid);
}
