<template>
  <div class="slider" v-if="cItem.slider && cItem.slider.values.length > 1">
    <h2>{{ lang(cItem.slider.title) }}</h2>
    <div class="arrows">
      <div class="arrow left"><img src="@/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right"><img src="@/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <div class="boxes">
      <div v-for="index in cItem.slider.values.length"
        :key="index"
        :class="['box',{
          'active' : index < cItem.slider.current,
          'current' : index == cItem.slider.current,
          'equiped' : index == menu.equipedItem.variation && cItem.index == menu.equipedItem.index,
          'bought' : IsBought(index)
        }]">
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
    ...mapActions(['sliderLeft','sliderRight']),
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
  },
  beforeMount () {
  	window.addEventListener('keydown', this.handleKeydown, null);
  },
  beforeUnmount () {
  	window.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>