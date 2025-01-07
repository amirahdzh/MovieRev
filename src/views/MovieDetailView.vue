<template>
  <div class="mt-20 mx-16 mb-20">
    <!-- Back to Movies Link -->
    <!-- Back Button -->
    <div class="mb-4">
      <button @click="goBack" class="bg-gray-300 text-gray-800 p-2 rounded">
        Back
      </button>
    </div>
    
    <!-- Page Title -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-primary">{{ movie.title }}</h1>
      <p class="text-lg text-gray-600">{{ movie.year }}</p>
    </div>

    <!-- Movie Details -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        v-if="movie.poster"
        :src="movie.poster"
        :alt="movie.title"
        class="w-full h-48 object-cover"
      />
      <div class="p-4">
        <h2 class="text-xl font-semibold text-gray-800">Summary</h2>
        <p class="text-gray-600 mt-2">{{ movie.summary }}</p>

        <div v-if="movie.genre">
          <h2 class="text-xl font-semibold text-gray-800 mt-4">Genre</h2>
          <p class="text-gray-600 mt-2">{{ movie.genre.name }}</p>
        </div>

        <div v-if="averageRating !== null">
          <h2 class="text-xl font-semibold text-gray-800 mt-4">Average Rating</h2>
          <p class="text-gray-600 mt-2">{{ averageRating.toFixed(2) }} / 10</p>
        </div>

        <div v-if="movie.list_cast && movie.list_cast.length">
          <h2 class="text-xl font-semibold text-gray-800 mt-4">Cast</h2>
          <ul class="list-disc list-inside">
            <li
              v-for="cast in movie.list_cast"
              :key="cast.id"
              class="text-gray-600 mt-2"
            >
              {{ cast.name }} - {{ cast.age }} years old
            </li>
          </ul>
        </div>

        <div v-if="reviews && reviews.length">
          <h2 class="text-xl font-semibold text-gray-800 mt-4">Reviews</h2>
          <ul class="list-disc list-inside">
            <li
              v-for="review in reviews"
              :key="review.id"
              class="text-gray-600 mt-2"
            >
              "{{ review.critic }}" - Rating: {{ review.rating }}
            </li>
          </ul>
        </div>

        <!-- Add the Review Button -->
        <div class="text-center mt-6">
          <button
            @click="checkAuth"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Review This Movie
          </button>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal
      :isVisible="showLoginModal"
      @close="showLoginModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getMovieById } from '../services/movieService';
import { useRoute, useRouter } from 'vue-router';
import LoginModal from '../components/LoginModal.vue';
import { isAuthenticated } from '../services/authService'; // Ensure this function checks user authentication

const route = useRoute();
const router = useRouter();
const movie = ref({});
const averageRating = ref(null);
const reviews = ref([]);
const loading = ref(true);
const error = ref(null);
const showLoginModal = ref(false);

const fetchMovie = async (id) => {
  try {
    const response = await getMovieById(id);
    movie.value = response.data;
    averageRating.value = response.data.average_rating;
    reviews.value = response.data.list_reviews;
  } catch (err) {
    error.value = "Failed to load movie details.";
  } finally {
    loading.value = false;
  }
};

const checkAuth = () => {
  if (!isAuthenticated()) {
    showLoginModal.value = true;
  } else {
    router.push(`/movies/${movie.value.id}/review`);
  }
};

// Function to navigate back to the previous page
const goBack = () => {
  router.back();
};

onMounted(() => {
  const { id } = route.params;
  fetchMovie(id);
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
