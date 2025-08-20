<template>
  <div ref="wrapperRef">
    <div v-if="isVisible || hasLoaded">
      <slot />
    </div>
    <div 
      v-else 
      class="lazy-placeholder"
      :style="{ minHeight: minHeight }"
      :aria-label="loadingText"
    >
      <div class="flex items-center justify-center h-full">
        <div class="loading-spinner"></div>
        <span class="sr-only">{{ loadingText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  minHeight?: string
  rootMargin?: string
  threshold?: number
  loadingText?: string
}

const props = withDefaults(defineProps<Props>(), {
  minHeight: '200px',
  rootMargin: '50px',
  threshold: 0.1,
  loadingText: '콘텐츠 로딩 중...'
})

const wrapperRef = ref<HTMLElement>()
const isVisible = ref(false)
const hasLoaded = ref(false)

onMounted(() => {
  if (!wrapperRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          hasLoaded.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: props.rootMargin,
      threshold: props.threshold
    }
  )

  observer.observe(wrapperRef.value)

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<style scoped>
.lazy-placeholder {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 8px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 95, 153, 0.1);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>