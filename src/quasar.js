import Vue from "vue";
import { Notify } from "quasar";
import "./styles/quasar.sass";
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar } from "quasar";

Vue.use(Quasar, {
  config: {},
  plugins: [Notify],
  extras: [
    "material-icons",
    "mdi-v6",
    "ionicons-v5",
    "eva-icons",
    "fontawesome-v5",
    "themify",
    "line-awesome",
    "bootstrap-icons",
  ],
});
