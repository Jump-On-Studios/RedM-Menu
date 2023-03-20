<template>
  <div :class="['scroller',direction]">
    <div class="left"></div>
    <div :class="['center', {'active':getActive()}]"></div>
    <div class="right"></div>
  </div>
  <div class="scounter hapna" v-if="direction=='bottom'">{{ numItem() }}</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['lang', 'menuItems','menu'])
  },
  methods : {
    getActive() {
      if (this.direction == 'top' && this.menu.offset > 0) return true
      if (this.direction == "bottom") {
        let gap = 0
        for (let index = this.menu.offset; index < this.menuItems.length; index++) {
          if (this.menuItems[index].icon) {
            gap += 2
          } else {
            gap++;
          }
          if (gap > this.menu.numberOnScreen) return true
        }
      }
      return false
    },
    numItem() {
      return this.$API.sprintf(this.lang('of'),this.menu.currentItem+1, this.menuItems.length)
    }
  },
  props : {
    direction: String
  }
}
</script>