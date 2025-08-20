<template>
  <div 
    v-if="isVisible"
    class="loading-overlay"
    :class="{ 'loading-fullscreen': fullscreen }"
    role="progressbar"
    :aria-label="ariaLabel"
    aria-live="polite"
  >
    <div class="loading-content">
      <div class="loading-spinner" :class="`loading-${size}`">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      
      <div v-if="text" class="loading-text">
        {{ text }}
      </div>
      
      <div v-if="showProgress && progress >= 0" class="loading-progress">
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: `${Math.min(100, Math.max(0, progress))}%` }"
          ></div>
        </div>
        <span class="progress-text">{{ Math.round(progress) }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isVisible?: boolean
  text?: string
  fullscreen?: boolean
  size?: 'sm' | 'md' | 'lg'
  showProgress?: boolean
  progress?: number
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: true,
  fullscreen: false,
  size: 'md',
  showProgress: false,
  progress: -1,
  ariaLabel: '로딩 중'
})

// Prevent body scroll when fullscreen loading
watch(() => props.isVisible, (visible) => {
  if (props.fullscreen && process.client) {
    document.body.style.overflow = visible ? 'hidden' : ''
  }
})

onUnmounted(() => {
  if (props.fullscreen && process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  min-height: 120px;
  padding: 2rem;
}

.loading-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  background: rgba(255, 255, 255, 0.95);
  min-height: 100vh;
  border-radius: 0;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.loading-spinner {
  position: relative;
  display: inline-block;
}

.loading-sm {
  width: 30px;
  height: 30px;
}

.loading-md {
  width: 40px;
  height: 40px;
}

.loading-lg {
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  border: 3px solid transparent;
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-sm .spinner-ring {
  width: 30px;
  height: 30px;
}

.loading-md .spinner-ring {
  width: 40px;
  height: 40px;
}

.loading-lg .spinner-ring {
  width: 60px;
  height: 60px;
}

.spinner-ring:nth-child(1) {
  animation-duration: 1s;
}

.spinner-ring:nth-child(2) {
  animation-duration: 1.5s;
  animation-direction: reverse;
  border-top-color: var(--secondary);
  scale: 0.8;
}

.spinner-ring:nth-child(3) {
  animation-duration: 2s;
  border-top-color: var(--accent);
  scale: 0.6;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1rem;
  color: var(--dark);
  font-weight: 500;
  margin-top: 0.5rem;
}

.loading-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 200px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(0, 95, 153, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  color: var(--gray);
  font-weight: 500;
}

/* Dark mode styles */
:global(.dark) .loading-overlay {
  background: rgba(15, 23, 42, 0.95);
}

:global(.dark) .loading-fullscreen {
  background: rgba(15, 23, 42, 0.98);
}

:global(.dark) .loading-text {
  color: var(--dark);
}

:global(.dark) .spinner-ring {
  border-top-color: var(--primary);
}

:global(.dark) .spinner-ring:nth-child(2) {
  border-top-color: var(--secondary);
}

:global(.dark) .spinner-ring:nth-child(3) {
  border-top-color: var(--accent);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .spinner-ring {
    animation: none;
  }
  
  .progress-fill {
    transition: none;
  }
  
  /* Show a static indicator instead */
  .loading-spinner::after {
    content: '⏳';
    font-size: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>