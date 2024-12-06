<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// const { data,status } = await useFetch('/api/hello')

const sources = [
  { label: "Nananom FM", id: 'nananom' },
  { label: "Etie4 News", id: 'etie4' },
  { label: "Joy Prime", id: 'joyprime' },
]
const sourceName = computed(() => sources.find(s => s.id === source.value)?.label)

const source = ref("nananom")
</script>
<template>
  <h1 class="text-center">ELECTIONS O</h1>

  <section>
    <div class="flex items-center justify-between">
      <p>Results from {{ sourceName }}</p>
      <div>
        <Select :model-value="source">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select a source" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Source</SelectLabel>
              <SelectItem value="etie4">
                Etie4
              </SelectItem>
              <template v-for="source in sources" :key="source.id">
                <SelectItem :value="source.id">
                  {{ source.label }}
                </SelectItem>
              </template>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  </section>
</template>