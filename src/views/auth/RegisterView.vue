<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <RouterLink to="/" class="block text-center mb-6 text-primary text-3xl font-bold">
          FILMO
        </RouterLink>
        <h2 class="text-2xl font-bold mb-6 text-center text-primary">Register</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password_confirmation" class="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="password_confirmation"
              v-model="password_confirmation"
              class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Register
          </button>
        </form>
        <p class="my-4 text-center text-gray-600">
          Already have an account?
          <RouterLink to="/login" class="text-primary hover:underline">Login</RouterLink>
        </p>
        <RouterLink
          to="/"
          class="relative justify-center text-dark hover:underline hover: flex items-center"
        >
          <Icon icon="mdi:home" class="w-6 h-6 mr-2" />
          Enter Guest Mode
        </RouterLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { Icon } from "@iconify/vue";
  import { register } from "../../services/authService";
  
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const password_confirmation = ref("");
  const router = useRouter();
  
  const handleRegister = async () => {
    try {
      // Memastikan password dan password_confirmation sama
      if (password.value !== password_confirmation.value) {
        alert("Passwords do not match");
        return;
      }
  
      // Mengirim data ke endpoint register
      const response = await register(
        name.value,
        email.value,
        password.value,
        password_confirmation.value
      );
  
      // Jika berhasil, simpan data user dan token, lalu arahkan ke halaman OTP
      if (response.status === 201) {
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user)); // Simpan data user di localStorage
        localStorage.setItem("token", token); // Simpan token di localStorage
        router.push("/otp");
      } else {
        alert("Registration failed. Please check your inputs and try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please check your inputs and try again.");
    }
  };
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
  