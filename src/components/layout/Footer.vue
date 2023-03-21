<template>
  <footer class="hapna" v-if="cItem.description">
    {{ lang(cItem.description) }}
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['lang','cItem'])
  }
}
</script>