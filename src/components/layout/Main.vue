<template>
  <main>
    <h2 id="title">{{ lang(menu.title) }}</h2>
    <template v-if="menuItems.length > 0">
      <Scroller
        direction = 'top'
      />
      <List />
      <Scroller
        direction = 'bottom'
      />
      <div class="details">
        <Slider />
        <Color />
      </div>
      <Price />
      <Footer />
    </template>
    <template v-else>
      <Loading />
    </template>
  </main>
</template>

<script>
  import Scroller from './Scroller.vue'
  import List from './List.vue'
  import Slider from './Slider.vue'
  import Color from './Color.vue'
  import Price from './Price.vue'
  import Footer from './Footer.vue'
  import Loading from './Loading.vue'
  
import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      Scroller, List, Slider, Price, Footer, Color,Loading
    },
    data() {
      return {
        keyPressed: {}
      }
    },
    computed: {
      ...mapGetters(['menu', 'lang',"menuItems"])
    },
    methods: {
      ...mapActions(['menuEnter','menuBack']),
      handleKeyUp(e) {
        this.keyPressed[e.key] = false
      },
      handleKeydown(e) {
        if (this.keyPressed[e.key]) return
        
        this.keyPressed[e.key] = true
        switch(e.key) {
          case 'Enter':
            this.menuEnter()
            return
          case 'Backspace':
            this.menuBack()
            return
        }
      }
    },
    beforeMount () {
      window.addEventListener('keydown', this.handleKeydown);
      window.addEventListener('keyup', this.handleKeyUp);
    },
    beforeUnmount () {
      window.removeEventListener('keydown', this.handleKeydown);
      window.removeEventListener('keyup', this.handleKeyUp);
    }
  }
</script>