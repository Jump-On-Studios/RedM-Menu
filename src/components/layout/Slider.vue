<template>
  <div class="slider" v-if="!cItem.disabled && cItem.slider && cItem.slider.values.length > 1 && cItem.sliderType == 'slider'">
    <h2>{{ lang(cItem.slider.title) }}</h2>
    <div class="arrows">
      <div class="arrow left clicker" @click="sliderLeft()"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right clicker" @click="sliderRight()"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <div class="boxes">
      <div v-for="index in cItem.slider.values.length"
        :key="index"
        :class="['box clicker',{
          'active' : index < cItem.slider.current,
          'current' : index == cItem.slider.current,
          'equiped' : index == menu.equipedItem.variation && cItem.index == menu.equipedItem.index,
          'bought' : IsBought(index)
        }]"
        @click="click(index)"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isItemBought','menu','cItem','lang'])
  },
  methods: {
    ...mapActions(['sliderLeft','sliderRight','setSliderCurrent']),
    handleKeydown(e) {
      if (!this.cItem.slider) return
      switch(e.key) {
        case 'ArrowRight':
          this.sliderRight()
          return;
        case 'ArrowLeft':
          this.sliderLeft()
          return;
      }
      return;
    },
    IsBought(index) {
      return this.isItemBought(this.cItem.slider.values[index-1])
    },
    numItem() {
      return this.$API.sprintf(this.lang('of'),this.cItem.slider.current, this.cItem.slider.values.length)
    },
    click(index) {
      if (index == this.cItem.slider.current) return
      this.setSliderCurrent(index)
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