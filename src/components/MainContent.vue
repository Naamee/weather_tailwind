<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import MainTemp from './MainTemp.vue'
import MainOptions from './MainOptions.vue'
import MainLocation from './MainLocation.vue'
import TheProgressLoader from './TheProgressLoader.vue'


const weatherStore = useWeatherStore()
const weather = ref(weatherStore.weather)
const currentCode = ref(weatherStore.weather?.current?.condition?.code)

const currentTemp = ref(null)
const loading = ref(true)

async function updateWeather() {
  await weatherStore.fetchWeather('Maldives')
  weather.value = weatherStore.weather
  currentCode.value = weatherStore.weather?.current?.condition?.code
}

onMounted(async () => {
  await weatherStore.fetchWeather('Maldives')
  weather.value = weatherStore.weather
  currentCode.value = weatherStore.weather?.current?.condition?.code
  await weatherStore.getMatchingTemperature('°C')
  currentTemp.value = await weatherStore.temp
  loading.value = false

  setInterval(updateWeather, 30000)
})

watchEffect(() => {
  currentTemp.value = weatherStore.temp
})
</script>

<template>
  <TheProgressLoader v-if="loading" />
  <div v-else>
    <MainOptions />
    <MainTemp
      :weather="currentTemp"
      :source="weather?.current?.condition?.icon"
      :weatherText="weather?.current?.condition?.text"
    />
    <MainLocation
      :locationName="weather?.location?.name"
      :locationCountry="weather?.location?.country"
      :locationLocaltime="weather?.location?.localtime" />
  </div>
</template>
