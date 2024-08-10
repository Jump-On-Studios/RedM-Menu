<template>
  <template v-if="props.slider.values.length > 1">
    <div :data-slider-index="props.index" class="slider">
      <h2 v-if="props.slider.title">{{ title() }}</h2>
      <div class="arrows">
        <div class="arrow left clicker" @click="menuStore.sliderLeft(props.index)"><img src="/assets/images/menu/selection_arrow_left.png"></div>
        <div class="text hapna">{{ numItem() }}</div>
        <div class="arrow right clicker" @click="menuStore.sliderRight(props.index)"><img src="/assets/images/menu/selection_arrow_right.png"></div>
      </div>
      <div class="sprites">
        <div v-for="(value,vIndex) in props.slider.values"
          :key="vIndex+1"
          :class="['sprite clicker',{'current' : (vIndex+1) == props.slider.current}]"
          :id="'sprite-'+(vIndex+1)"
          @click="click(vIndex+1)"
        >
          <img :src="`./assets/images/${value.sprite}.png`" />
          <div class="tick" v-if="props.slider.displayTick && props.slider.tickIndex == vIndex">
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

const props = defineProps(['slider','index'])

const API = inject('API')

function title() {
  if (props.slider.translate)
    return lang(props.slider.title)
  return props.slider.title
}

function numItem() {
  return API.sprintf(lang('of'),props.slider.current, props.slider.values.length)
}
function click(vIndex) {
  if (vIndex == props.slider.current) return
  menuStore.setSliderCurrent({index: props.index,value:parseInt(vIndex)})
}
function updateScroll() {
  nextTick(() => {
    const currentItem = document.getElementById('sprite-'+props.slider.current)
    currentItem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
  })
}
menuStore.$subscribe(() => {
  updateScroll()
})
onMounted(() => {
  updateScroll()
})
</script>