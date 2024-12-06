<script setup lang="ts">

const sources = [
  { label: "Nananom FM", id: 'nananom' },
  { label: "Etie4 News", id: 'etie4' },
  { label: "Joy Prime", id: 'joyprime' },
]
const totalVotes = 2_000_000
const topResults = [{ candidate: "Awudu Bawumia", votePercentage: 45, regions: 4 }, { candidate: "John Mahama", votePercentage: 55, regions: 8 }]
const sourceName = computed(() => sources.find(s => s.id === source.value)?.label)

const source = ref("nananom")
function getInitials(name: string) {
  const nameParts = name.trim().split(' ');
  const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  return initials;
}
</script>
<template>
  <Adsbygoogle ad-format="vertical" data-ad-full-width-responsive="true" />

  <section class="flex flex-col gap-y-7">
    <h1 class="text-center">ELECTIONS O</h1>
    <div class="flex items-center justify-between">
      <p>Results from {{ sourceName }}</p>
      <div>
        <Select v-model="source">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select a source" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Source</SelectLabel>
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

    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <template v-for="r in topResults" :key="r.candidate">
          <div class="flex gap-x-1 items-center">
            <Avatar class="size-12">
              <AvatarFallback>{{ getInitials(r.candidate) }}</AvatarFallback>
            </Avatar>
            <div class="flex flex-col">
              <p class="font-medium text-lg">{{ r.regions }} regions</p>
              <p>{{ r.candidate }}</p>
              <p class="text-sm font-light">{{ (r.votePercentage / 100) * totalVotes }} votes ({{ r.votePercentage }}%)
              </p>
            </div>
          </div>
        </template>
      </div>
      <div>
        <Progress class="h-6 rounded-sm bg-green-600" :model-value="40" indicator-class="bg-blue-600" />
      </div>
    </div>
  </section>
</template>