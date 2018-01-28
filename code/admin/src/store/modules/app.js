import { Local } from 'src/utils/storage'
const app = {
    state: {
        slideBar: {
            opened: Local.get('slideBarStatus')
        },
        tagViews: JSON.parse(Local.get('tagViews')) || [],
        is_add_router: false
    },
    mutations: {
        TOGGLE_SIDEBAR(state) {
            if (state.slideBar.opened) {
                Local.set('slideBarStatus', false);
            } else {
                Local.set('slideBarStatus', true);
            }
            state.slideBar.opened = !state.slideBar.opened;
        },
        ADD_TAGVIEW(state, tag) {
            if (state.tagViews.some( v => v.name === tag.name)) return;
            state.tagViews.push({name: tag.name, path: tag.path});
            Local.set('tagViews',JSON.stringify(state.tagViews));
        },
        DEL_TAGVIEW(state, tag) {
            let index;
            for (let [i, v] of state.tagViews.entries()) {
                if (v.name === tag.name) index = i;
            }
            state.tagViews.splice(index, 1);
            Local.set('tagViews',JSON.stringify(state.tagViews));
        }
    },
    actions: {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR');
        },
        addTagView({commit}, tag) {
            commit('ADD_TAGVIEW', tag);
        },
        delTagView ({commit}, tag) {
            commit('DEL_TAGVIEW', tag)
        }
    }
};
export default app
