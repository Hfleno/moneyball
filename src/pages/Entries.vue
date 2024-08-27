<template>
  <q-page>
    <div class="q-pa-md">
      <NothingHere v-if="!storeEntries.entries.length" />
      <q-list
        v-else
        class="entries"
      >
        <Sortable
          :list="storeEntries.entries"
          @end="storeEntries.sortDone"
          item-key="id"
          tag="div"
          :options="{ handle: '.handle' }"
        >
          <template #item="{ element, index }">
            <Entry
              :key="element.id"
              :entry="element"
              :index="index"
            />
          </template>
        </Sortable>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <Balance />
      <NewEntry />
    </q-footer>
  </q-page>
</template>

<script setup>
import { entriesStore } from 'src/stores/entries.js'
import { Sortable } from 'sortablejs-vue3'
import Balance from 'src/components/Entries/Balance.vue'
import NewEntry from 'src/components/Entries/NewEntry.vue'
import Entry from 'src/components/Entries/Entry.vue'
import NothingHere from 'src/components/Entries/NothingHere.vue'

const storeEntries = entriesStore()
</script>
