<template>
  <div class="colorPicker" v-if="!cItem.disabled && cItem.slider && cItem.sliderType == 'palette'">
    <h2>{{ lang(cItem.slider.title) }}</h2>
    <div class="arrows">
      <div class="arrow left clicker" @click="sliderLeft()"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right clicker" @click="sliderRight()"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <input type="range" min=0 :max="cItem.slider.max" class="palette" :style="background()" :value="cItem.slider.current" @input='change'/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      x: 10,
      y: 10
    }
  },
  computed: {
    ...mapGetters(['lang','cItem'])
  },
  mounted() {
  },
  methods: {
    ...mapActions(['setSliderCurrent','sliderLeft','sliderRight','setSliderCurrent']),
    background() {
      return {backgroundImage:'url('+new URL(`../../assets/images/menu/${this.cItem.slider.tint}.png`, import.meta.url).href+')'}
    },
    numItem() {
      return this.$API.sprintf(this.lang('of'),this.cItem.slider.current+1, this.cItem.slider.max+1)
    },
    change(e) {
      let value = e.target.value
      e.target.blur()
      if (value == this.cItem.slider.current) return
      this.setSliderCurrent(parseInt(value))
    }
  },
}
</script>