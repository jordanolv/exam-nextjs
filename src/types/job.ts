import type { PrismicDocument, RichTextField, KeyTextField, DateField, GroupField } from "@prismicio/client";

export type JobDocument = PrismicDocument<{
  title: KeyTextField;
  description: RichTextField;
  technologies: GroupField<{ technology: KeyTextField }>;
  admin_emails: GroupField<{ email: KeyTextField }>;
  publication_date: DateField;
}>;

export type Job = {
  uid: string;
  title: string;
  description: RichTextField;
  technologies: string[];
  adminEmails: string[];
  publicationDate: string;
};

export type PinnedJob = {
  uid: string;
  title: string;
  technologies: string[];
  pinnedAt: string;
};

export type CandidatureRecord = {
  uid: string;
  title: string;
  technologies: string[];
  description: string;
  sentAt: string;
};
