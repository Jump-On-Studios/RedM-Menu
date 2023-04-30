<template>
  <header>
    <h1>{{ lang('headerTitle') }}</h1>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['lang'])
  }
}
</script>