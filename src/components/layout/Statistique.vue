<template>
  <div class="statistique">
    <div class="label">{{ lang(stat.label) }}</div>
    <div class="stat-bars" v-if="typeof stat.value == 'object'">
      <div v-for="index in 10" :key="index" :class="['stat-bar',{'active':IsActive(index)},{'possible':IsPossible(index)}]">
      </div>
    </div>
    <div class="value" v-else>
      {{ stat.value }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['lang'])
  },
  methods : {
    IsActive(value) {
      return (value <= this.stat.value[0])
    },
    IsPossible(value) {
      if (this.stat.value.length == 1) return false
      return (value > this.stat.value[0] && value <= this.stat.value[1])
    }
  },
  mounted() {
    console.log(typeof this.stat.value)
  },
  props : {
    stat : Object
  }
}
</script>
