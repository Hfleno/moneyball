import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { Dark, LocalStorage } from 'quasar'

export const settingsStore = defineStore('settings', () => {
  // state
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: 'kr.',
    darkMode: false, // false | true | 'auto'
  })

  watch(
    () => settings.darkMode,
    (value) => {
      Dark.set(value)
    }
  )

  watch(settings, () => {
    saveSettings()
  })

  const saveSettings = () => {
    LocalStorage.set('settings', settings)
  }

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem('settings')
    if (savedSettings) Object.assign(settings, savedSettings)
  }

  // return
  return {
    settings,
    loadSettings,
  }
})
