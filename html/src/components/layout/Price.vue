<template>
  <div class="price">
    <template v-if="cItem.price">
      <div class="divider"></div>
      <div class="content">
        <h4>{{ lang('price') }}</h4>
        <div class="amount">
          <span class="devise">{{ devise() }}</span>
          <span class="round">{{ priceRounded() }}</span>
          <span class="centime">{{ centimes() }}</span>
        </div>
      </div>
      <div class="divider bottom"></div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cItem','isItemBought','lang','menu'])
  },
  methods: {
    price() {
      if (this.isItemBought()) {
        return 0
      }
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
