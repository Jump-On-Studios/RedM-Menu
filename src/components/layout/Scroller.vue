<template>
  <div :class="['scroller',props.direction]">
    <div class="left"></div>
    <div :class="['center', {'active clicker':getActive()}]" @click="click()"></div>
    <div class="right"></div>
  </div>
  <div class="scounter hapna" v-if="props.direction=='bottom'">{{ numItem() }}</div>
</template>

<script setup>
import { inject } from 'vue';
import { useLangStore } from '../../stores/lang';
import { useMenuStore } from '../../stores/menus';

const props = defineProps(['direction'])

const lang = useLangStore().lang
const menuStore = useMenuStore()
const API = inject('API')

function getActive() {
  if (props.direction == 'top' && menuStore.cMenu.offset > 0) return true
  if (props.direction == "bottom") {
    let gap = 0
    for (let index = menuStore.cMenu.offset; index < menuStore.cMenuItems.length; index++) {
      if (menuStore.cMenuItems[index].icon) {
        gap += 2
      } else {
        gap++;
      }
      if (gap > menuStore.cMenu.numberOnScreen) return true
    }
  }
  return false
}
function click() {
  if (props.direction == "bottom") {
    menuStore.menuDown()
  } else {
    menuStore.menuUp()
  }
}
function numItem() {
  return API.sprintf(lang('of'),menuStore.cMenu.currentItem+1, menuStore.cMenuItems.length)
}
</script>