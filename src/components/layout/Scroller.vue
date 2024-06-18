<template>
  <div :class="['scroller',direction]">
    <div class="left"></div>
    <div :class="['center', {'active clicker':getActive()}]" @click="click()"></div>
    <div class="right"></div>
  </div>
  <div class="scounter hapna" v-if="direction=='bottom'">{{ numItem() }}</div>
</template>

<script setup>
import { computed } from 'vue';
import { useLangStore } from '../../stores/lang';
import { useMenuStore } from '../../stores/menus';

const lang = useLangStore().lang
const menuStore = useMenuStore()
const API = inject('API')

const menuItems = computed(() => menuStore.menuItems)
const menu = computed(() => menuStore.cMenu)
const menuDown = computed(() => menuStore.menuDown)
const menuUp = computed(() => menuStore.menuUp)
const direction = computed(() => props.direction)

function getActive() {
  if (direction == 'top' && menu.offset > 0) return true
  if (direction == "bottom") {
    let gap = 0
    for (let index = menu.offset; index < menuItems.length; index++) {
      if (menuItems[index].icon) {
        gap += 2
      } else {
        gap++;
      }
      if (gap > menu.numberOnScreen) return true
    }
  }
  return false
}
function click() {
  if (direction == "bottom") {
    menuDown()
  } else {
    menuUp()
  }
}
function numItem() {
  return API.sprintf(lang('of'),menu.currentItem+1, menuItems.length)
}
</script>