const REPOSITORY = "examnextjs-jordan";
const WRITE_TOKEN = process.env.PRISMIC_WRITE_TOKEN;

if (!WRITE_TOKEN) {
  console.error("❌ PRISMIC_WRITE_TOKEN manquant");
  process.exit(1);
}

const headers = {
  "Authorization": `Bearer ${WRITE_TOKEN}`,
  "repository": REPOSITORY,
  "Content-Type": "application/json",
};

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const jobs = [
  { uid: "dev-react-paris", title: "Développeur React - Paris", description: "Développement d'interfaces React pour une plateforme de gestion RH utilisée par 50 000 entreprises.", technologies: ["React", "TypeScript", "GraphQL"], adminEmails: ["rh@rh-platform.fr"], publicationDate: "2026-03-24" },
  { uid: "dev-next-ecommerce", title: "Développeur Next.js E-commerce", description: "Refonte d'un site e-commerce sous Next.js avec optimisation SEO et performances.", technologies: ["Next.js", "TypeScript", "Node.js"], adminEmails: ["tech@shop.fr"], publicationDate: "2026-03-23" },
  { uid: "dev-vue-saas", title: "Développeur Vue.js SaaS", description: "Développement de nouvelles fonctionnalités sur notre SaaS Vue.js dédié à la logistique.", technologies: ["Vue.js", "Node.js", "PostgreSQL"], adminEmails: ["jobs@logistique.fr"], publicationDate: "2026-03-22" },
  { uid: "dev-node-api-rest", title: "Développeur Node.js API REST", description: "Conception et maintenance d'APIs REST Node.js dans un contexte d'intégration continue.", technologies: ["Node.js", "TypeScript", "Docker"], adminEmails: ["dev@api.fr"], publicationDate: "2026-03-21" },
  { uid: "dev-python-backend", title: "Développeur Python Backend", description: "Développement de services backend Python déployés sur AWS dans une architecture serverless.", technologies: ["Python", "AWS", "PostgreSQL"], adminEmails: ["hiring@serverless.fr"], publicationDate: "2026-03-20" },
  { uid: "dev-react-native-ios", title: "Développeur React Native iOS/Android", description: "Application mobile React Native pour le secteur de la santé connectée.", technologies: ["React Native", "TypeScript", "GraphQL"], adminEmails: ["mobile@sante.fr"], publicationDate: "2026-03-19" },
  { uid: "dev-angular-enterprise", title: "Développeur Angular Enterprise", description: "Mission longue durée sur une application Angular critique pour un client bancaire.", technologies: ["Angular", "TypeScript", "Node.js"], adminEmails: ["recrutement@esn.fr"], publicationDate: "2026-03-18" },
  { uid: "devops-aws-docker", title: "DevOps AWS / Docker", description: "Orchestration de conteneurs Docker sur AWS ECS et gestion des environnements de déploiement.", technologies: ["AWS", "Docker", "Python"], adminEmails: ["ops@cloud.fr"], publicationDate: "2026-03-17" },
  { uid: "dev-graphql-fullstack", title: "Développeur Fullstack GraphQL", description: "Architecture GraphQL complète avec résolveurs Node.js et client React.", technologies: ["GraphQL", "React", "Node.js"], adminEmails: ["cto@graph.fr"], publicationDate: "2026-03-16" },
  { uid: "dev-typescript-backend", title: "Développeur TypeScript Backend", description: "Backend TypeScript avec Node.js et PostgreSQL pour une fintech en pleine expansion.", technologies: ["TypeScript", "Node.js", "PostgreSQL"], adminEmails: ["hr@fintech.fr"], publicationDate: "2026-03-15" },
  { uid: "dev-react-fintech", title: "Développeur React Fintech", description: "Tableaux de bord financiers complexes avec React et recharts. Contexte hautement sécurisé.", technologies: ["React", "TypeScript", "AWS"], adminEmails: ["tech@finance.fr"], publicationDate: "2026-03-14" },
  { uid: "dev-vue-typescript", title: "Développeur Vue.js / TypeScript", description: "Migration d'une application Vue 2 vers Vue 3 avec TypeScript dans une équipe de 6 devs.", technologies: ["Vue.js", "TypeScript", "Docker"], adminEmails: ["rh@migration.fr"], publicationDate: "2026-03-13" },
  { uid: "dev-python-ml", title: "Développeur Python / ML", description: "Développement d'APIs Python exposant des modèles de machine learning pour nos clients.", technologies: ["Python", "Docker", "AWS"], adminEmails: ["data@ml.fr"], publicationDate: "2026-03-12" },
  { uid: "dev-node-microservices", title: "Développeur Node.js Microservices", description: "Architecture microservices Node.js avec communication via GraphQL et déploiement Docker.", technologies: ["Node.js", "GraphQL", "Docker"], adminEmails: ["arch@micro.fr"], publicationDate: "2026-03-11" },
  { uid: "dev-react-design-system", title: "Développeur React Design System", description: "Création et maintenance d'un design system React avec TypeScript et Storybook.", technologies: ["React", "TypeScript", "Node.js"], adminEmails: ["design@system.fr"], publicationDate: "2026-03-10" },
  { uid: "dev-next-cms", title: "Développeur Next.js CMS Headless", description: "Intégration de CMS headless avec Next.js et déploiement sur AWS CloudFront.", technologies: ["Next.js", "AWS", "TypeScript"], adminEmails: ["dev@cms.fr"], publicationDate: "2026-03-09" },
  { uid: "dev-angular-rxjs", title: "Développeur Angular / RxJS", description: "Développement de flux de données réactifs avec RxJS dans une application Angular complexe.", technologies: ["Angular", "TypeScript", "GraphQL"], adminEmails: ["rh@reactive.fr"], publicationDate: "2026-03-08" },
  { uid: "dev-fullstack-aws", title: "Développeur Fullstack AWS", description: "Développement fullstack avec Lambda, API Gateway, React et PostgreSQL RDS.", technologies: ["AWS", "React", "PostgreSQL"], adminEmails: ["cloud@fullstack.fr"], publicationDate: "2026-03-07" },
  { uid: "dev-vue-nuxt", title: "Développeur Vue.js / Nuxt", description: "Application Nuxt.js SSR pour un media digital avec forte contrainte de performance.", technologies: ["Vue.js", "TypeScript", "Node.js"], adminEmails: ["tech@media.fr"], publicationDate: "2026-03-06" },
  { uid: "dev-react-native-senior", title: "Développeur React Native Senior", description: "Architecture et développement d'une super-app React Native pour un groupe retail.", technologies: ["React Native", "TypeScript", "AWS"], adminEmails: ["mobile@retail.fr"], publicationDate: "2026-03-05" },
  { uid: "dev-python-django", title: "Développeur Python Django", description: "Développement d'un backoffice Django avec API REST consommée par une app React.", technologies: ["Python", "React", "PostgreSQL"], adminEmails: ["rh@django.fr"], publicationDate: "2026-03-04" },
  { uid: "dev-graphql-react-native", title: "Développeur GraphQL / React Native", description: "Client GraphQL Apollo intégré dans une application React Native pour l'industrie.", technologies: ["GraphQL", "React Native", "TypeScript"], adminEmails: ["tech@industry.fr"], publicationDate: "2026-03-03" },
  { uid: "dev-node-postgres", title: "Développeur Node.js / PostgreSQL", description: "Optimisation de requêtes PostgreSQL et développement d'une API Node.js haute performance.", technologies: ["Node.js", "PostgreSQL", "TypeScript"], adminEmails: ["perf@db.fr"], publicationDate: "2026-03-02" },
  { uid: "dev-docker-ci", title: "Développeur DevOps CI/CD", description: "Mise en place de pipelines CI/CD avec Docker et déploiement automatisé sur AWS.", technologies: ["Docker", "AWS", "Python"], adminEmails: ["devops@ci.fr"], publicationDate: "2026-03-01" },
  { uid: "dev-react-b2b", title: "Développeur React B2B", description: "Plateforme B2B React avec gestion de droits complexes et intégration GraphQL.", technologies: ["React", "GraphQL", "PostgreSQL"], adminEmails: ["jobs@b2b.fr"], publicationDate: "2026-02-28" },
  { uid: "dev-vue-pwa", title: "Développeur Vue.js PWA", description: "Développement d'une Progressive Web App Vue.js déployée sur AWS pour le secteur retail.", technologies: ["Vue.js", "AWS", "TypeScript"], adminEmails: ["pwa@retail.fr"], publicationDate: "2026-02-27" },
  { uid: "dev-angular-node", title: "Développeur Angular / Node.js", description: "Application Angular fullstack avec backend Node.js et base de données PostgreSQL.", technologies: ["Angular", "Node.js", "PostgreSQL"], adminEmails: ["rh@fullangular.fr"], publicationDate: "2026-02-26" },
  { uid: "dev-next-typescript-senior", title: "Développeur Next.js Senior", description: "Lead frontend sur une application Next.js à fort trafic avec TypeScript strict.", technologies: ["Next.js", "TypeScript", "Docker"], adminEmails: ["lead@next.fr"], publicationDate: "2026-02-25" },
  { uid: "dev-python-aws-senior", title: "Développeur Python / AWS Senior", description: "Architecture de solutions Python serverless sur AWS pour des clients grands comptes.", technologies: ["Python", "AWS", "Docker"], adminEmails: ["senior@aws.fr"], publicationDate: "2026-02-24" },
  { uid: "dev-react-node-startup", title: "Développeur React / Node.js Startup", description: "Poste polyvalent dans une startup early-stage. Stack React et Node.js, fort impact produit.", technologies: ["React", "Node.js", "TypeScript"], adminEmails: ["founder@startup.fr"], publicationDate: "2026-02-23" },
];

console.log(`🚀 Création de ${jobs.length} offres...`);

for (const job of jobs) {
  const body = {
    title: job.title,
    type: "job",
    uid: job.uid,
    lang: "en-us",
    data: {
      title: job.title,
      description: [{ type: "paragraph", text: job.description, spans: [] }],
      publication_date: job.publicationDate,
      technologies: job.technologies.map((t) => ({ technology: t })),
      admin_emails: job.adminEmails.map((e) => ({ email: e })),
    },
  };

  const res = await fetch("https://migration.prismic.io/documents", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (res.ok) {
    console.log(`✅ ${job.title}`);
  } else {
    const err = await res.json();
    console.error(`❌ ${job.title}:`, err.message);
  }

  await delay(1500);
}

console.log("\n✅ Terminé ! Publie les documents sur prismic.io");
