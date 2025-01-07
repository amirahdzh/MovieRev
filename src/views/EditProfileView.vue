<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-primary">Edit Profile</h2>
        <form @submit.prevent="handleUpdateProfile">
          <div class="mb-4">
            <label for="age" class="block text-gray-700">Age</label>
            <input
              type="text"
              id="age"
              v-model="form.age"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="mb-4">
            <label for="address" class="block text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              v-model="form.address"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="mb-4">
            <label for="biodata" class="block text-gray-700">Biodata</label>
            <textarea
              id="biodata"
              v-model="form.biodata"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  const form = ref({
    age: '',
    address: '',
    biodata: ''
  });
  
  const getProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/me', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const { user } = response.data;
      form.value = {
        age: user.profile ? user.profile.age : '',
        address: user.profile ? user.profile.address : '',
        biodata: user.profile ? user.profile.biodata : ''
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  
  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('age', form.value.age);
      formData.append('address', form.value.address);
      formData.append('biodata', form.value.biodata);
  
      const response = await axios.post(
        'http://localhost:8000/api/v1/profile',
        formData,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      alert('Profile updated successfully!');
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
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
  