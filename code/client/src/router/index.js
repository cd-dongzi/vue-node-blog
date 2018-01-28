import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// const _import_ = file => () => import('components/' + file + '.vue')
const _import_ = file => () => import('views/' + file + '.vue')

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: _import_('home/index'),
            redirect: 'blog/all',
            children: [
                {
                    path: 'blog/:classify',
                    component: _import_('home/blog')
                }
            ]
        },
        {
            path: '/article/:id',
            component: _import_('Article/index')
        }
    ]
})

export default router