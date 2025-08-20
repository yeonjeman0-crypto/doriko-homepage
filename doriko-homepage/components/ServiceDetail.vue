<template>
  <UCard class="h-full shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
    <div class="p-6">
      <div class="flex items-center mb-6">
        <div 
          :class="[
            'w-16 h-16 rounded-full flex items-center justify-center mr-4',
            colorClasses[color] || colorClasses.blue
          ]"
        >
          <Icon :name="icon" class="w-8 h-8 text-white" />
        </div>
        <h3 class="text-2xl font-bold maritime-blue">{{ title }}</h3>
      </div>
      
      <p class="text-gray-700 leading-relaxed mb-6">{{ description }}</p>
      
      <div class="space-y-3">
        <h4 class="font-semibold text-gray-900 mb-4">Key Features:</h4>
        <ul class="space-y-2">
          <li 
            v-for="feature in features" 
            :key="feature"
            class="flex items-center"
          >
            <div 
              :class="[
                'w-2 h-2 rounded-full mr-3',
                colorClasses[color] || colorClasses.blue
              ]"
            ></div>
            <span class="text-gray-600">{{ feature }}</span>
          </li>
        </ul>
      </div>
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