import Vue from "vue";
import VueFlasshMessage from "vue-flash-message";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueFlasshMessage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
