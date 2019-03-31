<template>
  <div>
    <Multiselect
      v-model="selectedValues"
      :options="availableSelections"
      :close-on-select="false"
      :clear-on-select="false"
      :multiple="true"
    ></Multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  props: {
    availableSelections: Array,
    columnName: String
  },
  data() {
    return { selectedValues: [] };
  },
  watch: {
    selectedValues() {
      this.$emit("new-select-filter-function", this.createFilter());
    }
  },
  methods: {
    createFilter() {
      let filterFunc;
      if (this.selectedValues.length === 0) {
        filterFunc = items => {
          return items;
        };
        // filterFunc.isDefault = true;
      } else {
        filterFunc = items => {
          const filteredItems = items.filter(item => {
            return item[this.columnName].split(", ").some(itemValue => {
              return this.selectedValues.includes(itemValue);
            });
          });
          return filteredItems;
        };
      }
      // filterFunc.source = this.columnName;
      // filterFunc.selectedValues = this.selectedValues;

      return filterFunc;
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped></style>
