<template>
  <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3 items-center">
    <div class="col text-grey-7 text-h6">Balance:</div>
    <div
      :class="useAmountColorClass(storeEntries.balance)"
      class="col text-h6 text-right"
    >
      <div class="row">
        <div class="col">
          {{ useCurrencify(storeEntries.balance) }}
        </div>
      </div>
      <div class="row">
        <div class="col text-capiton text-grey-6">
          Paid:
          <span
            class="text-weight-bold"
            :class="useAmountColorClass(storeEntries.balancePaid)"
          >
            {{ useCurrencify(storeEntries.balancePaid) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { entriesStore } from 'src/stores/entries.js'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'

const storeEntries = entriesStore()
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped></style>
