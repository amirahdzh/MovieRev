<template>
  <div class="mt-20 mx-4 sm:mx-8 lg:mx-16 mb-20">
    <!-- Page Title -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-primary">Casts</h1>
      <p class="text-lg text-gray-600 mt-2">Browse our talented casts</p>
    </div>

    <!-- Casts Grid -->
    <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <!-- Cast Card -->
      <div v-for="cast in casts" :key="cast.id" class="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
        <!-- Image Placeholder -->
        <div class="relative w-full h-48 bg-gray-200">
          <img v-if="cast.image" :src="cast.image" alt="Cast Image" class="w-full h-full object-cover">
          <div v-else class="flex items-center justify-center h-full text-gray-500">No Image</div>
        </div>
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800">{{ cast.name }}</h2>
          <p class="text-gray-600 mt-2">Age: {{ cast.age }}</p>
          <!-- Bio with truncation -->
          <p class="text-gray-600 mt-2 bio-truncate">{{ cast.bio }}</p>
          <RouterLink :to="`/casts/${cast.id}`" class="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
            View Details
          </RouterLink>
        </div>
      </div>
      <!-- End Cast Card -->
    </div>
    <p v-else class="text-center text-gray-600">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCasts } from '../services/castService';

const casts = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchCasts = async () => {
  try {
    const response = await getCasts();
    casts.value = response.data;
  } catch (err) {
    error.value = "Failed to load casts.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCasts();
});
</script>

<style scoped>
.bg-primary {
  background-color: #1d4ed8; /* Tailwind blue-600 */
}

.bg-primary-dark {
  background-color: #1e40af; /* Tailwind blue-800 */
}

.casts {
  padding: 1rem;
}

.cast-card {
  border-radius: 0.75rem;
  transition: transform 0.3s ease-in-out;
}

.cast-card:hover {
  transform: scale(1.05);
}

.cast-image {
  border-bottom: 1px solid #e5e7eb;
}

.cast-info {
  padding: 1.5rem;
}

.bio-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Number of lines to show before truncating */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
