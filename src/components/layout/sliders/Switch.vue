<template>
  <div class="sufix" v-if="slider.type == 'switch' && slider.values.length > 1">
    <div class="arrows" @click.stop="">
      <div class="arrow left clicker" @click="sliderLeft(index)" v-if="isCurrent"><img src="/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ getSufixLabel(slider)}}</div>
      <div class="arrow right clicker" @click="sliderRight(index)" v-if="isCurrent"><img src="/assets/images/menu/selection_arrow_right.png"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['lang'])
  },
  methods: {
    ...mapActions(['sliderLeft','sliderRight']),
     getSufixLabel(slider) {
      if (!slider.translate) return slider.values[slider.current -1].label 
      return this.lang(slider.values[slider.current -1].label)
    },
  },
  props: {
    index: Number,
    slider: Object,
    isCurrent: Boolean
  }
}
</script>