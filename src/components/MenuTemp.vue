<script setup>
import { ref, onUpdated } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { onClickOutside } from '@vueuse/core'

const target = ref(null)
const isMenuOpen = ref(false)
const currentTemp = ref('°C')
const weatherStore = useWeatherStore()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const changeTemp = (temp) => {
  currentTemp.value = temp.target.textContent
  isMenuOpen.value = false
}

onClickOutside(target, () => isMenuOpen.value = false)

onUpdated(() => {
    weatherStore.getMatchingTemperature(currentTemp.value)
})
</script>

<template>
  <div class="relative" ref="target">
    <button @click="toggleMenu" class="optionbtn">{{ currentTemp }}</button>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="absolute flex flex-col mt-1 space-y-1 right-0 border border-white rounded-sm"
      >
        <button
          @click="changeTemp"
          class="text-white/50 hover:text-white hover:bg-blue-600/50 active:bg-blue-700 px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-sky-50/50"
        >°C</button>
        <button
          @click="changeTemp"
          class="text-white/50 hover:text-white hover:bg-blue-600/50 active:bg-blue-700 px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-sky-50/50"
        >°F</button>
      </div>
    </transition>
  </div>
</template>
