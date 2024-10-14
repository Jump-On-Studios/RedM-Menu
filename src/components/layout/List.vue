<template>
  <div style="position:relative">
    <Scroller direction='top' :parent="listEl" :key=scrollTop />
    <ul ref="listEl" id="list-items" class="list" :style="setStyle()" @scroll="updateScroller()">
      <Item v-for="(item, index) in menuStore.cMenuItems" :key="`${menuStore.currentMenuId}-${index}`" :title="getTitle(item)" :icon="item.icon" :isCurrent="item.index == menuStore.cMenu.equipedItem.index" :item="item" :active="menuStore.cMenu.currentItem == index" :id=index />
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
import { onBeforeMount, onBeforeUnmount, inject, ref, nextTick } from 'vue';
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

function scrollToElementVertically(scroller, element) {
  if (scroller == undefined) return
  if (element == undefined) return
  const scrollerRect = scroller.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const scrollerScrollTop = scroller.scrollTop;
  const elementTop = elementRect.top - scrollerRect.top + scrollerScrollTop;
  const elementBottom = elementRect.bottom - scrollerRect.top + scrollerScrollTop;

  // Scroller vers le haut si l'élément est au-dessus de la zone visible de la div
  if (elementRect.top < scrollerRect.top) {
    scroller.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
  }
  // Scroller vers le bas si l'élément est en dessous de la zone visible de la div
  else if (elementRect.bottom > scrollerRect.bottom) {
    scroller.scrollTo({
      top: elementBottom - scrollerRect.height,
      behavior: 'smooth'
    });
  }
}
function updateScroll() {
  nextTick(() => {
    const scroller = document.querySelector('#list-items');
    const currentItem = document.getElementById('item-' + menuStore.cMenu.currentItem)
    scrollToElementVertically(scroller, currentItem)
    currentItem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
  })

}
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
    return false
  } else {
    menuStore.menuDown()
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

menuStore.$subscribe(() => {
  updateScroll()
})
</script>
