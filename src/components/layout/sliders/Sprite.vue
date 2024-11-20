<template>
  <template v-if="slider.values.length > 1">
    <div :data-slider-index="index" class="slider">
      <h2 v-if="slider.title">{{ title() }}</h2>
      <div class="arrows">
        <div class="arrow left clicker" @click="menuStore.sliderLeft(index)"><img src="/assets/images/menu/selection_arrow_left.png"></div>
        <div class="text hapna">{{ numItem() }}</div>
        <div class="arrow right clicker" @click="menuStore.sliderRight(index)"><img src="/assets/images/menu/selection_arrow_right.png"></div>
      </div>
      <div :class="['sprites', { 'center': slider.values.length <= 8 }]" id="scroller">
        <div v-for="(value, vIndex) in slider.values" :key="vIndex + 1" :class="['sprite clicker', { 'current': (vIndex + 1) == slider.current }]" :id="'sprite-' + (vIndex + 1)" @click="click(vIndex + 1)">
          <img :src="`./assets/images/${value.sprite}.png`" />
          <div class="tick" v-if="slider.displayTick && slider.tickIndex == vIndex">
            <img src="/assets/images/menu/tick.png">
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { inject, onMounted, nextTick } from 'vue';
import { useLangStore } from '../../../stores/lang';
const lang = useLangStore().lang
import { useMenuStore } from '../../../stores/menus';
const menuStore = useMenuStore()

const { slider, index } = defineProps(['slider', 'index'])

const API = inject('API')

function title() {
  if (slider.translate)
    return lang(slider.title)
  return slider.title
}

function numItem() {
  return API.sprintf(lang('of'), slider.current, slider.values.length)
}
function click(vIndex) {
  if (vIndex == slider.current) return
  menuStore.setSliderCurrent({ index: index, value: parseInt(vIndex) })
}

function scrollToElementHOrizontal(scroller, element) {
  if (scroller == undefined) return
  if (element == undefined) return
  const scrollerRect = scroller.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const scrollerScrollLeft = scroller.scrollLeft;
  const elementLeft = elementRect.left - scrollerRect.left + scrollerScrollLeft;
  const elementRight = elementRect.right - scrollerRect.left + scrollerScrollLeft;
  if (elementRect.left < scrollerRect.left) {
    scroller.scrollTo({
      left: elementLeft,
      behavior: firstScroll ? 'instant' : 'smooth'
    });
  }
  else if (elementRect.right > scrollerRect.right) {
    scroller.scrollTo({
      left: elementRight - elementRect.width,
      behavior: firstScroll ? 'instant' : 'smooth'
    });
  }
}

let firstScroll = true
function updateScroll() {
  nextTick(() => {
    const currentItem = document.querySelector('#scroller #sprite-' + slider.current)
    // const scroller = document.querySelector('#scroller');
    // scrollToElementHOrizontal(scroller, currentItem)
    currentItem.scrollIntoView({ behavior: firstScroll ? 'instant' : 'smooth', block: "nearest", inline: "nearest" })
    firstScroll = false
  })
}
menuStore.$subscribe(() => {
  updateScroll()
})
onMounted(() => {
  updateScroll()
})
</script>