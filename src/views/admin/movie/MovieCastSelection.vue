<template>
  <div class="p-6">
    <!-- Back button -->
    <button @click="goBack" class="text-blue-500 hover:underline mb-4">
      &larr; Back
    </button>
    <h1 class="text-2xl font-bold mb-4">Select Casts for {{ movieName }}</h1>
    <form @submit.prevent="saveCastSelection">
      <div v-for="cast in casts" :key="cast.id" class="mb-2">
        <label>
          <input type="checkbox" :value="cast.id" v-model="selectedCasts" />
          {{ cast.name }}
        </label>
      </div>
      <button
        type="submit"
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getCasts,
  getCastsForMovie,
  addCastToMovie,
  getCastMovieId,
  removeCastFromMovie,
  getMovieById
} from "../../../services/movieService";

const route = useRoute();
const router = useRouter();
const movieId = route.params.movieId;
const casts = ref([]);
const selectedCasts = ref([]);
const initialSelectedCasts = ref([]);
const movieName = ref('');

const fetchCasts = async () => {
  try {
    const response = await getCasts();
    console.log("Casts fetched:", response); // Debug log
    casts.value = response;
  } catch (error) {
    console.error("Error fetching casts:", error);
  }
};

const fetchCastsForMovie = async () => {
  try {
    const response = await getCastsForMovie(movieId);
    console.log("Casts for movie fetched:", response); // Debug log
    initialSelectedCasts.value = response.map((cast) => cast.id);
    selectedCasts.value = [...initialSelectedCasts.value];
  } catch (error) {
    console.error("Error fetching casts for movie:", error);
  }
};

const fetchMovieName = async () => {
  try {
    const response = await getMovieById(movieId);
    console.log("Movie details fetched:", response); // Debug log
    movieName.value = response.data.title;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

const saveCastSelection = async () => {
  try {
    const castsToAdd = selectedCasts.value.filter(
      (castId) => !initialSelectedCasts.value.includes(castId)
    );
    const castsToRemove = initialSelectedCasts.value.filter(
      (castId) => !selectedCasts.value.includes(castId)
    );

    // Add new casts
    for (const castId of castsToAdd) {
      await addCastToMovie({ movie_id: movieId, cast_id: castId });
    }

    // Remove old casts
    for (const castId of castsToRemove) {
      const castMovieId = await getCastMovieId(movieId, castId);
      if (castMovieId) {
        await removeCastFromMovie(castMovieId);
      } else {
        console.error(
          `No castMovieId found for movieId ${movieId} and castId ${castId}`
        );
      }
    }

    alert('Casts saved successfully!');
    fetchCastsForMovie(); // Refresh the list of selected casts
  } catch (error) {
    console.error("Error saving cast selection:", error);
    alert("An error occurred while saving the cast selection.");
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchCasts();
  fetchCastsForMovie();
  fetchMovieName();
});
</script>
