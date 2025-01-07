<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manage Genres</h1>

    <!-- Add Genre Form -->
    <div class="mb-6">
      <h2 class="text-xl mb-2">Add Genre</h2>
      <form @submit.prevent="addNewGenre">
        <input
          v-model="newGenre.name"
          type="text"
          placeholder="Genre Name"
          class="p-2 border border-gray-300 rounded mr-2"
          required
        />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          Add Genre
        </button>
      </form>
    </div>

    <!-- Genre List -->
    <div class="mb-6">
      <h2 class="text-xl mb-2">Genre List</h2>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b text-left">No</th>
            <th class="py-2 px-4 border-b text-left">Genre Name</th>
            <th class="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(genre, index) in genres" :key="genre.id">
            <td class="py-2 px-4 border-b text-left">{{ index + 1 }}</td>
            <td class="py-2 px-4 border-b text-left">{{ genre.name }}</td>
            <td class="py-2 px-4 border-b text-left">
              <button @click="editGenre(genre)" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                <Icon icon="mdi:pencil" class="w-4 h-4" />
              </button>
              <button @click="deleteExistingGenre(genre.id)" class="bg-red-500 text-white px-2 py-1 rounded">
                <Icon icon="mdi:delete" class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Genre Modal -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl mb-4">Edit Genre</h2>
        <form @submit.prevent="updateExistingGenre">
          <input
            v-model="editedGenre.name"
            type="text"
            placeholder="Genre Name"
            class="p-2 border border-gray-300 rounded mb-4 w-full"
            required
          />
          <div class="flex justify-end">
            <button type="button" @click="closeEditModal" class="bg-gray-300 text-black px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { getGenres, addGenre, updateGenre, deleteGenre } from "../../../services/genreService";

const genres = ref([]);
const newGenre = ref({ name: "" });
const editedGenre = ref({ id: null, name: "" });
const showEditModal = ref(false);

const fetchGenres = async () => {
  try {
    const response = await getGenres();
    genres.value = response.data;
  } catch (error) {
    console.error("Failed to load genres:", error);
  }
};

const addNewGenre = async () => {
  try {
    await addGenre(newGenre.value);
    await fetchGenres();
    newGenre.value.name = "";
  } catch (error) {
    console.error("Failed to add genre:", error);
  }
};

const editGenre = (genre) => {
  editedGenre.value = { ...genre };
  showEditModal.value = true;
};

const updateExistingGenre = async () => {
  try {
    await updateGenre(editedGenre.value.id, editedGenre.value);
    await fetchGenres();
    closeEditModal();
  } catch (error) {
    console.error("Failed to update genre:", error);
  }
};

const deleteExistingGenre = async (id) => {
  try {
    await deleteGenre(id);
    await fetchGenres();
  } catch (error) {
    console.error("Failed to delete genre:", error);
  }
};

const closeEditModal = () => {
  showEditModal.value = false;
};

onMounted(() => {
  fetchGenres();
});
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
