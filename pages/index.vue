<script setup lang="ts">
import { dateToNow, formatDate, formatDecimal } from '~/lib/helpers';


const sources = [
  { label: "Nananom FM", id: 'nananom' },
  { label: "Etie4 News", id: 'etie4' },
  { label: "Joy Prime", id: 'joyprime' },

]
const source = ref("nananom")

const updatedAt = new Date('2024-12-07T07:31:38.321Z')

const totalTopVotes = 2_000_000
const topResults = [{ candidate: "Awudu Bawumia", votePercentage: 45, regions: 4, img: "https://cdn.modernghana.com/content__/640/457/1023202415834-sxoaredq5l-dr-bawumia.jpg" },
{ candidate: "John Mahama", votePercentage: 55, regions: 8, img: "https://news.files.bbci.co.uk/include/vjafwest/732-ghana-manifesto-guide/assets/app-project-assets/img/John.jpg?rev=1", }]
const results = [
  { candidateName: "Awudu Bawumia", candidateId: "a1", partyName: "New Patriotic Party", votes: 376332 },
  { candidateName: "Kwaw Borga", candidateId: "a5", partyName: "A Certain Party", votes: 0 },
  { candidateName: "Kwame Bediako", candidateId: "a3", partyName: "The New Force", votes: 66 },
  { candidateName: "John Doe", candidateId: "a4", partyName: "Some Party", votes: 6 },
  { candidateName: "John Mahama", candidateId: "a2", partyName: "New Democratic Congress", votes: 768382 },
]


const sourceName = computed(() => sources.find(s => s.id === source.value)?.label)
const updatedHuman = computed(() => formatDate(updatedAt))
const updatedDistance = computed(() => dateToNow(updatedAt))
const sortedResults = computed(() => results.sort((a, b) => b.votes - a.votes))
const totalVotes = computed(() => results.reduce((total, r) => total + r.votes, 0))

function getInitials(name: string) {
  const nameParts = name.trim().split(' ');
  const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  return initials;
}
</script>
<template>

  <div class="flex flex-col gap-y-8">
    <h1 class="text-center">ELECTIONS O</h1>
    <div class="flex flex-col items-center space-y-3">
      <div class="space-y-2 w-full px-1 flex flex-col items-center">
        <Label>Select your preferred media outlet</Label>
        <Select v-model="source">
          <SelectTrigger class="w-[240px]">
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
      <p class="text-slate-600 text-sm">Updated at {{ updatedHuman }} ({{ updatedDistance }})</p>
    </div>

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
      <div class="flex flex-col space-y-2">
        <h4 class="text-lg">Top 2 candidates</h4>
        <div class="flex items-center justify-between">
          <template v-for="r in topResults" :key="r.candidate">
            <div class="flex gap-x-1 items-center">
              <Avatar class="size-12">
                <AvatarImage :src="r.img" />
                <AvatarFallback class="text-base font-medium">{{ getInitials(r.candidate) }}</AvatarFallback>
              </Avatar>
              <div class="flex flex-col">
                <p class="font-medium text-lg">{{ r.regions }} regions</p>
                <p class="text-sm">{{ r.candidate.split(" ").at(-1) }}</p>
              </div>
            </div>
          </template>
        </div>
        <div>
          <Progress class="h-6 rounded-sm bg-green-600" :model-value="40" indicator-class="bg-blue-600" />
          <div class="flex justify-between items-center space-y-1">
            <p v-for="r in topResults" :key="r.candidate" class="text-xs">
              {{ (r.votePercentage / 100) * totalTopVotes }} votes ({{ r.votePercentage }}%)
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
              <TableCell class="font-medium">
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
  </div>
</template>