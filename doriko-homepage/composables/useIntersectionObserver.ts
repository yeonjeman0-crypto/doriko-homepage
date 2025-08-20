// Intersection Observer composable for performance optimization
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const isVisible = ref(false)
  const hasIntersected = ref(false)
  const target = ref<HTMLElement>()

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  }

  const observer = ref<IntersectionObserver>()

  const observe = (element?: HTMLElement) => {
    if (process.client && (element || target.value)) {
      const elementToObserve = element || target.value!
      
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting
          
          if (entry.isIntersecting && !hasIntersected.value) {
            hasIntersected.value = true
          }
        })
      }, defaultOptions)

      observer.value.observe(elementToObserve)
    }
  }

  const unobserve = () => {
    if (observer.value && target.value) {
      observer.value.unobserve(target.value)
    }
  }

  const disconnect = () => {
    if (observer.value) {
      observer.value.disconnect()
    }
  }

  onMounted(() => {
    if (target.value) {
      observe()
    }
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    target,
    isVisible: readonly(isVisible),
    hasIntersected: readonly(hasIntersected),
    observe,
    unobserve,
    disconnect
  }
}