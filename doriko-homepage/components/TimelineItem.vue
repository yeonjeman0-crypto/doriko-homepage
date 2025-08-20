<template>
  <div class="relative">
    <!-- Timeline line -->
    <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
    
    <!-- Timeline dot -->
    <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
    
    <!-- Content -->
    <div :class="[
      'flex items-center',
      isLeft ? 'flex-row' : 'flex-row-reverse'
    ]">
      <div :class="[
        'w-1/2',
        isLeft ? 'pr-8 text-right' : 'pl-8 text-left'
      ]">
        <UCard class="shadow-lg hover:shadow-xl transition-shadow">
          <div class="p-6">
            <div class="text-2xl font-bold text-blue-600 mb-2">{{ year }}</div>
            <h3 class="text-xl font-semibold maritime-blue mb-3">{{ title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ description }}</p>
          </div>
        </UCard>
      </div>
      <div class="w-1/2"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  year: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isLeft: {
    type: Boolean,
    default: true
  }
})
</script>