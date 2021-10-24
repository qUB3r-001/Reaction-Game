<template>
  <q-btn
    push
    round
    padding="0"
    :icon="icon"
    :class="open && 'text-white'"
    @click="() => this.Color(color)"
    @mouseenter="Show"
  />
</template>

<script>
  export default {
    name: "ColorButton",
    props: {
      icon: String,
      color: String,
      open: Boolean,
    },
    methods: {
      Color(color) {
        this.$parent.changeColor(color);
      },
      Show(e) {
        this.$parent.showData(e);
      },
    },
  };
</script>

<style lang="scss" scoped></style>
