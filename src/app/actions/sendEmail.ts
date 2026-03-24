"use server";

import { z } from "zod";
import validator from "validator";

const candidatureSchema = z.object({
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  jobTitle: z.string().min(1),
  adminEmails: z.string().min(1),
});

export async function sendCandidatureEmail(formData: FormData) {
  const parsed = candidatureSchema.safeParse({
    message: formData.get("message")?.toString() ?? "",
    jobTitle: formData.get("jobTitle")?.toString() ?? "",
    adminEmails: formData.get("adminEmails")?.toString() ?? "",
  });

  if (!parsed.success) return;

  const message = validator.escape(parsed.data.message);
  const jobTitle = validator.escape(parsed.data.jobTitle);
  const adminEmails = parsed.data.adminEmails;

  console.log("Candidature reçue :", { jobTitle, adminEmails, message });

  /* Envoi de l'email avec nodemailer */
}
