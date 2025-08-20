<template>
  <UCard class="shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="flex items-center mb-3">
            <div 
              :class="[
                'w-3 h-3 rounded-full mr-2',
                statusColors[campaign.status] || statusColors.active
              ]"
            ></div>
            <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {{ campaign.status }}
            </span>
            <span 
              v-if="campaign.priority === 'high'"
              class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"
            >
              High Priority
            </span>
          </div>
          <h3 class="text-lg font-semibold maritime-blue mb-2">{{ campaign.title }}</h3>
          <p class="text-gray-600 text-sm leading-relaxed">{{ campaign.description }}</p>
        </div>
        <div class="ml-4">
          <Icon name="heroicons:shield-exclamation" class="w-6 h-6 text-red-500" />
        </div>
      </div>
      
      <div class="pt-4 border-t border-gray-200">
        <UButton size="xs" color="red" variant="ghost" class="w-full">
          Learn More
          <template #trailing>
            <Icon name="heroicons:arrow-right" class="w-3 h-3" />
          </template>
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup>
defineProps({
  campaign: {
    type: Object,
    required: true
  }
})

const statusColors = {
  active: 'bg-green-500',
  ongoing: 'bg-blue-500',
  planned: 'bg-yellow-500',
  completed: 'bg-gray-500'
}
</script>