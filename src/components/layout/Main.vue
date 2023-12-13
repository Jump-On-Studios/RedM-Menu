<template>
  <main>
    <div class="article">
      <h2 id="title">
        {{ getTitle() }}
        <span v-if="parentTree.length > 0" class="backer clicker" @click="menuBack()">
          <img src="@/assets/images/menu/selection_arrow_left.png">
        </span>
      </h2>
      <template v-if="menuItems.length > 0">
        <Scroller
          direction = 'top'
        />
        <List />
        <Scroller
          direction = 'bottom'
        />
      </template>
    </div>
    <template v-if="menuItems.length == 0 & menu.type == 'list'">
      <Loading />
    </template>
    <div class="footer">
      <template v-if="menuItems.length > 0">
        <Description />
        <Slider />
        <Color />
      </template>
      <Price />
    </div>
    
  </main>
</template>

<script>
  import Scroller from './Scroller.vue'
  import List from './List.vue'
  import Slider from './Slider.vue'
  import Color from './Color.vue'
  import Price from './Price.vue'
  import Description from './Description.vue'
  import Loading from './Loading.vue'
  
import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      Scroller, List, Slider, Price, Description, Color,Loading
    },
    data() {
      return {
        keyPressed: {},
        focus: false,
        mountedDate: 0
      }
    },
    computed: {
      ...mapGetters(['menu', 'lang',"menuItems",'parentTree'])
    },
    methods: {
      ...mapActions(['menuEnter','menuBack']),
      handleKeyUp(e) {
        this.keyPressed[e.key] = false
      },
      handleKeydown(e) {
        if (this.focus) return
        if (this.keyPressed[e.key]) return
        
        this.keyPressed[e.key] = true
        if (Date.now()-this.mountedDate < 100) return
        switch(e.key) {
          case 'Enter':
            this.menuEnter()
            return
          case 'Backspace':
            this.menuBack()
            return
          case 'Escape':
            this.menuBack()
            return
        }
      },
      focusIn() {
        this.focus = true
      },
      focusOut() {
        this.focus = false
      },
      getTitle() {
        if (this.menu.translateTitle) {
          return this.lang(this.menu.title)
        }
        return this.menu.title
      }
    },
    beforeMount () {
      window.addEventListener('keydown', this.handleKeydown);
      window.addEventListener('keyup', this.handleKeyUp);
      document.addEventListener('focusin', this.focusIn);
      document.addEventListener('focusout', this.focusOut);
    },
    mounted () {
      this.mountedDate = Date.now();
      this.$API.PlayAudio('menu_open.mp3');
    },
    beforeUnmount () {
      window.removeEventListener('keydown', this.handleKeydown);
      window.removeEventListener('keyup', this.handleKeyUp);
      document.removeEventListener('focusin', this.focusIn);
      document.removeEventListener('focusout', this.focusOut);
      this.$API.PlayAudio('menu_close.mp3');
    }
  }
</script>