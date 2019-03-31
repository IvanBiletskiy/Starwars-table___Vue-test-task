<template>
  <div>
    <table>
      <TableHeader
        :columns="columns"
        @new-sort-function="handleNewSortFunction"
        @new-filter-function="handleNewFilterFunction"
      />
      <tbody>
        <TableRow
          v-for="item in visibleItems"
          :key="item.id"
          :columns="columns"
          :item="item"
        />
      </tbody>
      <Paginator
        :filteredItems="filteredItems"
        @new-window-function="handleNewWindowFunction"
      />
    </table>
  </div>
</template>

<script>
import TableHeader from "./TableHeader.vue";
import TableRow from "./TableRow.vue";
import Paginator from "./Paginator.vue";

export default {
  components: {
    TableHeader,
    Paginator,
    TableRow
  },
  props: {
    columns: Array,
    items: Array
  },
  data() {
    return {
      sortFunc: tableData => tableData,
      filterFunc: tableData => tableData,
      windowFunc: tableData => tableData
    };
  },
  computed: {
    visibleItems: function() {
      return this.windowFunc(this.filteredItems);
    },
    filteredItems: function() {
      return this.sortFunc(this.filterFunc(this.items));
    }
  },
  methods: {
    handleNewSortFunction(newSortFunction) {
      this.sortFunc = newSortFunction;
    },
    handleNewFilterFunction(newFilterFunction) {
      this.filterFunc = newFilterFunction;
    },
    handleNewWindowFunction(newWindowFunction) {
      this.windowFunc = newWindowFunction;
    }
  }
};
</script>

<style></style>
