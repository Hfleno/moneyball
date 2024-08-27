<template>
  <q-page>
    <div class="q-pa-md">
      <q-list
        bordered
        padding
      >
        <q-item-label header>Entries</q-item-label>

        <q-item
          tag="label"
          v-ripple
        >
          <q-item-section>
            <q-item-label>Prompt to delete</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              color="primary"
              v-model="storeSettings.settings.promptToDelete"
            />
          </q-item-section>
        </q-item>
        <q-item
          tag="label"
          v-ripple
        >
          <q-item-section>
            <q-item-label>Show running balance</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              color="primary"
              v-model="storeSettings.settings.showRunningBalance"
            />
          </q-item-section>
        </q-item>
        <q-item
          tag="label"
          v-ripple
        >
          <q-item-section>
            <q-input
              v-model="storeSettings.settings.currencySymbol"
              outlined
              label="Currency symbol"
              v-select-all
            >
            </q-input>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item-label header>Apperances</q-item-label>
        <q-item
          tag="label"
          v-ripple
        >
          <q-item-section avatar>
            <q-radio
              v-model="storeSettings.settings.darkMode"
              :val="false"
              color="primary"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Light</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          tag="label"
          v-ripple
        >
          <q-item-section avatar>
            <q-radio
              v-model="storeSettings.settings.darkMode"
              :val="true"
              color="primary"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dark</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          tag="label"
          v-ripple
        >
          <q-item-section
            avatar
            top
          >
            <q-radio
              v-model="storeSettings.settings.darkMode"
              val="auto"
              color="primary"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Auto</q-item-label>
            <q-item-label caption
              >Follow the preference of your device.</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { settingsStore } from 'src/stores/settings.js'
import vSelectAll from 'src/directives/selectall.js'

const storeSettings = settingsStore()
</script>
