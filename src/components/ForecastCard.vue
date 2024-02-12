<script setup>
import { ref, onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()
const forecast = ref(weatherStore?.forecast?.forecast?.forecastday)
const day1 = ref(null)
const day2 = ref(null)
const day3 = ref(null)

onMounted(async () => {
  await weatherStore.fetchForecast()
  forecast.value = weatherStore?.forecast?.forecast.forecastday

  day1.value = forecast.value[0]['day']
  day2.value = forecast.value[1]['day']
  day3.value = forecast.value[2]['day']
})
</script>

<template>
  <div
    class="flex flex-col items-center mt-4 p-4 rounded-md border border-white bg-blue-950/25  text-white font-nunito"
  >
    <img :src="day1?.condition?.icon" class="w-14" />
    <div class="flex flex-col items-center mt-3">
      <p class="text-md">{{ day1?.avgtemp_c }} °C</p>
      <p class="text-xs">{{ day1?.condition?.text }}</p>
      <p class="text-xs">Chance of Rain: {{ day1?.daily_chance_of_rain }}%</p>
    </div>
  </div>
</template>
