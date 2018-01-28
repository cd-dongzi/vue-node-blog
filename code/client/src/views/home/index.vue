<template>
    <div class="home-wrapper cf">
        <infoComponent></infoComponent>
        <div :class="{'tags-box': pc_bol}">
            <TagsComponent></TagsComponent>
        </div>
        <div :class="{'view-box': pc_bol}">
            <router-view>
                <BlogComponent></BlogComponent>
            </router-view>
        </div>
        

        
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import infoComponent from './info.vue'
    import BlogComponent from './blog.vue'
    import TagsComponent from './tags.vue'
    export default {
        data () {
            return {
                winH: document.documentElement.clientHeight || document.body.clientHeight
            }
        },
        components: {
            infoComponent,
            BlogComponent,
            TagsComponent
        },
        mounted () {
            window.addEventListener('scroll', () => {
                let distance = document.documentElement.scrollTop || document.body.scrollTop,
                    scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
                
                if (distance+this.winH >= scrollH) {
                    if (this.blogLoadingBol) {
                        console.log(111)
                        // this.pageindex ++;
                        // this.$store.dispatch('getBlogList', {
                        //     type: this.$route.params.classify,
                        //     pageindex: this.pageindex
                        // })
                    }
                }
            })
        },
        computed: {
            ...mapGetters(['pc_bol'])
        }
    }
</script>
<style lang="less" scoped>
    .tags-box {
        width: 30%;
        float: left;
    }
    .view-box {
        width: 67%;
        float: right;
    }
</style>