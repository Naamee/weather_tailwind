<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import SearchIcon from './icons/SearchIcon.vue'
import { useWeatherStore } from '@/stores/weatherStore'

const target = ref(null)
const currentLocation = ref('')
const isSearchOpen = ref(false)
const weatherStore = useWeatherStore()

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
}

async function updateWeather(currentLocation) {
  await weatherStore.fetchWeather(currentLocation)
  isSearchOpen.value = false
}

onClickOutside(target, () => (isSearchOpen.value = false))
</script>

<template>
  <div class="relative" ref="target">
    <button @click="toggleSearch" class="optionbtn flex items-center"><SearchIcon /></button>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isSearchOpen" class="absolute right-0 mt-2">
        <input
          @keydown.enter="updateWeather(currentLocation)"
          v-model="currentLocation"
          name="search"
          type="text"
          class="search p-1 pl-2 rounded-full outline-none border-none outline-blue-900 focus:outline-blue-600 font-nunito bg-white/25 placeholder-gray-500"
          placeholder="Search Location"
        />
      </div>
    </transition>
  </div>
</template>
