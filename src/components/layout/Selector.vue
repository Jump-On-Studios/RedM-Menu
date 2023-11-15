<template>
  <div :class="['selector','fred',{'with-icon' : haveIcon()}]" :style="getTop()">
    <img class="top" src="@/assets/images/menu/crafting_highlight_t.png" />  
    <img class="top right corner" src="@/assets/images/menu/crafting_highlight_tr.png" />  
    <img class="right" src="@/assets/images/menu/crafting_highlight_r.png" />  
    <img class="bottom right corner" src="@/assets/images/menu/crafting_highlight_br.png" /> 
    <img class="bottom" src="@/assets/images/menu/crafting_highlight_b.png" /> 
    <img class="bottom left corner" src="@/assets/images/menu/crafting_highlight_bl.png" />
    <img class="left" src="@/assets/images/menu/crafting_highlight_l.png" />
    <img class="top left corner" src="@/assets/images/menu/crafting_highlight_tl.png" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['menuItems','cItem','menu'])
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
      }
      return {
         top: top + "px"
      }
    }
  },
}
</script>
