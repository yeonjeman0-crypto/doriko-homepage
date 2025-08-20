<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">{{ $t('nav.contact') }}</h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Get in touch with our team of maritime experts. We're here to help with all your shipping needs.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div>
            <h2 class="text-3xl font-bold maritime-blue mb-8">Send us a message</h2>
            <ContactForm />
          </div>

          <!-- Office Information -->
          <div class="space-y-8">
            <h2 class="text-3xl font-bold maritime-blue mb-8">{{ $t('contact.offices') }}</h2>
            
            <!-- Seoul Office -->
            <UCard class="shadow-lg">
              <div class="p-6">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Icon name="heroicons:building-office-2" class="w-6 h-6 text-white" />
                  </div>
                  <h3 class="text-xl font-semibold maritime-blue">Seoul Headquarters</h3>
                </div>
                <div class="space-y-3 text-gray-600">
                  <div class="flex items-start">
                    <Icon name="heroicons:map-pin" class="w-5 h-5 mt-1 mr-3 text-blue-500" />
                    <div>
                      <p>123 Gangnam-daero, Gangnam-gu</p>
                      <p>Seoul 06292, Korea</p>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <Icon name="heroicons:phone" class="w-5 h-5 mr-3 text-blue-500" />
                    <p>+82-2-1234-5678</p>
                  </div>
                  <div class="flex items-center">
                    <Icon name="heroicons:envelope" class="w-5 h-5 mr-3 text-blue-500" />
                    <p>seoul@doriko.com</p>
                  </div>
                  <div class="flex items-center">
                    <Icon name="heroicons:clock" class="w-5 h-5 mr-3 text-blue-500" />
                    <p>Mon-Fri: 9:00 AM - 6:00 PM KST</p>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Busan Office -->
            <UCard class="shadow-lg">
              <div class="p-6">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Icon name="heroicons:map-pin" class="w-6 h-6 text-white" />
                  </div>
                  <h3 class="text-xl font-semibold maritime-blue">Busan Port Office</h3>
                </div>
                <div class="space-y-3 text-gray-600">
                  <div class="flex items-start">
                    <Icon name="heroicons:map-pin" class="w-5 h-5 mt-1 mr-3 text-blue-500" />
                    <div>
                      <p>456 Harbor Street, Jung-gu</p>
                      <p>Busan 48938, Korea</p>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <Icon name="heroicons:phone" class="w-5 h-5 mr-3 text-blue-500" />
                    <p>+82-51-9876-5432</p>
                  </div>
                  <div class="flex items-center">
                    <Icon name="heroicons:envelope" class="w-5 h-5 mr-3 text-blue-500" />
                    <p>busan@doriko.com</p>
                  </div>
                  <div class="flex items-center">
                    <Icon name="heroicons:clock" class="w-5 h-5 mr-3 text-blue-500" />
                    <p>Mon-Fri: 8:00 AM - 7:00 PM KST</p>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Emergency Contact -->
            <UCard class="shadow-lg bg-red-50 border-red-200">
              <div class="p-6">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                    <Icon name="heroicons:phone" class="w-6 h-6 text-white" />
                  </div>
                  <h3 class="text-xl font-semibold text-red-700">24/7 Emergency Line</h3>
                </div>
                <div class="space-y-2 text-red-600">
                  <p class="font-semibold">+82-10-1234-5678</p>
                  <p class="text-sm">For urgent maritime emergencies and critical incidents</p>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold maritime-blue mb-6">Find Us</h2>
          <div class="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Seoul Map Placeholder -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div class="text-center">
                <Icon name="heroicons:map" class="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 class="text-xl font-semibold maritime-blue">Seoul Office Location</h3>
                <p class="text-gray-600 mt-2">Interactive map coming soon</p>
              </div>
            </div>
            <div class="p-6">
              <h4 class="font-semibold maritime-blue mb-2">Seoul Headquarters</h4>
              <p class="text-gray-600">Gangnam Business District</p>
            </div>
          </div>

          <!-- Busan Map Placeholder -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div class="text-center">
                <Icon name="heroicons:map" class="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 class="text-xl font-semibold maritime-blue">Busan Port Office</h3>
                <p class="text-gray-600 mt-2">Interactive map coming soon</p>
              </div>
            </div>
            <div class="p-6">
              <h4 class="font-semibold maritime-blue mb-2">Busan Port Office</h4>
              <p class="text-gray-600">Near Busan Port Authority</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 maritime-bg text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold mb-6">Ready to Work Together?</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Our team of maritime experts is ready to provide you with the best solutions for your shipping needs.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton 
            size="xl" 
            color="white"
            href="tel:+82-2-1234-5678"
            class="hover-scale"
          >
            Call Now
            <template #trailing>
              <Icon name="heroicons:phone" />
            </template>
          </UButton>
          <UButton 
            size="xl" 
            color="white" 
            variant="outline"
            href="mailto:info@doriko.com"
            class="hover-scale"
          >
            Send Email
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
useHead({
  title: 'Contact Us - DORIKO LIMITED',
  meta: [
    { name: 'description', content: 'Contact DORIKO LIMITED for maritime consulting and ship management services. Offices in Seoul and Busan with 24/7 emergency support.' }
  ]
})
</script>