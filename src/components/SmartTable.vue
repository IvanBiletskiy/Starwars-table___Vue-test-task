<template>
  <div>
    <table class="smart-table table">
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
          :clickHandle="rowClickHandle"
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
    items: Array,
    rowClickHandle: Function
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

<style>
.smart-table {
  width: 100%;
}

.smart-table th {
  font-size: 13px;
  font-weight: normal;
  background: #b9c9fe;
  border-top: 4px solid #aabcfe;
  border-bottom: 1px solid #fff;
  color: #039;
  padding: 8px;
}
.smart-table td {
  background: #e8edff;
  border-bottom: 1px solid #fff;
  color: #669;
  border-top: 1px solid transparent;
  padding: 8px;
}
.smart-table tr:hover td {
  background: #ccddff;
}
</style>
