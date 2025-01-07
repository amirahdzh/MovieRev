<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Edit Genre</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getGenreById, updateGenre } from '../../../services/genreService';
  
  const route = useRoute();
  const router = useRouter();
  const name = ref('');
  
  const fetchGenre = async () => {
    try {
      const response = await getGenreById(route.params.id);
      name.value = response.data.name;
    } catch (error) {
      console.error('Failed to load genre:', error);
    }
  };
  
  const handleSubmit = async () => {
    try {
      await updateGenre(route.params.id, { name: name.value });
      router.push('/admin/genres');
    } catch (error) {
      console.error('Failed to update genre:', error);
    }
  };
  
  onMounted(() => {
    fetchGenre();
  });
  </script>
  
  <style scoped>
  </style>
  