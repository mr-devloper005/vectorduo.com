import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Find trusted business service providers',
      description: 'Browse verified business listings, compare service providers, and connect with companies for your next project.',
      openGraphTitle: 'Find trusted business service providers',
      openGraphDescription: 'Discover verified agencies, consultants, and service providers through a focused business listing marketplace.',
      keywords: ['business listings', 'service providers', 'company directory', 'agency marketplace'],
    },
    hero: {
      badge: 'Verified business marketplace',
      title: ['Connect with trusted companies', 'for your next project.'],
      description: 'Search business listings by service, budget, location, and expertise. Compare profiles, reviews, and project fit before you reach out.',
      primaryCta: { label: 'Find companies', href: '/listings' },
      secondaryCta: { label: 'Create a listing', href: '/create' },
      searchPlaceholder: 'What business service do you need?',
      focusLabel: 'Popular searches',
      featureCardBadge: 'provider match',
      featureCardTitle: 'Shortlist agencies, consultants, and service firms with confidence.',
      featureCardDescription: 'Use verified listing details, service focus, and review signals to choose the right partner faster.',
    },
    intro: {
      badge: 'Business discovery',
      title: 'Built for buyers who need dependable service providers, not endless browsing.',
      paragraphs: [
        'The marketplace helps teams find agencies, consultants, and specialist firms by organizing listings around real business buying questions.',
        'Every page is shaped for comparison: service categories, location signals, review cues, budget ranges, and direct contact paths stay easy to scan.',
        'Whether a visitor is hiring for design, development, marketing, IT, or operations, the site keeps the path from search to shortlist clear.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Category-led discovery for development, design, marketing, IT, and business services.',
        'Readable provider cards with service focus, location, and trust details.',
        'Buyer-first content that explains how to compare and shortlist companies.',
        'Clear actions for getting listed, contacting providers, and searching the directory.',
      ],
      primaryLink: { label: 'Browse listings', href: '/listings' },
      secondaryLink: { label: 'Search companies', href: '/search' },
    },
    cta: {
      badge: 'Start shortlisting',
      title: 'Find the right company before the first sales call.',
      description: 'Compare business listings, review service focus, and reach out when the fit is clear.',
      primaryCta: { label: 'Browse Listings', href: '/listings' },
      secondaryCta: { label: 'Contact Support', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the marketplace',
    title: 'A clearer way to discover business service providers.',
    description: `${slot4BrandConfig.siteName} helps buyers compare business listings, understand provider strengths, and connect with companies that match their project needs.`,
    paragraphs: [
      'Business buyers often need more than a name and phone number. They need context: services, focus areas, budgets, client signals, and an easy way to decide who belongs on the shortlist.',
      'The platform organizes those details into practical listing pages so teams can move from discovery to outreach without losing momentum.',
      'Providers can use the site to present their expertise clearly, while buyers get a more useful path to compare options before starting a conversation.',
    ],
    values: [
      {
        title: 'Buyer-first comparison',
        description: 'Listings emphasize the details buyers actually compare: service focus, location, budget fit, reputation, and response paths.',
      },
      {
        title: 'Verified-looking structure',
        description: 'Cards, profile pages, and archive filters use trust cues and consistent hierarchy so business information is easier to evaluate.',
      },
      {
        title: 'Clear provider growth',
        description: 'Service firms get a polished place to explain what they do, who they serve, and why buyers should contact them.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Tell us what you need from the business directory.',
    description: 'Ask about listing support, provider verification, category coverage, lead routing, or help finding a company for an active project.',
    formTitle: 'Contact the marketplace team',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Search companies, categories, and provider expertise.',
      description: 'Use keywords, categories, and service types to find the right business listing faster.',
      placeholder: 'Search web design, marketing, IT services, location...',
    },
    resultsTitle: 'Latest business listings',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create or manage a business listing.',
      description: 'Use your account to open the listing workspace and submit provider details for the marketplace.',
    },
    hero: {
      badge: 'Listing workspace',
      title: 'Create a business listing that buyers can compare.',
      description: 'Add services, location, contact details, images, and a clear company summary so buyers understand your fit.',
    },
    formTitle: 'Business listing details',
    submitLabel: 'Submit listing',
    successTitle: 'Listing draft saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your business listing workspace.',
      description: 'Login to manage listings, save provider details, and continue building a stronger directory presence.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and get your business listed.',
      description: 'Create an account to submit provider details, manage your listing draft, and make your company easier to discover.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
