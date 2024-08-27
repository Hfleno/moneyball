import { settingsStore } from 'src/stores/settings.js'
const storeSettings = settingsStore()

export const useCurrencify = (amount) => {
  const curFormatted = amount.toLocaleString('da-DK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return storeSettings.settings.currencySymbol + ' ' + curFormatted
}
