<template>
  <div class="slider color" v-if="cItem.colors">
    <h2>{{ lang(cItem.colors.title) }}</h2>
    <div class="arrows">
      <div class="arrow left"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <div class="color-boxes">
      <div v-for="(color,index) in colorsDisplayed()"
        :key="index"
        :class="['box',{'current' : cItem.colors.offset + index == cItem.colors.current}]">
        <img :src="getImage(color)" />
        <div class="tick" v-if="isCurrentColor(index)">
          <img src="@/assets/images/menu/tick.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['menu','cItem','lang', 'colors','currentMenu','equipedItems'])
  },
  methods: {
    ...mapActions(['colorLeft','colorRight']),
    numItem() {
      return this.$API.sprintf(this.lang('of'),this.cItem.colors.current+1, this.cItem.colors.values.length)
    },
    getImage(color) {
      console.log(color)
      color = color.texture.toLowerCase();
      return new URL(`../../assets/images/tints/${color}.png`, import.meta.url).href;
    },
    colorsDisplayed() {
      var list = new Array();
      for (let index = this.cItem.colors.offset; index < this.cItem.colors.values.length; index++) {
        list.push(this.cItem.colors.values[index])
        if (index > this.cItem.colors.offset + 8) break
      }
      return list;
    },
    isCurrentColor(index) {
      if (this.currentMenu == "mhair" || this.currentMenu == 'fhair') {
        return this.menu.offsetColor + index == this.equipedItems.hairColor
      } else if (this.currentMenu == 'mfacialhair') {
        return this.menu.offsetColor + index == this.equipedItems.beardColor
      }
      return false
    },
    handleKeydown(e) {
      if (!this.cItem.colors) return

      switch(e.key) {
        case 'ArrowRight':
        console.log('right')
          this.colorRight()
          return;
        case 'ArrowLeft':
          this.colorLeft()
          return;
      }
      return;
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