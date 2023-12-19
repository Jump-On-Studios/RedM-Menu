<template>
  <div class="slider color" v-if="!cItem.disabled && cItem.colors">
    <h2>{{ lang(cItem.colors.title) }}</h2>
    <div class="arrows">
      <div class="arrow left" @click="colorLeft()"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right" @click="colorRight()"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <div class="color-boxes">
      <div v-for="(color,index) in colorsDisplayed()"
        :key="index"
        :class="['box',{'current' : cItem.colors.offset + index == cItem.colors.current}]"
        @click="click(cItem.colors.offset + index)"
      >
        <ColorPicture :color="color" />
        <div class="tick" v-if="cItem.colors.displayTick && isCurrentColor(index)">
          <img src="@/assets/images/menu/tick.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ColorPicture from './ColorPicture.vue'

export default {
  components: {
    ColorPicture
  },
  computed: {
    ...mapGetters(['menu','cItem','lang', 'colors','currentMenu','equipedItems'])
  },
  methods: {
    ...mapActions(['colorLeft','colorRight','setColorCurrent']),
    numItem() {
      return this.$API.sprintf(this.lang('of'),this.cItem.colors.current+1, this.cItem.colors.values.length)
    },
    getImage(color) {
      color = color.texture.toLowerCase();
      return new URL(`../../assets/images/tints/${color}.png`, import.meta.url).href;
    },
    colorsDisplayed() {
      var list = new Array();
      for (let index = this.cItem.colors.offset; index < this.cItem.colors.values.length; index++) {
        if (index > this.cItem.colors.offset + 8) break
        list.push(this.cItem.colors.values[index])
      }
      return list;
    },
    isCurrentColor(index) {
      return this.cItem.colors.offset + index == this.menu.equipedColor
    },
    handleKeydown(e) {
      if (!this.cItem.colors) return
      if (this.cItem.disabled) return
      switch(e.key) {
        case 'ArrowRight':
          this.colorRight()
          return;
        case 'ArrowLeft':
          this.colorLeft()
          return;
      }
      return;
    },
    click(index) {
      if (index == this.cItem.colors.current) return
      this.setColorCurrent(index)
    },
    getStyleTint(color,index) {
      console.log(color)
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
      console.log(index,left)
      let url = new URL(`../../assets/images/menu/${color.palette}.png`, import.meta.url).href;
      return {
        backgroundImage: "url("+url+")",
        backgroundPosition: left + "px 0px"
      }
    }
  },
  beforeMount () {
  	window.addEventListener('keydown', this.handleKeydown, null);
  },
  beforeUnmount () {
  	window.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>