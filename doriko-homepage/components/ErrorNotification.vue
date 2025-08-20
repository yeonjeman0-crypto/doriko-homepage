<template>
  <Teleport to="body">
    <div class="error-container">
      <TransitionGroup name="error" tag="div" class="error-list">
        <div
          v-for="error in errors"
          :key="error.id"
          :class="[
            'error-item',
            `error-${error.type}`,
            { 'error-dismissible': error.type !== 'error' }
          ]"
          role="alert"
          :aria-live="error.type === 'error' ? 'assertive' : 'polite'"
        >
          <div class="error-content">
            <div class="error-icon">
              <i 
                class="fas" 
                :class="{
                  'fa-exclamation-circle': error.type === 'error',
                  'fa-exclamation-triangle': error.type === 'warning',
                  'fa-info-circle': error.type === 'info'
                }"
                aria-hidden="true"
              ></i>
            </div>
            
            <div class="error-message">
              <p class="error-title">{{ getErrorTitle(error.type) }}</p>
              <p class="error-text">{{ error.message }}</p>
              <p v-if="error.context" class="error-context">
                {{ error.context }}
              </p>
            </div>
            
            <button
              @click="removeError(error.id)"
              class="error-close"
              :aria-label="`${error.message} 알림 닫기`"
              type="button"
            >
              <i class="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
          
          <div 
            v-if="error.type !== 'error'"
            class="error-progress"
            :style="{ animationDuration: '5s' }"
          ></div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { errors, removeError } = useErrorHandler()

const getErrorTitle = (type: string): string => {
  switch (type) {
    case 'error':
      return '오류'
    case 'warning':
      return '경고'
    case 'info':
      return '알림'
    default:
      return '알림'
  }
}
</script>

<style scoped>
.error-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  pointer-events: none;
}

.error-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.error-item {
  pointer-events: auto;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  min-width: 300px;
  max-width: 400px;
}

.error-error {
  background: rgba(239, 68, 68, 0.95);
  color: white;
  border-color: rgba(239, 68, 68, 0.3);
}

.error-warning {
  background: rgba(245, 158, 11, 0.95);
  color: white;
  border-color: rgba(245, 158, 11, 0.3);
}

.error-info {
  background: rgba(59, 130, 246, 0.95);
  color: white;
  border-color: rgba(59, 130, 246, 0.3);
}

.error-content {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
}

.error-icon {
  flex-shrink: 0;
  font-size: 20px;
  margin-top: 2px;
}

.error-message {
  flex: 1;
  min-width: 0;
}

.error-title {
  font-weight: 600;
  font-size: 14px;
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.error-text {
  font-size: 14px;
  line-height: 1.4;
  margin: 0 0 2px 0;
}

.error-context {
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
  font-weight: 500;
}

.error-close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  font-size: 16px;
  margin-top: -2px;
}

.error-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.error-close:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.error-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  animation: progress-bar 5s linear forwards;
}

@keyframes progress-bar {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* Transitions */
.error-enter-active,
.error-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.error-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.error-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.error-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile responsive */
@media (max-width: 640px) {
  .error-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .error-item {
    min-width: auto;
    max-width: none;
  }
  
  .error-content {
    padding: 12px;
  }
}

/* Dark mode compatibility */
:global(.dark) .error-item {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
</style>