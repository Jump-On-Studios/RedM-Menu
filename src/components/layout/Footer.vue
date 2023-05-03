<template>
  <footer class="hapna">
    <div class="statistiques" v-if="cItem.statistiques">
      <template v-for="(stat, index) in cItem.statistiques" :key="index">
        <Statistique :stat="stat" />
      </template>
    </div>
    <div class="description" v-if="cItem.description">
      {{ lang(cItem.description) }}
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import Statistique from "./Statistique.vue"

export default {
  components: {
    Statistique
  },
  computed: {
    ...mapGetters(['lang','cItem'])
  }
}
</script>