<template>
  <Transition>
    <div :class="['menu',{'right':datas.menuPositionRight}]" v-if="datas.showMenu" :style="{zoom: zoom}">
      <div class="smudge"></div>
      <div class="container">
        <div class="background"></div>
        <Header />
        <Main />
      </div>
    </div>
  </Transition>
</template>

<script setup>
  import Main from './layout/Main.vue'
  import Header from './layout/Header.vue'
  import { onMounted, computed } from 'vue';
  import { useDataStore } from '../stores/datas';
  const datas = useDataStore()

  let zoom = window.innerHeight/1080

  function resizeEvent() {
    zoom = window.innerHeight/1080
  }

  onMounted(() => {
    window.addEventListener("resize", resizeEvent,null);
  })
</script>