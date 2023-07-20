import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/";

// import dotenv from "dotenv";
// dotenv.config();

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount("#app");
