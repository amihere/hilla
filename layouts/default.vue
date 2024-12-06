<script setup lang="ts">

</script>

<template>
  <div class="layout">
    <div class="bg-gray-50">
      <Adsbygoogle ad-format="vertical" data-ad-full-width-responsive="true" />
    </div>
    <div class="px-5 py-7 w-full max-w-3xl mx-auto">
      <slot />
    </div>
    <div class="bg-gray-50">
      <Adsbygoogle ad-format="vertical" data-ad-full-width-responsive="true" />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  overflow: hidden;
  height: 100vh;
}
</style>