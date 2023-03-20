<template>
  <main>
    <h2 id="title">{{ lang(menu.title) }}</h2>
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
  </main>
</template>

<script>
  import Scroller from './Scroller.vue'
  import List from './List.vue'
  import Slider from './Slider.vue'
  import Color from './Color.vue'
  import Price from './Price.vue'
  import Footer from './Footer.vue'
  
import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      Scroller, List, Slider, Price, Footer, Color
    },
    data() {
      return {
        keyPressed: {}
      }
    },
    computed: {
      ...mapGetters(['menu', 'lang'])
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