// Structured data composable for SEO
export const useStructuredData = () => {
  const generateOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DORIKO LIMITED',
    url: 'https://doriko.co.kr',
    logo: 'https://doriko.co.kr/logo.png',
    description: 'DORIKO LIMITED는 해운업계의 선도 기업으로 안전하고 효율적인 해상 운송 서비스를 제공합니다.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: 'Seoul'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['ko', 'en']
    },
    sameAs: [
      'https://www.linkedin.com/company/doriko-limited',
      'https://twitter.com/doriko_limited'
    ]
  })

  const generateWebsiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DORIKO LIMITED',
    url: 'https://doriko.co.kr',
    description: '해운 우수성과 안전 리더십을 제공하는 DORIKO LIMITED',
    inLanguage: ['ko', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'DORIKO LIMITED'
    }
  })

  const generateServiceSchema = (service: {
    name: string
    description: string
    serviceType: string
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: {
      '@type': 'Organization',
      name: 'DORIKO LIMITED'
    },
    areaServed: {
      '@type': 'Place',
      name: 'Global'
    }
  })

  const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  })

  const injectStructuredData = (schema: object) => {
    if (process.client) return
    
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        }
      ]
    })
  }

  return {
    generateOrganizationSchema,
    generateWebsiteSchema,
    generateServiceSchema,
    generateBreadcrumbSchema,
    injectStructuredData
  }
}