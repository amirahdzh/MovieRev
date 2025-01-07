<template>
  <header class="bg-transparent fixed top-0 left-0 w-full flex items-center z-10">
    <div class="container mx-auto flex justify-between items-center py-4">
      <!-- Logo -->
      <RouterLink to="/" class="text-2xl font-bold text-primary">
        FILMO
      </RouterLink>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-8 items-center">
        <RouterLink to="/movies" class="nav-item">
          <button class="nav-button">Movies</button>
        </RouterLink>
        <RouterLink to="/genres" class="nav-item">
          <button class="nav-button">Genres</button>
        </RouterLink>
        <RouterLink to="/casts" class="nav-item">
          <button class="nav-button">Casts</button>
        </RouterLink>
      </nav>

      <!-- Search and User Info -->
      <div class="flex items-center space-x-4">
        <!-- Search Bar -->
        <div class="relative hidden lg:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            class="p-2 border border-gray-200 focus:outline-none rounded-lg"
          />
          <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none">
            <Icon icon="mdi:magnify" class="w-6 h-6" />
          </button>
        </div>
        <button @click="toggleSearch" class="block lg:hidden text-gray-600 focus:outline-none">
          <Icon icon="mdi:magnify" class="w-6 h-6" />
        </button>

        <!-- User Dropdown -->
        <div class="relative" v-if="user && user.name">
          <button
            @click="toggleDropdown"
            class="flex items-center text-base bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none"
          >
            <Icon icon="mdi:account" class="w-6 h-6" />
            <span class="hidden md:block ml-2">{{ user.name }}</span>
            <Icon icon="mdi:chevron-down" class="w-4 h-4 ml-1" />
          </button>

          <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
            <RouterLink
              to="/profile"
              @click="toggleDropdown"
              class="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <Icon icon="mdi:account" class="w-6 h-6 mr-2" />
              Profile
            </RouterLink>
            <RouterLink
              v-if="isAdmin"
              to="/dashboard"
              @click="toggleDropdown"
              class="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <Icon icon="mdi:view-dashboard" class="w-6 h-6 mr-2" />
              Dashboard
            </RouterLink>
            <button
              @click="logout"
              class="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <Icon icon="mdi:logout" class="w-6 h-6 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <RouterLink
          v-else
          to="/login"
          class="flex items-center text-base bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          <Icon icon="mdi:login" class="w-6 h-6" />
          <span class="hidden md:block ml-2">Login</span>
        </RouterLink>
      </div>

      <!-- Hamburger Menu -->
      <button @click="toggleMenu" class="md:hidden text-gray-600 focus:outline-none">
        <Icon :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'" class="w-8 h-8" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 md:hidden">
      <nav class="space-y-4 p-4">
        <RouterLink to="/" @click="toggleMenu" class="block text-base text-dark hover:text-primary">Home</RouterLink>
        <RouterLink to="/movies" @click="toggleMenu" class="block text-base text-dark hover:text-primary">Movies</RouterLink>
        <RouterLink to="/genres" @click="toggleMenu" class="block text-base text-dark hover:text-primary">Genres</RouterLink>
        <RouterLink to="/casts" @click="toggleMenu" class="block text-base text-dark hover:text-primary">Casts</RouterLink>
        <RouterLink
          to="/login"
          @click="toggleMenu"
          class="block text-base text-dark hover:text-primary flex items-center"
        >
          <Icon icon="mdi:login" class="w-6 h-6 mr-2" />
          Login
        </RouterLink>
      </nav>
    </div>

    <!-- Mobile Search -->
    <div v-if="isSearchOpen" class="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg p-4 mt-2 lg:hidden">
      <div class="relative">
        <input type="text" placeholder="Search..." class="w-full p-2 border-b border-gray-200 focus:outline-none" />
        <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none">
          <Icon icon="mdi:magnify" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isDropdownOpen = ref(false);
const user = ref(null);
const router = useRouter();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  user.value = null; // Reset user info
  router.push("/login");
};

// Retrieve user data from localStorage on component mount
onMounted(() => {
  const userString = localStorage.getItem("user");
  user.value = userString ? JSON.parse(userString) : null;

  // Ensure the header exists before accessing it
  const header = document.querySelector("header");
  if (header) {
    window.onscroll = function () {
      const fixedNav = header.offsetTop;
      if (window.scrollY > fixedNav) {
        header.classList.add("navbar-fixed");
      } else {
        header.classList.remove("navbar-fixed");
      }
    };
  }
});

onBeforeUnmount(() => {
  // Clean up the onscroll event listener
  window.onscroll = null;
});

// Check if user is an admin, with safe access
const isAdmin = computed(() => {
  return user.value && user.value.role && user.value.role.name === "admin";
});
</script>

<style scoped>
.navbar-fixed {
  @apply fixed z-[9999] bg-white bg-opacity-70;
  backdrop-filter: blur(5px);
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.2);
}

.nav-item {
  text-decoration: none;
}

.nav-button {
  background-color: rgba(255, 255, 255, 0.7);
  color: #333; 
  border-radius: 10px; 
  padding: 3px 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; 
}

.nav-button:hover {
  
  color: blue;
}
</style>
