<template>
  <div class="language-toggle">
    <button @click="toggleLanguage" class="lang-btn">
      <i class="fas fa-globe mr-2"></i>
      <span>{{ currentLocale === 'ko' ? '한국어' : 'English' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Locale {
  code: string
  name: string
}

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLocale = computed((): string => locale.value)

const toggleLanguage = (): void => {
  const newLocale: string = currentLocale.value === 'ko' ? 'en' : 'ko'
  navigateTo(switchLocalePath(newLocale))
}
</script>

<style scoped>
.language-toggle {
  display: flex;
  align-items: center;
}

.lang-btn {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(0, 95, 153, 0.1);
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.lang-btn:hover,
.lang-btn:focus {
  background: var(--primary);
  color: white;
  outline: none;
}

.lang-btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
</style>