<template>
  <div>
    <paginate
      v-model="currentPage"
      :pageCount="pageCount"
      :containerClass="'pagination'"
    ></paginate>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate";
export default {
  components: { Paginate },
  props: {
    filteredItems: Array,
    itemsOnPageCount: { type: Number, default: 10 }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    currentPageIndex() {
      return this.currentPage - 1;
    },
    pageCount() {
      return Math.ceil(this.filteredItems.length / this.itemsOnPageCount);
    },
    startIndex() {
      return this.currentPageIndex * this.itemsOnPageCount;
    },
    endIndex() {
      return this.startIndex + this.itemsOnPageCount;
    }
  },
  watch: {
    filteredItems() {
      this.currentPage = 1;
    }
  },
  methods: {
    windowFunction(items) {
      return items.filter(
        (item, index) => index >= this.startIndex && index < this.endIndex
      );
    }
  },
  mounted() {
    this.$emit("new-window-function", this.windowFunction);
  }
};
</script>

<style></style>
