<template>
  <Transition>
    <div class="menu" v-if="show">
      <div class="background">
      </div>
      <Header />
      <Main />
    </div>
  </Transition>
</template>

<script>
  import Main from './layout/Main.vue'
  import Header from './layout/Header.vue'
  import { mapGetters } from 'vuex'
  import { onBeforeMount } from '@vue/runtime-core'

  export default {
    components: {
      Header, Main
    },
    computed: {
      ...mapGetters(['show'])
    },
    beforeMount() {
      new URL('../assets/sounds/button.mp3', import.meta.url).href;
      new URL('../assets/sounds/coins.mp3', import.meta.url).href;
      new URL('../assets/sounds/selected.mp3', import.meta.url).href;
    }
  }
</script>