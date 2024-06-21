<template>
  <template v-if="props.color.texture">
    <img :src="getImage()" />
  </template>
  <template v-if="props.color.custom">
    <div class="colorCustom" ref="boxParent">
      <div class="tint0" ref="tint0" :style="getStyleTint(0)"></div>
      <div class="tint1" ref="tint1" :style="getStyleTint(1)"></div>
      <div class="tint2" ref="tint2" :style="getStyleTint(2)"></div>
      <div class="border"></div>
    </div>
  </template>
</template>



<script setup>
import { nextTick } from 'vue';

const tint0 = ref(null)
const tint1 = ref(null)
const tint2 = ref(null)

const props = defineProps(['color'])

function getImage() {
  let color = props.color.texture.toLowerCase();
  return `./assets/images/tints/${color}.png`;
}
function getStyleTint(index) {
  nextTick(() => {
    let url = `./assets/images/menu/${props.color.palette}.png`;
    let left = props.color['tint'+index]
    let box
    switch (index) {
      case 0:
        box = tint0.value
        break
      case 1:
        box = tint1.value
        break
      case 2:
        box = tint2.value
        break
    }
    height = -1*box.getBoundingClientRect().height
    left *= height
    box.style.backgroundImage = "url("+url+")"
    box.style.backgroundPosition =  left + "px 0px"
  })
}
</script>