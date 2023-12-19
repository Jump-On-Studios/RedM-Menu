<template>
  <template v-if="color.texture">
    <img :src="getImage()" />
  </template>
  <template v-if="color.custom">
    <div class="colorCustom" ref="boxParent">
      <div class="tint0" ref="tint0" :style="getStyleTint(0)"></div>
      <div class="tint1" ref="tint1" :style="getStyleTint(1)"></div>
      <div class="tint2" ref="tint2" :style="getStyleTint(2)"></div>
      <div class="border"></div>
    </div>
  </template>
</template>



<script>
import { nextTick } from 'vue';
export default {
  methods: {
    getImage() {
      let color = this.color.texture.toLowerCase();
      return new URL(`../../assets/images/tints/${color}.png`, import.meta.url).href;
    },
    getStyleTint(index) {
      nextTick(() => {
        let url = new URL(`../../assets/images/menu/${this.color.palette}.png`, import.meta.url).href;
        let left = this.color['tint'+index]
        let height = -1*this.$refs['tint'+index].getBoundingClientRect().height
        console.log(left,height)
        left *= height
        this.$refs["tint"+index].style.backgroundImage = "url("+url+")"
        this.$refs["tint"+index].style.backgroundPosition =  left + "px 0px"
      })
    }
  },
  props: {
    color: Object
  }
}
</script>