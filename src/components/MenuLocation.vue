<script setup>
import { ref } from 'vue'
import SearchIcon from './icons/SearchIcon.vue'

const isSearchOpen = ref(false)

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
}
</script>

<template>
  <div class="relative">
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
          type="text"
          class="search p-1 rounded-sm outline-none border-none outline-blue-300 focus:outline-blue-700"
          placeholder="Search Location"
        />
      </div>
    </transition>
  </div>
</template>
