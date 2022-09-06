<template>
  <div>
    <v-btn @click="handleClick">Click Me</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit("click", "HELLO WORLD");
    },
  },
};
</script>
