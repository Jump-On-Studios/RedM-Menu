<template>
  <li v-if="item" :id="'item-'+props.id" :class="['item','clicker',{'with-icon':props.icon,'disabled':item.disabled,'active':props.active}]" @click="click()">
    <div :class="[{'bw opacity50':item.disabled},'image', item.iconClass]" v-if="props.icon">
      <img :src="`./assets/images/icons/${props.icon}.png`" />
    </div>
    <div class="current" v-if="props.isCurrent">
      <div class="tick">
        <img src="/assets/images/menu/tick.png">
      </div>
    </div>
    <div class="current" v-if="item.iconRight">
      <div class="tick" v-if="item.iconRight == 'tick'">
        <img src="/assets/images/menu/tick.png">
      </div>
    </div>
    <h3>
      <div v-if="item.prefix" :class="['prefix',{'bw opacity50':item.disabled}]">
        <img :class="item.prefix" :src="`./assets/images/icons/${item.prefix}.png`" />
      </div>
      <span class="title" v-html="item.title"></span>
      <template v-if="!item.disabled">
        <template v-for="(slider, index) in item.sliders" :key="index">
          <template v-if="slider.type == 'switch' && slider.values.length > 1">
            <Switch :slider="slider" :index="index" :isCurrent="item == menuStore.cItem" />
          </template>
        </template>
      </template>
      <PalettePreview v-if="item.previewPalette && hasPaletteSlider()" :sliders="item.sliders" />
      <div class="priceRight" v-if="!item.iconRight && !props.isCurrent">
        <PriceDisplay :price="(item.priceRight && (menuStore.cMenu.cItem == item && isItemBought()))?0:item.priceRight" />
      </div>
      <div class="textRight" v-if="item.textRight">
        <template v-if="item.translateTextRight">
          {{ lang(item.textRight) }}
        </template>
        <template v-else>
          {{ item.textRight }}
        </template>
      </div>
    </h3>
    <div class="background"></div>
  </li>
</template>

<script setup>
import PriceDisplay from './PriceDisplay.vue'
import Switch from './sliders/Switch.vue'
import PalettePreview from "./PalettePreview.vue"
import { computed } from 'vue'
import { useMenuStore } from '../../stores/menus'
import { useLangStore } from '../../stores/lang'
import { inject } from 'vue'
const menuStore = useMenuStore()
const API = inject('API')
const lang = useLangStore().lang

const props = defineProps({
  icon : {
    default : false,
  },
  isCurrent : {
    default : false,
  },
  item : Object,
  active: {
    default : false,
    type: Boolean
  },
})

const item = props.item

function click() {
  if (menuStore.cMenu.currentItem == item.id) {
    menuStore.menuEnter()
  } else {
    menuStore.setCurrentItem({offset:menuStore.cMenu.offset,id:item.id})
  }
  API.PlayAudio('button')
}
function hasPaletteSlider() {
  let needPreview = false
  for (let index = 0; index < item.sliders.length; index++) {
    const slider = item.sliders[index];
    if (slider.type == "switch" && slider.values.length > 1)
      return false
    if (slider.type == "palette") {
      needPreview = true
      break
    }
  }
  return needPreview
}
</script>
