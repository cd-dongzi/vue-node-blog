import { constantRouterMap, asyncRouterMap } from 'src/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param role
 * @param route
 */
const hasPermission = (roles, route) => {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}


/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param role
 */
const filterAsyncRouter = (asyncRouterMap, roles) => {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

const permission = {
    state: {
        routes: constantRouterMap.concat(asyncRouterMap),
        addRouters: []
    },
    mutations: {
        SETROUTES(state, routers) {
            state.addRouters = routers;
            state.routes = constantRouterMap.concat(routers);
        }
    },
    actions: {
        setRoutes({ commit }, info) {
            return new Promise( (resolve, reject) => {
                let {roles} = info;
                let accessedRouters = [];
                if (roles.indexOf('admin') >= 0) {
                    accessedRouters = asyncRouterMap;
                }else{
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }

                commit('SETROUTES', accessedRouters)
                resolve()
            })
        }
        
    }
}
export default permission