<template>
  <div style="position:relative">
    <ul id="list-items" class="list" :style="setStyle()">
      <Item v-for="(item,index) in menuItems" :key=index
        :title="getTitle(item)"
        :icon="item.icon"
        :isCurrent="item.index == menu.equipedItem.index"
        :item="item"
        :active="menu.currentItem == index"
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
import { onBeforeMount, onBeforeUnmount, nextTick} from 'vue';
const lang = useLangStore().lang
const API = inject('API')

const menu = computed(() => menuStore.menu)
const currentMenu = computed(() => menuStore.currentMenu)
const menuItems = computed(() => menuStore.menuItems)
const menuDown = computed(() => menuStore.menuDown)
const menuUp = computed(() => menuStore.menuUp)
const sliderLeft = computed(() => menuStore.sliderLeft)
const sliderRight = computed(() => menuStore.sliderRight)

function setStyle() {
  return {
    maxHeight: (menu.numberOnScreen * 53) - 6 +'px'
  }
}
function estElementVisible(element) {
  var container = document.getElementById("list-items"); // Remplace cela par l'ID de ton conteneur avec défilement
  var elementRect = element.getBoundingClientRect();
  var containerRect = container.getBoundingClientRect();

  return (
    elementRect.top >= containerRect.top &&
    elementRect.bottom <= containerRect.bottom
  );
}
function updateScroll(isUp) {
  const currentItem = document.getElementById('item-'+menu.currentItem)
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
function items() {
  let max = menu.numberOnScreen;
  let itemDisplayed = [];
  for (let index = menu.offset; index < menuItems.length; index++) {
    if (menuItems[index].icon) {
      max -=2
    } else {
      max--
    }
    itemDisplayed.push(menuItems[index])
    if (max <= 0) break;
  }
  return itemDisplayed;
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
  if (e.target.closest('.slider.color') != null) {
    if (e.deltaY < 0) {
      colorLeft()
    } else {
      colorRight()
    }
    return
  }
  else if ((e.target.closest('.slider') != null) || (e.target.closest('.colorPicker') != null)) {
    if (e.deltaY < 0) {
      sliderLeft()
    } else {
      sliderRight()
    }
    return
  }
  if (e.deltaY < 0) {
    menuUp()
    updateScroll(false)
  } else {
    menuDown()
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
watch: {
  currentMenu: function() {
    nextTick(() => {
      updateScroll(true)
    });
  }
}
</script>
