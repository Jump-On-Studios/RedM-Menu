<template>
  <div class="description hapna">
    <div v-if="cItem.description" v-html="getDescription(cItem)">
    </div>
    <div class="statistics" v-if="cItem.statistics">
      <template v-for="(stat, index) in cItem.statistics" :key="index">
        <Statistic :stat="stat" />
      </template>
    </div>
    <template v-if="cItem.grid">
      <Grid />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Statistic from "./Statistic.vue"
import Grid from './Grid.vue'

export default {
  components: {
    Statistic,Grid
  },
  computed: {
    ...mapGetters(['lang','cItem'])
  },
  methods: {
    getDescription(item) {
      if (item.translateDescription) {
        return this.lang(item.description)
      }
      return item.description
    }
  }
}
</script>