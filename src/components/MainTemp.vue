<script setup>
const props = defineProps({
  weather: String,
  source: String,
  weatherText: String
})
</script>

<template>
  <div class="mt-10 flex justify-center font-nunito font-extralight text-white">
    <h1 class="text-6xl text-shadow shadow-gray-800">
      {{ props.weather }}
    </h1>
  </div>  
  <div class="mt-1 flex justify-center font-nunito font-extralight text-white items-end">
    <img :src="props.source" class="h-5 mr-1">
    <p class="font-xs lowercase">{{ props.weatherText }}</p>  
  </div>

</template>
