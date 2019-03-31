<template>
  <div>
    <input v-model="inputValue" type="text" />
  </div>
</template>

<script>
export default {
  props: {
    columnName: String
  },
  data() {
    return { inputValue: [] };
  },
  watch: {
    inputValue() {
      console.log("inputValue changed", this.inputValue);
      this.$emit("new-text-filter-function", this.createFilter());
    }
  },
  methods: {
    createFilter() {
      return items =>
        items.filter(item =>
          item[this.columnName]
            .toLowerCase()
            .includes(this.inputValue.toLowerCase())
        );
    }
  }
};
</script>

<style scoped></style>
