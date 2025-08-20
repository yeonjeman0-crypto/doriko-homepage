<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">{{ $t('nav.about') }}</h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Learn about our company's history, mission, and commitment to maritime excellence.
          </p>
        </div>
      </div>
    </section>

    <!-- Navigation Tabs -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8 py-4">
          <NuxtLink 
            to="/about"
            class="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium"
          >
            {{ $t('about.overview') }}
          </NuxtLink>
          <NuxtLink 
            to="/about/organization"
            class="text-gray-500 hover:text-blue-600 pb-2 font-medium transition-colors"
          >
            {{ $t('about.organization') }}
          </NuxtLink>
          <NuxtLink 
            to="/about/certifications"
            class="text-gray-500 hover:text-blue-600 pb-2 font-medium transition-colors"
          >
            {{ $t('about.certifications') }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Company Overview Content -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 class="text-3xl font-bold maritime-blue mb-8">Our Story</h2>
            <div class="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Founded in 2010, DORIKO LIMITED has grown from a small maritime consulting firm 
                to a leading provider of comprehensive ship management and safety services in Korea 
                and the Asia-Pacific region.
              </p>
              <p>
                Our commitment to excellence in maritime safety, environmental stewardship, and 
                operational efficiency has earned us the trust of vessel owners and operators 
                throughout the region.
              </p>
              <p>
                With our headquarters in Seoul and operations in Busan, we provide 24/7 support 
                to ensure our clients' vessels operate safely and efficiently in compliance with 
                all international maritime regulations.
              </p>
            </div>
          </div>
          
          <div class="space-y-8">
            <div class="bg-blue-50 p-8 rounded-2xl">
              <h3 class="text-2xl font-semibold maritime-blue mb-6">Our Mission</h3>
              <p class="text-gray-700 leading-relaxed">
                To provide exceptional maritime consulting and ship management services that 
                prioritize safety, environmental responsibility, and operational excellence 
                while supporting our clients' business success.
              </p>
            </div>
            
            <div class="bg-gray-50 p-8 rounded-2xl">
              <h3 class="text-2xl font-semibold maritime-blue mb-6">Our Vision</h3>
              <p class="text-gray-700 leading-relaxed">
                To be the most trusted maritime service provider in the Asia-Pacific region, 
                recognized for our expertise, integrity, and unwavering commitment to safety 
                and environmental stewardship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Timeline -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold maritime-blue mb-6">Company History</h2>
          <div class="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div class="space-y-8">
          <TimelineItem
            year="2010"
            title="Company Founded"
            description="DORIKO LIMITED established in Seoul with focus on maritime consulting"
            :isLeft="true"
          />
          <TimelineItem
            year="2013"
            title="Busan Office Opening"
            description="Expanded operations with dedicated office in Busan port"
            :isLeft="false"
          />
          <TimelineItem
            year="2016"
            title="Fleet Management Services"
            description="Launched comprehensive fleet management and technical services"
            :isLeft="true"
          />
          <TimelineItem
            year="2019"
            title="ESG Initiatives"
            description="Implemented comprehensive ESG and sustainability programs"
            :isLeft="false"
          />
          <TimelineItem
            year="2022"
            title="Digital Transformation"
            description="Adopted advanced digital technologies for enhanced service delivery"
            :isLeft="true"
          />
          <TimelineItem
            year="2024"
            title="Regional Expansion"
            description="Extended services across Asia-Pacific region"
            :isLeft="false"
          />
        </div>
      </div>
    </section>

    <!-- Company Statistics -->
    <section class="py-20 maritime-bg text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6">Our Achievements</h2>
          <div class="w-20 h-1 bg-blue-300 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-5xl font-bold text-blue-300 mb-4">15+</div>
            <div class="text-xl font-semibold mb-2">Years of Experience</div>
            <div class="text-blue-200">Serving the maritime industry</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-blue-300 mb-4">50+</div>
            <div class="text-xl font-semibold mb-2">Managed Vessels</div>
            <div class="text-blue-200">Under our expert care</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-blue-300 mb-4">99.9%</div>
            <div class="text-xl font-semibold mb-2">Safety Record</div>
            <div class="text-blue-200">Incident-free operations</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-blue-300 mb-4">24/7</div>
            <div class="text-xl font-semibold mb-2">Support</div>
            <div class="text-blue-200">Always available</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'About Us - DORIKO LIMITED',
  meta: [
    { name: 'description', content: 'Learn about DORIKO LIMITED\'s history, mission, and commitment to maritime excellence and safety leadership.' }
  ]
})
</script>