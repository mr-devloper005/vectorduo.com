import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

export const slot4BrandConfig = {
  siteName: siteIdentity.name,
  tagline: siteIdentity.tagline,
  domain: siteIdentity.domain,
  baseUrl: siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents:
    productKind === 'visual'
      ? { primary: '#ee2c25', surface: '#12323d' }
      : productKind === 'editorial'
        ? { primary: '#0b2f3a', surface: '#f7fbff' }
        : productKind === 'directory'
          ? { primary: '#12323d', surface: '#f7fbff' }
          : { primary: '#0b2f3a', surface: '#f7fbff' },
} as const
