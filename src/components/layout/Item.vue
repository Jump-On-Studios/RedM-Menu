<template>
  <li v-if="props.item" :id="`item-${props.id}`" :class="['item','clicker',{'with-icon':props.icon,'disabled':props.item.disabled,'active':props.active}]" @click="click()">
    <div :class="[{'bw opacity50':props.item.disabled},'image', props.item.iconClass]" v-if="props.icon">
      <img :src="`./assets/images/icons/${props.icon}.png`" />
    </div>
    <div class="current" v-if="props.isCurrent">
      <div class="tick">
        <img src="/assets/images/menu/tick.png">
      </div>
    </div>
    <div class="current" v-if="props.item.iconRight">
      <div class="tick" v-if="props.item.iconRight == 'tick'">
        <img src="/assets/images/menu/tick.png">
      </div>
    </div>
    <h3>
      <div v-if="props.item.prefix" :class="['prefix',{'bw opacity50':props.item.disabled}]">
        <img :class="props.item.prefix" :src="`./assets/images/icons/${props.item.prefix}.png`" />
      </div>
      <span class="title" v-html="props.item.title"></span>
      <template v-if="!props.item.disabled">
        <template v-for="(slider, index) in props.item.sliders" :key="index">
          <template v-if="slider.type == 'switch' && slider.values.length > 1">
            <Switch :slider="slider" :index="index" :isCurrent="props.item.index == menuStore.cItem.index" />
          </template>
        </template>
      </template>
      <PalettePreview v-if="props.item.previewPalette && hasPaletteSlider()" :sliders="props.item.sliders" />
      <div class="priceRight" v-if="!props.item.iconRight && !props.isCurrent">
        <PriceDisplay :price="(props.item.priceRight && (menuStore.cMenu.cItem == props.item))?0:item.priceRight" />
      </div>
      <div class="textRight" v-if="props.item.textRight">
        <template v-if="props.item.translateTextRight">
          {{ lang(props.item.textRight) }}
        </template>
        <template v-else>
          {{ props.item.textRight }}
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
  id: Number
})

function click() {
  if (menuStore.cMenu.currentItem == props.item.id) {
    menuStore.menuEnter()
  } else {
    menuStore.setCurrentItem(props.item.id)
  }
  API.PlayAudio('button')
}
function hasPaletteSlider() {
  let needPreview = false
  for (let index = 0; index < props.item.sliders.length; index++) {
    const slider = props.item.sliders[index];
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
