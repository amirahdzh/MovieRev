<template>
  <div class="home">
    <section
      class="bg-cover bg-center text-white py-40"
      style="background-image: url('/img/WP 1.jpg')"
    >
      <div class="container mx-auto text-center">
        <h1 class="text-5xl font-bold">Selamat Datang di Website Movie Review</h1>
        <p class="mt-4 text-xl">Jelajahi dan Review Film Favoritmu</p>
        <!-- <button class="mt-6 px-8 py-3 bg-primary hover:bg-blue-600 rounded">
          Jelajahi Film
        </button> -->
      </div>
    </section>

    <section class="search-bar py-8 bg-gray-100">
      <div class="container mx-auto">
        <input
          type="text"
          class="w-full p-4 border rounded"
          placeholder="Cari film..."
        />
      </div>
    </section>

    <section class="categories py-8">
      <div class="container mx-auto">
        <h2 class="text-3xl text-dark font-bold mb-6">Genre</h2>
        <div class="flex flex-wrap -mx-2">
          <div
            class="w-1/2 sm:w-1/4 px-2 mb-4"
            v-for="category in genres"
            :key="category.id"
          >
            <div class="p-4 bg-white rounded shadow hover:shadow-lg transition">
              <h3 class="text-xl text-dark font-semibold">{{ category.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="latest-movies py-8 bg-gray-100">
      <div class="container mx-auto">
        <h2 class="text-3xl text-dark font-bold mb-6">Movie</h2>
        <div class="flex flex-wrap -mx-2">
          <div
            class="w-1/2 sm:w-1/4 px-2 mb-4"
            v-for="movie in movies"
            :key="movie.id"
          >
            <div class="p-4 bg-white text-dark rounded shadow hover:shadow-lg transition">
              <img
                :src="movie.poster"
                alt="Movie Poster"
                class="w-full h-auto rounded"
              />
              <h3 class="mt-4 text-xl font-semibold">{{ movie.title }}</h3>
              <p class="text-gray-600">{{ movie.rating }} / 10</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="popular-movies py-8">
      <div class="container mx-auto">
        <h2 class="text-3xl text-dark font-bold mb-6">Cast</h2>
        <div class="flex flex-wrap -mx-2">
          <div
            class="w-1/2 sm:w-1/4 px-2 mb-4"
            v-for="cast in casts"
            :key="cast.id"
          >
            <div class="p-4 bg-white rounded shadow hover:shadow-lg transition">
              <img
                :src="cast.photo"
                alt="Cast Photo"
                class="w-full h-auto rounded"
              />
              <h3 class="mt-4 text-dark text-xl font-semibold">{{ cast.name }}</h3>
              <p class="text-gray-600">{{ cast.age }} years old</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="latest-reviews py-8 bg-gray-100">
      <div class="container mx-auto">
        <h2 class="text-3xl text-dark font-bold mb-6">Review Terbaru</h2>
        <div class="flex flex-wrap -mx-2">
          <div
            class="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4"
            v-for="review in latestReviews"
            :key="review.id"
          >
            <div class="p-4 bg-white rounded shadow hover:shadow-lg transition">
              <h3 class="text-xl text-dark font-semibold">{{ review.movieTitle }}</h3>
              <p class="text-gray-600">{{ review.snippet }}</p>
              <p class="mt-2 text-sm text-gray-500">
                Ditulis oleh {{ review.username }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const genres = ref([])
const movies = ref([])
const casts = ref([])
const latestReviews = ref([
  {
    id: 1,
    movieTitle: 'Film 1',
    snippet: 'Review singkat...',
    username: 'Pengguna1',
  },
  {
    id: 2,
    movieTitle: 'Film 2',
    snippet: 'Review singkat...',
    username: 'Pengguna2',
  },
  // Tambahkan review terbaru lainnya di sini
])

const fetchGenres = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/genre')
    genres.value = response.data
  } catch (error) {
    console.error('Error fetching genres:', error)
  }
}

const fetchMovies = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/movie')
    movies.value = response.data
  } catch (error) {
    console.error('Error fetching movies:', error)
  }
}

const fetchCasts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/cast')
    casts.value = response.data
  } catch (error) {
    console.error('Error fetching casts:', error)
  }
}

onMounted(() => {
  fetchGenres()
  fetchMovies()
  fetchCasts()
})
</script>

<style>
/* Tambahkan gaya tambahan di sini */
</style>
