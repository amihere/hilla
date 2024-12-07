<script setup lang="ts">
import { dateToNow, formatDate, formatDecimal, getInitials, getRandomInt } from '~/lib/helpers';
import { cn } from '~/lib/utils';


const { data } = await useFetch('/api/data')

const partyColors: Record<string, string> = {
  "1": "blue-600",
  "7": "green-600",
}

const selectedSource = ref("")

const updatedAt = new Date('2024-12-07T07:31:38.321Z')



const sources = computed(() => data.value?.media?.map(m => ({ name: m.fullName, img: m.photo, id: String(m.id) })))
const candidates = computed(() => data.value?.candidates?.map((c) => ({ name: c.fullName, img: c.photo, id: String(c.id), partyId: String(c.partyId) })))
const parties = computed(() => data.value?.parties?.map((p) => ({ name: p.fullName, img: p.photo, id: String(p.id) })))
const sourceName = computed(() => sources.value?.find(s => s.id === selectedSource.value)?.name)
const updatedHuman = computed(() => formatDate(updatedAt))
const updatedDistance = computed(() => dateToNow(updatedAt))

const results = computed(() => candidates.value?.map(c => (
  { candidateName: c.name?.toLocaleLowerCase() || "", candidateId: String(c.id), partyName: parties.value?.find(p => p.id === c.partyId)?.name || "", partyId: c.partyId, votes: randVotes(c.partyId), regions: randRegions(c.partyId), candidateImg: c.img || "" }
)))
const sortedResults = computed(() => results.value ? results.value.sort((a, b) => b.votes - a.votes) : [])
const topResults = computed(() => sortedResults.value ? sortedResults.value.slice(0, 2) : [])
const totalVotes = computed(() => results.value ? results.value.reduce((total, r) => total + r.votes, 0) : 0)
const totalTopVotes = computed(() => topResults.value.reduce((total, r) => total + r.votes, 0))
const topPercentage = computed(() => {
  if (!topResults.value || topResults.value.length < 1) {
    return 0
  }
  return (topResults.value[0].votes / totalTopVotes.value) * 100
})

function randVotes(pid: string) {
  if (pid === "1") return getRandomInt(400000, 500000)
  if (pid === "7") return getRandomInt(800000, 900000)
  return getRandomInt(1, 50)
}
function randRegions(pid: string) {
  if (pid === "1") return getRandomInt(2, 4)
  if (pid === "7") return getRandomInt(6, 8)
  return 0
}



onMounted(() => {
  if (sources.value && sources.value.length > 0) {
    selectedSource.value = String(sources.value.at(0)?.id)
  }
})
</script>

<template>

  <div class="space-y-7 pt-7 h-[200px]">
    <h1 class="text-center">ELECTIONS O</h1>
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
          <Progress class="h-7 rounded-sm bg-red-500" v-model="topPercentage" indicator-class="bg-blue-500" />
          <div class="flex justify-between items-center space-y-1">
            <p v-for="r in topResults" :key="r.candidateId" class="text-sm text-slate-600">
              {{ r.votes }} votes ({{ formatDecimal((r.votes / totalTopVotes) * 100) }}%)
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
                {{ formatDecimal((result.votes / totalVotes) * 100) }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>

  </ScrollArea>
</template>