import store from '../store'
import { getToken } from 'src/utils/auth'
import { router } from './index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
    NProgress.start()

    if (getToken()) { //存在token
        if (to.path === '/login') { //当前页是登录直接跳过进入主页
            next('/')
        }else{
            if (!store.state.user.roles) { // 不存在用户信息， 需要重新拉取
                store.dispatch('getUserInfo').then( res => { //拉取用户信息
                    let roles = res.data.roles
                    store.dispatch('setRoutes', {roles}).then( () => { //根据权限动态添加路由
                        router.addRoutes(store.state.permission.addRouters)
                        next({ ...to }) //hash模式  确保路由加载完成
                    });
                })
            }else{ // 存在信息，直接跳转到该页面
                next()
            }
        }
    }else{
        if (whiteList.indexOf(to.path) >= 0) { //是否在白名单内,不在的话直接跳转登录页
            next()
        }else{
            next('/login')
        }

    }    

})
router.afterEach((to, from) => {
    document.title = to.name
    NProgress.done()
})

export default router
