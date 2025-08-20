<template>
  <UCard class="shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="flex items-center mb-3">
            <span 
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                impactColors[update.impact] || impactColors.Medium
              ]"
            >
              {{ update.impact }} Impact
            </span>
            <span class="ml-2 text-sm text-gray-500">{{ formatDate(update.date) }}</span>
          </div>
          <h3 class="text-lg font-semibold maritime-blue mb-2">{{ update.title }}</h3>
          <p class="text-gray-600 text-sm leading-relaxed mb-3">{{ update.summary }}</p>
          <p class="text-xs text-gray-500">Authority: {{ update.authority }}</p>
        </div>
      </div>
      
      <div class="pt-4 border-t border-gray-200">
        <UButton size="xs" color="gray" variant="ghost" class="w-full">
          View Details
          <template #trailing>
            <Icon name="heroicons:external-link" class="w-3 h-3" />
          </template>
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup>
defineProps({
  update: {
    type: Object,
    required: true
  }
})

const impactColors = {
  Critical: 'bg-red-100 text-red-800',
  High: 'bg-orange-100 text-orange-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>