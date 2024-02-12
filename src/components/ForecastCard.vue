<script setup>
import { ref, watchEffect } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'

const props = defineProps({
  icon: String,
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
    isCelsius.value = false
  }
})
</script>

<template>
  <div
    class="flex flex-col items-center mt-4 p-4 rounded-md border border-white bg-blue-950/25 text-white font-nunito"
  >
    <img :src="props.icon" class="w-10" />
    <div class="flex flex-col items-center mt-2">
      <p v-if="isCelsius" class="text-xl">{{ props.tempC }} °C</p>
      <p v-if="!isCelsius" class="text-xl">{{ props.tempF }} °F</p>
      <p class="text-xs mt-1">{{ props.condition }}</p>
      <p class="text-xs">Chance of Rain: {{ props.chanceOfRain }}%</p>
    </div>
  </div>
</template>
