<template>
  <UCard class="shadow-lg hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer">
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="flex items-center mb-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {{ report.category }}
            </span>
            <span class="ml-2 text-sm text-gray-500">{{ formatDate(report.date) }}</span>
          </div>
          <h3 class="text-lg font-semibold maritime-blue mb-2">{{ report.title }}</h3>
          <p class="text-gray-600 text-sm leading-relaxed">{{ report.excerpt }}</p>
        </div>
        <div class="ml-4">
          <Icon name="heroicons:document-text" class="w-6 h-6 text-blue-500" />
        </div>
      </div>
      
      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
        <span class="text-xs text-gray-500 capitalize">{{ report.type }}</span>
        <UButton size="xs" color="blue" variant="ghost">
          Read More
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
  report: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>