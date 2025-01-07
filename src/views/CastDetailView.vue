<template>
  <div class="mt-20 p-6 max-w-6xl mx-auto">
    <!-- Back Button -->
    <router-link to="/casts" class="inline-block mb-6 text-blue-600 hover:text-blue-800">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Casts
    </router-link>
    <!-- Loading and Error States -->
    <div v-if="loading" class="text-center text-gray-500 text-xl">Loading...</div>
    <div v-if="error" class="text-center text-red-500 text-xl">{{ error }}</div>

    <!-- Cast Detail Section -->
    <div v-if="!loading && !error">
      <!-- Cast Photo and Info -->
      <section class="relative mb-8">
        <img :src="cast.photo || 'default-image.jpg'" alt="Cast Photo" class="w-full h-96 object-cover rounded-lg shadow-lg" />
        <div class="absolute top-0 left-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
          <h1 class="text-4xl font-bold">{{ cast.name }}</h1>
          <p class="text-lg">Age: {{ cast.age }}</p>
        </div>
      </section>

      <!-- Bio Section -->
      <section class="bg-gray-100 p-8 rounded-lg shadow-md mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Biography</h2>
        <p class="text-gray-700 summary-truncate">{{ cast.bio }}</p>
      </section>

      <!-- Movies List Section -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Movies</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="movie in cast.list_movie" :key="movie.id" class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img :src="movie.poster || 'default-movie-poster.jpg'" alt="Movie Poster" class="w-full h-60 object-cover" />
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ movie.title }}</h3>
              <p class="text-gray-700 mb-2">{{ movie.summary }}</p>
              <p class="text-gray-500">Year: {{ movie.year }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCastById } from '../services/castService';
import { useRoute } from 'vue-router';

const route = useRoute();
const cast = ref({});
const loading = ref(true);
const error = ref(null);

const loadCast = async () => {
  const castId = route.params.id;
  try {
    cast.value = await getCastById(castId);
  } catch (err) {
    error.value = 'Failed to load data.';
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push('/casts');
};

onMounted(loadCast);
</script>

<style scoped>
.summary-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Number of lines to show before truncating */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.text-white {
  color: #ffffff;
}

.bg-gradient-to-t {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.w-full {
  width: 100%;
}

.h-96 {
  height: 24rem; /* Adjust height for cast photo */
}

.h-60 {
  height: 15rem; /* Adjust height for movie poster */
}

.object-cover {
  object-fit: cover;
}

.shadow-lg {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.text-gray-800 {
  color: #2d3748;
}

.text-gray-700 {
  color: #4a5568;
}

.text-gray-500 {
  color: #a0aec0;
}
</style>
