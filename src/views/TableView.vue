<template>
  <div>
    <h2>Character Table</h2>
    <SmartTable
      :columns="columns"
      :items="characters"
      :rowClickHandle="goToCharacterEditor"
    />
  </div>
</template>

<script>
import SmartTable from "../components/SmartTable.vue";
import {
  FilterTypes,
  ColumnFilterTypes,
  IsColumnNumeric
} from "../constants/constants.js";

export default {
  components: { SmartTable },
  computed: {
    characters() {
      return this.$store.state.characters;
    },
    titles() {
      return this.$store.state.titles;
    },
    columns() {
      return Object.keys(this.titles).map(columnName => ({
        name: columnName,
        title: this.titles[columnName],
        filterType: ColumnFilterTypes[columnName],
        isNumeric: IsColumnNumeric[columnName],
        availableSelections:
          ColumnFilterTypes[columnName] === FilterTypes.SELECT
            ? getAvailableSelections(this.characters, columnName)
            : null
      }));
    }
  },
  methods: {
    goToCharacterEditor(characterId) {
      this.$router.push(`/character/${characterId}`);
    }
  }
};
function getAvailableSelections(characters, columnName) {
  const allAvailableSelections = [];
  characters
    .map(character => character[columnName])
    .forEach(value => {
      allAvailableSelections.push(...value.split(",").map(str => str.trim()));
    });
  const uniqueAvailableSelections = [...new Set(allAvailableSelections)].sort();
  return uniqueAvailableSelections;
}
</script>

<style></style>
