import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import store from './store'
import path from 'path'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import { unique } from './validation/unique'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueGoodTablePlugin);
Vue.config.productionTip = false;


Vue.use(VeeValidate);
Vue.use(path)



VeeValidate.Validator.extend('unique', unique);


/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
});