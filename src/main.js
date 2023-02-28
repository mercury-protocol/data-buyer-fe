/* eslint-disable vue/multi-word-component-names */

import { createApp } from "vue";
import App from "./App.vue";

// // Bootstrap
// import BootstrapVue3 from "bootstrap-vue-3";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

// PrimeVue Items
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import InputText from "primevue/inputnumber";

// Tailwind
import "./main.css";

// PrimeVue CSS
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const app = createApp(App);

app.use(PrimeVue).use(ToastService);
// .use(BootstrapVue3);

app
  .component("Button", Button)
  .component("InputNumber", InputNumber)
  .component("Toast", Toast)
  .component("InputText", InputText);

app.mount("#app");
