<template>
  <div class="auth-layout flex flex-col min-h-screen">
    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
