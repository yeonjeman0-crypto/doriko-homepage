<template>
  <div>
    <!-- Hero Section -->
    <section class="hero" id="home" role="banner" aria-label="메인 소개 영역">
        <!-- Hero Video Background -->
        <div class="hero-video-container">
            <video autoplay muted loop playsinline class="hero-video" aria-label="배경 비디오: 도리코 선박 운항 영상" preload="metadata">
                <source src="/images/30d051ff88.mp4" type="video/mp4">
                <p>죄송합니다. 브라우저에서 비디오를 지원하지 않습니다. 도리코의 선박 운항 영상을 볼 수 없습니다.</p>
            </video>
            <div class="hero-video-overlay"></div>
        </div>
        
        <div class="floating-shapes">
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
        
        <div class="hero-content">
            <div class="hero-badge">
                <i class="fas fa-ship"></i>
                <span>{{ $t('home.hero.badge') }}</span>
            </div>
            
            <h1>
                <span class="hero-line-1">{{ $t('home.hero.line1') }}</span><br>
                <span class="hero-line-2">{{ $t('home.hero.line2') }}</span><br>
                <span class="hero-line-3">{{ $t('home.hero.line3') }}</span>
            </h1>
            
            <p class="hero-subtitle">
                {{ $t('home.hero.subtitle') }}
            </p>
            
            <div class="hero-buttons">
                <NuxtLink to="/services" class="btn btn-primary">
                    <i class="fas fa-ship"></i>
                    {{ $t('home.hero.btn_primary') }}
                </NuxtLink>
                <NuxtLink to="/contact" class="btn btn-outline">
                    <i class="fas fa-envelope"></i>
                    {{ $t('home.hero.btn_secondary') }}
                </NuxtLink>
            </div>
        </div>
        
        <div class="hero-scroll">
            <span>{{ $t('home.scroll_down') }}</span>
            <i class="fas fa-chevron-down"></i>
        </div>
    </section>

    <!-- About Section -->
    <section class="section section-alt" id="about">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-badge">
                    <i class="fas fa-building"></i>
                    <span>{{ $t('home.about.badge') }}</span>
                </div>
                <h2 class="section-title">{{ $t('home.about.title') }}</h2>
                <p class="section-subtitle">
                    {{ $t('home.about.subtitle') }}
                </p>
            </div>
            
            <!-- Mission Section -->
            <div class="mission-vision-container">
                <div class="mission-section fade-in">
                    <div class="card slide-in-left">
                        <div class="card-icon"><i class="fas fa-bullseye"></i></div>
                        <h3 class="card-title">{{ $t('home.about.mission.title') }}</h3>
                        <p class="card-text">
                            {{ $t('home.about.mission.text') }}
                        </p>
                    </div>
                </div>
                
                <!-- Vision Section -->
                <div class="vision-section fade-in">
                    <div class="card slide-in-right">
                        <div class="card-icon"><i class="fas fa-eye"></i></div>
                        <h3 class="card-title">{{ $t('home.about.vision.title') }}</h3>
                        <p class="card-text">
                            {{ $t('home.about.vision.text') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CEO Message Section -->
    <section class="section ceo-section" id="ceo">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-badge">
                    <i class="fas fa-user-tie"></i>
                    <span>{{ $t('home.ceo.badge') }}</span>
                </div>
                <h2 class="section-title">{{ $t('home.ceo.title') }}</h2>
            </div>
            
            <div class="ceo-container fade-in">
                <div class="ceo-message">
                    <blockquote class="ceo-quote">
                        <p>{{ $t('home.ceo.quote') }}</p>
                    </blockquote>
                    <div class="ceo-signature">
                        <strong>{{ $t('home.ceo.name') }}</strong>
                        <span>{{ $t('home.ceo.position') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- KPI Section -->
    <section class="section kpi-section" id="performance">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-badge">
                    <i class="fas fa-chart-bar"></i>
                    <span>{{ $t('home.kpi.badge') }}</span>
                </div>
                <h2 class="section-title">{{ $t('home.kpi.title') }}</h2>
                <p class="section-subtitle">
                    {{ $t('home.kpi.subtitle') }}
                </p>
            </div>
            
            <div class="kpi-grid">
                <div class="kpi-item fade-in" v-for="(kpi, index) in kpiData" :key="index">
                    <div class="kpi-icon" :class="kpi.class">
                        <i :class="kpi.icon"></i>
                    </div>
                    <div class="kpi-number">{{ kpi.number }}</div>
                    <div class="kpi-label">{{ $t(kpi.label) }}</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Organization Section -->
    <section class="section section-alt" id="organization">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-badge">
                    <i class="fas fa-sitemap"></i>
                    <span>{{ $t('home.organization.badge') }}</span>
                </div>
                <h2 class="section-title">{{ $t('home.organization.title') }}</h2>
                <p class="section-subtitle">
                    {{ $t('home.organization.subtitle') }}
                </p>
            </div>
            
            <div class="org-structure fade-in">
                <div class="org-level-1">
                    <div class="org-box ceo-box">
                        <i class="fas fa-user-crown"></i>
                        <span>{{ $t('home.organization.ceo') }}</span>
                    </div>
                </div>
                
                <div class="org-level-2">
                    <div class="org-box">
                        <i class="fas fa-ship"></i>
                        <span>{{ $t('home.organization.ship_management') }}</span>
                    </div>
                    <div class="org-box">
                        <i class="fas fa-users"></i>
                        <span>{{ $t('home.organization.crew_management') }}</span>
                    </div>
                    <div class="org-box">
                        <i class="fas fa-cog"></i>
                        <span>{{ $t('home.organization.technical') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Fleet Section -->
    <section class="section fleet-section" id="fleet">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-badge">
                    <i class="fas fa-ship"></i>
                    <span>{{ $t('home.fleet.badge') }}</span>
                </div>
                <h2 class="section-title">{{ $t('home.fleet.title') }}</h2>
                <p class="section-subtitle">
                    {{ $t('home.fleet.subtitle') }}
                </p>
            </div>
            
            <div class="fleet-stats fade-in">
                <div class="fleet-stat-item">
                    <div class="fleet-icon bulk">
                        <NuxtImg 
                            src="/images/BULK CARRIER (2).png" 
                            alt="Bulk Carrier"
                            class="fleet-image"
                            loading="lazy"
                        />
                    </div>
                    <h3>{{ $t('home.fleet.bulk.title') }}</h3>
                    <p class="fleet-count">{{ $t('home.fleet.bulk.count') }}</p>
                    <p>{{ $t('home.fleet.bulk.description') }}</p>
                </div>
                
                <div class="fleet-stat-item">
                    <div class="fleet-icon car-carrier">
                        <NuxtImg 
                            src="/images/CAR CARRIER.png" 
                            alt="Car Carrier"
                            class="fleet-image"
                            loading="lazy"
                        />
                    </div>
                    <h3>{{ $t('home.fleet.car.title') }}</h3>
                    <p class="fleet-count">{{ $t('home.fleet.car.count') }}</p>
                    <p>{{ $t('home.fleet.car.description') }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="section section-alt" id="services">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-badge">
                    <i class="fas fa-handshake"></i>
                    <span>{{ $t('home.services.badge') }}</span>
                </div>
                <h2 class="section-title">{{ $t('home.services.title') }}</h2>
                <p class="section-subtitle">
                    {{ $t('home.services.subtitle') }}
                </p>
            </div>
            
            <div class="services-grid">
                <div class="service-item fade-in" v-for="(service, index) in servicesData" :key="index">
                    <div class="service-icon">
                        <NuxtImg 
                            v-if="service.image"
                            :src="service.image" 
                            :alt="$t(service.title)"
                            class="service-image"
                            loading="lazy"
                        />
                        <i v-else :class="service.icon"></i>
                    </div>
                    <h3>{{ $t(service.title) }}</h3>
                    <p>{{ $t(service.description) }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ESG Section -->
    <section class="section" id="esg">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-badge">
                    <i class="fas fa-leaf"></i>
                    <span>{{ $t('home.esg.badge') }}</span>
                </div>
                <h2 class="section-title">{{ $t('home.esg.title') }}</h2>
                <p class="section-subtitle">
                    {{ $t('home.esg.subtitle') }}
                </p>
            </div>
        </div>
    </section>

    <!-- Safety Section -->
    <section class="section" id="safety">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-badge">
                    <i class="fas fa-shield-alt"></i>
                    <span>{{ $t('home.safety.badge') }}</span>
                </div>
                <h2 class="section-title">{{ $t('home.safety.title') }}</h2>
                <p class="section-subtitle">
                    {{ $t('home.safety.subtitle') }}
                </p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 gradient-bg text-white">
      <div class="container text-center">
        <h2 class="heading-lg mb-6">{{ $t('home.contact_cta.title') }}</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          {{ $t('home.contact_cta.description') }}
        </p>
        <NuxtLink to="/contact" class="btn-secondary bg-white text-blue-600 hover:bg-gray-100">
          {{ $t('home.contact_cta.button') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const { generateOrganizationSchema, generateWebsiteSchema, injectStructuredData } = useStructuredData()

// Data for KPI section
const kpiData = [
  {
    number: '14',
    label: 'home.kpi.vessels',
    icon: 'fas fa-ship',
    class: 'blue'
  },
  {
    number: '20+',
    label: 'home.kpi.years',
    icon: 'fas fa-calendar-alt',
    class: 'green'
  },
  {
    number: '100%',
    label: 'home.kpi.safety',
    icon: 'fas fa-shield-alt',
    class: 'orange'
  },
  {
    number: '24/7',
    label: 'home.kpi.support',
    icon: 'fas fa-headset',
    class: 'purple'
  }
]

// Data for services section
const servicesData = [
  {
    title: 'home.services.ship_management.title',
    description: 'home.services.ship_management.description',
    image: '/images/new building.png',
    icon: 'fas fa-ship'
  },
  {
    title: 'home.services.crew_management.title',
    description: 'home.services.crew_management.description',
    image: '/images/crew management.png',
    icon: 'fas fa-users'
  },
  {
    title: 'home.services.technical.title',
    description: 'home.services.technical.description',
    image: '/images/technical.png',
    icon: 'fas fa-cogs'
  },
  {
    title: 'home.services.vetting.title',
    description: 'home.services.vetting.description',
    image: '/images/vetting.png',
    icon: 'fas fa-clipboard-check'
  }
]

// SEO and structured data
useHead({
  title: 'DORIKO LIMITED - 해운 우수성과 안전 리더십',
  meta: [
    {
      name: 'description',
      content: '2000년 설립된 (주)도리코는 전문적인 해상 컨설팅 및 선박관리 서비스를 제공하는 신뢰받는 기업입니다. 벌크선 7척, 자동차운반선 7척 등 총 14척의 선박을 안전하고 효율적으로 관리합니다.'
    },
    {
      property: 'og:title',
      content: 'DORIKO LIMITED - 해운 우수성과 안전 리더십'
    },
    {
      property: 'og:description',
      content: '20년 넘는 전문 경험과 체계적인 전담 시스템으로 고객의 성공적인 비즈니스를 지원하는 선박 관리 전문 기업'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://doriko.co.kr'
    }
  ]
})

// Inject structured data
injectStructuredData(generateOrganizationSchema())
injectStructuredData(generateWebsiteSchema())

onMounted(() => {
  // Initialize homepage specific features
  console.log('Doriko Homepage mounted with full content')
})
</script>

<style scoped>
/* Wave Animation */
.wave-animation {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") repeat-x;
  animation: wave 10s linear infinite;
}

@keyframes wave {
  0% { background-position-x: 0; }
  100% { background-position-x: 1440px; }
}

/* Mouse Scroll Animation */
.mouse-scroll {
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  position: relative;
}

.mouse-scroll::after {
  content: '';
  width: 4px;
  height: 8px;
  background: white;
  border-radius: 2px;
  position: absolute;
  left: 50%;
  top: 8px;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
}

/* Fade In Animation */
.animate-fadeInUp {
  animation: fadeInUp 1s ease-out;
}
</style>