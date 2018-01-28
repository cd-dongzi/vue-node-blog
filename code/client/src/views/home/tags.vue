<template>
    <div class="tags-wrapper">
        <ul>
            <li v-for="tag in blogTypes"><Tag :text="tag.name" :path="'/blog/'+tag.name"></Tag></li>
        </ul>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {

            }
        },
        methods: {

        },
        computed: {
            ...mapGetters([
                'blogTypes'
            ])
        }
    }
</script>
<style lang="less" scoped>
    .tags-wrapper {
        max-width: 7rem;
        margin: 20px auto;
    }
    li {
        display: inline-block;
        vertical-align: middle;
    }
</style>