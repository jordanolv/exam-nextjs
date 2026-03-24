import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales — DEV",
};

export default function MentionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentions Légales</h1>
      <div className="w-16 h-1 bg-[#2563eb] mb-10" />

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#2563eb] mb-4">Éditeur du site</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Le présent site est édité par DEV, plateforme de mise en relation entre
          candidats et recruteurs dans le secteur du numérique. Toute reproduction,
          même partielle, du contenu de ce site est interdite sans autorisation préalable.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#2563eb] mb-4">Données personnelles</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Les informations enregistrées sur ce site (offres enregistrées, candidatures)
          sont stockées localement dans votre navigateur et ne sont pas transmises à
          des tiers. Conformément à la loi Informatique et Libertés du 6 janvier 1978,
          vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression
          des données vous concernant.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#2563eb] mb-4">Hébergement</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco,
          California 94104, États-Unis.
        </p>
      </section>
    </div>
  );
}
