<template>
  <div class="colorPicker">
    <h2>{{ getTitle() }}</h2>
    <div class="arrows">
      <div class="arrow left clicker" @click="menuStore.sliderLeft(index)"><img src="/assets/images/menu/selection_arrow_left.png"></div>
      <div class="text hapna">{{ numItem() }}</div>
      <div class="arrow right clicker" @click="menuStore.sliderRight(index)"><img src="/assets/images/menu/selection_arrow_right.png"></div>
    </div>
    <div class="colorSlider">
      <div :class="['keyHelpers','index-'+index]" v-if="cItem.sliders.length > 1">
        <div :class="['left',{'qwerty':menuStore.isQwerty && index==1}]" ref="keyLeft">
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

<script setup>
  import { onBeforeUnmount, onMounted, inject} from 'vue';
  import { useLangStore } from '../../../stores/lang';
  const lang = useLangStore().lang
  import { useMenuStore } from '../../../stores/menus';
  const menuStore = useMenuStore()
  const API = inject('API')

  const props = defineProps(['index','slider'])

  const cItem =  menuStore.cItem
  const index = props.index
  const slider = props.slider
  let mounted = false
  
  function background() {
    return {backgroundImage:`url(./assets/images/menu/${slider.tint}.png`}
  }
  function numItem() {
    return API.sprintf(lang('of'),slider.current+1, slider.max+1)
  }
  function getTitle() {
    if (!slider.translate) return slider.title
    return lang(slider.title)
  }
  function change(e) {
    if (!mounted) return
    
    let value = e.target.value
    e.target.blur()

    if (value == slider.current) return
    menuStore.setSliderCurrent([index,parseInt(value)])
  }
  function leftKey() {
    if (index == 0) return '←'
    if (index == 1) {
      if (menuStore.isQwerty)
        return "q"
      else
        return "a"
    }
    if (index == 2) return "4"
  }
  function rightKey() {
    if (index == 0) return '→'
    if (index == 1) return "E"
    if (index == 2) return "6"
  }
  onMounted(() => {
    mounted = true
  })
  onBeforeUnmount(() => {
    mounted = false
  })
</script>