<template>
  <footer class="bg-gradient-to-b from-gray-900 to-black text-white">
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Company Info -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="DORIKO" class="w-12 h-12" />
            <div>
              <h3 class="text-xl font-bold">DORIKO LIMITED</h3>
              <p class="text-gray-400 text-sm">{{ $t('home.hero.subtitle') }}</p>
            </div>
          </div>
          <p class="text-gray-400 mb-6">
            {{ $t('footer.company_info') }}
          </p>
          <div class="flex gap-4">
            <a href="#" class="social-icon">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-lg font-semibold mb-6">{{ $t('footer.services_title') }}</h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/services#shipping" class="footer-link">
                {{ $t('home.services.shipping.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services#logistics" class="footer-link">
                {{ $t('home.services.logistics.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services#trading" class="footer-link">
                {{ $t('home.services.trading.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services#technical" class="footer-link">
                {{ $t('home.services.technical.title') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-6">{{ $t('footer.quick_links') }}</h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/about" class="footer-link">
                {{ $t('navigation.about') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/fleet" class="footer-link">
                {{ $t('navigation.fleet') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/insights" class="footer-link">
                {{ $t('navigation.insights') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="footer-link">
                {{ $t('navigation.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-6">{{ $t('navigation.contact') }}</h4>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <i class="fas fa-map-marker-alt text-cyan-400 mt-1"></i>
              <div>
                <p class="font-medium">Seoul Office</p>
                <p class="text-gray-400 text-sm">
                  123 Gangnam-daero<br>
                  Seoul, Korea 06000
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-phone-alt text-cyan-400 mt-1"></i>
              <div>
                <p class="text-gray-400 text-sm">+82-2-1234-5678</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-envelope text-cyan-400 mt-1"></i>
              <div>
                <p class="text-gray-400 text-sm">info@doriko.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm">
            {{ $t('footer.copyright') }}
          </p>
          <div class="flex gap-6">
            <NuxtLink to="/privacy" class="footer-link text-sm">
              {{ $t('footer.privacy') }}
            </NuxtLink>
            <NuxtLink to="/terms" class="footer-link text-sm">
              {{ $t('footer.terms') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-link {
  color: #9ca3af;
  text-decoration: none;
  transition: var(--transition);
}

.footer-link:hover {
  color: var(--accent);
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: var(--transition);
  text-decoration: none;
}

.social-icon:hover {
  background: var(--accent);
  transform: translateY(-2px);
}
</style>