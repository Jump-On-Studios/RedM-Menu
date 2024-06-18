<template>
  <div class="slider color" v-if="!cItem.disabled && cItem.colors">
    <h2>{{ lang(cItem.colors.title) }}</h2>
    <div class="arrows">
      <div class="arrow left" @click="colorLeft()"><img src="/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right" @click="colorRight()"><img src="/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <div class="color-boxes">
      <div v-for="(color,index) in colorsDisplayed()"
        :key="index"
        :class="['box',{'current' : cItem.colors.offset + index == cItem.colors.current}]"
        @click="click(cItem.colors.offset + index)"
      >
        <ColorPicture :color="color" />
        <div class="tick" v-if="cItem.colors.displayTick && isCurrentColor(index)">
          <img src="/assets/images/menu/tick.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import ColorPicture from './ColorPicture.vue'
  import { useLangStore } from '../../stores/lang';
import { onBeforeMount, onBeforeUnmount, computed } from 'vue';

  const store = useStore()

  const lang = useLangStore().lang
  const menu = computed(() => store.getters.menu)
  const cItem = computed(() => store.getters.cItem)
  const currentMenu = computed(() => store.getters.currentMenu)
  const equipedItems = computed(() => store.getters.equipedItems)

  const colorLeft = computed(() => store.actions.colorLeft)
  const colorRight = computed(() => store.actions.colorRight)
  const setColorCurrent = computed(() => store.actions.setColorCurrent)

  function numItem() {
    return $API.sprintf(lang('of'),cItem.colors.current+1, cItem.colors.values.length)
  }

  function colorsDisplayed() {
    var list = new Array();
    for (let index = cItem.colors.offset; index < cItem.colors.values.length; index++) {
      if (index > cItem.colors.offset + 8) break
      list.push(cItem.colors.values[index])
    }
    return list;
  }
  function isCurrentColor(index) {
    return cItem.colors.offset + index == menu.equipedColor
  }
  function handleKeydown(e) {
    if (!cItem.colors) return
    if (cItem.disabled) return
    switch(e.key) {
      case 'ArrowRight':
        colorRight()
        return;
      case 'ArrowLeft':
        colorLeft()
        return;
    }
    return;
  }
  function click(index) {
    if (index == cItem.colors.current) return
    setColorCurrent(index)
  }
  function getStyleTint(color,index) {
    let left = color['tint'+index]-1
    switch (index) {
      case 0:
        left *= -37
        break;
      case 1:
        left *= -22
        break;
      case 2:
        left *= -11
        break;
    }
    let url = `./assets/images/menu/${color.palette}.png`
    return {
      backgroundImage: "url("+url+")",
      backgroundPosition: left + "px 0px"
    }
  }
  onBeforeMount(() => {
  	window.addEventListener('keydown', handleKeydown, null);
  })
  onBeforeUnmount(() => {
  	window.removeEventListener('keydown', handleKeydown);
  })
</script>