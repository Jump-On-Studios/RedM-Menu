<template>
  <div class="colorPicker">
    <h2>{{ lang(slider.title) }}</h2>
    <div class="arrows">
      <div class="arrow left clicker" @click="sliderLeft(index)"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right clicker" @click="sliderRight(index)"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <input type="range" min=0 :max="slider.max" class="palette" :style="background()" :value="slider.current" @input='change'/>
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
  methods: {
    ...mapActions(['setSliderCurrent','sliderLeft','sliderRight','setSliderCurrent']),
    background() {
      return {backgroundImage:'url('+new URL(`../../../assets/images/menu/${this.slider.tint}.png`, import.meta.url).href+')'}
    },
    numItem() {
      return this.$API.sprintf(this.lang('of'),this.slider.current+1, this.slider.max+1)
    },
    change(e) {
      let value = e.target.value
      e.target.blur()
      if (value == this.slider.current) return
      this.setSliderCurrent([this.index,parseInt(value)])
    }
  },
  props: {
    index: Number,
    slider: Object
  }
}
</script>