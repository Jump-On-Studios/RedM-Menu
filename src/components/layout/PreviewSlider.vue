<template>
  <template v-if="item.previewPalette || item.previewSlider">
    <PalettePreview v-if="hasPalette" :key="getPalette()" :sliders="item.sliders" />
    <SpritePreview v-if="hasSprite" :sliders="item.sliders" />
  </template>
</template>

<script setup>
import { ref } from "vue";
const { item } = defineProps(['item'])
import PalettePreview from "./PalettePreview.vue"
import SpritePreview from "./SpritePreview.vue";

const hasSprite = ref('')
const hasPalette = ref(false)

for (const slider of item.sliders) {
  if (slider.type == "switch" && slider.values.length > 1) {
    hasSprite.value = false
    hasPalette.value = false
    break
  }
  if (slider.type == "palette") {
    hasPalette.value = true
  }
  if (slider.type == "sprite") {
    hasSprite.value = true
  }
}
function getPalette() {
  for (let index = 0; index < item.sliders.length; index++) {
    const slider = item.sliders[index];
    if (slider.type == "palette") {
      return slider.tint
    }
  }
  return false
}
</script>