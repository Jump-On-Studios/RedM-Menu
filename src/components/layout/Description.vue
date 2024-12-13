<template>
  <div class="description hapna" v-if="needDescription()">
    <div class="text" v-if="menuStore.cItem.description" v-html="getDescription(menuStore.cItem)">
    </div>
    <div class="statistics" v-if="menuStore.cItem.statistics.length > 0">
      <template v-for="(stat, index) in menuStore.cItem.statistics" :key="index">
        <Statistic :stat="stat" />
      </template>
    </div>
  </div>
</template>

<script setup>
import Statistic from "./Statistic.vue"
import { useLangStore } from '../../stores/lang';
import { useMenuStore } from '../../stores/menus';
const lang = useLangStore().lang

const menuStore = useMenuStore()

function getDescription(item) {
  if (item.translateDescription) {
    return lang(item.description)
  }
  return item.description
}
function needDescription() {
  if (menuStore.cItem.description == undefined) return false
  if (menuStore.cItem.description.length > 0) return true
  if (menuStore.cItem.statistics.length > 0) return true
  if (menuStore.cItem.grid) return true
  return false
}
</script>

<style scoped lang="scss">
.description {
  .text {
    overflow-wrap: break-word;
  }
}
</style>