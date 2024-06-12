<template>
   <ul class="helpers">
    <li class="helper" v-if="canBuy()">
      <h2>{{ lang('buy') }}</h2>
      <div :class="['image',{'pressed':keysPressed.Enter}]">
        <div class="canProgress">
        </div>
        <div class="progress" v-if="keysPressed['Enter']">
        </div>
        <img src="/assets/images/keys/enter.png"/>
      </div>
    </li>
    <li class="helper" v-if="!canBuy()">
      <h2>{{ lang('select') }}</h2>
      <div :class="['image',{'pressed':keysPressed.Enter}]">
        <img src="/assets/images/keys/Enter.png"/>
      </div>
    </li>
    <li class="helper" v-if="hasColor()">
      <h2>{{ lang('color') }}</h2>
      <div :class="['image',{'pressed':keysPressed.ArrowLeft}]">
        <img src="/assets/images/keys/ArrowLeft.png"/>
      </div>
      <div :class="['image',{'pressed':keysPressed.ArrowRight}]">
        <img src="/assets/images/keys/ArrowRight.png"/>
      </div>
    </li>
    <li class="helper">
      <h2>{{ lang('back') }}</h2>
      <div :class="['image',{'pressed':keysPressed.Backspace}]">
        <img src="/assets/images/keys/Backspace.png"/>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      keysPressed:{},
      keyTimeout:{}
    }
  },
  computed: {
    ...mapGetters(['menu','lang','parentTree','currentMenu','audios','menuItems','cItem'])
  },
  methods: {
    hasColor() {
      return this.cItem.color
    },
    canBuy() {
      return this.cItem.price
    },
    canBack() {
      return this.parentTree.length > 0
    },
    handleKeydown(e) {
      if (this.keysPressed[e.key]) return
      
      this.keysPressed[e.key] = true;
      if (e.key == "Enter" && this.canBuy()) {
        if (this.keyTimeout[e.key])
          clearTimeout(this.keyTimeout[e.key])
        this.keyTimeout[e.key] = setTimeout(async () => {
          var bought = await this.$API.post('buy',{
            menu: this.currentMenu,
            num: this.menuItems[this.menu.currentItem].data.num,
            color: this.menu.currentColor + 1,
            price: this.menuItems[this.menu.currentItem].price
          })
          if (bought) {
            this.$API.PlayAudio(this.audios.coin)
          }
        },2000)
      }
      return;
    },
    handleKeyup(e) {
      this.keysPressed[e.key] = false;
      if (this.keyTimeout[e.key])
        clearTimeout(this.keyTimeout[e.key])
      return;
    }
  },
  beforeMount () {
    window.addEventListener('keydown', this.handleKeydown, null);
    window.addEventListener('keyup', this.handleKeyup, null);
  },
  beforeUnmount () {
  	window.removeEventListener('keydown', this.handleKeydown);
  	window.removeEventListener('keyup', this.handleKeyup);
  }
}
</script>