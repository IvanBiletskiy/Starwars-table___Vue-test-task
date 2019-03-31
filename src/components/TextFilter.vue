<template>
  <div class="text-filter-container">
    <input
      v-model="inputValue"
      type="text"
      class="text-filter-input"
      placeholder="search"
    />
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

<style>
.text-filter-container {
  padding-top: 0.2em;
}
.text-filter-input {
  width: 100%;
  padding: 0.5em;
}
</style>
