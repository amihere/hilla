<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <div class="flex flex-col">
    <ScrollArea className="px-5 py-7 w-full max-w-2xl mx-auto h-[calc(100dvh-155px)]">
      <slot />
    </ScrollArea>
    <div class="bg-gray-50 h-[150px]">
      <!-- <Adsbygoogle ad-format="horizontal" data-ad-full-width-responsive="true" /> -->
    </div>
  </div>
</template>
