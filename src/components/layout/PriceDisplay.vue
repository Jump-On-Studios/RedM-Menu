<template>
  <template v-if="price">
    <div class="priceDisplay">
      <template v-if="price.gold && price.money">
        <span class="gold left" v-if="typeof(price) == 'object'">
          <span class="icon">
            <img src="@/assets/images/gold.png">
          </span>
          {{ gold() }}
        </span>
      </template>
      <template v-if="price.gold && !price.money">
        <span class="gold">
          <span class="icon">
            <img src="@/assets/images/gold.png">
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

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isItemBought','lang','menu'])
  },
  methods: {
    gold() {
      if (this.price.gold%1 == 0) return this.price.gold.toString()
      return this.price.gold.toFixed(2).toString()
    },
    getPrice() {
      if (this.isItemBought()) {
        return 0
      }
      if (typeof(this.price) == 'object')
        return this.price.money
      return this.price
    },
    priceRounded() {
      let price = this.getPrice()
      if (this.getPrice() == 0)
        return this.lang('free')
      return Math.trunc(price)
    },
    centimes() {
      let price = this.getPrice()
      if (price == 0)
        return ''
      return (price%1).toFixed(2).toString().substring(2);
    },
    devise() {
      if (this.getPrice() == 0)
        return ''
      return this.lang('devise')
    }
  },
  props : {
    price : Object
  },
}
</script>