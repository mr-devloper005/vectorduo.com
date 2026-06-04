import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Verified business listing marketplace',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Business listing marketplace',
    primaryLinks: [
      { label: 'Technology', href: '/listings?category=technology' },
      { label: 'Health', href: '/listings?category=health' },
      { label: 'Shopping', href: '/listings?category=shopping' },
      { label: 'Fashion', href: '/listings?category=fashion' },
      { label: 'Business', href: '/listings?category=business' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Get listed', href: '/create' },
      secondary: { label: 'Find companies', href: '/listings' },
    },
  },
  footer: {
    tagline: 'Business discovery, reviews, and verified listings',
    description: 'A focused marketplace for finding trusted service providers, comparing business listings, and connecting with companies ready for your next project.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/articles' },
          { label: 'All Listings', href: '/listings' },
          { label: 'Search Companies', href: '/search' },
          { label: 'Create Listing', href: '/create' },
          { label: 'Contact Support', href: '/contact' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for confident vendor discovery and better business decisions.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
