<template>
  <li :class="['item',{'with-icon':icon}]">
    <div class="image" v-if="icon">
      <img :src="getImage(icon)" />
    </div>
    <div class="current" v-if="isCurrent">
      <div class="color" v-if="cItem.color">
        <img :src="getColorImage()">
      </div>
      <div class="tick">
        <img src="@/assets/images/menu/tick.png">
      </div>
    </div>
    <h3>{{ getTitle() }}</h3>
    <div class="background"></div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['currentMenu','equipedItems','colors','cItem','displayOutfitId'])
  },
  methods : {
    getImage(image) {
      return new URL(`../../assets/images/icons/${image}.png`, import.meta.url).href;
    },
    getColorImage() {
      let color = ""
      if (this.currentMenu == "mhair" || this.currentMenu == "fhair") {
        color = this.colors[this.equipedItems.hairColor].toLowerCase()
      } else if (this.currentMenu == "mfacialhair") {
        color = this.colors[this.equipedItems.beardColor].toLowerCase()
      }
      return new URL(`../../assets/images/tints/${color}.png`, import.meta.url).href;
    },
    getTitle() {
      if (this.displayOutfitId && this.currentMenu == "outfit" && this.index > 0) {
        return this.title + ' ('+this.index+')'
      }
      return this.title
    }
  },
  props : {
    title : {
      default : 'Title',
      type: String,
    },
    index: Number,
    icon : {
      default : false,
    },
    isCurrent : {
      default : false,
    }
  }
}
</script>
