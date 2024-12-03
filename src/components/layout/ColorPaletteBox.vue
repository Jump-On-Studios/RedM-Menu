<template>
    <div :class="['colorCustom color-' + numberColor]" ref="boxParent">
        <div v-if="tint0 !== false" class="tint0" :style="getStyleTint(tint0)"></div>
        <div v-if="tint1 !== false" class="tint1" :style="getStyleTint(tint1)"></div>
        <div v-if="tint2 !== false" class="tint2" :style="getStyleTint(tint2)"></div>
        <div class="border"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const { palette, tint0, tint1, tint2 } = defineProps(['palette', 'tint0', 'tint1', 'tint2'])
const numberColor = ref(1)
const max = ref(1)
if (tint1 != false)
    numberColor.value = 2
if (tint2 != false)
    numberColor.value = 3
console.log(tint0, tint1, tint2)
let url = `./assets/images/menu/${palette}.png`;

const img = new Image();
img.src = url;

img.onload = function () {
    max.value = img.naturalWidth - 1; // Largeur originale de l'image
};

function getStyleTint(value) {
    let slider

    let percent = (value / max.value) * 100
    return {
        backgroundImage: "url(" + url + ")",
        backgroundPosition: percent + "% 0px"
    }
}

</script>