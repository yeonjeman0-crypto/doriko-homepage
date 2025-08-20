export default defineNuxtConfig({
  devtools: { enabled: false },
  
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/eslint',
    '@vite-pwa/nuxt'
  ],

  vite: {
    plugins: [
      require('vite-tsconfig-paths').default()
    ]
  },

  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    strategy: 'prefix_except_default'
  },


  app: {
    head: {
      title: 'DORIKO LIMITED - 해운 우수성과 안전 리더십',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'DORIKO LIMITED는 해운업계의 선도 기업으로 안전하고 효율적인 해상 운송 서비스를 제공합니다.' },
        { name: 'keywords', content: '해운, 선박, 물류, 운송, DORIKO, 해상운송' },
        { name: 'author', content: 'DORIKO LIMITED' },
        { name: 'theme-color', content: '#005F99' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
        { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
        { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'DORIKO LIMITED - 해운 우수성과 안전 리더십' },
        { property: 'og:description', content: 'DORIKO LIMITED는 해운업계의 선도 기업으로 안전하고 효율적인 해상 운송 서비스를 제공합니다.' },
        { property: 'og:image', content: '/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: '/main.css' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap', as: 'style' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap' }
      ]
    }
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    },
    compressPublicAssets: true,
    routeRules: {
      '/': { 
        prerender: true, 
        headers: { 
          'cache-control': 's-maxage=31536000',
          'x-content-type-options': 'nosniff',
          'x-frame-options': 'DENY',
          'x-xss-protection': '1; mode=block',
          'referrer-policy': 'strict-origin-when-cross-origin'
        } 
      },
      '/about': { prerender: true },
      '/services': { prerender: true },
      '/fleet': { prerender: true },
      '/contact': { prerender: true },
      '/insights': { isr: 3600 },
      '/api/**': { 
        cors: true,
        headers: {
          'x-content-type-options': 'nosniff',
          'x-frame-options': 'DENY'
        }
      }
    }
  },

  image: {
    format: ['webp', 'avif', 'png', 'jpg'],
    quality: 80,
    densities: [1, 2],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false
  },

  // SEO and robots
  robots: {
    allow: '/',
    sitemap: 'https://doriko.co.kr/sitemap.xml'
  },

  // PWA Configuration
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'DORIKO LIMITED - 해운 우수성과 안전 리더십',
      short_name: 'DORIKO',
      description: '해운업계의 선도 기업으로 안전하고 효율적인 해상 운송 서비스를 제공합니다.',
      theme_color: '#005F99',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      lang: 'ko-KR'
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            }
          }
        },
        {
          urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cdnjs-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: false,
      type: 'module'
    }
  }
})