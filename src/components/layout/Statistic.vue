<template>
  <div class="statistic">
    <div class="label">{{ getLabel() }}</div>
     <div class="value"  v-if="typeof stat.value != 'object'">
      {{ getValue() }}
    </div>
    <div class="stat-bars" v-else-if="stat.type == 'bar'">
      <div v-for="index in 10" :key="index" :class="['stat-bar',{'active':IsActive(index)},{'possible':IsPossible(index)}]">
      </div>
    </div>
    <div class="stat-icons" v-if="stat.type == 'icon'">
      <div v-for="(icon,index) in stat.value" :key="index" class='icon'>
        <img :src="getImage(icon)" />
      </div>
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
    getLabel() {
      if (this.stat.translateLabel == false){
        return this.stat.label
      } else {
        return this.lang(this.stat.label)
      }
    },
    getValue() {
      if (this.stat.translateValue == false){
        return this.stat.value
      } else {
        return this.lang(this.stat.value)
      }
    },
    getImage(image) {
      return new URL(`../../assets/images/icons/${image}.png`, import.meta.url).href;
    },
    IsActive(value) {
      return (value <= this.stat.value[0])
    },
    IsPossible(value) {
      if (this.stat.value.length == 1) return false
      return (value > this.stat.value[0] && value <= this.stat.value[1])
    }
  },
  props : {
    stat : Object
  }
}
</script>
