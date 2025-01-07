<template>
  <div class="mt-20 mx-16 mb-20">
    <!-- Back Button -->
    <div class="mb-4">
      <button @click="goBack" class="bg-gray-300 text-gray-800 p-2 rounded">
        Back
      </button>
    </div>

    <!-- Dynamic Title with Movie Name -->
    <h1 class="text-3xl font-bold text-primary mb-6">
      Review {{ movie.title }}
    </h1>

    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="critic" class="block text-lg font-semibold text-gray-800">Critic</label>
        <textarea id="critic" v-model="critic" class="w-full p-2 border border-gray-300 rounded" required></textarea>
      </div>
      <div class="mb-4">
        <label for="rating" class="block text-lg font-semibold text-gray-800">Rating</label>
        <input
          type="number"
          id="rating"
          v-model.number="rating"
          min="1"
          max="10"
          step="1"
          class="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div class="mb-4">
        <button type="submit" class="bg-blue-600 text-white p-2 rounded">Submit Review</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { submitMovieReview, getMovieById } from '../services/movieService';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const critic = ref('');
const rating = ref(1); // Default to 1 to ensure valid initial value
const movie = ref({ title: '' });

const fetchMovie = async (id) => {
  try {
    const response = await getMovieById(id);
    movie.value = response.data;
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
  }
};

const handleSubmit = async () => {
  try {
    const { id: movieId } = route.params;
    await submitMovieReview(critic.value, movieId, rating.value);
    alert('Review submitted successfully!');
    router.push(`/movies/${movieId}`);
  } catch (error) {
    console.error('Failed to submit review:', error);
    alert('Failed to submit review. Please try again.');
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
</style>
