<template>
  <li :class="['item',{'with-icon':icon}]">
    <div :class="['image', item.iconClass]" v-if="icon">
      <img :src="getImage(icon)" />
    </div>
    <div class="current" v-if="isCurrent">
      <div class="color" v-if="item.colors">
        <img :src="getColorImage()">
      </div>
      <div class="tick">
        <img src="@/assets/images/menu/tick.png">
      </div>
    </div>
    <h3>
      <div class="prefix" v-if="item.prefix">
        <img :class="item.prefix" :src="getImage(item.prefix)" />
      </div>
      <span v-html="getTitle()"></span>
      <div class="sufix" v-if="item.slider && item.sliderType == 'switch' && item.slider.values.length > 1">
        <div class="arrows">
          <div class="arrow left" v-if="this.cItem == this.item"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
          <div class="text hapna">{{ getSufixLabel()}}</div>
          <div class="arrow right" v-if="this.cItem == this.item"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
        </div>
      </div>
    </h3>
    <div class="background"></div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['currentMenu','equipedItems','colors','cItem','displayOutfitId','menu','lang'])
  },
  methods : {
    getImage(image) {
      return new URL(`../../assets/images/icons/${image}.png`, import.meta.url).href;
    },
    getColorImage() {
      let color = this.item.colors.values[this.menu.equipedColor].texture.toLowerCase()
      return new URL(`../../assets/images/tints/${color}.png`, import.meta.url).href;
    },
    getTitle() {
      if (this.displayOutfitId && this.currentMenu == "outfit" && this.index > 0) {
        return this.title + ' ('+this.index+')'
      }
      return this.title
    },
    getSufixLabel() {
      return this.lang(this.item.slider.values[this.item.slider.current -1].label)
    }
  },
  props : {
    title : {
      default : 'Title',
      type: String,
    },
    index: Number,
    icon : {
      default : false,
    },
    isCurrent : {
      default : false,
    },
    item : Object
  }
}
</script>
