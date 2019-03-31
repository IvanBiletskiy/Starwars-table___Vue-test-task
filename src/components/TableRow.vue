<template>
  <tr>
    <td v-for="column in columns" :key="column.name">
      {{ item[column.name] }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    columns: Array
  }
};
</script>

<style scoped></style>
