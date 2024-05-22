<template>
  <Transition>
    <div :class="['menu',{'right':menuPositionRight}]" v-if="show" :style="{zoom: zoom}">
      <div class="smudge"></div>
      <div class="container">
        <div class="background"></div>
        <Header />
        <Main />
      </div>
    </div>
  </Transition>
</template>

<script>
  import Main from './layout/Main.vue'
  import Header from './layout/Header.vue'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        zoom: window.innerHeight/1080
      }
    },
    components: {
      Header, Main
    },
    computed: {
      ...mapGetters(['show','menuPositionRight'])
    },
    methods: {
      resizeEvent() {
        this.zoom = window.innerHeight/1080
      }
    },
    mounted() {
      window.addEventListener("resize", this.resizeEvent,null);
    },
    beforeMount() {
      new URL('../assets/sounds/button.mp3', import.meta.url).href;
      new URL('../assets/sounds/coins.mp3', import.meta.url).href;
      new URL('../assets/sounds/selected.mp3', import.meta.url).href;
      new URL('../assets/sounds/menu_open.mp3', import.meta.url).href;
      new URL('../assets/sounds/menu_close.mp3', import.meta.url).href;
    }
  }
</script>