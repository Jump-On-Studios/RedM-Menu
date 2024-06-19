<template>
  <div style="position:relative">
    <ul ref="listEl" id="list-items" class="list" :style="setStyle()">
      <Item v-for="(item,index) in menuStore.cMenuItems" :key="`${menuStore.currentMenuId}-${index}`"
        :title="getTitle(item)"
        :icon="item.icon"
        :isCurrent="item.index == menuStore.cMenu.equipedItem.index"
        :item="item"
        :active="menuStore.cMenu.currentItem == index"
        :id=index
      />
    </ul>
    <Selector />
  </div>
</template>

<script setup>
import Item from './Item.vue'
import Selector from './Selector.vue'

import { useMenuStore } from '../../stores/menus';
const menuStore = useMenuStore()
import { useLangStore } from '../../stores/lang';
import { onBeforeMount, onBeforeUnmount, nextTick, inject, watch, ref} from 'vue';
const lang = useLangStore().lang
const API = inject('API')

const listEl = ref(null)

function setStyle() {
  return {
    maxHeight: (menuStore.cMenu.numberOnScreen * 53) - 6 +'px'
  }
}
function estElementVisible(element) {
  var container = listEl.value; // Remplace cela par l'ID de ton conteneur avec défilement
  var elementRect = element.getBoundingClientRect();
  var containerRect = container.getBoundingClientRect();

  return (
    elementRect.top >= containerRect.top &&
    elementRect.bottom <= containerRect.bottom
  );
}
function updateScroll(isUp) {
  const currentItem = document.getElementById('item-'+menuStore.cMenu.currentItem)
  if (!estElementVisible(currentItem))
    currentItem.scrollIntoView(isUp)
}
function getTitle(item) {
  if (item.title.length > 0) {
    if (!item.translate) return item.title
    return lang(item.title)
  }
  return API.sprintf(lang('number'),item.index)
}
function handleKeydown(e) {
  switch(e.key) {
    case 'ArrowDown':
      menuStore.menuDown()
      updateScroll(false)
      return;
    case 'ArrowUp':
      menuStore.menuUp()
      updateScroll(true)
      return;
  }
  return;
}
function handleWheel(e) {
  if ((e.target.closest('.slider') != null) || (e.target.closest('.colorPicker') != null)) {
    if (e.deltaY < 0) {
      menuStore.sliderLeft()
    } else {
      menuStore.sliderRight()
    }
    return
  }
  if (e.deltaY < 0) {
    menuStore.menuUp()
    updateScroll(false)
  } else {
    menuStore.menuDown()
    updateScroll(true)
  }
}
onBeforeMount(() => {
  window.addEventListener('keydown', handleKeydown, null);
  window.addEventListener('wheel', handleWheel, null);
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('wheel', handleWheel);
})

let tempcMenuId = menuStore.currentMenuId
menuStore.$subscribe((mutation,state) => {
  if (state.currentMenuId != tempcMenuId) {
    nextTick(() => {
      updateScroll(true)
    });
    tempcMenuId = state.currentMenuId
  }
})
</script>
