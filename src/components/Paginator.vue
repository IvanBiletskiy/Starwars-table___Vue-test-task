<template>
  <div>
    <paginate
      :pageCount="pageCount"
      :containerClass="'pagination'"
      :clickHandler="clickCallback"
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
      currentPage: 0
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.filteredItems.length / this.itemsOnPageCount);
    },
    startIndex() {
      return this.currentPage * this.itemsOnPageCount;
    },
    endIndex() {
      return this.startIndex + this.itemsOnPageCount;
    }
  },
  methods: {
    clickCallback(pageNumber) {
      this.currentPage = pageNumber - 1;
      // this.$emit("new-window-function", this.windowFunction());
    },
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
