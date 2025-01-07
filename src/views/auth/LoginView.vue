<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-2">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <RouterLink
        to="/"
        class="block text-center mb-6 text-primary text-3xl font-bold"
      >
        FILMO
      </RouterLink>
      <h2 class="text-2xl font-bold text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-sm font-medium text-dark" for="email">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="block w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-primary"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-dark" for="password">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="block w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-primary"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 text-white bg-primary rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p class="m-4 text-center text-gray-600">
        Don't have an account?
        <RouterLink to="/register" class="text-primary hover:underline"
          >Register</RouterLink
        >
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
import { login as loginUser, regenerateOtp } from "../../services/authService";
import { Icon } from "@iconify/vue";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const { token, user } = await loginUser(email.value, password.value);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    if (!user.email_verified_at) {
      await regenerateOtp(email.value); // Generate new OTP if user is not verified
      router.push("/otp"); // Redirect to OTP verification page
    } else if (user && user.role.name === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/"); // Redirect to home page if user is verified
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials and try again.");
  }
};
</script>
