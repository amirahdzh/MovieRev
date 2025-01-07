<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="newGenre.name" placeholder="Genre Name" />
      <button type="submit">Add Genre</button>
    </form>
    <div v-if="errors.length">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addGenre } from "../services/genreService";

const newGenre = ref({
  name: "",
});

const errors = ref([]);

const handleSubmit = async () => {
  errors.value = [];
  try {
    await addGenre(newGenre.value);
    // Handle successful addition
  } catch (error) {
    if (error.response && error.response.data.errors) {
      console.error("Validation errors:", error.response.data.errors);
      errors.value = Object.values(error.response.data.errors).flat();
    } else {
      console.error("Error adding genre:", error);
      errors.value.push('An error occurred.');
    }
  }
};

</script>
