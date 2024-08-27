<template>
  <div class="row q-pa-sm q-col-gutter-sm bg-primary">
    <div class="col">
      <q-input
        v-model="newEntryObj.name"
        ref="nameRef"
        outlined
        placeholder="Name"
        bg-color="white"
        dense
      />
    </div>
    <div class="col">
      <q-input
        v-model.number="newEntryObj.amount"
        outlined
        placeholder="Amount"
        bg-color="white"
        dense
        input-class="text-right"
        type="number"
      />
    </div>
    <div class="col col-auto">
      <q-btn
        @click="addEntry"
        round
        color="primary"
        icon="add"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { entriesStore } from 'src/stores/entries.js'

const storeEntries = entriesStore()
const nameRef = ref(null)

const entryObjDefault = {
  name: '',
  amount: null,
}

const newEntryObj = reactive({ ...entryObjDefault })

const formReset = () => {
  Object.assign(newEntryObj, entryObjDefault)
  nameRef.value.focus()
}

const addEntry = () => {
  storeEntries.addEntry(newEntryObj)
  formReset()
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped></style>
