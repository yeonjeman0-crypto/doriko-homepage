<template>
  <UCard class="shadow-lg hover:shadow-xl transition-all duration-300 hover-scale overflow-hidden">
    <!-- Vessel Image Placeholder -->
    <div class="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
      <Icon name="heroicons:globe-asia-australia" class="w-20 h-20 text-white" />
    </div>
    
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold maritime-blue">{{ vessel.name }}</h3>
        <div class="flex items-center space-x-1">
          <span class="text-2xl">🇰🇷</span>
        </div>
      </div>
      
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">Type:</span>
          <span class="font-medium">{{ vessel.type }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">DWT:</span>
          <span class="font-medium">{{ vessel.dwt }} tons</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Built:</span>
          <span class="font-medium">{{ vessel.built }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Flag:</span>
          <span class="font-medium">{{ vessel.flag }}</span>
        </div>
      </div>
      
      <div class="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div class="flex items-center text-green-600">
          <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span class="text-xs font-medium">Active</span>
        </div>
        <UButton 
          size="xs" 
          color="blue" 
          variant="outline"
          class="text-xs"
        >
          View Details
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup>
defineProps({
  vessel: {
    type: Object,
    required: true
  }
})
</script>