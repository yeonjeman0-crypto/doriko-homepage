<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">{{ $t('nav.fleet') }}</h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Our modern fleet of bulk carriers operates worldwide with the highest safety and environmental standards.
          </p>
        </div>
      </div>
    </section>

    <!-- Fleet Overview -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold maritime-blue mb-6">{{ $t('fleet.overview') }}</h2>
          <div class="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div class="text-center bg-blue-50 p-8 rounded-2xl">
            <div class="text-4xl font-bold text-blue-600 mb-4">15+</div>
            <div class="text-xl font-semibold maritime-blue mb-2">Managed Vessels</div>
            <div class="text-gray-600">Bulk carriers of various sizes</div>
          </div>
          <div class="text-center bg-green-50 p-8 rounded-2xl">
            <div class="text-4xl font-bold text-green-600 mb-4">99.9%</div>
            <div class="text-xl font-semibold maritime-blue mb-2">Safety Record</div>
            <div class="text-gray-600">Incident-free operations</div>
          </div>
          <div class="text-center bg-purple-50 p-8 rounded-2xl">
            <div class="text-4xl font-bold text-purple-600 mb-4">24/7</div>
            <div class="text-xl font-semibold maritime-blue mb-2">Monitoring</div>
            <div class="text-gray-600">Continuous fleet oversight</div>
          </div>
        </div>

        <!-- Representative Vessels -->
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <VesselCard
            v-for="vessel in representativeVessels"
            :key="vessel.id"
            :vessel="vessel"
          />
        </div>
      </div>
    </section>

    <!-- Fleet Management Services -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold maritime-blue mb-6">Fleet Management Services</h2>
          <div class="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:wrench-screwdriver" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-lg font-semibold maritime-blue mb-2">Technical Management</h3>
            <p class="text-gray-600">Complete technical oversight and maintenance</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:shield-check" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-lg font-semibold maritime-blue mb-2">Safety Management</h3>
            <p class="text-gray-600">Comprehensive safety protocols and monitoring</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:users" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-lg font-semibold maritime-blue mb-2">Crew Management</h3>
            <p class="text-gray-600">Professional crew sourcing and management</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:chart-bar" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-lg font-semibold maritime-blue mb-2">Performance Monitoring</h3>
            <p class="text-gray-600">Real-time vessel performance analysis</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 maritime-bg text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold mb-6">Interested in Our Fleet Services?</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Contact us to learn more about our fleet management capabilities and services.
        </p>
        <UButton 
          to="/contact" 
          size="xl" 
          color="white"
          class="hover-scale"
        >
          Get in Touch
          <template #trailing>
            <Icon name="heroicons:arrow-right" />
          </template>
        </UButton>
      </div>
    </section>
  </div>
</template>

<script setup>
const representativeVessels = [
  {
    id: 1,
    name: 'MV DORIKO PRIDE',
    type: 'Bulk Carrier',
    dwt: '82,000',
    built: '2018',
    flag: 'Korea',
    image: '/images/vessel-1.jpg'
  },
  {
    id: 2,
    name: 'MV DORIKO EXCELLENCE',
    type: 'Bulk Carrier',
    dwt: '76,500',
    built: '2019',
    flag: 'Korea', 
    image: '/images/vessel-2.jpg'
  },
  {
    id: 3,
    name: 'MV DORIKO HARMONY',
    type: 'Bulk Carrier',
    dwt: '81,200',
    built: '2020',
    flag: 'Korea',
    image: '/images/vessel-3.jpg'
  }
]

useHead({
  title: 'Fleet - DORIKO LIMITED',
  meta: [
    { name: 'description', content: 'DORIKO LIMITED manages a modern fleet of bulk carriers with the highest safety and environmental standards.' }
  ]
})
</script>