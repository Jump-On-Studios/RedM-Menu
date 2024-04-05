<template>
  <div :class="['selector',{'with-icon' : haveIcon()}]" :style="getTop()">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['menuItems','cItem','menu','currentMenu'])
  },
  methods: {
    haveIcon() {
      return this.cItem.icon
    },
    getTop() {
      let top = 0;
      const active = document.getElementsByClassName('item active')[0];
      if (active) {
        const container = document.getElementById('list-items')
        top = active.getBoundingClientRect().top - container.getBoundingClientRect().top 
      } else {
      }
      return {
         top: top + "px"
      }
    }
  },
  watch: {
    currentMenu: function() {
      this.$nextTick(() => {
        this.$forceUpdate();
      })
    }
  }
}
</script>
