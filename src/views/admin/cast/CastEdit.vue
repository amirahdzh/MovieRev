<template>
  <div class="p-6">
    <!-- Back button -->
    <button @click="goBack" class="text-blue-500 hover:underline mb-4">
      &larr; Back
    </button>
    
    <h1 class="text-2xl font-bold mb-4">Edit Cast</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="cast.name"
          type="text"
          id="name"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
        <input
          v-model="cast.age"
          type="number"
          id="age"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          v-model="cast.bio"
          id="bio"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        ></textarea>
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
import { getCastById, updateCast } from "../../../services/castService";

const route = useRoute();
const router = useRouter();
const cast = ref({
  name: "",
  age: "",
  bio: "",
});
const errors = ref([]);

const fetchCast = async () => {
  try {
    const response = await getCastById(route.params.id);
    cast.value = response.data;
  } catch (error) {
    console.error("Failed to load cast:", error);
  }
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("name", cast.value.name);
    formData.append("age", cast.value.age);
    formData.append("bio", cast.value.bio);

    // Log FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    await updateCast(route.params.id, formData);

    router.push("/admin/casts");
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = Object.values(error.response.data.errors).flat();
      console.error("Validation errors:", error.response.data.errors);
    } else {
      console.error("Failed to update cast:", error);
    }
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchCast();
});
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
