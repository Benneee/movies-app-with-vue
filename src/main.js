import { createApp } from "vue";
import App from "./App.vue";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "./style.css";
import { router } from "./router";

createApp(App)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
  })
  .mount("#app");
