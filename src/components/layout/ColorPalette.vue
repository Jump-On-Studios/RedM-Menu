<template>
  <ColorPicker
 		@color-change="updateColor"
    :visible-formats="['rgb']" 
    defaultFormat="rgb"
    alpha-channel="hide"
  />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { ColorPicker } from 'vue-accessible-color-picker';
export default {
  components: {
    ColorPicker
  },
  computed: {
  },
  methods: {
    updateColor(eventData) {
      console.log(eventData.colors.rgb)
    }
  },
}
</script>