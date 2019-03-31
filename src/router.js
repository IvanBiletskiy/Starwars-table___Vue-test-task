import Vue from "vue";
import Router from "vue-router";
import TableView from "./views/TableView.vue";
import CharacterEditorView from "@/views/CharacterEditorView.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "table",
      component: TableView
    },
    {
      path: "/character/:id",
      name: "characterEditor",
      component: CharacterEditorView
    }
  ]
});
