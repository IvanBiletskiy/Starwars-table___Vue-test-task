<template>
  <tr class="smart-table-row" @click.stop="clickHandle(item.id)">
    <td v-for="column in columns" :key="column.name">
      {{ item[column.name] }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    columns: Array,
    clickHandle: Function
  }
};
</script>

<style scoped>
.smart-table-row:hover {
  cursor: pointer;
}
</style>
