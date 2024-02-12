<script setup>
import { ref, watchEffect } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'

const props = defineProps({
  icon: String,
  date: String,
  tempC: Number,
  tempF: Number,
  condition: String,
  chanceOfRain: Number
})

const weatherStore = useWeatherStore()
const temp = ref(weatherStore.temp)

const isCelsius = ref(true)

watchEffect(() => {
  temp.value = weatherStore.temp
  if (temp.value.endsWith('°C')) {
    isCelsius.value = true
  } else {
    isCelsius.value = false // °F
  }
})
</script>

<template>
  <div
    class="flex flex-col items-center w-36 mt-4 p-4 rounded-md bg-gray-200 text-black font-nunito"
  >
    <p class="text-xs font-semibold">{{ props.date }}</p>
    <img :src="props.icon" class="w-10 mt-1" />
    <p class="text-xs font-semibold">{{ props.condition }}</p>
    <div class="flex flex-col items-center mt-2 text-xl font-bold">
      <p v-if="isCelsius">{{ props.tempC }} °C</p>
      <p v-if="!isCelsius">{{ props.tempF }} °F</p>
    </div>
  </div>
</template>
