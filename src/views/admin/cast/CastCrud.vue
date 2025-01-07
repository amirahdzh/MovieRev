<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manage Casts</h1>
    <button @click="handleAdd" class="bg-blue-500 text-white px-2 py-2 mb-4 rounded">
      <Icon icon="mdi:add" class="w-6 h-6" />
    </button>
    <table class="w-full border border-gray-200">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="p-2 border-b">No</th>
          <!-- <th class="p-2 border-b">Photo</th> -->
          <th class="p-2 border-b">Name</th>
          <th class="p-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cast, index) in casts" :key="cast.id">
          <td class="p-2 border-b">{{ index + 1 }}</td>
          <!-- <td class="p-2 border-b">
            <img :src="cast.photo" alt="Cast Photo" class="w-16 h-16 object-cover" />
          </td> -->
          <td class="p-2 border-b">{{ cast.name }}</td>
          <td class="p-2 border-b">
            <button @click="handleEdit(cast.id)" class="bg-blue-500 text-white px-1 py-1 my-1 mx-1 rounded">
              <Icon icon="mdi:edit" class="w-6 h-6" />
            </button>
            <button @click="handleDelete(cast.id)" class="bg-red-500 text-white px-1 py-1 rounded">
              <Icon icon="mdi:delete" class="w-6 h-6" />
            </button>
            <button
           
              class="bg-green-500 text-white px-1 py-1 my-1 mx-1 rounded"
            >
              <Icon icon="mdi:movie-open-plus" class="w-6 h-6" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCasts, deleteCast as deleteCastService } from '../../../services/castService';
import { Icon } from "@iconify/vue";

const casts = ref([]);
const router = useRouter();

const fetchCasts = async () => {
  try {
    const response = await getCasts();
    casts.value = response.data;
  } catch (error) {
    console.error('Failed to load casts:', error);
  }
};

const handleEdit = (id) => {
  router.push(`/admin/casts/edit/${id}`);
};

const handleDelete = async (id) => {
  try {
    await deleteCastService(id);
    fetchCasts(); // Refresh the list after deletion
  } catch (error) {
    console.error('Failed to delete cast:', error);
  }
};

const handleAdd = () => {
  router.push('/admin/casts/add-cast');
};

onMounted(() => {
  fetchCasts();
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
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
