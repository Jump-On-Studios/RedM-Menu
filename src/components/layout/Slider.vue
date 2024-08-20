<template>
  <template v-if="!menuStore.cItem.disabled">
    <div :class="['sliders',{full:fullHeight()}]" v-if="menuStore.cItem.sliders && (menuStore.cItem.sliders.length > 0)">
      <template v-for="(slider,index) in menuStore.cItem.sliders" :key="index">
        <template v-if="slider.type == 'palette'">
          <ColorPalette :index="index" :slider="slider" />
        </template>
        <template v-else-if="slider.type == 'switch'" />
        <template v-else-if="slider.type == 'grid'">
          <Grid :index="index" :slider="slider" />
        </template>
        <template v-else-if="slider.type == 'sprite'">
          <Sprite :index="index" :slider="slider" />
        </template>
        <template v-else>
          <Default :index="index" :slider="slider" />
        </template>
      </template>
    </div>
  </template>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useMenuStore } from '../../stores/menus';
import ColorPalette from './sliders/ColorPalette.vue'
import Default from './sliders/Default.vue'
import Grid from './sliders/Grid.vue'
import Sprite from './sliders/Sprite.vue'

const menuStore = useMenuStore()

function handleKeydown(e) {
  if (!menuStore.cItem.sliders) return
  switch(e.code) {
    //LEFT
    case 'ArrowLeft':
      menuStore.sliderLeft()
      break;
    case 'KeyQ':
      menuStore.sliderLeft(1)
      break;
    case 'Numpad4':
      menuStore.sliderLeft(2)
      break;
    case 'Digit4':
      menuStore.sliderLeft(2)
      break;
    //RIGHT
    case 'ArrowRight':
      menuStore.sliderRight()
      break;
    case 'KeyE':
      menuStore.sliderRight(1)
      break;
    case 'Numpad6':
      menuStore.sliderRight(2)
      break;
    case 'Digit6':
      menuStore.sliderRight(2)
      break;
  }
  return;
}
function fullHeight() {
  if (menuStore.cItem.description.length > 0) return false
  if (menuStore.cItem.statistics.length > 0) return false
  return true
}
onBeforeMount(()=> {
  window.addEventListener('keydown', handleKeydown, null);
})
onBeforeUnmount(()=> {
  window.removeEventListener('keydown', handleKeydown);
})
</script>