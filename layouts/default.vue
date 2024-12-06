<script setup lang="ts">

</script>

<template>
  <div class="layout">
    <div class="bg-gray-50">
      for ads
    </div>
    <div class="px-5 py-7 w-full max-w-3xl mx-auto">
      <slot />
    </div>
    <div class="bg-gray-50">
      for ads
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 150px 1fr 150px;
  overflow: hidden;
  height: 100vh;
}
</style>