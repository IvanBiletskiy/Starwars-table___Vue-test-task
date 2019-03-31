<template>
  <div class="character-editor">
    <h3>{{ character.name }}</h3>
    <table class="table">
      <tr
        v-for="characterProperty in characterProperties"
        :key="characterProperty.name"
      >
        <td>
          <label :for="characterProperties.name">
            {{ characterProperty.title }}
          </label>
        </td>
        <td>
          <input
            type="text"
            :name="characterProperty.name"
            :id="characterProperty.name"
            v-model="characterProperty.value"
          />
        </td>
      </tr>
    </table>

    <button type="button" class="btn btn-success" @click="handleSaveClick">
      Save
    </button>
    <button type="button" class="btn btn-danger" @click="handleDeleteClick">
      Delete
    </button>
    <div class="buttons-container">
      <button type="button" class="btn btn-primary" @click="$router.push('/')">
        To character table
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      characterProperties: []
    };
  },
  computed: {
    character() {
      return this.$store.state.characters[this.$route.params.id];
    },
    titles() {
      return this.$store.state.titles;
    }
  },
  mounted() {
    this.characterProperties = Object.keys(this.character)
      .filter(propertyName => propertyName !== "id")
      .map(propertyName => ({
        name: propertyName,
        title: this.titles[propertyName],
        value: this.character[propertyName]
      }));
  },
  methods: {
    ...mapActions(["saveCharacter", "deleteCharacter"]),
    handleSaveClick() {
      this.saveCharacter(this.createCharacterFromProperties());
      alert(`${this.character.name} saved!`);
      this.$router.push("/");
    },

    handleDeleteClick() {
      const characterName = this.character.name;
      this.deleteCharacter(this.character.id);
      alert(`${characterName} deleted!`);
      this.$router.push("/");
    },
    createCharacterFromProperties() {
      return this.characterProperties.reduce(
        (character, characterProperty) => {
          character[characterProperty.name] = characterProperty.value;
          return character;
        },
        { id: this.character.id }
      );
    }
  }
};
</script>

<style>
.character-editor {
  background-color: rgb(238, 238, 238);
  width: 30em;
  margin: auto;
  margin-top: 3em;
  padding: 0.5em 2em;
}
.character-editor button {
  min-width: 10em;
  margin: 1em;
}

.character-editor input {
  width: 100%;
}
.character-editor table td {
  width: 50%;
  padding: 0.5em;
  /* text-align: left; */
}
</style>
