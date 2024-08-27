<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { settingsStore } from 'src/stores/settings.js'
import { entriesStore } from 'src/stores/entries.js'
defineOptions({
  name: 'App',
})

const storeSettings = settingsStore()
const storeEntries = entriesStore()

onMounted(() => {
  storeSettings.loadSettings()
  storeEntries.loadEntries()
})
</script>
