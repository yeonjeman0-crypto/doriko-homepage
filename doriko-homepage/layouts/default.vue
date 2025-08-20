<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDark ? 'bg-slate-900' : 'bg-white'">
    <TheNavigation />
    <main>
      <slot />
    </main>
    <TheFooter />
    
    <!-- Global components -->
    <ErrorNotification />
    <LoadingSpinner 
      v-if="isLoading" 
      :is-visible="isLoading"
      :text="loadingText"
      fullscreen
    />
  </div>
</template>

<script setup lang="ts">
// Global error handling and loading state
const { isLoading, loadingText } = useErrorHandler()
const { isDark } = useDarkMode()

// Layout configuration
useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  bodyAttrs: {
    class: 'antialiased'
  }
})
</script>