<script setup lang="ts">
import { toast } from 'vue-sonner';
import { dateToNow, formatDate, formatDecimal, getInitials, getRandomInt } from '~/lib/helpers';
import { SymbolIcon } from '@radix-icons/vue'

type Result = {
  candidateName: string,
  candidateId: string,
  partyName: string,
  partyId: string,
  regions: number,
  candidateImg: string;
  votes: number
}
const { data, status } = await useFetch('/api/data')

const selectedSource = ref("")
const updatedAt = ref(new Date())

const sources = computed(() => data.value?.media?.map(m => ({ name: m.fullName, img: m.photo, id: String(m.id) })))
// const candidates = computed(() => data.value?.candidates?.map((c) => ({ name: c.fullName, img: c.photo, id: String(c.id), partyId: String(c.partyId) })))
// const parties = computed(() => data.value?.parties?.map((p) => ({ name: p.fullName, img: p.photo, id: String(p.id) })))
const sourceName = computed(() => sources.value?.find(s => s.id === selectedSource.value)?.name)
const updatedHuman = computed(() => formatDate(updatedAt.value))
const updatedDistance = computed(() => dateToNow(updatedAt.value))

const loading = ref(true)
const results = ref<Result[]>([])

const sortedResults = computed(() => results.value ? results.value.sort((a, b) => b.votes - a.votes) : [])
const topResults = computed(() => sortedResults.value ? sortedResults.value.slice(0, 2) : [])
const totalVotes = computed(() => results.value ? results.value.reduce((total, r) => total + r.votes, 0) : 0)
const totalTopVotes = computed(() => topResults.value.reduce((total, r) => total + r.votes, 0))
const topPercentage = computed(() => {
  if (!topResults.value || topResults.value.length < 1) {
    return 0
  }
  return topResults.value[0]?.votes < 1 ? 0 : (topResults.value[0]?.votes / totalTopVotes.value) * 100
})

function votePercentage(v: number, t: number) {
  if (v < 1) return formatDecimal(0)
  return formatDecimal((topResults.value[0]?.votes / totalTopVotes.value) * 100)
}

async function fetchResults() {
  try {
    loading.value = true
    const data = await $fetch(`/api/results?medium=${selectedSource.value}`)
    const mapped = data.map(d => ({
      ...d,
      candidateId: String(d.candidateId),
      partyId: String(d.candidateId),
      regions: 0, candidateName: d.candidateName?.toLocaleLowerCase() || ""
    }))
    results.value = mapped as Result[]
    updatedAt.value = data[0]?.updatedAt ? new Date(data[0]?.updatedAt) : new Date()
  } catch (error) {
    toast.error("A problem occured while fetching results")
  } finally {
    loading.value = false
  }
}

watch(selectedSource, async () => await fetchResults())


onMounted(async () => {
  if (sources.value && sources.value.length > 0) {
    selectedSource.value = String(sources.value.at(0)?.id)
    await fetchResults()
  }
})
</script>

<template>
  <div class="pt-6">
    <h1 class="text-center">ELECTIONS O</h1>
    <template v-if="status === 'pending'">
      <div class="w-full h-[calc(100dvh-150px)]">
        <SymbolIcon class="size-12 animate-spin mx-auto" />
      </div>
    </template>
    <template v-if="status === 'success'">
      <div class="space-y-7 pt-7 h-[200px]">
        <div class="flex flex-col items-center space-y-3">
          <div class="space-y-2 w-full px-1 flex flex-col items-center">
            <Label>Select your preferred media outlet</Label>
            <Select v-model="selectedSource">
              <SelectTrigger class="w-[260px] h-10">
                <SelectValue placeholder="Select a source" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Source</SelectLabel>
                  <template v-for="source in sources" :key="source.id">
                    <SelectItem class="h-12" :value="source.id">
                      <div class="flex space-x-2 items-center">
                        <Avatar class="size-6">
                          <AvatarImage :src="source.img || ''" />
                          <AvatarFallback>{{ getInitials(source.name || "") }}</AvatarFallback>
                        </Avatar>
                        <p class="capitalize">{{ source.name?.toLocaleLowerCase() || "" }}</p>
                      </div>
                    </SelectItem>
                  </template>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <p class="text-slate-600 text-sm">Updated at {{ updatedHuman }} ({{ updatedDistance }})</p>
        </div>
      </div>

      <ScrollArea className="w-full max-w-3xl mx-auto h-[calc(100dvh-350px)] flex flex-col gap-y-8 py-7 px-4">
        <!-- PRESIDENTIAL -->
        <section class="space-y-6">
          <div class="">
            <h3 class="text-2xl">Presidential results</h3>
            <p class="text-sm">From
              <a href="https://google.com" target="_blank">
                {{ sourceName }}</a>
            </p>
          </div>
          <template v-if="loading">
            <div class="flex flex-col items-center justify-center">
              <SymbolIcon class="size-8 animate-spin" />
              <p class="text-center">Fetching results...</p>
            </div>
          </template>
          <template v-else>
            <!-- TOP RESULTS -->
            <div class="flex flex-col space-y-3">
              <h4 class="text-lg">Top 2 candidates</h4>
              <div class="flex items-center justify-between">
                <template v-for="r in topResults" :key="r.candidate">
                  <div class="flex gap-x-2 items-center">
                    <Avatar class="size-12">
                      <AvatarImage :src="r.candidateImg" />
                      <AvatarFallback class="text-base font-medium">{{ getInitials(r.candidateName) }}</AvatarFallback>
                    </Avatar>
                    <div class="flex flex-col">
                      <p class="font-medium text-lg">{{ r.regions }} regions</p>
                      <p class="capitalize">{{ r.candidateName.split(" ").at(-1) }}</p>
                    </div>
                  </div>
                </template>
              </div>
              <div>
                <Progress v-if="topPercentage > 0" class="h-7 rounded-sm bg-red-500" v-model="topPercentage"
                  indicator-class="bg-blue-500" />
                <Progress v-else class="h-7 rounded-sm" />
                <div class="flex justify-between items-center space-y-1">
                  <p v-for="r in topResults" :key="r.candidateId" class="text-sm text-slate-600">
                    {{ r.votes }} votes ({{ votePercentage(r.votes, totalTopVotes) }}%)
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <h4 class="text-lg">Election results for all candidates</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Candidate
                    </TableHead>
                    <TableHead>Party</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead class="text-right">
                      Vote percentage
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="result in sortedResults" :key="result.candidateId">
                    <TableCell class="font-medium capitalize">
                      {{ result.candidateName }}
                    </TableCell>
                    <TableCell>{{ result.partyName }} ({{ getInitials(result.partyName) }})</TableCell>
                    <TableCell>{{ result.votes }}</TableCell>
                    <TableCell class="text-right">
                      {{ votePercentage(result.votes, totalVotes) }}% </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </template>
        </section>
      </ScrollArea>
    </template>

    <template v-if="status === 'error'">
      <p>A problem occurred while fetching results</p>
    </template>
  </div>
</template>