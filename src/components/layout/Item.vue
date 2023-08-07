<template>
  <li :class="['item','clicker',{'with-icon':icon,'disabled':item.disabled}]" @click="click()">
    <div :class="[{'bw opacity50':item.disabled},'image', item.iconClass]" v-if="icon">
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
    <div class="current" v-if="item.iconRight">
      <div class="tick" v-if="item.iconRight == 'tick'">
        <img src="@/assets/images/menu/tick.png">
      </div>
    </div>
    <h3>
      <div class="prefix" v-if="item.prefix" :class="[{'bw':item.disabled}]">
        <img :class="item.prefix" :src="getImage(item.prefix)" />
      </div>
      <span v-html="getTitle()"></span>
      <div class="sufix" v-if="!item.disabled && item.slider && item.sliderType == 'switch' && item.slider.values.length > 1">
        <div class="arrows" @click.stop="">
          <div class="arrow left clicker" @click="sliderLeft()" v-if="this.cItem == this.item"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
          <div class="text hapna">{{ getSufixLabel()}}</div>
          <div class="arrow right clicker" @click="sliderRight()" v-if="this.cItem == this.item"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
        </div>
      </div>
    </h3>
    <div class="background"></div>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['currentMenu','equipedItems','colors','cItem','displayOutfitId','menu','lang','audios'])
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
    getSufixLabel() {
      return this.lang(this.item.slider.values[this.item.slider.current -1].label)
    },
    click() {
      this.$API.setCurrentItem({offset:this.menu.offset,id:this.item.id})
      if (this.item.child) {
        this.menuEnter()
      } else {
        this.$API.PlayAudio(this.audios.button)
      }
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
    item : Object
  }
}
</script>
