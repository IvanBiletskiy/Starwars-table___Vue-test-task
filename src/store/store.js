import Vue from "vue";
import Vuex from "vuex";
import jsonCharactersData from "@/data.json";
import Mutations from "@/store/mutation-types.js";

Vue.use(Vuex);

let characters, titles;
const localStorageCharactersData = localStorage.getItem("charactersData");
if (localStorageCharactersData) {
  const { characters: storageCharacters, titles: storageTitles } = JSON.parse(
    localStorageCharactersData
  );
  characters = storageCharacters;
  titles = storageTitles;
} else {
  const { items: jsonCharacters, titles: jsonTitles } = jsonCharactersData;
  characters = jsonCharacters;
  titles = jsonTitles;
  localStorage.setItem(
    "charactersData",
    JSON.stringify({ characters, titles })
  );
}

const syncToLocalStoragePlugin = store => {
  store.subscribe((_mutation, state) => {
    localStorage.setItem("charactersData", JSON.stringify(state));
  });
};

export default new Vuex.Store({
  state: {
    characters: characters,
    titles: titles
  },
  mutations: {
    [Mutations.SAVE_CHARACTER](state, newCharacter) {
      state.characters.forEach((character, index, characters) => {
        if (character.id === newCharacter.id) {
          characters[index] = newCharacter;
        }
      });
    },
    [Mutations.DELETE_CHARACTER](state, characterId) {
      state.characters = state.characters.filter(
        character => character.id !== characterId
      );
    }
  },
  actions: {
    saveCharacter({ commit }, character) {
      commit(Mutations.SAVE_CHARACTER, character);
    },
    deleteCharacter({ commit }, characterId) {
      commit(Mutations.DELETE_CHARACTER, characterId);
    }
  },
  plugins: [syncToLocalStoragePlugin]
});
