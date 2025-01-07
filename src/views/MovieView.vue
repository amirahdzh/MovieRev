
<script setup>
import { ref, onMounted } from "vue";
import { getMovies } from "../services/movieService";

const movies = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchMovies = async () => {
  try {
    const response = await getMovies();
    movies.value = response.data;
  } catch (err) {
    error.value = "Failed to load movies.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMovies();
});
</script>

<style scoped></style>

<template>
  <div class="mt-20 mx-16 mb-20">
    <!-- Page Title -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-primary">Movies</h1>
      <p class="text-lg text-gray-600">Browse our collection of movies</p>
    </div>

    <!-- Movies Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <!-- Movie Card -->
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
      >
        <img
          :src="movie.poster"
          :alt="movie.title"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold text-gray-800">{{ movie.title }}</h2>
          <p class="text-gray-600 mt-2">{{ movie.summary }}</p>
          <RouterLink
            :to="`/movies/${movie.id}`"
            class="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
          >
            View Details
          </RouterLink>
        </div>
      </div>
      <!-- End Movie Card -->
    </div>
  </div>
</template>

<style scoped>
/* .movies {
  padding: 1rem;
}

.bg-primary {
  background-color: #1d4ed8;
}

.bg-primary-dark {
  background-color: #1e40af;
}

.movies {
  padding: 1rem;
} */
</style>
