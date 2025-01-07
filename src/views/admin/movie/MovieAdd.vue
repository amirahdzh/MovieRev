<template>
  <div class="p-6">
    <!-- Back button -->
    <button @click="goBack" class="text-blue-500 hover:underline mb-4">
      &larr; Back
    </button>

    <h1 class="text-2xl font-bold mb-4">Add Movie</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Title</label
        >
        <input
          v-model="movie.title"
          type="text"
          id="title"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label for="summary" class="block text-sm font-medium text-gray-700"
          >Summary</label
        >
        <textarea
          v-model="movie.summary"
          id="summary"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="genre" class="block text-sm font-medium text-gray-700"
          >Genre</label
        >
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
        <label for="year" class="block text-sm font-medium text-gray-700"
          >Year</label
        >
        <input
          v-model="movie.year"
          type="number"
          id="year"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label for="poster" class="block text-sm font-medium text-gray-700"
          >Poster</label
        >
        <input
          type="file"
          @change="handleFileChange"
          id="poster"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">
        Add Movie
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getGenres } from "../../../services/genreService";
import { addMovie } from "../../../services/movieService";

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
const errors = ref([]);

const fetchGenres = async () => {
  try {
    const response = await getGenres();
    genres.value = response.data;
  } catch (error) {
    console.error("Failed to load genres:", error);
  }
};

const handleFileChange = (e) => {
  posterFile.value = e.target.files[0];
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

    await addMovie(formData);
    router.push("/admin/movies");
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = Object.values(error.response.data.errors).flat();
      console.error("Validation errors:", error.response.data.errors);
    } else {
      console.error("Failed to add movie:", error);
    }
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchGenres();
});
</script>

<style scoped>
.relative {
  position: relative;
}
</style>