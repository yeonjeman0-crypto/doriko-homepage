// Global type definitions for DORIKO Homepage

export interface NavigationItem {
  key: string
  label: string
  to: string
}

export interface Locale {
  code: string
  name: string
  file: string
}

export interface MetricData {
  value: string | number
  label: string
  ariaLabel?: string
}

export interface ServiceItem {
  title: string
  description: string
  icon: string
}

export interface ContactFormData {
  name: string
  company?: string
  email: string
  phone?: string
  service?: string
  message: string
}

export interface WebVitalsMetric {
  name: string
  value: number
  id: string
  delta: number
  rating: 'good' | 'needs-improvement' | 'poor'
}