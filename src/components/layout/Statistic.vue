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

<script setup>
import { computed } from 'vue';
import { useLangStore } from '../../stores/lang';

const lang = useLangStore().lang
const stat = computed(() => props.stat)
function getLabel() {
  if (stat.translateLabel == false){
    return stat.label
  } else {
    return lang(stat.label)
  }
}
function getValue() {
  if (stat.translateValue == false){
    return stat.value
  } else {
    return lang(stat.value)
  }
}
function getImage(image) {
  if (typeof image == "object")
    return `./assets/images/icons/${image.icon}.png`
  return `./assets/images/icons/${image}.png`
}
function getMenuImage(image) {
  if (typeof image == "object")
    return `./assets/images/menu/${image.icon}.png`;
  return `./assets/images/menu/${image}.png`;
}
function getImageStyle(icon) {
  if (typeof icon == "object") {
    return {
      opacity: icon.opacity
    }
  }
}
function IsActive(value) {
  return (value <= stat.value[0])
}
function IsPossible(value) {
  if (stat.value.length == 1) return false
  return (value > stat.value[0] && value <= stat.value[1])
}
</script>
