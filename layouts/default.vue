<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <Toaster rich-colors position="top-center" />
  <div class="flex flex-col">
    <slot />
    <!-- <div class="bg-gray-50 h-[150px]">
      <Adsbygoogle ad-format="horizontal" data-ad-full-width-responsive="true" />
    </div> -->
  </div>
</template>
