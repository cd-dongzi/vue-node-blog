<template>
    <article>
        <h1 class="title">{{blogInfo.title}}</h1>
        <div class="article-wrapper">
            <Back></Back>
            <div class="content">
                <div class="box">
                    <Github class="github" :link="blogInfo.github" v-if="blogInfo.github"></Github>
                    <div class="entry">
                        <h1>{{blogInfo.title}}</h1>
                        <time>{{blogInfo.releaseTime | parseTime('{y}-{m}-{d}')}}</time>
                        <div class="intro fmt" v-html="blogHtml"></div>
                    </div>
                    <div class="logo">
                        <img :src="require(`src/images/source_single_${blogInfo.source === 1?1:blogInfo.source === 2?2:3}.png`)" alt="">
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            blogHtml: ''
        }
    },
    async mounted () {
        await this.$store.dispatch('getBlogInfo', this.$route.params.id)
        this.blogHtml = this.blogInfo.html.replace(/<a /gi, `<a target='_blank'`)
        if (this.$route.query.type === 'comment') {
            setTimeout( () => {
                this.goAnchor()
            },0)
        }
        
    },
    methods: {
        goAnchor () {
            let oComment = document.querySelector('#comment');
            let scrollTop = oComment.offsetTop;
            document.documentElement.scrollTop = scrollTop;
            document.body.scrollTop = scrollTop;        
        }
    },
    computed: {
        ...mapGetters([
            'blogInfo'
        ])
    },
    watch: {
        blogInfo () {
            document.title = this.blogInfo.title
        }
    }
}
</script>


<style lang="less" scoped>
    .title {
        text-align: center;
        margin: 20px 0;
    }
    .article-wrapper {
        width: 7rem;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        padding-top: 0;

        .content {
            width: 100%;
            padding: 10px;
            background: #f9f9f3 url('../../images/note-bg.jpg');
            text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.25);
            

            .box {
                padding: 0.3rem 0.6rem;
                border: 1px dashed #c9c9c7;
                position: relative;
                .github {
                    position: absolute;
                    right:0;top:0;
                }

                .entry {
                    line-height: 30px;
                    h1 {
                        margin-bottom: 20px;
                        text-align: center;
                        color: @theme-red-color;
                    }
                    time {
                        color: #b2b2ae;
                        font-size: 12px;
                        margin-bottom: 20px;
                        display: block;
                        text-align: center;
                    }
                    .intro {
                        overflow-x: scroll;
                        font-size: 14px;
                        @media screen and (max-width: @pc-width){
                            font-size: 12px;
                        }
                        
                    }
                }

                .logo {
                    margin-top: 30px;
                    margin-right: -20px;
                    text-align: right;
                    // padding-right: 0.3rem;
                    img {
                        width: 50px;
                    }
        
                }
            }

            
        }
    }
</style>



