<template>
  <template v-if="price !== undefined && price !== false">
    <div class="priceDisplay">
      <template v-if="(typeof(price) == 'object') && price.gold && price.money">
        <span class="gold left">
          <span class="icon">
            <img src="/assets/images/gold.png">
          </span>
          {{ gold() }}
        </span>
      </template>
      <template v-if="price.gold && !price.money">
        <span class="gold">
          <span class="icon">
            <img src="/assets/images/gold.png">
          </span>
          <span class="round">{{ gold() }}</span>
        </span>
      </template>
      <template v-else>
        <span class="devise">{{ devise() }}</span>
        <span class="round">{{ priceRounded() }}</span>
        <span class="centime">{{ centimes() }}</span>
      </template>
    </div>
  </template>
</template>

<script setup>
import { computed } from 'vue';
import { useLangStore } from '../../stores/lang';
import { useMenuStore } from '../../stores/menus';
const menuStore = useMenuStore();
const lang = useLangStore().lang
const menu = computed(() => menuStore.cMenu)
const price = computed(() => props.price)

function gold() {
  if (price.gold%1 == 0) return price.gold.toString()
  return price.gold.toFixed(2).toString()
}
function getPrice() {
  if (typeof(price) == 'object')
    return price.money
  return price
}
function priceRounded() {
  let price = getPrice()
  if (getPrice() == 0)
    return lang('free')
  return Math.trunc(price)
}
function centimes() {
  let price = getPrice()
  if (price == 0)
    return ''
  return (price%1).toFixed(2).toString().substring(2);
}
function devise() {
  if (getPrice() == 0)
    return ''
  return lang('devise')
}
</script>