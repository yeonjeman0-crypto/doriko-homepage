<template>
  <div class="theme-toggle">
    <button
      @click="toggleTheme"
      class="theme-btn"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      type="button"
    >
      <Transition name="theme-icon" mode="out-in">
        <i 
          v-if="isDark" 
          key="sun"
          class="fas fa-sun"
          aria-hidden="true"
        ></i>
        <i 
          v-else 
          key="moon"
          class="fas fa-moon"
          aria-hidden="true"
        ></i>
      </Transition>
    </button>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggleTheme } = useDarkMode()
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(0, 95, 153, 0.1);
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1.1rem;
}

.theme-btn:hover,
.theme-btn:focus {
  background: var(--primary);
  color: white;
  outline: none;
  transform: scale(1.05);
}

.theme-btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Dark mode styles */
:global(.dark) .theme-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fbbf24;
  border-color: #fbbf24;
}

:global(.dark) .theme-btn:hover,
:global(.dark) .theme-btn:focus {
  background: #fbbf24;
  color: #1f2937;
}

/* Icon transition */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.2s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(180deg) scale(0.8);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(-180deg) scale(0.8);
}
</style>