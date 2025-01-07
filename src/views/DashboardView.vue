<template>
  <div class="dashboard-view p-8 bg-gray-100">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Total Movies -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Total Movies</h2>
        <p class="text-4xl font-bold">{{ totals.movies }}</p>
      </div>

      <!-- Total Casts -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Total Casts</h2>
        <p class="text-4xl font-bold">{{ totals.casts }}</p>
      </div>

      <!-- Total Genres -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Total Genres</h2>
        <p class="text-4xl font-bold">{{ totals.genres }}</p>
      </div>

      <!-- Total Roles -->
      <!-- <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Total Roles</h2>
        <p class="text-4xl font-bold">{{ totals.roles }}</p>
      </div> -->

      <!-- Total Cast Movies -->
      <!-- <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Total Cast Movies</h2>
        <p class="text-4xl font-bold">{{ totals.castMovies }}</p>
      </div> -->

      <!-- Total Reviews -->
      <!-- <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Total Reviews</h2>
        <p class="text-4xl font-bold">{{ totals.reviews }}</p>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const totals = ref({
  movies: 0,
  casts: 0,
  genres: 0,
  roles: 0,
  castMovies: 0,
  reviews: 0,
});

const fetchTotals = async () => {
  try {
    const [
      moviesResponse,
      castsResponse,
      genresResponse,
      // rolesResponse,
      // castMoviesResponse,
      // reviewsResponse,
    ] = await Promise.all([
      axios.get('http://localhost:8000/api/v1/movie'),
      axios.get('http://localhost:8000/api/v1/cast'),
      axios.get('http://localhost:8000/api/v1/genre'),
      // axios.get('http://localhost:8000/api/v1/role'),
      // axios.get('http://localhost:8000/api/v1/cast-movie'),
      // axios.get('http://localhost:8000/api/v1/review'),
    ]);

    console.log('Movies Response:', moviesResponse.data);
    console.log('Casts Response:', castsResponse.data);
    console.log('Genres Response:', genresResponse.data);

    totals.value.movies = moviesResponse.data.data.length;
    totals.value.casts = castsResponse.data.data.length;
    totals.value.genres = genresResponse.data.data.length;
    // totals.value.roles = rolesResponse.data.data.length;
    // totals.value.castMovies = castMoviesResponse.data.data.length;
    // totals.value.reviews = reviewsResponse.data.data.length;

  } catch (error) {
    console.error('Error fetching totals:', error);
  }
};

onMounted(fetchTotals);
</script>

<style scoped>
.dashboard-view {
  height: 100%;
}
</style>
