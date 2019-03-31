<template>
  <div>
    <h2>Character Table</h2>
    <SmartTable :columns="columns" :items="characters" />
  </div>
</template>

<script>
import SmartTable from "../components/SmartTable.vue";
import charactersData from "../data.json";
import {
  FilterTypes,
  ColumnFilterTypes,
  IsColumnNumeric
} from "../constants/constants.js";

export default {
  components: { SmartTable },
  data() {
    return {
      titles: null,
      characters: null
    };
  },
  created() {
    const { titles: columns, items: characters } = charactersData;
    this.columns = Object.keys(columns).map(columnName => ({
      name: columnName,
      title: columns[columnName],
      filterType: ColumnFilterTypes[columnName],
      isNumeric: IsColumnNumeric[columnName],
      availableSelections:
        ColumnFilterTypes[columnName] === FilterTypes.SELECT
          ? getAvailableSelections(characters, columnName)
          : null
    }));
    this.characters = characters;
  }
};

function getAvailableSelections(characters, columnName) {
  const allAvailableSelections = [];
  characters
    .map(character => character[columnName])
    .forEach(value => {
      allAvailableSelections.push(...value.split(", "));
    });
  const uniqueAvailableSelections = [...new Set(allAvailableSelections)].sort();
  return uniqueAvailableSelections;
}
</script>

<style></style>
