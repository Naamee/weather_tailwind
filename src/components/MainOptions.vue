<script setup>
import MainMenu from './MainMenu.vue';

const props = defineProps({
    location: String,
    temp: String
})
</script>

<template>
    <div class="flex space-x-3 justify-end px-3 py-2 font-nunito text-sm">
        <button class="optionbtn">Male, Maldives</button>
        <button class="optionbtn">°C</button>
        <MainMenu />
    </div>
</template>