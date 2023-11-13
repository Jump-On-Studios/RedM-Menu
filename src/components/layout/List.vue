<template>
  <div style="position:relative">
    <ul class="list" :style="setStyle()">
      <Item v-for="(item,index) in items()" :key=index
        :title="getTitle(item)"
        :icon="item.icon"
        :isCurrent="item.index == menu.equipedItem.index"
        :item="item"
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
    ...mapActions(['menuDown','menuUp','sliderLeft','sliderRight','colorLeft','colorRight']),
    setStyle() {
      return {
        maxHeight: (this.menu.numberOnScreen * 53) - 6 +'px'
      }
    },
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
    },
    handleWheel(e) {
      if (e.target.closest('.slider.color') != null) {
        if (e.deltaY < 0) {
          this.colorLeft()
        } else {
          this.colorRight()
        }
        return
      }
      else if ((e.target.closest('.slider') != null) || (e.target.closest('.colorPicker') != null)) {
        if (e.deltaY < 0) {
          this.sliderLeft()
        } else {
          this.sliderRight()
        }
        return
      }
      if (e.deltaY < 0) {
        this.menuUp()
      } else {
        this.menuDown()
      }
    }
  },
  beforeMount () {
  	window.addEventListener('keydown', this.handleKeydown, null);
  	window.addEventListener('wheel', this.handleWheel, null);
  },
  beforeUnmount () {
  	window.removeEventListener('keydown', this.handleKeydown);
  	window.removeEventListener('wheel', this.handleWheel);
  }
}
</script>
