<template>
  <main>
    <div class="article">
      <h2 id="title">
        {{ getTitle() }}
        <span v-if="menuStore.parentTree.length > 0" class="backer clicker" @click="menuStore.menuBack()">
          <img src="/assets/images/menu/selection_arrow_left.png">
        </span>
      </h2>
      <template v-if="menuStore.cMenuItems.length > 0">
        <Scroller
          direction = 'top'
        />
        <List />
        <Scroller
          direction = 'bottom'
        />
      </template>
    </div>
    <template v-if="menuStore.cMenuItems.length == 0 & menuStore.cMenu.type == 'list'">
      <Loading />
    </template>
    <div class="footer">
      <template v-if="menuStore.cMenuItems.length > 0">
        <Description />
        <Slider />
      </template>
      <Price />
    </div>
    
  </main>
</template>

<script setup>
import Scroller from './Scroller.vue'
import List from './List.vue'
import Slider from './Slider.vue'
import Price from './Price.vue'
import Description from './Description.vue'
import Loading from './Loading.vue'
import { useDataStore } from '../../stores/datas'
import { useMenuStore } from '../../stores/menus'
import { useLangStore } from '../../stores/lang'
import { inject, computed, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
const datas = useDataStore()
const menuStore = useMenuStore()
const lang = useLangStore().lang
const API = inject('API')

const keyPressed = {}
let focus = false
let mountedDate = 0

function handleKeyUp(e) {
  keyPressed[e.key] = false
}
function handleKeydown(e) {
  if (e.code == "KeyQ")
    datas.defineQwerty(e.key == "q")
  if (focus) return
  if (keyPressed[e.key]) return
  
  keyPressed[e.key] = true
  if (Date.now()-mountedDate < 100) return
  switch(e.key) {
    case 'Enter':
      menuStore.menuEnter()
      return
    case 'Backspace':
       menuStore.menuBack()
      return
    case 'Escape':
       menuStore.menuBack()
      return
  }
}
function focusIn() {
  focus = true
}
function focusOut() {
  focus = false
}
function getTitle() {
  if (menuStore.cMenu.translateSubTitle) {
    return lang(menuStore.cMenu.subTitle)
  }
  return menuStore.cMenu.subTitle
}
onBeforeMount(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyUp);
  document.addEventListener('focusin', focusIn);
  document.addEventListener('focusout', focusOut);
})
onMounted(() => {
  mountedDate = Date.now();
  API.PlayAudio('menu_open');
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('keyup', handleKeyUp);
  document.removeEventListener('focusin', focusIn);
  document.removeEventListener('focusout', focusOut);
  API.PlayAudio('menu_close');
})
</script>