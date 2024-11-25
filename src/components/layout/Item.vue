<template>
  <li v-if="item" :id="`item-${id}`" :class="['item', 'clicker', { 'with-icon': icon, 'disabled': item.disabled, 'active': active }]" @click="click()">
    <div :class="[{ 'bw opacity50': item.disabled }, 'image', item.iconClass]" v-if="icon">
      <img :src="getImage(item.icon)" />
    </div>
    <div class="current" v-if="isCurrent">
      <div class="tick">
        <img src="/assets/images/menu/tick.png">
      </div>
    </div>
    <div class="current" v-if="item.iconRight">
      <div class="tick">
        <img :src="getImage(item.iconRight)">
      </div>
    </div>
    <h3>
      <div v-if="item.prefix" :class="['prefix', { 'bw opacity50': item.disabled }]">
        <img :class="item.prefix" :src="getImage(item.prefix)" />
      </div>
      <div class="title">
        <span class="main" v-html="item.title"></span>
        <span class="subtitle hapna" v-if="item.subtitle.length > 0" v-html="item.subtitle"></span>
      </div>
      <template v-if="!item.disabled">
        <template v-for="(slider, index) in item.sliders" :key="index">
          <template v-if="slider.type == 'switch' && slider.values.length > 1">
            <Switch :slider="slider" :index="index" :isCurrent="item.index == menuStore.cItem.index" />
          </template>
        </template>
      </template>
      <PreviewSlider :item="item" />
      <div class="priceRight" v-if="!item.iconRight && !isCurrent">
        <PriceDisplay :price="(item.priceRight && (menuStore.cMenu.cItem == item)) ? 0 : item.priceRight" />
      </div>
      <div :class="['textRight', item.textRightClass]" v-if="item.textRight">
        <span v-if="item.translateTextRight" v-html="lang(item.textRight)">
        </span>
        <span v-else v-html="item.textRight">
        </span>
      </div>
    </h3>
    <div class="background"></div>
  </li>
</template>

<script setup>
import PriceDisplay from './PriceDisplay.vue'
import Switch from './sliders/Switch.vue'
import PreviewSlider from './PreviewSlider.vue'
import { useMenuStore } from '../../stores/menus'
import { useLangStore } from '../../stores/lang'
import { inject } from 'vue'
const menuStore = useMenuStore()
const API = inject('API')
const lang = useLangStore().lang

const { icon, isCurrent, item, active, id } = defineProps({
  icon: {
    default: false,
  },
  isCurrent: {
    default: false,
  },
  item: Object,
  active: {
    default: false,
    type: Boolean
  },
  id: Number
})

function click() {
  if (menuStore.cMenu.currentItem == item.id) {
    menuStore.menuEnter()
  } else {
    menuStore.setCurrentItem(item.id)
  }
  API.PlayAudio('button')
}




function isNUIImage(url) {
  return url.includes('://')
}

function getImage(url) {
  if (isNUIImage(url))
    return url
  return `./assets/images/icons/${url}.png`
}
</script>

<style scoped lang="scss">
.title {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .main {
    width: 100%;
  }
}

.textRight {
  &.tiny {
    font-size: 0.715em;
    font-family: 'Hapna';
    font-weight: 500;
  }
}
</style>
