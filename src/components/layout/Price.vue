<template>
  <div class="price" v-if="cItem.price">
    <div class="divider"></div>
    <div class="content">
      <h4 v-if="cItem.priceTitle">{{ lang(cItem.priceTitle) }}</h4>
      <h4 v-else>{{ lang('price') }}</h4>
      <div class="amount">
        <template v-if="cItem.price.gold && cItem.price.money">
          <span class="gold left" v-if="typeof(cItem.price) == 'object'">
            <span class="icon">
              <img src="@/assets/images/gold.png">
            </span>
            {{ gold() }}
          </span>
        </template>
        <template v-if="cItem.price.gold && !cItem.price.money">
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
    </div>
    <div class="divider bottom"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cItem','isItemBought','lang','menu'])
  },
  methods: {
    gold() {
      if (this.cItem.price.gold%1 == 0) return this.cItem.price.gold.toString()
      return this.cItem.price.gold.toFixed(2).toString()
    },
    price() {
      if (this.isItemBought()) {
        return 0
      }
      if (typeof(this.cItem.price) == 'object')
        return this.cItem.price.money
      return this.cItem.price
    },
    priceRounded() {
      let price = this.price()
      if (this.price() == 0)
        return this.lang('free')
      return Math.trunc(price)
    },
    centimes() {
      let price = this.price()
      if (price == 0)
        return ''
      return (price%1).toFixed(2).toString().substring(2);
    },
    devise() {
      if (this.price() == 0)
        return ''
      return this.lang('devise')
    }
  }
}
</script>
