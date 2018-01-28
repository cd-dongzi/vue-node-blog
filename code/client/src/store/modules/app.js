import { Local } from '../../utils/storage'
import axios from '../../utils/fetch.js'
const app = {
    state: {
        screen_width: 0,
        pc_width: 767,
        pc_bol: (function(){
            let w = document.documentElement.clientWidth || document.body.clientWidth;
            if (w > 767) return true
                return false
        })()
    },
    mutations: {
        CHANGESCREENWIDTH (state, width) {
            state.screen_width = width
        },
        CHANGEHEADERHEIGHT (state, height) {
            state.header_height = height
        }
    },
    actions: {
        changeScreenWidth ({commit}, width) {
            commit('CHANGESCREENWIDTH', width)
        },
        changeHeaderHeight ({commit}, height) {
            commit('CHANGEHEADERHEIGHT', height)
        }
    }
}
export default app