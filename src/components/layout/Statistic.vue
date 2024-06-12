<template>
  <div class="statistic">
    <div class="label" v-html="getLabel()"></div>
    <div class="value"  v-if="typeof stat.value != 'object'" v-html="getValue()">
    </div>
    <div :class="['stat-bars', stat.class]" v-else-if="stat.type == 'bar'">
      <div v-for="index in 10" :key="index" :class="['stat-bar',{'active':IsActive(index)},{'possible':IsPossible(index)}]" >
      </div>
    </div>
    <div :class="['stat-bars', stat.class]" v-else-if="stat.type == 'bar-style'">
      <div v-for="(bar,index) in stat.value" :key="index" :class="['stat-bar',bar]">
      </div>
    </div>
    <div :class="['weapon-bar', stat.class]" v-else-if="stat.type == 'weapon-bar'">
      <div class="box background">
        <img :src="getMenuImage('weapon_stats_bar')">
      </div>
      <div class="box amount" :style="{'clipPath': 'inset(0 '+ (100 - (stat.value[0]/stat.value[1])*100) + '% 0 0)'}">
        <img :src="getMenuImage('weapon_stats_bar')">
      </div>
    </div>
    <div class="stat-icons" v-if="stat.type == 'icon'">
      <div v-for="(icon,index) in stat.value" :key="index" class='icon'>
        <img :style=getImageStyle(icon) :src="getImage(icon)" />
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
      if (typeof image == "object")
        return `./assets/images/icons/${image.icon}.png`
      return `./assets/images/icons/${image}.png`
    },
    getMenuImage(image) {
      if (typeof image == "object")
        return `./assets/images/menu/${image.icon}.png`;
      return `./assets/images/menu/${image}.png`;
    },
    getImageStyle(icon) {
      if (typeof icon == "object") {
        return {
          opacity: icon.opacity
        }
      }
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
