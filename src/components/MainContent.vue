<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import MainTemp from './MainTemp.vue'
import MainOptions from './MainOptions.vue'
import MainLocation from './MainLocation.vue'
import MainError from './MainError.vue'
import ForecastMain from './ForecastMain.vue'
import TheProgressLoader from './TheProgressLoader.vue'

const weatherStore = useWeatherStore()
const weather = ref(weatherStore.weather)
const currentCode = ref(weatherStore.weather?.current?.condition?.code) //current weather code

const currentTemp = ref(null)
const loading = ref(true)
const notFound = ref(false)
const currentLocation = ref(weatherStore.location)

async function updateWeather() {
  await weatherStore.fetchWeather(currentLocation.value)
  notFound.value = weatherStore.notFound
  weather.value = weatherStore.weather
  currentCode.value = weatherStore.weather?.current?.condition?.code
  await weatherStore.getLocation() 
  currentLocation.value = weatherStore.location
}

onMounted(async () => {
  await weatherStore.fetchWeather(currentLocation.value)
  currentCode.value = weatherStore.weather?.current?.condition?.code
  await weatherStore.getMatchingTemperature('°C')
  currentTemp.value = await weatherStore.temp
  loading.value = false

  setInterval(updateWeather, 30000) //update weather every 30 seconds with fetch request
})

//update the weather according to changes
watchEffect(() => {
  currentTemp.value = weatherStore.temp
  currentLocation.value = weatherStore.location
  weather.value = weatherStore.weather
  notFound.value = weatherStore.notFound
})
</script>

<template>
  <TheProgressLoader v-if="loading" /> <!--show loader while fetching weather-->
  <div v-else>
    <div>
      <MainOptions />
        <MainTemp
          :weather="currentTemp"
          :source="weather?.current?.condition?.icon"
          :weatherText="weather?.current?.condition?.text"
        />
        <MainLocation
          :locationName="weather?.location?.name"
          :locationCountry="weather?.location?.country"
          :locationLocaltime="weather?.location?.localtime"
        />
        <MainError v-if="notFound" /> <!--show error message if location not found-->
        <ForecastMain v-if="!notFound" />
    </div>
  </div>
</template>
