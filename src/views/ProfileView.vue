<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-primary">Profile</h2>
        <form @submit.prevent="handleUpdateProfile">
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              v-model="user.name"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              v-model="user.email"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              disabled
            />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-gray-700">Role</label>
            <input
              type="text"
              id="role"
              v-model="user.role"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              disabled
            />
          </div>
          <div class="mb-4">
            <label for="age" class="block text-gray-700">Age</label>
            <input
              type="text"
              id="age"
              v-model="profile.age"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="mb-4">
            <label for="address" class="block text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              v-model="profile.address"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="mb-4">
            <label for="biodata" class="block text-gray-700">Biodata</label>
            <input
              type="text"
              id="biodata"
              v-model="profile.biodata"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  </template>
  

  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  const router = useRouter();
  const user = ref({});
  const profile = ref({
    age: "",
    address: "",
    biodata: "",
  });
  
  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/me", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { user: apiUser } = response.data;
      profile.value = {
        age: apiUser.profile ? apiUser.profile.age : "",
        address: apiUser.profile ? apiUser.profile.address : "",
        biodata: apiUser.profile ? apiUser.profile.biodata : "",
      };
      user.value = {
        ...apiUser,
        role: apiUser.role || { name: "No Role" },
      };
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  
  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("age", profile.value.age);
      formData.append("address", profile.value.address);
      formData.append("biodata", profile.value.biodata);
  
      const response = await axios.post(
        "http://localhost:8000/api/v1/profile",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      alert("Profile updated successfully!");
      // Optional: Reload profile data
      await getProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };
  
  onMounted(getProfile);
  </script>
  

<style scoped>
.bg-primary {
  background-color: #3490dc;
}
.bg-primary-dark {
  background-color: #2779bd;
}
.text-primary {
  color: #3490dc;
}
</style>
