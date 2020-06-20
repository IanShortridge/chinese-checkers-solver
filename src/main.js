import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue } from 'bootstrap-vue';

// Install BootstrapVue
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import VueLodash from 'vue-lodash';
import lodash from 'lodash';

Vue.use(VueLodash, { name: 'custom' , lodash: lodash });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
