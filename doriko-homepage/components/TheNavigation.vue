<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }" role="navigation" aria-label="Main navigation">
    <div class="nav-container">
      <!-- Logo -->
      <NuxtLink to="/" class="logo" aria-label="DORIKO Limited homepage">
        <NuxtImg src="/logo.png" alt="DORIKO Limited logo" class="logo-img" width="45" height="45" />
        <span class="logo-text">DORIKO LIMITED</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <ul class="nav-menu hidden lg:flex">
        <li v-for="item in navigationItems" :key="item.key" class="nav-item">
          <NuxtLink :to="localePath(item.to)" class="nav-link">
            {{ $t(item.label) }}
          </NuxtLink>
        </li>
        <li class="nav-item">
          <LanguageToggle />
        </li>
        <li class="nav-item">
          <ThemeToggle />
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMobileMenu" 
        class="mobile-menu-toggle lg:hidden"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
      >
        <i class="fas" :class="isMobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div 
      id="mobile-menu"
      class="mobile-menu" 
      :class="{ 'active': isMobileMenuOpen }"
      role="menu"
    >
      <ul class="mobile-nav-list">
        <li v-for="item in navigationItems" :key="item.key">
          <NuxtLink 
            :to="localePath(item.to)" 
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            {{ $t(item.label) }}
          </NuxtLink>
        </li>
        <li class="mobile-lang-toggle">
          <LanguageToggle />
        </li>
        <li class="mobile-lang-toggle">
          <ThemeToggle />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const { locale } = useI18n()
const localePath = useLocalePath()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navigationItems = [
  { key: 'home', label: 'navigation.home', to: '/' },
  { key: 'about', label: 'navigation.about', to: '/about' },
  { key: 'services', label: 'navigation.services', to: '/services' },
  { key: 'fleet', label: 'navigation.fleet', to: '/fleet' },
  { key: 'insights', label: 'navigation.insights', to: '/insights' },
  { key: 'contact', label: 'navigation.contact', to: '/contact' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 2px 30px var(--shadow);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: var(--transition);
}

.navbar.scrolled {
  background: var(--white);
  box-shadow: 0 4px 40px var(--shadow);
}

.nav-container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 85px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: var(--transition);
}

.logo:hover {
  transform: scale(1.02);
}

.logo-img {
  width: 45px;
  height: 45px;
  object-fit: contain;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: -0.5px;
}

.nav-menu {
  display: flex;
  list-style: none;
  align-items: center;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 1.2rem 1rem;
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: var(--transition);
  position: relative;
  border-radius: 8px;
}

.nav-link:hover {
  color: var(--primary);
  background: rgba(0, 95, 153, 0.05);
}

.nav-link.router-link-active {
  color: var(--primary);
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: var(--gradient);
  border-radius: 3px;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--dark);
  cursor: pointer;
  padding: 0.5rem;
  transition: var(--transition);
}

.mobile-menu-toggle:hover {
  color: var(--primary);
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  position: fixed;
  top: 85px;
  left: 0;
  right: 0;
  background: var(--white);
  box-shadow: 0 4px 40px var(--shadow);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mobile-menu.active {
  max-height: calc(100vh - 85px);
  overflow-y: auto;
}

.mobile-nav-list {
  list-style: none;
  padding: 1rem 0;
}

.mobile-nav-link {
  display: block;
  padding: 1rem 2rem;
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  border-bottom: 1px solid var(--light);
}

.mobile-nav-link:hover {
  background: rgba(0, 95, 153, 0.05);
  color: var(--primary);
}

.mobile-lang-toggle {
  padding: 1rem 2rem;
  border-top: 1px solid var(--light);
}

@media (max-width: 1024px) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .mobile-menu {
    display: block;
  }
}
</style>