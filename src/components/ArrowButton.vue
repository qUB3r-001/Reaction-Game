<template>
  <q-btn flat padding="0" :style="open && { color: 'white' }">
    <q-icon :name="icon" :class="`rotate-${angle}`"
  /></q-btn>
</template>

<script>
  export default {
    name: "ArrowButton",
    props: {
      open: Boolean,
      icon: String,
      angle: String,
    },
    methods: {},
  };
</script>

<style lang="scss" scoped></style>
