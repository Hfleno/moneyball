<template>
  <q-slide-item
    @right="slideRight"
    @left="slideLeft"
    left-color="positive"
    right-color="negative"
    :class="{ 'bg-grey-2': entry.paid }"
  >
    <template v-slot:left>
      <q-icon name="done" />
    </template>
    <template v-slot:right>
      <q-icon name="delete" />
    </template>
    <q-item class="row">
      <q-item-section
        class="text-weight-bold col"
        :class="[
          useAmountColorClass(entry.amount),
          { 'text-strike': entry.paid },
        ]"
      >
        {{ entry.name }}
        <q-popup-edit
          @save="onNameUpdate"
          :model-value="entry.name"
          :cover="false"
          :offset="[16, 12]"
          auto-save
          anchor="top left"
          v-slot="scope"
          buttons
          label-set="Ok"
        >
          <q-input
            v-model="scope.value"
            input-class="text-weight-bold letter-spacing-none"
            dense
            autofocus
            @keyup.enter="scope.set"
            v-select-all
          />
        </q-popup-edit>
      </q-item-section>
      <q-item-section
        class="text-weight-bold relative-position col"
        :class="[useAmountColorClass(entry.amount)]"
        side
      >
        <span :class="{ 'text-strike': entry.paid }">
          {{ useCurrencify(entry.amount) }}
        </span>
        <q-popup-edit
          @save="onAmountUpdate"
          :model-value="entry.amount"
          :cover="false"
          :offset="[16, 12]"
          auto-save
          anchor="top right"
          self="top right"
          v-slot="scope"
          buttons
          label-set="Ok"
        >
          <q-input
            v-model.number="scope.value"
            input-class="text-weight-bold letter-spacing-none text-right"
            dense
            autofocus
            @keyup.enter="scope.set"
            v-select-all
          />
        </q-popup-edit>
        <q-chip
          v-if="storeSettings.settings.showRunningBalance"
          outline
          color="primary"
          text-color="white"
          dense
          size="9px"
          class="running-balance absolute-bottom-right"
          :class="useAmountColorClass(storeEntries.runningBalances[index])"
        >
          {{ useCurrencify(storeEntries.runningBalances[index]) }}
        </q-chip>
      </q-item-section>
      <q-item-section
        v-if="storeEntries.options.sort"
        side
      >
        <q-icon
          class="handle"
          name="reorder"
          color="primary"
        ></q-icon>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'
import { useQuasar } from 'quasar'
import { entriesStore } from 'src/stores/entries.js'
import { settingsStore } from 'src/stores/settings.js'
import vSelectAll from 'src/directives/selectall'

const storeEntries = entriesStore()
const storeSettings = settingsStore()

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
const $q = useQuasar()

const slideRight = ({ reset }) => {
  storeSettings.settings.promptToDelete
    ? promptToDelete(reset)
    : storeEntries.deleteEntry(props.entry.id)
}

const promptToDelete = (reset) => {
  // reset = details.reset. details is an object that is emittet when sliding is complete
  $q.dialog({
    title: 'Delete entry',
    message:
      '<div class="text-weight-bold ' +
      useAmountColorClass(props.entry.amount) +
      '">' +
      props.entry.name +
      ': ' +
      useCurrencify(props.entry.amount) +
      '</div>',
    persistent: true,
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true,
    },
    cancel: {
      noCaps: true,
    },
  })
    .onOk(() => {
      storeEntries.deleteEntry(props.entry.id)
    })
    .onCancel(() => {
      reset()
    })
}

const slideLeft = ({ reset }) => {
  storeEntries.updateEntry(props.entry.id, { paid: !props.entry.paid })
  reset()
}

const onNameUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { name: value })
}

const onAmountUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { amount: value })
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped></style>
