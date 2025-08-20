<template>
  <UForm :state="form" @submit="onSubmit" class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UFormGroup label="Name *" name="name">
        <UInput 
          v-model="form.name" 
          placeholder="Your full name"
          size="lg"
          :ui="{ wrapper: 'relative' }"
        />
      </UFormGroup>
      
      <UFormGroup label="Company" name="company">
        <UInput 
          v-model="form.company" 
          placeholder="Company name"
          size="lg"
        />
      </UFormGroup>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UFormGroup label="Email *" name="email">
        <UInput 
          v-model="form.email" 
          type="email"
          placeholder="your@email.com"
          size="lg"
        />
      </UFormGroup>
      
      <UFormGroup label="Phone" name="phone">
        <UInput 
          v-model="form.phone" 
          placeholder="+82-10-1234-5678"
          size="lg"
        />
      </UFormGroup>
    </div>

    <UFormGroup label="Service Interest" name="service">
      <USelect 
        v-model="form.service" 
        :options="serviceOptions"
        placeholder="Select a service"
        size="lg"
      />
    </UFormGroup>

    <UFormGroup label="Message *" name="message">
      <UTextarea 
        v-model="form.message" 
        placeholder="Tell us about your requirements..."
        rows="5"
        resize
      />
    </UFormGroup>

    <div class="flex items-start space-x-3">
      <UCheckbox v-model="form.consent" />
      <p class="text-sm text-gray-600 leading-relaxed">
        I consent to DORIKO LIMITED processing my personal data for the purpose of 
        responding to my inquiry. I understand I can withdraw my consent at any time.
      </p>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <UButton 
        type="submit" 
        size="lg" 
        :loading="isSubmitting"
        :disabled="!isFormValid"
        class="flex-1 sm:flex-none hover-scale"
      >
        Send Message
        <template #trailing>
          <Icon name="heroicons:paper-airplane" />
        </template>
      </UButton>
      
      <UButton 
        type="button" 
        variant="outline" 
        size="lg"
        @click="resetForm"
        class="flex-1 sm:flex-none"
      >
        Clear Form
      </UButton>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="submitStatus === 'success'" class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-center">
        <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-600 mr-2" />
        <p class="text-green-800">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
      </div>
    </div>

    <div v-if="submitStatus === 'error'" class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-center">
        <Icon name="heroicons:exclamation-circle" class="w-5 h-5 text-red-600 mr-2" />
        <p class="text-red-800">Sorry, there was an error sending your message. Please try again or contact us directly.</p>
      </div>
    </div>
  </UForm>
</template>

<script setup>
const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  consent: false
})

const isSubmitting = ref(false)
const submitStatus = ref('')

const serviceOptions = [
  'Newbuilding Supervision & Technical Advice',
  'RightShip Vetting Operation Support',
  'Bulk Carrier–Specific Services',
  'Safety & Quality Management',
  'ESG & Safety Management',
  'Fleet Management',
  'Compliance Consulting',
  'Other'
]

const isFormValid = computed(() => {
  return form.name && form.email && form.message && form.consent
})

const onSubmit = async () => {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  submitStatus.value = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real application, you would send the form data to your backend
    console.log('Form submitted:', form)
    
    submitStatus.value = 'success'
    resetForm()
  } catch (error) {
    console.error('Form submission error:', error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(form, {
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    consent: false
  })
  submitStatus.value = ''
}
</script>