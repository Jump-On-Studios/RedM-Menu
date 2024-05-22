

<template>
  <button v-if="DevMode" style="position: absolute; left: 0; top: 0; z-index:999; color: black" @click="HideButton()">Toggle show {{ show }}</button>
  <img v-if="DevMode" style="position: absolute; left: 0; top: 0; width:100vw;height:100vh" src="@/assets/images/background_dev.jpg">
  <Menu />
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Menu from './components/Menu.vue'
  export default {
    components: {
      Menu
    },
    data () {
      return {
        DevMode: import.meta.env.DEV,
      }
    },
    computed: {
      ...mapGetters(['show'])
    },
    methods: {
      ...mapMutations({
        DefineShow: 'DEFINE_SHOW'
      }),
      HideButton() {
        this.DefineShow(!this.show)
      },
    }
  }
</script>

<style lang="scss">
  @import "./scss/_reset.scss";
  @import "./scss/_style.scss";
  @import "./scss/_colorpicker.scss";
</style>

<style>
@font-face {
  font-family: "Crock";
  src: url('./assets/fonts/crock.ttf') format("truetype");
}

@font-face {
  font-family: "Hapna";
  src: url("./assets/fonts/Hapna.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Hapna";
  src: url("./assets/fonts/HapnaMedium.ttf") format("truetype");
  font-weight: 500;
}
@font-face {
  font-family: "Hapna";
  src: url("./assets/fonts/HapnaDemiBold.ttf") format("truetype");
  font-weight: 600;
}
@font-face {
  font-family: "Hapna";
  src: url("./assets/fonts/HapnaBold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Hapna";
  src: url("./assets/fonts/HapnaExtraBold.ttf") format("truetype");
  font-weight: 800;
}
@font-face {
  font-family: "Hapna";
  src: url("./assets/fonts/HapnaLight.ttf") format("truetype");
  font-weight: 300;
}
</style>
