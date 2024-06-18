<template>
  <div :class="['selector',{'with-icon' : haveIcon()}]" :style="getTop()">
  </div>
</template>

<script setup>
import { useMenuStore } from '../../stores/menus';

const menuStore = useMenuStore()

const menuItems = computed(() => menuStore.menuItems)
const cItem = computed(() => menuStore.cItem)
const menu = computed(() => menuStore.cMenu)
const currentMenu = computed(() => menuStore.currentMenu)

function haveIcon() {
  return cItem.icon
},
function getTop() {
  let top = 0;
  const active = document.getElementsByClassName('item active')[0];
  if (active) {
    const container = document.getElementById('list-items')
    top = active.getBoundingClientRect().top - container.getBoundingClientRect().top 
  } else {
  }
  return {
      top: top + "px"
  }
}
</script>
