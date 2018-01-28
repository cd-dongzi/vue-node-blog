import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import blog from './modules/blog'
import other from './modules/other'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        permission,
        blog,
        other
    },
    getters
})

export default store