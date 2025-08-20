<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">{{ $t('nav.insights') }}</h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Stay informed with the latest maritime industry insights, safety campaigns, and regulatory updates.
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Content -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Latest Reports -->
          <div>
            <h2 class="text-3xl font-bold maritime-blue mb-8">{{ $t('insights.notices') }}</h2>
            
            <div class="space-y-6">
              <ReportCard
                v-for="report in latestReports"
                :key="report.id"
                :report="report"
              />
            </div>
            
            <div class="mt-8">
              <UButton 
                color="blue" 
                variant="outline" 
                size="lg"
                class="hover-scale"
              >
                View All Reports
                <template #trailing>
                  <Icon name="heroicons:arrow-right" />
                </template>
              </UButton>
            </div>
          </div>

          <!-- Safety Campaigns -->
          <div>
            <h2 class="text-3xl font-bold maritime-blue mb-8">{{ $t('insights.campaigns') }}</h2>
            
            <div class="space-y-6">
              <CampaignCard
                v-for="campaign in safetyCampaigns"
                :key="campaign.id"
                :campaign="campaign"
              />
            </div>
            
            <div class="mt-8">
              <UButton 
                color="red" 
                variant="outline" 
                size="lg"
                class="hover-scale"
              >
                View Safety Resources
                <template #trailing>
                  <Icon name="heroicons:shield-exclamation" />
                </template>
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Regulatory Updates -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold maritime-blue mb-6">Regulatory Updates</h2>
          <div class="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p class="text-xl text-gray-700 max-w-3xl mx-auto">
            Stay compliant with the latest maritime regulations and industry standards.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RegulatoryCard
            v-for="update in regulatoryUpdates"
            :key="update.id"
            :update="update"
          />
        </div>
      </div>
    </section>

    <!-- Newsletter Subscription -->
    <section class="py-20 maritime-bg text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold mb-6">Stay Updated</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive the latest maritime insights and regulatory updates.
        </p>
        
        <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <UInput 
            placeholder="Enter your email address" 
            size="lg"
            class="flex-1"
          />
          <UButton 
            size="lg" 
            color="white"
            class="hover-scale"
          >
            Subscribe
            <template #trailing>
              <Icon name="heroicons:envelope" />
            </template>
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const latestReports = [
  {
    id: 1,
    title: 'Q3 2024 Fleet Performance Report',
    date: '2024-10-15',
    category: 'Performance',
    excerpt: 'Comprehensive analysis of our fleet performance metrics and operational efficiency improvements.',
    type: 'report'
  },
  {
    id: 2,
    title: 'ESG Sustainability Report 2024',
    date: '2024-09-30',
    category: 'ESG',
    excerpt: 'Our annual sustainability report highlighting environmental initiatives and social responsibility programs.',
    type: 'report'
  },
  {
    id: 3,
    title: 'Maritime Safety Trends Analysis',
    date: '2024-09-15',
    category: 'Safety',
    excerpt: 'Industry-wide safety trends and best practices for maritime operations.',
    type: 'analysis'
  }
]

const safetyCampaigns = [
  {
    id: 1,
    title: 'Zero Incident Initiative',
    description: 'Company-wide campaign focusing on preventing all types of maritime incidents.',
    status: 'active',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Crew Wellness Program',
    description: 'Comprehensive program supporting crew mental health and physical wellness.',
    status: 'ongoing',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Environmental Protection Drive',
    description: 'Initiative to reduce environmental impact and improve sustainability practices.',
    status: 'active',
    priority: 'high'
  }
]

const regulatoryUpdates = [
  {
    id: 1,
    title: 'IMO MEPC 80 Outcomes',
    date: '2024-07-15',
    authority: 'IMO',
    impact: 'High',
    summary: 'Key decisions from MEPC 80 affecting environmental regulations.'
  },
  {
    id: 2,
    title: 'Korea Serious Accident Act Updates',
    date: '2024-06-30',
    authority: 'Korea MLIT',
    impact: 'Critical',
    summary: 'Latest amendments to the Serious Accident Punishment Act.'
  },
  {
    id: 3,
    title: 'Port State Control Amendments',
    date: '2024-06-01',
    authority: 'Tokyo MOU',
    impact: 'Medium',
    summary: 'Updated port state control procedures and inspection criteria.'
  }
]

useHead({
  title: 'Insights - DORIKO LIMITED',
  meta: [
    { name: 'description', content: 'Latest maritime industry insights, safety campaigns, and regulatory updates from DORIKO LIMITED.' }
  ]
})
</script>