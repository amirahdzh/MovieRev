<template>
  <div id="app" class="flex flex-col h-screen text-dark">
    <component :is="layoutComponent">
      <router-view />
    </component>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

// Import layout components
import DefaultLayout from "./layouts/DefaultLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import AdminLayout from "./layouts/AdminLayout.vue";

const route = useRoute();

const layoutComponent = computed(() => {
  const layout = route.meta.layout || "default"; // Default to 'default' layout if no meta.layout

  switch (layout) {
    case "auth":
      return AuthLayout;
    case "admin":
      return AdminLayout;
    default:
      return DefaultLayout;
  }
});
</script>

<style>
/* Global styles here */
</style>

<!-- 
<template>
  <div id="app" class="flex flex-col h-screen text-dark">
    <Header v-if="!$route.meta.noHeaderFooter" />
    <div class="flex-grow">
      <RouterView />
    </div>
    <Footer v-if="!$route.meta.noHeaderFooter" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";

const route = useRoute();
</script>

<style></style> -->
