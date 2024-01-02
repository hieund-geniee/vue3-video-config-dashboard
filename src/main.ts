import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/scss/geniee-dashboard.scss";
createApp(App).use(store).use(router).mount("#app");
