<template>
  <template v-if="!cItem.disabled">
    <template v-for="(slider,index) in cItem.sliders" :key="index">
      <template v-if="slider.type == 'palette'">
        <ColorPalette :index="index" :slider="slider" />
      </template>
      <template v-if="slider.type == 'switch'" />
      <template v-else>
        <DefaultSlider :index="index" :slider="slider" />
      </template>
    </template>
  </template>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ColorPalette from './sliders/ColorPalette.vue'
import DefaultSlider from './sliders/DefaultSlider.vue'

export default {
  components: {
    ColorPalette,DefaultSlider
  },
  computed: {
    ...mapGetters(['isItemBought','menu','cItem','lang'])
  },
  methods: {
    ...mapActions(['sliderLeft','sliderRight','setSliderCurrent']),
    handleKeydown(e) {
      if (!this.cItem.sliders) return
      switch(e.code) {
        //LEFT
        case 'ArrowLeft':
          this.sliderLeft()
          break;
        case 'KeyQ':
          this.sliderLeft(1)
          break;
        case 'Numpad4':
          this.sliderLeft(2)
          break;

        //RIGHT
        case 'ArrowRight':
          this.sliderRight()
          break;
        case 'KeyE':
          this.sliderRight(1)
          break;
         case 'Numpad6':
          this.sliderRight(2)
          break;
        
      }
      return;
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