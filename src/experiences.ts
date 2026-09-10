import { locale, type Locale } from './i18n'

export interface Experience {
  company?: string
  role: Record<Locale, string>
  period: Record<Locale, string>
  description: Record<Locale, string>
}

export function tr(m: Record<Locale, string>): string {
  return m[locale.value]
}

export const experiences: Experience[] = [
  {
    company: 'Ayruu',
    role: { fr: 'Chief Technology Officer', en: 'Chief Technology Officer' },
    period: { fr: 'juin 2020 - mai 2026', en: 'Jun 2020 - May 2026' },
    description: {
      fr: "De la création du produit à la production : conception, architecture, mise en place CI/CD et observabilité, constitution et encadrement de l'équipe (~6 personnes).",
      en: 'From product inception to production: design, architecture, CI/CD and observability setup, building and leading the engineering team (~6 people).',
    },
  },
  {
    company: 'Wynd',
    role: { fr: 'Lead Developer', en: 'Lead Developer' },
    period: { fr: 'avr. 2019 - juin 2020', en: 'Apr 2019 - Jun 2020' },
    description: {
      fr: "Lead d'une équipe de 6 personnes en squads (modèle Spotify), coordination avec les autres équipes et un PO. Mise en place d'un moteur de règles de discounts poussées.",
      en: 'Led a 6-person squad team (Spotify model), coordinating with other teams and a PO. Built an advanced discount-rules engine.',
    },
  },
  {
    company: 'ParkingMap',
    role: { fr: 'Lead Developer', en: 'Lead Developer' },
    period: { fr: 'juin 2018 - avr. 2019', en: 'Jun 2018 - Apr 2019' },
    description: {
      fr: 'Architecture micro-services pour une expérience temps réel des disponibilités de places. Message broker, API gateway, intégration continue.',
      en: 'Micro-service architecture for a real-time parking-availability experience. Message broker, API gateway, continuous integration.',
    },
  },
  {
    company: 'LEOO',
    role: {
      fr: 'Lead Developer Symfony 2 & 3',
      en: 'Lead Developer, Symfony 2 & 3',
    },
    period: { fr: 'mars 2016 - juin 2018', en: 'Mar 2016 - Jun 2018' },
    description: {
      fr: "Management d'une équipe (4-6 personnes), évaluation et planification. Boutiques e-commerce Symfony 2/3 autour d'API full-REST, en Scrumban et architecture micro-services.",
      en: 'Managed a team (4-6 people), estimation and planning. Symfony 2/3 e-commerce shops around full-REST APIs, using Scrumban and a micro-services architecture.',
    },
  },
  {
    company: 'KerniX',
    role: { fr: 'Développeur web', en: 'Web Developer' },
    period: { fr: 'juil. 2011 - mars 2016', en: 'Jul 2011 - Mar 2016' },
    description: {
      fr: 'Développement front & back pour des clients variés (Resaplace, Starshipper, Perrier, Afflelou...), souvent e-commerce. Modélisation et optimisation de bases de données.',
      en: 'Front & back development for varied clients (Resaplace, Starshipper, Perrier, Afflelou...), often e-commerce. Database modeling and optimization.',
    },
  },
]
