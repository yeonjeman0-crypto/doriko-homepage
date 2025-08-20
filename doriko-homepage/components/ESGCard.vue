<template>
  <UCard class="h-full text-center shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
    <div class="p-8">
      <div 
        :class="[
          'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6',
          colorClasses[color] || colorClasses.blue
        ]"
      >
        <Icon :name="icon" class="w-10 h-10 text-white" />
      </div>
      
      <h3 class="text-2xl font-bold maritime-blue mb-4">{{ title }}</h3>
      <p class="text-gray-600 leading-relaxed mb-6">{{ description }}</p>
      
      <ul class="space-y-3 text-left">
        <li 
          v-for="feature in features" 
          :key="feature"
          class="flex items-start"
        >
          <div 
            :class="[
              'w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0',
              colorClasses[color] || colorClasses.blue
            ]"
          ></div>
          <span class="text-gray-600 text-sm">{{ feature }}</span>
        </li>
      </ul>
    </div>
  </UCard>
</template>

<script setup>
defineProps({
  icon: {
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
  features: {
    type: Array,
    default: () => []
  },
  color: {
    type: String,
    default: 'blue'
  }
})

const colorClasses = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  red: 'bg-red-600',
  yellow: 'bg-yellow-600',
  indigo: 'bg-indigo-600'
}
</script>