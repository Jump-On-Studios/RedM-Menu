<template>
  <div class="description hapna" v-if="needDescription()">
    <div v-if="cItem.description" v-html="getDescription(cItem)">
    </div>
    <div class="statistics" v-if="cItem.statistics.length > 0">
      <template v-for="(stat, index) in cItem.statistics" :key="index">
        <Statistic :stat="stat" />
      </template>
    </div>
    <template v-if="cItem.grid">
      <Grid />
    </template>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
import Statistic from "./Statistic.vue"
import Grid from './Grid.vue'
import { useLangStore } from '../../stores/lang';
const lang = useLangStore().lang

const cItem = computed(() => store.getters.cItem)
function getDescription(item) {
  if (item.translateDescription) {
    return lang(item.description)
  }
  return item.description
}
function needDescription() {
  if (cItem.description == undefined) return false
  if (cItem.description.length > 0) return true
  if (cItem.statistics.length > 0) return true
  if (cItem.grid) return true
  return false
}
</script>