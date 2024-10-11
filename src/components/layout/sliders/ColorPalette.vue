<template>
  <div class="colorPicker slider">
    <h2>{{ getTitle() }}</h2>
    <div class="arrows">
      <div class="arrow left clicker" @click="menuStore.sliderLeft(props.index)"><img src="/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right clicker" @click="menuStore.sliderRight(props.index)"><img src="/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <div class="colorSlider">
      <div :class="['keyHelpers', 'index-' + props.index]" v-if="menuStore.cItem.sliders.length > 1">
        <div :class="['left', { 'qwerty': menuStore.isQwerty && props.index == 1 }]" ref="keyLeft">
          {{ leftKey() }}
        </div>
        <div class="right" ref="keyRight">
          {{ rightKey() }}
        </div>
      </div>
      <input type="range" min=0 :max="max" :class="['palette', 'max-' + max]" :style="background()" :value="props.slider.current" @input="change" />
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, inject, ref } from 'vue';
import { useLangStore } from '../../../stores/lang';
const lang = useLangStore().lang
import { useMenuStore } from '../../../stores/menus';
const menuStore = useMenuStore()
const API = inject('API')

const props = defineProps(['index', 'slider'])
const max = ref(1)
let mounted = false

let url = `./assets/images/menu/${props.slider.tint}.png`;

const img = new Image();
img.src = url;

img.onload = function () {
  max.value = img.naturalWidth - 1; // Largeur originale de l'image
};

function background() {
  return { backgroundImage: `url(${url}` }
}
function numItem() {
  return API.sprintf(lang('of'), props.slider.current + 1, max.value + 1)
}
function getTitle() {
  if (!props.slider.translate) return props.slider.title
  return lang(props.slider.title)
}
function change(e) {
  if (!mounted) return

  let value = e.target.value
  e.target.blur()

  if (value == props.slider.current) return
  menuStore.setSliderCurrent({ index: props.index, value: parseInt(value) })
}
function leftKey() {
  if (props.index == 0) return '←'
  if (props.index == 1) {
    if (menuStore.isQwerty)
      return "q"
    else
      return "a"
  }
  if (props.index == 2) return "4"
}
function rightKey() {
  if (props.index == 0) return '→'
  if (props.index == 1) return "E"
  if (props.index == 2) return "6"
}
onMounted(() => {
  mounted = true
})
onBeforeUnmount(() => {
  mounted = false
})
</script>