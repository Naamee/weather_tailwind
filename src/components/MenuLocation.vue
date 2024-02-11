<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="relative">
    <button @click="toggleMenu" class="optionbtn">Male, Maldives</button>
    <div
      v-if="isMenuOpen"
      class="absolute right-0 mt-1 flex flex-col text-white border border-white rounded-sm text-nowrap"
    >
      <button
        class="text-white/50 hover:text-white hover:bg-blue-600/50 active:bg-blue-700 rounded-sm"
        >Male, Maldives</button
      >
      <button
        class="text-white/50 hover:text-white hover:bg-blue-600/50 active:bg-blue-700 px-4 rounded-sm"
        >London, United Kingdom</button
      >
      <button
        class="text-white/50 hover:text-white hover:bg-blue-600/50 active:bg-blue-700 px-4 rounded-sm"
        >New York, United States</button
      >
      <button
        class="text-white/50 hover:text-white hover:bg-blue-600/50 active:bg-blue-700 px-4 rounded-sm"
        >Tokyo, Japan</button
      >
      <button
        class="text-white/50 hover:text-white hover:bg-blue-600/50 active:bg-blue-700 px-4 rounded-sm"
        >Sydney, Australia</button
      >
      <button
        class="text-white/50 hover:text-white hover:bg-blue-600/50 active:bg-blue-700 px-4 rounded-sm"
        >Cape Town, South Africa</button
      >
    </div>
  </div>
</template>
