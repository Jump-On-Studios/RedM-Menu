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

<script>
import { mapGetters } from 'vuex'
import PriceDisplay from './PriceDisplay.vue'

export default {
  components: {
    PriceDisplay
  },
  computed: {
    ...mapGetters(['cItem','isItemBought','lang','menu','globalPrice','cItemPrice'])
  },
  methods: {
    gold() {
      if (this.cItem.price.gold%1 == 0) return this.cItem.price.gold.toString()
      return this.cItem.price.gold.toFixed(2).toString()
    },
  }
}
</script>
