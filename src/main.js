import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import vuetify from "./plugins/vuetify";

import { worker } from './mocks';

// Start a mock API server to handle auth requests
worker.start({
  onUnhandledRequest: 'bypass',
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
