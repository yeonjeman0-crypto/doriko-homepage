// Web Vitals tracking plugin for performance monitoring
export default defineNuxtPlugin(() => {
  if (process.client && typeof window !== 'undefined') {
    // Dynamic import to avoid blocking the main thread
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Core Web Vitals
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
      
      // Send metrics to analytics service (replace with your preferred service)
      // Example: sendToAnalytics(metric)
    }).catch(error => {
      console.warn('Web Vitals tracking failed to load:', error)
    })
  }
})