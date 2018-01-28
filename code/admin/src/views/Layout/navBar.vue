<template>
    <div class="nav-bar-wrapper" separator="/">
        <Hamburger class="hamburger" :toggleClick="toggleSlideBar" :isActive="app.slideBar.opened"></Hamburger>
        <Levelbar class="levelbar"></Levelbar>
        <TabsView class="tabsview"></TabsView>
        <Account></Account>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Hamburger from 'components/Hamburger/index'
import Levelbar from './levelbar'
import TabsView from './tabsView'
import Account from './account'

export default {
    components: {
        Hamburger,
        Levelbar,
        TabsView,
        Account
    },
    methods: {
        toggleSlideBar () {
            this.$store.dispatch('toggleSideBar')
        }
    },
    computed: {
        ...mapState([
            'app'
        ])
    }
}
</script>

<style lang="less" scoped>

    .nav-bar-wrapper {
        height: 50px;
        // line-height: 50px;
        background: #eef1f6;
        >* {
            display: inline-block;
            vertical-align: middle;
        }
        .hamburger {
            line-height: 58px;
            width: 40px;
            height: 50px;
            padding: 0 10px;
        }
        .levelbar {
            font-size: 14px;
            line-height: 50px;
            margin-left: 10px;
        }
        .tabsview {
            margin-left: 10px;
        }
        
    }
</style>


