<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import ForecastCard from './ForecastCard.vue'

const weatherStore = useWeatherStore()
const forecast = ref(weatherStore?.forecast?.forecast?.forecastday)
const day1 = ref(null)
const day2 = ref(null)
const day3 = ref(null)
const date1 = ref(null)
const date2 = ref(null)
const date3 = ref(null)

onMounted(async () => {
  await weatherStore.fetchWeather() //call to ensure the forecast is available
})

//update the forecast
watchEffect(() => {
  forecast.value = weatherStore?.forecast?.forecast?.forecastday 
  day1.value = forecast.value[1]['day'] 
  day2.value = forecast.value[2]['day']
  day3.value = forecast.value[3]['day']
  date1.value = forecast.value[1]['date']
  date2.value = forecast.value[2]['date']
  date3.value = forecast.value[3]['date']
})

</script>

<template>
  <div class="flex justify-center space-x-5">
    <ForecastCard
      :icon="day1?.condition?.icon"
      :date="date1"
      :temp-c="day1?.avgtemp_c"
      :temp-f="day1?.avgtemp_f"
      :condition="day1?.condition?.text"
      :chance-of-rain="day1?.daily_chance_of_rain"
    />
    <ForecastCard
      :icon="day2?.condition?.icon"
      :date="date2"
      :temp-c="day2?.avgtemp_c"
      :temp-f="day2?.avgtemp_f"
      :condition="day2?.condition?.text"
      :chance-of-rain="day2?.daily_chance_of_rain"
    />
    <ForecastCard
      :icon="day3?.condition?.icon"
      :date="date3"
      :temp-c="day3?.avgtemp_c"
      :temp-f="day3?.avgtemp_f"
      :condition="day3?.condition?.text"
      :chance-of-rain="day3?.daily_chance_of_rain"
    />
  </div>
</template>
