<template>
  <div class="mt-20 mx-16 mb-20">
    <!-- Page Title -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-primary">Genres</h1>
      <p class="text-lg text-gray-600">Browse our collection of genres</p>
    </div>

    <!-- Tabs -->
    <div class="flex justify-center mb-4">
      <button
        @click="filterMovies('all')"
        :class="['px-4 py-2', selectedGenre === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700']"
        class="rounded-lg mr-2"
      >
        All
      </button>
      <button
        v-for="genre in genres"
        :key="genre.id"
        @click="filterMovies(genre.id)"
        :class="['px-4 py-2', selectedGenre === genre.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700']"
        class="rounded-lg mr-2"
      >
        {{ genre.name }}
      </button>
    </div>

    <!-- Movies Grid -->
    <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="movie in movies" :key="movie.id" class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <img :src="movie.poster" alt="Movie Poster" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-xl font-semibold text-gray-800">{{ movie.title }}</h2>
          <p class="text-gray-600">{{ movie.summary }}</p>
          <RouterLink :to="`/movies/${movie.id}`" class="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
            View Details
          </RouterLink>
        </div>
      </div>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getGenres, getMoviesByGenre } from '../services/genreService';
import { getMovies } from '../services/movieService';

const genres = ref([]);
const movies = ref([]);
const selectedGenre = ref('all');
const loading = ref(true);
const error = ref(null);

const fetchGenres = async () => {
  try {
    const response = await getGenres();
    genres.value = response.data;
  } catch (err) {
    error.value = "Failed to load genres.";
    console.error("Error fetching genres:", err);
  } finally {
    loading.value = false;
  }
};

const fetchMovies = async (genreId) => {
  try {
    if (genreId === 'all') {
      // Fetch all movies if genreId is 'all'
      const response = await getMovies(); // Make sure getAllMovies is implemented
      movies.value = response.data; // Set movies array directly
    } else {
      console.log(`Fetching movies for genre ID: ${genreId}`);
      const response = await getMoviesByGenre(genreId);
      console.log('Movies data:', response); // Ensure this shows the correct data structure
      movies.value = response; // Set movies array directly
    }
  } catch (err) {
    error.value = "Failed to load movies.";
    console.error("Error fetching movies:", err);
  } finally {
    loading.value = false;
    console.log('Loading status:', loading.value); // Log loading status
  }
};

const filterMovies = (genreId) => {
  selectedGenre.value = genreId;
  loading.value = true;
  fetchMovies(genreId);
};

onMounted(() => {
  fetchGenres();
  filterMovies('all'); // Fetch all movies by default
});
</script>

<style scoped>
.bg-primary {
  background-color: #1d4ed8; /* Tailwind blue-600 */
}

.bg-primary-dark {
  background-color: #1e40af; /* Tailwind blue-800 */
}
</style>
