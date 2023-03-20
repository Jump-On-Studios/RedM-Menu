<template>
  <header>
    <h1>{{ lang('bigTitle') }}</h1>
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