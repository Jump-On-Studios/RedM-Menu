<template>
  <ColorPaletteBox :palette="getPalette()" :tint0="getTint(0)" :tint1="getTint(1)" :tint2="getTint(2)" />
</template>

<script setup>
import { ref } from 'vue';
import ColorPaletteBox from './ColorPaletteBox.vue';

const { sliders } = defineProps(['sliders'])

function getPalette() {
  for (let index = 0; index < sliders.length; index++) {
    const slider = sliders[index];
    if (slider.type == "palette")
      return slider.tint
  }
  return ""
}

function getKey() {
  return [getPalette(), getTint(0), getTint(1), getTint(2)].join('-')
}

function getTint(index) {
  let slider

  let counter = 0
  for (let i = 0; i < sliders.length; i++) {
    slider = sliders[i];
    if (slider.type == "palette") {
      if (counter == index)
        return slider.current
      counter++
    }
  }
  return false
}
</script>