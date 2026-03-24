"use server";

import { z } from "zod";
import validator from "validator";
import nodemailer from "nodemailer";

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

  if (!parsed.success) {
    console.error("Validation échouée :", parsed.error.flatten());
    return;
  }

  const message = validator.escape(parsed.data.message);
  const jobTitle = validator.escape(parsed.data.jobTitle);
  const adminEmails = parsed.data.adminEmails;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"DEV Job Board" <${process.env.GMAIL_USER}>`,
      to: adminEmails,
      subject: `Nouvelle candidature — ${jobTitle}`,
      text: message,
      html: `<p><strong>Offre :</strong> ${jobTitle}</p><p><strong>Message :</strong></p><p>${message}</p>`,
    });
    console.log("Email envoyé :", info.messageId);
  } catch (err) {
    console.error("Erreur envoi email :", err);
  }
}
