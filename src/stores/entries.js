import { defineStore } from 'pinia'
import { ref, computed, reactive, watch } from 'vue'
import { uid, Notify, LocalStorage } from 'quasar'

export const entriesStore = defineStore('entries', () => {
  // state
  const entries = ref([
    // {
    //   id: 'id1',
    //   name: 'Sallary',
    //   amount: 5000.0,
    //   paid: false,
    // },
    // {
    //   id: 'id2',
    //   name: 'Rent',
    //   amount: -500,
    //   paid: false,
    // },
    // {
    //   id: 'id3',
    //   name: 'Phone bill',
    //   amount: -14.99,
    //   paid: false,
    // },
    // {
    //   id: 'id4',
    //   name: 'Other',
    //   amount: 0,
    //   paid: false,
    // },
  ])

  watch(entries.value, () => {
    console.log('watch', entries)
    saveEntries()
  })

  const saveEntries = () => {
    console.log('saveEntries', entries.value)
    LocalStorage.set('entries', entries.value)
  }

  const loadEntries = () => {
    const savedEntries = LocalStorage.getItem('entries')
    if (savedEntries) Object.assign(entries.value, savedEntries)
  }

  const options = reactive({
    sort: false,
  })

  // getters
  const balance = computed(() => {
    return entries.value.reduce((accumulator, { amount }) => {
      return accumulator + amount
    }, 0)
  })

  const balancePaid = computed(() => {
    return entries.value.reduce((accumulator, { amount, paid }) => {
      return paid ? accumulator + amount : accumulator
    }, 0)
  })

  const runningBalances = computed(() => {
    let runningBalances = []
    let currentRunnignBalance = 0

    if (entries.value.length) {
      entries.value.forEach((entry) => {
        let entryAmount = entry.amount ? entry.amount : 0
        currentRunnignBalance = currentRunnignBalance + entryAmount
        runningBalances.push(currentRunnignBalance)
      })
    }
    return runningBalances
  })

  // actions
  const addEntry = (addEntry) => {
    const newEntry = Object.assign({}, addEntry, { id: uid(), paid: false })
    console.log(newEntry)
    entries.value.push(newEntry)
  }

  const deleteEntry = (id) => {
    const index = getEntryIndexById(id)
    entries.value.splice(index, 1)
    Notify.create({
      message: 'Entry deleted',
      color: 'info',
      position: 'top',
    })
  }

  const updateEntry = (id, updates) => {
    const index = getEntryIndexById(id)
    Object.assign(entries.value[index], updates)
  }

  const sortDone = ({ oldIndex, newIndex }) => {
    const movedEntry = entries.value[oldIndex]
    entries.value.splice(oldIndex, 1)
    entries.value.splice(newIndex, 0, movedEntry)
  }

  const getEntryIndexById = (id) => {
    return entries.value.findIndex((entry) => entry.id === id)
  }
  // return
  return {
    entries,
    options,
    balance,
    addEntry,
    deleteEntry,
    updateEntry,
    balancePaid,
    sortDone,
    runningBalances,
    loadEntries,
  }
})
