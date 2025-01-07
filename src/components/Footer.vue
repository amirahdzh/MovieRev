<template>
  <footer class="bg-gray-800 text-white py-10">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <!-- Logo or site name -->
      <div class="text-center md:text-left mb-6 md:mb-0">
        <RouterLink to="/" class="text-3xl font-bold text-primary hover:text-white transition">
          FILMO
        </RouterLink>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col md:flex-row items-center mb-6 md:mb-0">
        <RouterLink to="#" class="text-base text-gray-300 hover:text-white mx-2 mb-2 md:mb-0 transition">
          About
        </RouterLink>
        <RouterLink to="#" class="text-base text-gray-300 hover:text-white mx-2 mb-2 md:mb-0 transition">
          Contact
        </RouterLink>
        <RouterLink to="#" class="text-base text-gray-300 hover:text-white mx-2 mb-2 md:mb-0 transition">
          Privacy Policy
        </RouterLink>
      </nav>

      <!-- Social Media Links -->
      <div class="flex space-x-4">
        <a href="#" target="_blank" class="text-gray-400 hover:text-white transition">
          <Icon icon="mdi:facebook" class="h-6 w-6" />
        </a>
        <a href="#" target="_blank" class="text-gray-400 hover:text-white transition">
          <Icon icon="mdi:twitter" class="h-6 w-6" />
        </a>
        <a href="#" target="_blank" class="text-gray-400 hover:text-white transition">
          <Icon icon="mdi:instagram" class="h-6 w-6" />
        </a>
      </div>
    </div>

    <!-- Decorative Divider -->
    <div class="border-t border-gray-700 my-6"></div>

    <!-- Newsletter Subscription -->
    <div class="container mx-auto text-center">
      <p class="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates</p>
      <div class="flex justify-center">
        <input type="email" placeholder="Enter your email" class="w-full max-w-xs p-2 rounded-l-md border-none" />
        <button class="px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-r-md transition">
          Subscribe
        </button>
      </div>
    </div>

    <!-- Copyright -->
    <div class="text-center text-gray-400 mt-6">
      <p>&copy; {{ currentYear }} FILMO. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

// Get the current year
const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
footer {
  background-color: #1f2937; /* Gray 800 */
}

footer .container {
  max-width: 1200px;
}

footer input[type="email"] {
  background-color: #374151; /* Gray 700 */
  color: #d1d5db; /* Gray 300 */
}

footer button {
  background-color: #3b82f6; /* Blue 500 */
}
</style>
