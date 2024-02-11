<script setup>
import { ref, onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import MainTemp from './MainTemp.vue'
import MainOptions from './MainOptions.vue'
import MainLocation from './MainLocation.vue'
import TheProgressLoader from './TheProgressLoader.vue'


const weatherStore = useWeatherStore()
const weather = ref(weatherStore.weather)
const currentCode = ref(weatherStore.weather?.current?.condition?.code)

const loading = ref(true)
const currentTheme = ref('daySunny')

const determineTheme = async () => {
  const themeSet = await weatherStore.getMatchingWeatherCode(currentCode.value)
  const isDay = weatherStore.weather?.current?.is_day

  if (isDay) {
    currentTheme.value = themeSet?.[0]
  } else {
    currentTheme.value = themeSet?.[1]
  }
}

async function updateWeather() {
  await weatherStore.fetchWeather('Maldives')
  weather.value = weatherStore.weather
  currentCode.value = weatherStore.weather?.current?.condition?.code
  determineTheme()
}

onMounted(async () => {
  await weatherStore.fetchWeather('Maldives')
  weather.value = weatherStore.weather
  currentCode.value = weatherStore.weather?.current?.condition?.code
  determineTheme()
  loading.value = false

  setInterval(updateWeather, 30000)
})
</script>

<template>
  <TheProgressLoader v-if="loading" />
  <div v-else>
    <MainOptions />
    <MainTemp
      :weather="weather?.current?.temp_c + '°C'"
      :source="weather?.current?.condition?.icon"
      :weatherText="weather?.current?.condition?.text"
    />
    <MainLocation
      :locationName="weather?.location?.name"
      :locationCountry="weather?.location?.country"
      :locationLocaltime="weather?.location?.localtime" />
  </div>
</template>
