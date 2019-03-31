<template>
  <tr>
    <TableColumnHeader
      v-for="column in columns"
      :key="column.name"
      :column="column"
      :isNoSorting="column.name !== activeSortingColumnName"
      @new-sort="handleNewSort"
      @new-filter="handleNewFilter"
    />
  </tr>
</template>

<script>
import TableColumnHeader from "./TableColumnHeader.vue";
export default {
  components: { TableColumnHeader },
  props: {
    columns: Array
  },
  data() {
    return {
      activeSortingColumnName: null,
      filters: {}
    };
  },

  methods: {
    handleNewSort({ initiator, sortFunc }) {
      if (this.activeSortingColumnName !== initiator) {
        this.activeSortingColumnName = initiator;
      }
      this.$emit("new-sort-function", sortFunc);
    },
    handleNewFilter({ initiator, filterFunc }) {
      this.filters[initiator] = filterFunc;
      this.$emit("new-filter-function", this.getTotalFilter());
    },
    getTotalFilter() {
      return Object.values(this.filters).reduce(
        (totalFilter, filter) => items => filter(totalFilter(items))
      );
    }
  }
};
</script>

<style></style>
