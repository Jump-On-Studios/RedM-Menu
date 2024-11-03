<template>
  <div class="footer hapna" v-if="cItem.footer.length > 0">
    <div class="divider"></div>
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
.footer {
  display: flex;
  align-items: center;
  font-size: 1rem;

  .content {
    margin-top: 1vh;
  }
}
</style>