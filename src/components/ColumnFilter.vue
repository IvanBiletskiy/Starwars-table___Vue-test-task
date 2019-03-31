<template>
  <div>
    <select-filter
      v-if="isSelectFilter"
      :availableSelections="column.availableSelections"
      :columnName="column.name"
      @new-select-filter-function="handleNewFilterFunction"
    />
    <text-filter
      v-if="isTextFilter"
      :columnName="column.name"
      @new-text-filter-function="handleNewFilterFunction"
    />
  </div>
</template>

<script>
import SelectFilter from "./SelectFilter.vue";
import TextFilter from "./TextFilter.vue";
import { FilterTypes } from "../constants/constants.js";

export default {
  components: { SelectFilter, TextFilter },
  props: { column: Object },
  computed: {
    isSelectFilter() {
      return this.column.filterType === FilterTypes.SELECT;
    },
    isTextFilter() {
      return this.column.filterType === FilterTypes.TEXT;
    }
  },
  methods: {
    handleNewFilterFunction(filterFunction) {
      this.$emit("new-filter-function", filterFunction);
    }
  }
};
</script>

<style></style>
