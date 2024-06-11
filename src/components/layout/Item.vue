<template>
  <li v-if="item" :id="'item-'+id" :class="['item','clicker',{'with-icon':icon,'disabled':item.disabled,'active':active}]" @click="click()">
    <div :class="[{'bw opacity50':item.disabled},'image', item.iconClass]" v-if="icon">
      <img :src="getImage(icon)" />
    </div>
    <div class="current" v-if="isCurrent">
      <div class="color" v-if="item.colors">
        <ColorPicture :color="item.colors.values[item.colors.current]" />
      </div>
      <div class="tick">
        <img src="@/assets/images/menu/tick.png">
      </div>
    </div>
    <div class="current" v-if="item.iconRight">
      <div class="tick" v-if="item.iconRight == 'tick'">
        <img src="@/assets/images/menu/tick.png">
      </div>
    </div>
    <h3>
      <div v-if="item.prefix" :class="['prefix',{'bw opacity50':item.disabled}]">
        <img :class="item.prefix" :src="getImage(item.prefix)" />
      </div>
      <span class="title" v-html="getTitle()"></span>
      <template v-if="!item.disabled">
        <template v-for="(slider, index) in item.sliders" :key="index">
          <template v-if="slider.type == 'switch' && slider.values.length > 1">
            <Switch :slider="slider" :index="index" :isCurrent="item == cItem" />
          </template>
        </template>
      </template>
      <PalettePreview v-if="item.previewPalette && hasPaletteSlider()" :sliders="item.sliders" />
      <div class="priceRight" v-if="!item.iconRight && !isCurrent">
        <PriceDisplay :price="(item.priceRight && (cItem == item && isItemBought()))?0:item.priceRight" />
      </div>
      <div class="textRight" v-if="item.textRight">
        <template v-if="item.translateTextRight">
          {{ lang(item.textRight) }}
        </template>
        <template v-else>
          {{ item.textRight }}
        </template>
      </div>
      <div class="textRight" v-if="item.colors?.displayRight">
        <ColorPicture :color="item.colors.values[item.colors.current]" />
      </div>
    </h3>
    <div class="background"></div>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PriceDisplay from './PriceDisplay.vue'
import Switch from './sliders/Switch.vue'
import ColorPicture from "./ColorPicture.vue"
import PalettePreview from "./PalettePreview.vue"

export default {
  components: {
    PriceDisplay,Switch,ColorPicture,PalettePreview
  },
  computed: {
    ...mapGetters(['currentMenu','equipedItems','colors','cItem','displayOutfitId','menu','lang','audios','isItemBought'])
  },
  methods : {
    ...mapActions(['menuEnter','sliderRight', 'sliderLeft']),
    getImage(image) {
      return new URL(`../../assets/images/icons/${image}.png`, import.meta.url).href;
    },
    getColorImage() {
      let color = this.item.colors.values[this.menu.equipedColor].texture.toLowerCase()
      return new URL(`../../assets/images/tints/${color}.png`, import.meta.url).href;
    },
    getTitle() {
      if (this.displayOutfitId && this.currentMenu == "outfit" && this.item.index != 0) {
        return this.title + ' ('+this.item.index+')'
      }
      return this.title
    },
    click() {
      if (this.menu.currentItem == this.item.id) {
        this.menuEnter()
      } else {
        this.$API.setCurrentItem({offset:this.menu.offset,id:this.item.id})
      }
      this.$API.PlayAudio(this.audios.button)
    },
    hasPaletteSlider() {
      let needPreview = false
      for (let index = 0; index < this.item.sliders.length; index++) {
        const slider = this.item.sliders[index];
        if (slider.type == "switch" && slider.values.length > 1)
          return false
        if (slider.type == "palette") {
          needPreview = true
          break
        }
      }
      return needPreview
    }
  },
  props : {
    title : {
      default : 'Title',
      type: String,
    },
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
  }
}
</script>
