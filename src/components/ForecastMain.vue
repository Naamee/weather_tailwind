<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import ForecastCard from './ForecastCard.vue'

const weatherStore = useWeatherStore()
const forecast = ref({})
const days = ref([null, null, null]);
const dates = ref([null, null, null]);


const updateForecast = () => {
  const forecastData = weatherStore.forecast?.forecast?.forecastday || []; //get the forecast data
  forecast.value = forecastData; 
  for (let i =  1; i <=  3; i++) { //start from 1 to skip today's forecast
    days.value[i -  1] = forecastData[i]?.day || null; //get the forecast for the next 3 days
    dates.value[i -  1] = forecastData[i]?.date || null; //get the date for the next 3 days
  }
};

onMounted(async () => {
  await weatherStore.fetchWeather() //call to ensure the forecast is available
})

watchEffect(() => {
    updateForecast(); //update the forecast according to changes
});
</script>

<template>
  <div class="flex justify-center space-x-5">
    <ForecastCard
      :icon="days[0]?.condition?.icon"
      :date="dates[0]"
      :temp-c="days[0]?.avgtemp_c"
      :temp-f="days[0]?.avgtemp_f"
      :condition="days[0]?.condition?.text"
      :chance-of-rain="days[0]?.daily_chance_of_rain"
    />
    <ForecastCard
      :icon="days[1]?.condition?.icon"
      :date="dates[1]"
      :temp-c="days[1]?.avgtemp_c"
      :temp-f="days[1]?.avgtemp_f"
      :condition="days[1]?.condition?.text"
      :chance-of-rain="days[1]?.daily_chance_of_rain"
    />
  </div>
</template>
