import Vue from 'vue'
import App from './App.vue'
import router from './router/permission'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/fetch'
import customComponents from './custom-components.js'

import './styles/index.css'
import './styles/index.less'
import './font/iconfont'


import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI)
Vue.use(customComponents)
Vue.prototype.axios = axios

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})