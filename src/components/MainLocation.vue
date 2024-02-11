<script setup>
const props = defineProps({
  locationName: String, 
  locationCountry: String,
  locationLocaltime: String
})
</script>

<template>
        <div class="mt-3 font-nunito font-extralight">
      <p class="text-center text-white text-2xl text-shadow shadow-gray-800">
        {{ props.locationName }}
      </p>
      <p class="text-center text-white text-2xl text-shadow shadow-gray-800">
        {{ props.locationCountry }}
      </p>
      <p class="text-center text-xs text-white/100 text-shadow shadow-gray-800">
        {{ props.locationLocaltime }}
      </p>
    </div>
</template>