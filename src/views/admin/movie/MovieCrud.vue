<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manage Movies</h1>
    <button
      @click="handleAdd"
      class="bg-blue-500 text-white px-2 py-2 mb-4 rounded"
    >
      <Icon icon="mdi:add" class="w-6 h-6" />
    </button>
    <table class="w-full border border-gray-200">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="p-2 border-b">No</th>
          <th class="p-2 border-b">Poster</th>
          <th class="p-2 border-b">Title</th>
          <th class="p-2 border-b">Summary</th>
          <th class="p-2 border-b">Genre</th>
          <th class="p-2 border-b">Year</th>
          <th class="p-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, index) in movies" :key="movie.id">
          <td class="p-2 border-b">{{ index + 1 }}</td>
          <td class="p-2 border-b">
            <img
              :src="movie.poster"
              alt="Poster"
              class="w-16 h-16 object-cover"
            />
          </td>
          <td class="p-2 border-b">{{ movie.title }}</td>
          <td class="p-2 border-b">{{ movie.summary }}</td>
          <td class="p-2 border-b">
            {{ movie.genre ? movie.genre.name : "N/A" }}
          </td>
          <td class="p-2 border-b">{{ movie.year }}</td>
          <td class="p-2 border-b">
            <button
              @click="handleEdit(movie.id)"
              class="bg-blue-500 text-white px-1 py-1 my-1 mx-1 rounded"
            >
              <Icon icon="mdi:edit" class="w-6 h-6" />
            </button>
            <button
              @click="handleDelete(movie.id)"
              class="bg-red-500 text-white px-1 py-1 my-1 mx-1 rounded"
            >
              <Icon icon="mdi:delete" class="w-6 h-6" />
            </button>
            <button
              @click="redirectToCastSelection(movie.id)"
              class="bg-green-500 text-white px-1 py-1 my-1 mx-1 rounded"
            >
              <Icon icon="mdi:account-plus" class="w-6 h-6" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getMovies,
  deleteMovie as deleteMovieService,
} from "../../../services/movieService";
import { Icon } from "@iconify/vue";

const movies = ref([]);
const router = useRouter();

const redirectToCastSelection = (movieId) => {
  router.push(`/admin/movies/${movieId}/add-cast`);
};

const fetchMovies = async () => {
  try {
    const response = await getMovies();
    movies.value = response.data;
  } catch (error) {
    console.error("Failed to load movies:", error);
  }
};

const handleEdit = (id) => {
  router.push(`/admin/movies/edit/${id}`);
};

const handleDelete = async (id) => {
  try {
    await deleteMovieService(id);
    fetchMovies(); // Refresh the list after deletion
  } catch (error) {
    console.error("Failed to delete movie:", error);
  }
};

const handleAdd = () => {
  router.push("/admin/movies/add-movie");
};

onMounted(() => {
  fetchMovies();
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
}

th {
  background-color: #f8f8f8;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
