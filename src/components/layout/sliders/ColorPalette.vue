<template>
  <div class="colorPicker">
    <h2>{{ getTitle() }}</h2>
    <div class="arrows">
      <div class="arrow left clicker" @click="sliderLeft(index)"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right clicker" @click="sliderRight(index)"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <div class="colorSlider">
      <div :class="['keyHelpers','index-'+index]" v-if="cItem.sliders.length > 1">
        <div :class="['left',{'qwerty':isQwerty && index==1}]" ref="keyLeft">
          {{ leftKey() }}
        </div>
        <div class="right" ref="keyRight">
          {{ rightKey() }}
        </div>
      </div>
      <input
        type="range"
        min=0
        :max="slider.max"
        :class="['palette','max-'+slider.max]"
        :style="background()"
        :value="slider.current" 
        @input="change"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      isMounted: false
    }
  },
  computed: {
    ...mapGetters(['lang','cItem','isQwerty'])
  },
  methods: {
    ...mapActions(['setSliderCurrent','sliderLeft','sliderRight','setSliderCurrent']),
    background() {
      return {backgroundImage:'url('+new URL(`../../../assets/images/menu/${this.slider.tint}.png`, import.meta.url).href+')'}
    },
    numItem() {
      return this.$API.sprintf(this.lang('of'),this.slider.current+1, this.slider.max+1)
    },
    getTitle() {
      if (!this.slider.translate) return this.slider.title
      return this.lang(this.slider.title)
    },
    change(e) {
      if (!this.mounted) return
      
      let value = e.target.value
      e.target.blur()

      if (value == this.slider.current) return
      this.setSliderCurrent([this.index,parseInt(value)])
    },
    leftKey() {
      if (this.index == 0) return '←'
      if (this.index == 1) {
        if (this.isQwerty)
          return "q"
        else
          return "a"
      }
      if (this.index == 2) return "4"
    },
    rightKey() {
      if (this.index == 0) return '→'
      if (this.index == 1) return "E"
      if (this.index == 2) return "6"
    }
  },
  mounted() {
    this.mounted = true
  },
  beforeUnmount() {
    this.mounted = false
  },
  props: {
    index: Number,
    slider: Object
  }
}
</script>