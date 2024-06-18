<template>
  <template v-if="!cItem.disabled">
    <div :class="['sliders',{full:fullHeight()}]" v-if="cItem.sliders && (cItem.sliders.length > 0)">
      <template v-for="(slider,index) in cItem.sliders" :key="index">
        <template v-if="slider.type == 'palette'">
          <ColorPalette :index="index" :slider="slider" />
        </template>
        <template v-else-if="slider.type == 'switch'" />
        <template v-else-if="slider.type == 'grid'">
          <Grid :index="index" :slider="slider" />
        </template>
        <template v-else>
          <DefaultSlider :index="index" :slider="slider" />
        </template>
      </template>
    </div>
  </template>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useMenuStore } from '../../stores/menus';
import ColorPalette from './sliders/ColorPalette.vue'
import DefaultSlider from './sliders/DefaultSlider.vue'
import Grid from './sliders/Grid.vue'

const menuStore = useMenuStore()
const sliderLeft = computed(() => menuStore.sliderLeft)
const sliderRight = computed(() => menuStore.sliderRight)
const setSliderCurrent = computed(() => menuStore.setSliderCurrent)

function handleKeydown(e) {
  if (!cItem.sliders) return
  switch(e.code) {
    //LEFT
    case 'ArrowLeft':
      sliderLeft()
      break;
    case 'KeyQ':
      sliderLeft(1)
      break;
    case 'Numpad4':
      sliderLeft(2)
      break;
    case 'Digit4':
      sliderLeft(2)
      break;
    //RIGHT
    case 'ArrowRight':
      sliderRight()
      break;
    case 'KeyE':
      sliderRight(1)
      break;
    case 'Numpad6':
      sliderRight(2)
      break;
    case 'Digit6':
      sliderRight(2)
      break;
  }
  return;
}
function fullHeight() {
  if (cItem.description.length > 0) return false
  if (cItem.statistics.length > 0) return false
  return true
}
onBeforeMount(()=> {
  window.addEventListener('keydown', handleKeydown, null);
})
onBeforeUnmount(()=> {
  window.removeEventListener('keydown', handleKeydown);
})
</script>