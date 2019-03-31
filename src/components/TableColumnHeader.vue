<template>
  <th>
    <div @click="handleSortClick">
      {{ column.title }}
      {{ sortingSymbol }}
    </div>
    <ColumnFilter
      :column="column"
      @new-filter-function="handleNewFilterFunction"
    />
  </th>
</template>

<script>
import { SortOrders } from "../constants/constants.js";
import ColumnFilter from "./ColumnFilter.vue";
export default {
  components: { ColumnFilter },
  props: {
    column: Object,
    isNoSorting: { type: Boolean, default: true }
  },
  data() {
    return {
      isSorted: false,
      sortOrder: null
    };
  },
  computed: {
    sortingSymbol() {
      return this.isSorted
        ? this.sortOrder === SortOrders.MAX_TO_MIN
          ? "⇧"
          : "⇩"
        : "";
    }
  },
  methods: {
    handleSortClick() {
      if (this.isSorted) {
        this.sortOrder =
          this.sortOrder === SortOrders.MAX_TO_MIN
            ? SortOrders.MIN_TO_MAX
            : SortOrders.MAX_TO_MIN;
      } else {
        this.isSorted = true;
        this.sortOrder = SortOrders.MAX_TO_MIN;
      }
      this.$emit("new-sort", {
        initiator: this.column.name,
        sortFunc: this.createSortFunc()
      });
    },
    createSortFunc() {
      return items => {
        return [...items].sort((itemA, itemB) => {
          const valueA = this.getSortableValue(itemA);
          const valueB = this.getSortableValue(itemB);
          if (this.sortOrder === SortOrders.MAX_TO_MIN) {
            return valueA > valueB ? +1 : -1;
          } else if (this.sortOrder === SortOrders.MIN_TO_MAX) {
            return valueA < valueB ? +1 : -1;
          }
        });
      };
    },
    getSortableValue(tableItem) {
      if (this.column.isNumeric) {
        const numericValue = parseFloat(tableItem[this.column.name]);
        return isNaN(numericValue) ? Infinity : numericValue;
      }
      return tableItem[this.column.name];
    },
    handleNewFilterFunction(newFilterFunc) {
      this.$emit("new-filter", {
        initiator: this.column.name,
        filterFunc: newFilterFunc
      });
    }
  },
  watch: {
    isNoSorting(isNoSorting) {
      if (isNoSorting) this.isSorted = false;
    }
  }
};
</script>

<style></style>
