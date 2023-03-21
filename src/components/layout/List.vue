<template>
  <div style="position:relative">
    <ul class="list"
      @keydown.down="Down"
      @keydown.up="Up"
    >
      <Item v-for="(item,index) in items()" :key=index
        :title="getTitle(item)"
        :icon="item.icon"
        :isCurrent="item.index == menu.equipedItem.index"
        :index="item.index"
      />
    </ul>
    <Selector />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Item from './Item.vue'
import Selector from './Selector.vue'

export default {
  components: {
    Item, Selector
  },
  computed: {
    ...mapGetters(['lang','menu','equipedItems','currentMenu','menuItems'])
  },
  methods: {
    ...mapActions(['menuDown','menuUp']),
    getTitle(item) {
      if (item.title.length > 0) {
        if (!item.translate) return item.title
        return this.lang(item.title)
      }
      return this.$API.sprintf(this.lang('number'),item.index)
    },
    items() {
      let max = this.menu.numberOnScreen;
      let itemDisplayed = [];
      for (let index = this.menu.offset; index < this.menuItems.length; index++) {
        if (this.menuItems[index].icon) {
          max -=2
        } else {
          max--
        }
        itemDisplayed.push(this.menuItems[index])
        if (max <= 0) break;
      }
      return itemDisplayed;
    },
    handleKeydown(e) {
      
      switch(e.key) {
        case 'ArrowDown':
          this.menuDown()
          return;
        case 'ArrowUp':
          this.menuUp()
          return;
      }
      return;
    }
  },
  beforeMount () {
  	window.addEventListener('keydown', this.handleKeydown, null);
  },
  beforeUnmount () {
  	window.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>
