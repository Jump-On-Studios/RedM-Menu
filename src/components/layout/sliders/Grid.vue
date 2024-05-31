<template>
  <div :class="['grid-container','slider','dimension-'+slider.values.length]">
    <div class="left">
      {{ lang(slider.labels[0]) }}
    </div>
    <div class="center">
      <div v-if="slider.values.length == 2">
        {{ lang(slider.labels[2]) }}
      </div>
      <div class="grid" id="box" @mousedown="startMoveMarker">
        <div id="marker" :style="markerPosition()"></div>
      </div>
      <div v-if="slider.values.length == 2">
        {{ lang(slider.labels[3]) }}
      </div>
    </div>
    <div class="right">
      {{ lang(slider.labels[1]) }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    index: Number,
    slider: Object
  },
  computed: {
    ...mapGetters(['cItem','lang'])
  },
  data() {
    return {
      boxTop: 0,
      boxLeft: 0,
      boxBottom: 0,
      boxRight: 0,
      marker: false,
    }
  },
  methods: {
    ...mapActions(['setSliderCurrent']),
    startMoveMarker(e) {
      e = e || window.event;
      this.marker = document.getElementById('marker');
      const box = document.getElementById('box').getBoundingClientRect();
      this.boxTop = box.top;
      this.boxLeft = box.left;
      this.boxBottom = box.bottom;
      this.boxRight = box.right;
      document.onmouseup = this.endMoveMarker;
      document.onmousemove = this.MoveMarker
      this.MoveMarker(e)
    },
    endMoveMarker(e) {
      document.onmouseup = null;
      document.onmousemove = null;
    },
    MoveMarker(e) {
      e = e || window.event;
      e.preventDefault();
      let values = []
      if (e.clientX < this.boxLeft)
        this.marker.style.left = "0px";
      else if (e.clientX > this.boxRight)
        this.marker.style.left = this.boxRight - this.boxLeft + 'px';
      else
        this.marker.style.left = e.clientX - this.boxLeft + "px";

      values.push(parseFloat(this.marker.style.left)/(this.boxRight-this.boxLeft))
      
      if (this.slider.values.length == 2) {
        if (e.clientY < this.boxTop)
          this.marker.style.top = "0px";
        else if (e.clientY > this.boxBottom)
          this.marker.style.top = this.boxBottom - this.boxTop + 'px';
        else
          this.marker.style.top = e.clientY - this.boxTop + "px";

        values.push(parseFloat(this.marker.style.top).toFixed(2)/(this.boxBottom-this.boxTop).toFixed(2))
      }
      this.setSliderCurrent([this.index,values])
    },
    markerPosition() {
      let position = {
        left: "50%",
        top: "50%"
      }
      let data = this.slider.values
      if (this.slider.values.length == 2) {
        position.top = ((data[1].current - data[1].min)/(data[1].max - data[1].min)*100).toFixed(2) + '%'
      }
      position.left = ((data[0].current - data[0].min)/(data[0].max - data[0].min)*100).toFixed(2) + '%'
      return position
    },
  },
}
</script>