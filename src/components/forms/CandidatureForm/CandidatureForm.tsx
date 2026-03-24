"use client";

import { useState } from "react";
import Form from "next/form";
import { useProfilStore } from "@/store/profil.store";
import { sendCandidatureEmail } from "@/app/actions/sendEmail";

type CandidatureFormProps = {
  jobUid: string;
  jobTitle: string;
  adminEmails: string[];
};

export default function CandidatureForm({ jobUid, jobTitle, adminEmails }: CandidatureFormProps) {
  const [sent, setSent] = useState(false);
  const addCandidature = useProfilStore((state) => state.addCandidature);

  async function handleAction(formData: FormData) {
    await sendCandidatureEmail(formData);
    addCandidature({ uid: jobUid, title: jobTitle, sentAt: new Date().toISOString() });
    setSent(true);
  }

  if (sent) {
    return (
      <p className="text-[#2563eb] font-medium text-lg leading-snug">
        Merci d&apos;avoir postulé à cette offre,
        <br />
        nous reviendrons vers vous très prochainement !
      </p>
    );
  }

  return (
    <Form action={handleAction} className="flex flex-col gap-3">
      <input type="hidden" name="jobTitle" value={jobTitle} />
      <input type="hidden" name="adminEmails" value={adminEmails.join(",")} />
      <textarea
        name="message"
        placeholder="Postuler à cette offre ..."
        rows={5}
        required
        className="w-full bg-white border border-[#2563eb] rounded p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#2563eb] text-white px-5 py-2 text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Envoyer
        </button>
      </div>
    </Form>
  );
}
