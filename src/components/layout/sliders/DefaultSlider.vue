<template>
  <template v-if="slider.values.length > 1">
    <div :data-slider-index="index" class="slider">
      <h2 v-if="slider.title">{{ lang(slider.title) }}</h2>
      <div class="arrows">
        <div class="arrow left clicker" @click="sliderLeft(index)"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
        <div class="text hapna">{{ numItem() }}</div>
        <div class="arrow right clicker" @click="sliderRight(index)"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
      </div>
      <div class="boxes">
        <div v-for="vIndex in slider.values.length"
          :key="vIndex"
          :class="['box clicker',{
            'active' : vIndex < slider.current,
            'current' : vIndex == slider.current,
            'equiped' : vIndex == menu.equipedItem.variation && cItem.index == menu.equipedItem.index,
            'bought' : IsBought(vIndex)
          }]"
          @click="click(vIndex)"
        >
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isItemBought','menu','cItem','lang'])
  },
  methods: {
    ...mapActions(['sliderLeft','sliderRight','setSliderCurrent']),
    IsBought(vIndex) {
      return this.isItemBought(this.slider.values[vIndex-1])
    },
    numItem() {
      return this.$API.sprintf(this.lang('of'),this.slider.current, this.slider.values.length)
    },
    click(vIndex) {
      if (vIndex == this.slider.current) return
      this.setSliderCurrent([this.index,vIndex])
    }
  },
  props: {
    index: Number,
    slider: Object
  }
}
</script>