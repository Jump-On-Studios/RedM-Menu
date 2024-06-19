<template>
  <template v-if="slider.values.length > 1">
    <div :data-slider-index="index" class="slider">
      <h2 v-if="slider.title">{{ lang(slider.title) }}</h2>
      <div class="arrows">
        <div class="arrow left clicker" @click="sliderLeft(index)"><img src="/assets/images/menu/selection_arrow_left.png"></div>
        <div class="text hapna">{{ numItem() }}</div>
        <div class="arrow right clicker" @click="sliderRight(index)"><img src="/assets/images/menu/selection_arrow_right.png"></div>
      </div>
      <div class="boxes">
        <div v-for="vIndex in slider.values.length"
          :key="vIndex"
          :class="['box clicker',{
            'active' : vIndex < slider.current,
            'current' : vIndex == slider.current,
            'equiped' : vIndex == menuStore.cMenu.equipedItem.variation && cItem.index == menuStore.cMenu.equipedItem.index,
            'bought' : IsBought(vIndex)
          }]"
          @click="click(vIndex)"
        >
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { inject } from 'vue';
import { useMenuStore } from '../../../stores/menus';
const menuStore = useMenuStore()
import { useLangStore } from '../../../stores/lang';
const lang = useLangStore().lang

const API = inject('API')
const slider = props.slider
const index = props.index

function IsBought(vIndex) {
  return false
}
function numItem() {
  return API.sprintf(lang('of'),slider.current, slider.values.length)
}
function click(vIndex) {
  if (vIndex == slider.current) return
  this.setSliderCurrent([index,vIndex])
}
</script>