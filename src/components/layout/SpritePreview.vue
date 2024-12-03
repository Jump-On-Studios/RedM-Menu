<template>
  <div class="preview-slider">
    <img :src="`./assets/images/${getSprite()}.png`" />
    <div class="border"></div>
  </div>
</template>

<script setup>
const props = defineProps(['sliders'])

function getSprite() {
  for (const slider of props.sliders) {
    if (slider.type == "sprite" && slider.values.length > 0) {
      return slider.values[slider.current - 1]?.sprite
    }
  }
}
</script>

<style scoped>
.preview-slider {
  margin-top: 0.2rem;
}
</style>