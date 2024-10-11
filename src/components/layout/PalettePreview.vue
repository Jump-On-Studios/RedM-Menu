<template>
  <div :class="['colorCustom color-' + props.sliders.length]" ref="boxParent">
    <div class="tint0" ref="tint0" :style="getStyleTint(0)"></div>
    <div class="tint1" ref="tint1" :style="getStyleTint(1)"></div>
    <div class="tint2" ref="tint2" :style="getStyleTint(2)"></div>
    <div class="border"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['sliders'])

const tint0 = ref(null);
const tint1 = ref(null);
const tint2 = ref(null);
const max = ref(1)

let palette = ""
for (let index = 0; index < props.sliders.length; index++) {
  const slider = props.sliders[index];
  if (slider.type == "palette") {
    palette = slider.tint
    break
  }
}
let url = `./assets/images/menu/${palette}.png`;

const img = new Image();
img.src = url;

img.onload = function () {
  max.value = img.naturalWidth - 1; // Largeur originale de l'image
};

function getStyleTint(index) {
  let slider

  let counter = 0
  for (let i = 0; i < props.sliders.length; i++) {
    slider = props.sliders[i];
    if (slider.type == "palette") {
      if (counter == index)
        break
      counter++
    }
  }
  if (counter < index)
    return {}

  let percent = (slider.current / max.value) * 100
  return {
    backgroundImage: "url(" + url + ")",
    backgroundPosition: percent + "% 0px"
  }
}
</script>