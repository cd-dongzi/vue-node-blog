<template>
    <div class="app-wrapper" :class="{hideSidebar: $store.state.app.slideBar.opened}">
        <SlideBar class="slidebar-container"></SlideBar>
        <div class="main-container">
            <NavBar></NavBar>
            <ContentView></ContentView>
        </div>
    </div>
</template>

<script>
import { SlideBar, NavBar, ContentView } from './index'
export default {
    name: 'layout',
    components: {
        SlideBar,
        NavBar,
        ContentView
    }

}
</script>


<style lang="less" scoped>
    .app-wrapper {
        &.hideSidebar {
			.slidebar-container{
                width: 64px;
                overflow: inherit;
			}
			.main-container {
				margin-left: 64px;
			}
		}
        .slidebar-container {
			height: 100%;
			position: fixed;
            top: 0;
			bottom: 0;
			left: 0;
			z-index: 1001;
			overflow-y: auto;
			transition: width 0.28s ease-out;
		}
		.main-container {
			min-height: 100%;
			margin-left: 200px;
			transition: margin-left 0.28s ease-out;
		}
    }
</style>


