<template>
  <div class="price" v-if="cItemPrice !== false">
    <div class="divider"></div>
    <div class="content">
      <h4 v-if="cItem.priceTitle">{{ lang(cItem.priceTitle) }}</h4>
      <h4 v-else>{{ lang('price') }}</h4>
      <div class="amount">
        <PriceDisplay :price="cItemPrice" />
      </div>
    </div>
    <div class="divider bottom"></div>
  </div>
  <div class="price" v-if="globalPrice">
    <div class="divider"></div>
    <div class="content">
      <h4>{{ lang(globalPrice.title) }}</h4>
      <div class="amount">
        <PriceDisplay :price="globalPrice.price" />
      </div>
    </div>
    <div class="divider bottom"></div>
  </div>
</template>

<script setup>
import { useLangStore } from '../../stores/lang';
import { useMenuStore } from '../../stores/menus';
import PriceDisplay from './PriceDisplay.vue'
const menuStore = useMenuStore()
const lang = useLangStore().lang
const cItem = computed(() => menuStore.cItem)
const menu = computed(() => menuStore.menu)
const cItemPrice = computed(() => menuStore.cItemPrice)

function gold() {
  if (cItem.price.gold%1 == 0) return cItem.price.gold.toString()
  return cItem.price.gold.toFixed(2).toString()
}
</script>
