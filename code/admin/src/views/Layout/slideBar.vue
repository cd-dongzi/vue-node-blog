<template>
<div class="silde-bar-wrapper">
    <el-menu class="el-menu-vertical" :default-active="$route.path" unique-opened router :collapse="$store.state.app.slideBar.opened">

        <template v-for="item in $store.state.permission.routes">
            <el-menu-item v-if="!item.hidden&&!item.dropdown" :index="(item.path === '/'?item.path:item.path+'/') + item.children[0].path">
                <Icon :name="item.icon" class="slide-icon"></Icon>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu v-if="!item.hidden&&item.dropdown" :index="item.path">
                <template slot="title">
                    <Icon :name="item.icon" class="slide-icon"></Icon>
                    <span>{{item.name}}</span>
                </template>
                <template v-for="child in item.children">
                    <el-menu-item :index="item.path + '/' +child.path">{{child.name}}</el-menu-item>
                </template>
            </el-submenu>
        </template>

    </el-menu>
</div>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false
            }
        },
        methods: {
            demo (path, child) {
                console.log(path, child);
                return path
            }
        }
    };
</script>

<style lang="less" scoped>
    .silde-bar-wrapper {
        .el-menu-vertical:not(.el-menu--collapse) {
            width: 200px;
            height: 100%;
        }
        .el-menu-vertical {
            height: 100%;
        }
        .el-menu {
            border-right: none;
        }
        .slide-icon {
            width: 24px;
            font-size: 20px;
            text-align: center;
            vertical-align: middle;
        }
    }
</style>