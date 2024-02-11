<script setup>
import SearchIcon from './icons/SearchIcon.vue';
</script>

<template>
  <div class="relative">
    <button class="optionbtn flex items-center"><SearchIcon /></button>
    <div class="absolute right-0 mt-2">
      <input type="text" class="search p-1 rounded-sm outline-none border-none outline-blue-300 focus:outline-blue-700" placeholder="Search Location" />
    </div>
  </div>
</template>
