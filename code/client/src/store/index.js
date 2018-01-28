import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import blog from './modules/blog'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        blog
    },
    getters
})

export default store;