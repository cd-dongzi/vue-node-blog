<template>
<div class="tabs-wwrapper">
    <router-link class="tab-view" :to="tag.path" v-for="tag in $store.state.app.tagViews.slice(-6)" :key="tag.name">
        <el-tag size="small" closable :type="isActive(tag)?'':'info'" @close="closeTagView(tag, $event)">
            {{tag.name}}
        </el-tag>
    </router-link>
</div>
</template>

<script>
    export default {
        mounted () {
            this.isActive()
        },
        methods: {
            isActive (tag) {
                if (!tag) return;
                return tag.path === this.$route.path;
            },
            closeTagView (tag, e) {
                this.$store.dispatch('delTagView', tag);
                e.preventDefault();
            },
            generateRoute () {
                if (this.$route.matched[this.$route.matched.length - 1].name) {
                    return this.$route.matched[this.$route.matched.length - 1];
                }
                return this.$route.matched[0]
            },
            addTagView () {
                this.$store.dispatch('addTagView', this.generateRoute());
            }
        },
        watch: {
            $route () {
                this.addTagView();
            }
        }
    };
</script>


<style lang="less" scoped>
    .tab-view {
        margin-left: 10px;
    }
</style>