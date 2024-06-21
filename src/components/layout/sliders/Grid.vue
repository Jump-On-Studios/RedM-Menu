<template>
  <div :class="['grid-container','slider','dimension-'+props.slider.values.length]">
    <div class="left">
      {{ label(0) }}
    </div>
    <div class="center">
      <div v-if="props.slider.values.length == 2">
        {{ label(2) }}
      </div>
      <div class="grid" id="box" @mousedown="startMoveMarker">
        <div id="marker" :style="markerPosition()"></div>
      </div>
      <div v-if="props.slider.values.length == 2">
        {{ label(3) }}
      </div>
    </div>
    <div class="right">
      {{ label(1) }}
    </div>
  </div>
</template>

<script setup>
import { useLangStore } from '../../../stores/lang';
const lang = useLangStore().lang
import { useMenuStore } from '../../../stores/menus';
const menuStore = useMenuStore

const props = defineProps(['index','slider'])

let boxTop= 0
let boxLeft= 0
let boxBottom= 0
let boxRight= 0
let marker= false

function label(index) {
  if (props.slider.translate)
    return lang(props.slider.labels[index])
  return props.slider.labels[index]
}

function startMoveMarker(e) {
  e = e || window.event;
  marker = document.getElementById('marker');
  const box = document.getElementById('box').getBoundingClientRect();
  boxTop = box.top;
  boxLeft = box.left;
  boxBottom = box.bottom;
  boxRight = box.right;
  document.onmouseup = endMoveMarker;
  document.onmousemove = MoveMarker
  MoveMarker(e)
}
function endMoveMarker(e) {
  document.onmouseup = null;
  document.onmousemove = null;
}
function MoveMarker(e) {
  e = e || window.event;
  e.preventDefault();
  let values = []
  if (e.clientX < boxLeft)
    marker.style.left = "0px";
  else if (e.clientX > boxRight)
    marker.style.left = boxRight - boxLeft + 'px';
  else
    marker.style.left = e.clientX - boxLeft + "px";

  values.push(parseFloat(marker.style.left)/(boxRight-boxLeft))
  
  if (props.slider.values.length == 2) {
    if (e.clientY < boxTop)
      marker.style.top = "0px";
    else if (e.clientY > boxBottom)
      marker.style.top = boxBottom - boxTop + 'px';
    else
      marker.style.top = e.clientY - boxTop + "px";

    values.push(parseFloat(marker.style.top).toFixed(2)/(boxBottom-boxTop).toFixed(2))
  }
  menuStore.setSliderCurrent([props.index,values])
}
function markerPosition() {
  let position = {
    left: "50%",
    top: "50%"
  }
  let data = props.slider.values
  if (props.slider.values.length == 2) {
    position.top = ((data[1].current - data[1].min)/(data[1].max - data[1].min)*100).toFixed(2) + '%'
  }
  position.left = ((data[0].current - data[0].min)/(data[0].max - data[0].min)*100).toFixed(2) + '%'
  return position
}
</script>