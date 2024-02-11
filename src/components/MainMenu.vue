<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="relative">
    <button @click="toggleMenu" class="optionbtn">Test</button>
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
        <button class="text-white/50 hover:text-white hover:bg-blue-600/50 active:bg-blue-700 px-4 rounded-sm">°C</button>
        <button class="text-white/50 hover:text-white hover:bg-blue-600/50 active:bg-blue-700   px-4 rounded-sm">°F</button>
      </div>
    </transition>
  </div>
</template>
