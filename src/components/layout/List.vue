<template>
  <div style="position:relative">
    <Scroller direction='top' :parent="listEl" :key=scrollTop />
    <ul ref="listEl" id="list-items" class="list" :style="setStyle()" @scroll="updateScroller()">
      <Item v-for="(item, index) in menuStore.cMenuItems" :key="`${item.refreshKey}`" :title="getTitle(item)" :icon="item.icon" :isCurrent="item.index == menuStore.cMenu.equipedItem.index" :item="item" :active="menuStore.cMenu.currentItem == index" :id=index />
    </ul>
    <Scroller direction='bottom' :parent="listEl" :key=scrollTop />
  </div>
</template>

<script setup>
import Item from './Item.vue'
import Scroller from './Scroller.vue'
import { useMenuStore } from '../../stores/menus';
const menuStore = useMenuStore()
import { useLangStore } from '../../stores/lang';
import { onBeforeMount, onBeforeUnmount, inject, ref, onUpdated } from 'vue';
const lang = useLangStore().lang
const API = inject('API')

const listEl = ref({})
const scrollTop = ref(0)

function updateScroller() {
  scrollTop.value = listEl.value.scrollTop
}

function setStyle() {
  return {
    maxHeight: (menuStore.cMenu.numberOnScreen * 4.9) + 0.3 + 'vh'
  }
}

let previousMenu = ''
let previousItem = ''
onUpdated(() => {
  if (previousItem == menuStore.cMenu.currentItem && previousMenu == menuStore.currentMenuId)
    return
  const currentItem = document.getElementById('item-' + menuStore.cMenu.currentItem)
  if (!currentItem) return
  let firstScroll = previousMenu != menuStore.currentMenuId
  previousMenu = menuStore.currentMenuId
  previousItem = menuStore.cMenu.currentItem
  currentItem.scrollIntoView({ behavior: firstScroll ? 'instant' : 'instant', block: "nearest" })
})

function getTitle(item) {
  if (item.title.length > 0) {
    if (!item.translate) return item.title
    return lang(item.title)
  }
  return API.sprintf(lang('number'), item.index)
}
function handleKeydown(e) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      menuStore.menuDown()
      return;
    case 'ArrowUp':
      e.preventDefault()
      menuStore.menuUp()
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
    // e.preventDefault()
    return false
  } else {
    menuStore.menuDown()
    // e.preventDefault()
    return false
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

</script>
