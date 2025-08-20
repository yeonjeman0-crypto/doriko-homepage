<template>
  <UCard class="hover-scale transition-all duration-300 hover:shadow-xl border-0 shadow-lg">
    <template #header>
      <div class="flex flex-col items-center text-center p-6">
        <div 
          :class="[
            'w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors',
            colorClasses[color] || colorClasses.blue
          ]"
        >
          <Icon :name="icon" class="w-8 h-8 text-white" />
        </div>
        <h3 class="text-xl font-semibold maritime-blue mb-3">{{ title }}</h3>
        <p class="text-gray-600 leading-relaxed">{{ description }}</p>
      </div>
    </template>
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