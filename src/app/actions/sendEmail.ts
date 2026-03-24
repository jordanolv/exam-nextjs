"use server";

export async function sendCandidatureEmail(formData: FormData) {
  const message = formData.get("message")?.toString() ?? "";
  const jobTitle = formData.get("jobTitle")?.toString() ?? "";
  const adminEmails = formData.get("adminEmails")?.toString() ?? "";

  console.log("Candidature reçue :", { jobTitle, adminEmails, message });

  /* Envoi de l'email avec nodemailer */
}
