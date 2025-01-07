<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Back button -->
    <button @click="goBack" class="text-blue-500 hover:underline mb-4">
      &larr; Back
    </button>
    <h1 class="text-2xl font-bold mb-4">Add New Cast</h1>
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="cast.name" id="name" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div class="mb-4">
        <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
        <input v-model="cast.age" id="age" type="number" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div class="mb-4">
        <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
        <textarea v-model="cast.bio" id="bio" rows="4" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Cast</button>
      
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addCast } from '../../../services/castService';

const cast = ref({
  name: '',
  age: '',
  bio: ''
});
const error = ref(null);
const router = useRouter();

const handleSubmit = async () => {
  try {
    await addCast(cast.value);
    router.push('/admin/casts'); // Navigate back to the list of casts
  } catch (err) {
    error.value = 'Failed to add cast.';
  }
};

const goBack = () => {
  router.push('/admin/casts'); // Navigate back to the list of casts
};
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
