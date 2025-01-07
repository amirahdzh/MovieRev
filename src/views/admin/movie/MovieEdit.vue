<template>
  <div class="p-6">
    <!-- Back button -->
    <button @click="goBack" class="text-blue-500 hover:underline mb-4">
      &larr; Back
    </button>
    
    <h1 class="text-2xl font-bold mb-4">Edit Movie</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          v-model="movie.title"
          type="text"
          id="title"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label for="summary" class="block text-sm font-medium text-gray-700">Summary</label>
        <textarea
          v-model="movie.summary"
          id="summary"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
        <select
          v-model="movie.genre_id"
          id="genre"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        >
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
        <input
          v-model="movie.year"
          type="number"
          id="year"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label for="poster" class="block text-sm font-medium text-gray-700">Poster</label>
        <div class="relative mb-2">
          <!-- Show preview of selected poster -->
          <img v-if="previewUrl" :src="previewUrl" alt="Poster Preview" class="w-32 h-32 object-cover border border-gray-300 rounded-md"/>
          <!-- Show existing poster if available and preview URL is not set -->
          <img v-else-if="movie.poster" :src="movie.poster" alt="Current Poster" class="w-32 h-32 object-cover border border-gray-300 rounded-md"/>
          <!-- File input -->
          <input
            type="file"
            @change="handleFileChange"
            id="poster"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">
        Save
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMovieById, updateMovie } from "../../../services/movieService";
import { getGenres } from "../../../services/genreService";

const route = useRoute();
const router = useRouter();
const movie = ref({
  title: "",
  summary: "",
  genre_id: "",
  year: "",
  poster: null,
});
const genres = ref([]);
const posterFile = ref(null);
const previewUrl = ref(null);
const errors = ref([]);

const fetchMovie = async () => {
  try {
    const response = await getMovieById(route.params.id);
    movie.value = response.data;
    // Set initial preview URL if poster exists
    if (movie.value.poster) {
      previewUrl.value = movie.value.poster;
    }
  } catch (error) {
    console.error("Failed to load movie:", error);
  }
};

const fetchGenres = async () => {
  try {
    const response = await getGenres();
    genres.value = response.data;
  } catch (error) {
    console.error("Failed to load genres:", error);
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    posterFile.value = file;
    // Create a preview URL for the selected file
    previewUrl.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("title", movie.value.title);
    formData.append("summary", movie.value.summary);
    formData.append("year", movie.value.year);
    formData.append("genre_id", movie.value.genre_id);
    if (posterFile.value) {
      formData.append("poster", posterFile.value);
    }

    //Cek Data
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    await updateMovie(route.params.id, formData);

    router.push("/admin/movies");
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = Object.values(error.response.data.errors).flat();
      console.error("Validation errors:", error.response.data.errors);
    } else {
      console.error("Failed to update movie:", error);
    }
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchMovie();
  fetchGenres();
});
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
