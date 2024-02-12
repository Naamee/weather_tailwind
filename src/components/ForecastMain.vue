<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import ForecastCard from './ForecastCard.vue'

const weatherStore = useWeatherStore()
const forecast = ref(weatherStore?.forecast?.forecast?.forecastday)
const day1 = ref(null)
const day2 = ref(null)
const day3 = ref(null)

onMounted(async () => {
  await weatherStore.fetchWeather()
})

watchEffect(() => {
  forecast.value = weatherStore?.forecast?.forecast?.forecastday
  day1.value = forecast.value[0]['day']
  day2.value = forecast.value[1]['day']
  day3.value = forecast.value[2]['day']
})

</script>

<template>
  <div class="flex justify-center space-x-5">
    <ForecastCard
      :icon="day1?.condition?.icon"
      :temp-c="day1?.avgtemp_c"
      :temp-f="day1?.avgtemp_f"
      :condition="day1?.condition?.text"
      :chance-of-rain="day1?.daily_chance_of_rain"
    />
    <ForecastCard
      :icon="day2?.condition?.icon"
      :temp-c="day2?.avgtemp_c"
      :temp-f="day2?.avgtemp_f"
      :condition="day2?.condition?.text"
      :chance-of-rain="day2?.daily_chance_of_rain"
    />
    <ForecastCard
      :icon="day3?.condition?.icon"
      :temp-c="day3?.avgtemp_c"
      :temp-f="day3?.avgtemp_f"
      :condition="day3?.condition?.text"
      :chance-of-rain="day3?.daily_chance_of_rain"
    />
  </div>
</template>
