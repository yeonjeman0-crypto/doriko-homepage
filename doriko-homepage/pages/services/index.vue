<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">{{ $t('nav.services') }}</h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive maritime consulting and ship management solutions tailored to your needs.
          </p>
        </div>
      </div>
    </section>

    <!-- Key Services Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold maritime-blue mb-6">{{ $t('services.key') }}</h2>
          <div class="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ServiceDetail
            v-for="service in keyServices"
            :key="service.id"
            :icon="service.icon"
            :title="$t(service.title)"
            :description="service.description"
            :features="service.features"
            :color="service.color"
          />
        </div>
      </div>
    </section>

    <!-- ESG & Safety Management -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold maritime-blue mb-6">{{ $t('services.esg') }}</h2>
          <div class="w-20 h-1 bg-green-500 mx-auto"></div>
          <p class="text-xl text-gray-700 max-w-3xl mx-auto mt-8">
            Our comprehensive ESG approach ensures sustainable and responsible maritime operations.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ESGCard
            icon="heroicons:leaf"
            :title="$t('services.environment')"
            description="Environmental protection and sustainable practices"
            :features="[
              'Carbon footprint reduction',
              'Waste management',
              'Fuel efficiency optimization',
              'Environmental compliance monitoring'
            ]"
            color="green"
          />
          <ESGCard
            icon="heroicons:users"
            :title="$t('services.social')"
            description="Social responsibility and crew welfare"
            :features="[
              'Crew training and development',
              'Health and safety programs',
              'Community engagement',
              'Diversity and inclusion'
            ]"
            color="blue"
          />
          <ESGCard
            icon="heroicons:scale"
            :title="$t('services.governance')"
            description="Corporate governance and transparency"
            :features="[
              'Risk management',
              'Compliance monitoring',
              'Transparent reporting',
              'Stakeholder engagement'
            ]"
            color="purple"
          />
        </div>
      </div>
    </section>

    <!-- Compliance Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-4xl font-bold maritime-blue mb-8">{{ $t('services.compliance') }}</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-8">
              We help companies navigate complex regulatory requirements and ensure full compliance 
              with the Serious Accident Punishment Act and international maritime regulations.
            </p>
            
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <div class="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="heroicons:check" class="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold maritime-blue mb-1">Risk Assessment & Management</h4>
                  <p class="text-gray-600">Comprehensive risk evaluation and mitigation strategies</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="heroicons:check" class="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold maritime-blue mb-1">Safety Management Systems</h4>
                  <p class="text-gray-600">Implementation and maintenance of SMS protocols</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="heroicons:check" class="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 class="font-semibold maritime-blue mb-1">Regulatory Compliance</h4>
                  <p class="text-gray-600">Ensuring adherence to all applicable laws and regulations</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-12 text-white text-center">
            <Icon name="heroicons:shield-exclamation" class="w-24 h-24 mx-auto mb-6" />
            <h3 class="text-2xl font-bold mb-4">Critical Safety Focus</h3>
            <p class="text-red-100 leading-relaxed">
              Zero tolerance for safety violations. Our comprehensive approach ensures 
              full compliance with Korea's Serious Accident Punishment Act.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 maritime-bg text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Contact us today to discuss how our services can help your maritime operations.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton 
            to="/contact" 
            size="xl" 
            color="white"
            class="hover-scale"
          >
            Get a Quote
            <template #trailing>
              <Icon name="heroicons:arrow-right" />
            </template>
          </UButton>
          <UButton 
            to="/fleet" 
            size="xl" 
            color="white" 
            variant="outline"
            class="hover-scale"
          >
            View Our Fleet
            <template #trailing>
              <Icon name="heroicons:globe-asia-australia" />
            </template>
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const keyServices = [
  {
    id: 1,
    icon: 'heroicons:wrench-screwdriver',
    title: 'services.newbuilding',
    description: 'Expert supervision and technical advisory services for newbuilding projects, ensuring quality delivery and compliance with specifications.',
    features: [
      'Pre-delivery inspections',
      'Technical documentation review',
      'Sea trials supervision',
      'Delivery coordination'
    ],
    color: 'blue'
  },
  {
    id: 2,
    icon: 'heroicons:shield-check',
    title: 'services.rightship',
    description: 'Comprehensive support for RightShip vetting operations, helping vessels maintain high safety and environmental standards.',
    features: [
      'Vetting preparation',
      'Documentation management',
      'Performance monitoring',
      'Continuous improvement'
    ],
    color: 'green'
  },
  {
    id: 3,
    icon: 'heroicons:truck',
    title: 'services.bulk',
    description: 'Specialized services tailored for bulk carrier operations, focusing on cargo handling efficiency and safety.',
    features: [
      'Cargo operations oversight',
      'Loading/discharge supervision',
      'Hold cleaning coordination',
      'Port agency services'
    ],
    color: 'purple'
  },
  {
    id: 4,
    icon: 'heroicons:exclamation-triangle',
    title: 'services.safety',
    description: 'Comprehensive safety and quality management systems to ensure operational excellence and regulatory compliance.',
    features: [
      'Safety management systems',
      'Quality assurance programs',
      'Incident investigation',
      'Continuous monitoring'
    ],
    color: 'red'
  }
]

useHead({
  title: 'Services - DORIKO LIMITED',
  meta: [
    { name: 'description', content: 'Comprehensive maritime consulting and ship management solutions including newbuilding supervision, RightShip vetting, and safety management.' }
  ]
})
</script>