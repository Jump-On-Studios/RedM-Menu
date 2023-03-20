<template>
  <div class="slider color" v-if="cItem.color">
    <h2>{{ lang('color') }}</h2>
    <div class="arrows">
      <div class="arrow left"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <div class="color-boxes">
      <div v-for="(color,index) in colorsDisplayed()"
        :key="index"
        :class="['box',{'current' : this.menu.offsetColor + index == menu.currentColor}]">
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
      if (this.currentMenu == "fhairAccessories")
        return this.$API.sprintf(this.lang('of'),this.menu.currentColor+1, 10)
      if (this.currentMenu == "feyeShadow")
        return this.$API.sprintf(this.lang('of'),this.menu.currentColor+1, 4)
      if (this.currentMenu == "flipstick")
        return this.$API.sprintf(this.lang('of'),this.menu.currentColor+1, 4)
      return this.$API.sprintf(this.lang('of'),this.menu.currentColor+1, 17)
    },
    getImage(color) {
      color = color.toLowerCase();
      return new URL(`../../assets/images/tints/${color}.png`, import.meta.url).href;
    },
    colorsDisplayed() {
      var list = new Array();
      if (this.currentMenu == "feyeShadow") {
        switch (this.menu.currentItem) {
          case 1:
            return ['metal_swatch_red','metal_swatch_blue','component_longarm_wrap_tint_e_1','bowstring_tint_row_32']
          case 2:
            return ['metal_swatch_red','metal_swatch_blue','component_longarm_wrap_tint_e_1','bowstring_tint_row_32']
          case 3:
            return ['component_longarm_wrap_tint_e_3','wrap_tint_swatch_34','component_longarm_wrap_tint_e_2','component_longarm_wrap_tint_e_7']
          case 4:
            return ['component_longarm_wrap_tint_e_3','bowstring_tint_row_60','metal_swatch_copper','component_longarm_wrap_tint_e_8']
          case 5:
            return ['metal_swatch_copper','wrap_tint_swatch_26','wrap_tint_swatch_19','wrap_tint_swatch_20']
          case 6:
            return ['metal_swatch_copper','varnish_wood_tint_row_25','component_longarm_wrap_tint_e_1','wrap_tint_swatch_19']
        }
      } else if (this.currentMenu == "flipstick") {
        switch (this.menu.currentItem) {
          case 1:
            return ['metal_swatch_red','metal_swatch_copper','component_longarm_wrap_tint_e_1','varnish_wood_tint_row_33']
          case 2:
            return ['metal_swatch_red','metal_swatch_blue','component_longarm_wrap_tint_e_1','bowstring_tint_row_60']
          case 3:
            return ['metal_swatch_red','varnish_wood_tint_row_37','hairaccessories_3_9','wrap_tint_swatch_29']
          case 4:
            return ['metal_swatch_red','metal_swatch_copper','component_longarm_wrap_tint_e_1','varnish_wood_tint_row_33']
        }
      } else if (this.currentMenu == "fhairAccessories") {
        for (let index = this.menu.offsetColor; index <= this.menu.offsetColor + 8; index++) {
          list.push(`hairaccessories_${this.menu.currentItem}_${index+1}`)
          if (index >= 10) break
        }
      } else {
        for (let index = this.menu.offsetColor; index <= this.menu.offsetColor + 8; index++) {
          list.push(this.colors[index])
        }
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
      if (this.cItem.color) {
        switch(e.key) {
          case 'ArrowRight':
            this.colorRight()
            return;
          case 'ArrowLeft':
            this.colorLeft()
            return;
        }
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