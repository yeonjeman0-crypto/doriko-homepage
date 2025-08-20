// Security middleware for enhanced protection
export default defineEventHandler(async (event) => {
  // Set security headers
  setHeaders(event, {
    // Prevent XSS attacks
    'X-XSS-Protection': '1; mode=block',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
      "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https:",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; '),
    
    // Permissions Policy (formerly Feature Policy)
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()'
    ].join(', '),
    
    // Strict Transport Security (HTTPS only)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  })

  // Rate limiting for API routes
  if (event.node.req.url?.startsWith('/api/')) {
    const clientIP = getClientIP(event)
    
    // Basic rate limiting logic (in production, use Redis or similar)
    // This is a simplified example
    const rateLimit = await checkRateLimit(clientIP)
    
    if (!rateLimit.allowed) {
      setResponseStatus(event, 429)
      return {
        error: 'Too Many Requests',
        message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
        retryAfter: rateLimit.retryAfter
      }
    }
  }
})

// Helper function to get client IP
function getClientIP(event: any): string {
  const forwarded = getHeader(event, 'x-forwarded-for')
  const realIP = getHeader(event, 'x-real-ip')
  const clientIP = getHeader(event, 'x-client-ip')
  
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  
  return (realIP || clientIP || event.node.req.socket?.remoteAddress || '127.0.0.1') as string
}

// Simple in-memory rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

async function checkRateLimit(clientIP: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute window
  const maxRequests = 60 // 60 requests per minute
  
  const key = `rate_limit:${clientIP}`
  const current = rateLimitStore.get(key)
  
  if (!current || now > current.resetTime) {
    // Reset or initialize
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return { allowed: true }
  }
  
  if (current.count >= maxRequests) {
    const retryAfter = Math.ceil((current.resetTime - now) / 1000)
    return { allowed: false, retryAfter }
  }
  
  // Increment count
  current.count++
  return { allowed: true }
}