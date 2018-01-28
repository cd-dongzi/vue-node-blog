import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.css'
import './javascript/index'

import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import customComponents from './custom-components'
Vue.use(customComponents)

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})