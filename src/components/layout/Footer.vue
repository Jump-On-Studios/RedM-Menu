<template>
  <div class="footer-text hapna" v-if="cItem.footer.length > 0">
    <div class="divider" v-if="!cItem.price"></div>
    <div class="content" v-html="cItem.footer">
    </div>
  </div>
</template>

<script setup>
import { useMenuStore } from '../../stores/menus';
const { cItem } = useMenuStore()

console.log(cItem)

</script>

<style scoped>
.footer-text {
  display: flex;
  align-items: center;
  font-size: 1rem;
  flex-direction: column;

  .content {
    margin-top: 1vh;
  }
}
</style>