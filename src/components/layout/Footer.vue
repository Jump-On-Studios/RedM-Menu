<template>
  <footer class="hapna">
    <div class="statistics" v-if="cItem.statistics">
      <template v-for="(stat, index) in cItem.statistics" :key="index">
        <Statistic :stat="stat" />
      </template>
    </div>
    <div class="description" v-if="cItem.description">
      {{ lang(cItem.description) }}
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import Statistic from "./Statistic.vue"

export default {
  components: {
    Statistic
  },
  computed: {
    ...mapGetters(['lang','cItem'])
  }
}
</script>