<template>
  <div class="colorCustom" ref="boxParent">
    <div class="tint0" ref="tint0" :style="getStyleTint(0)"></div>
    <div class="tint1" ref="tint1" :style="getStyleTint(1)"></div>
    <div class="tint2" ref="tint2" :style="getStyleTint(2)"></div>
    <div class="border"></div>
  </div>
</template>

<script setup>
  import { defineProps,nextTick,ref } from 'vue';
  
  const props = defineProps(['sliders'])
  const tint0 = ref(null);
  const tint1 = ref(null);
  const tint2 = ref(null);

  let palette = ""
  for (let index = 0; index < props.sliders.length; index++) {
    const slider = props.sliders[index];
    if (slider.type == "palette") {
      palette = slider.tint
      break
    }
  }
  let url = new URL(`../../assets/images/menu/${palette}.png`, import.meta.url).href;

  function  getStyleTint(index) {
    let slider

    let counter = 0
    for (let i = 0; i < props.sliders.length; i++) {
      slider = props.sliders[i];
      if (slider.type == "palette") {
        if (counter == index )
          break
        counter++
      }
    }
    if (counter < index)
      return {}

    let left = slider.current
    nextTick(() => {
      let box
      switch (index) {
        case 0:
          box = tint0.value
          break;
        case 1:
          box = tint1.value
          break;
        case 2:
          box = tint2.value
          break;
      }
      left *= -1 * box.getBoundingClientRect().height
      box.style.backgroundPosition =  left + "px 0px"
    })
    return {
      backgroundImage: "url("+url+")",
      backgroundPosition: left+ "px 0px"
    }
  }
</script>