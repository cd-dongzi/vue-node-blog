<template>
    <section class="blog-wrapper">
        <ul v-if="blogList.length > 0">
            <li class="article" v-for="(v, index) in blogList" :style="{'animation-delay': index%5*0.2+'s'}" @click="$router.push(`/article/${v._id}`)">
                <Github class="github mouse-pointer" background="rgba(186, 164, 119, 0.99)" :link="v.github" v-if="v.github"></Github>
                <time>{{v.createTime | parseTime('{y}-{m}-{d}')}}</time>
                <h2 class="name">{{v.title}}</h2>
                <div class="tags">
                    <Tag v-for="tag in v.type" :text="tag" :path="tag"></Tag>
                </div>
                <div class="desc">{{v.desc}}</div>
                <div class="source">
                    <img :src="require(`src/images/source_single_${v.source}.png`)" alt="">
                </div>
            </li>
        </ul>
        <NoneData v-else></NoneData>
        <Loading v-show="blogLoadingMore"></Loading>
    </section>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                pageindex: 1
            }
        },
        created () {
            this.getBlogData()
        },
        mounted () {
            window.addEventListener('scroll', () => {
                let distance = document.documentElement.scrollTop || document.body.scrollTop,
                    winH = document.documentElement.clientHeight || document.body.clientHeight,
                    scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
                
                if (distance+winH >= scrollH) {
                    if (this.blogLoadingBol) {
                        this.pageindex ++;
                        this.$store.dispatch('getBlogList', {
                            type: this.$route.params.classify,
                            pageindex: this.pageindex
                        })
                    }
                }
            })
        },
        methods: {
            getBlogData () {
                this.$store.dispatch('getBlogList', {
                    type: this.$route.params.classify,
                    pageindex: this.pageindex
                })
            }
        },
        computed: {
            ...mapGetters([
                'blogList',
                'blogLoadingMore',
                'blogLoadingBol'
            ])
        },
        watch: {
            $route (to, from) {
                this.getBlogData()
            }
        }
    }
</script>
<style lang="less" scoped>
    .bg-image-cover(@bgCover) {
        background: @vice-color;
        background-image: url(@bgCover);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .blog-wrapper {
        @keyframes change {
            100% {opacity: 1;}
        }
        .article {
            width: 7rem;
            max-width: 500px;
            padding-bottom: 70px;
            box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);
            margin: 30px auto;
            transition: box-shadow .4s;
            position: relative;
            opacity: 0.1;
            animation: change 1s;
            animation-fill-mode: forwards;
            color: #42484b;
            background-image: url('../../images/note-bg.jpg');
            
        
            &:hover {
                box-shadow: 5px 15px 30px 5px rgba(0, 0, 0, 0.15);
            }

            .github {
                position: absolute;
                right:0;top:0;
            }
            time {
                position: absolute;
                bottom: 35px;left:0;
                width: 150px;
                height: 34px;
                text-align: center;
                line-height: 34px;
                font-size: 14px;
                .bg-image-cover('../../images/date-bg.svg');
                &:before {
                    content: url('../../images/date-edge.svg');
                    position: absolute;
                    top:0px;right:calc(100% - 2px);
                    width: 11px;
                    height: 100%;
                }
                &:after {
                    content: url('../../images/date-tag.svg');
                    position: absolute;
                    top:0;left:calc(100% - 1px);
                    width: 13px;
                    height: 100%;
                }
                @media screen and (max-width: @pc-width){
                    &:before {
                        right:e("calc(100% - 0.07rem)");
                        top: -0.02rem;
                    }
                    &:after {
                        left: e("calc(100% - 0.02rem)");
                    }
                }
            }
            .name {
                text-align: center;
                color: @theme-red-color;
                line-height: 30px;
                padding-top: 10px;
            }
            .tags {
                display: block;
                text-align: center;
                font-size: 12px;
                line-height: 20px;
                padding-bottom: 5px;
                text-align: center;
            }
            .desc {
                width: 70%;
                min-height:90px;
                margin: 0 auto;
                font-size: 14px;
                text-align: left;
                line-height: 30px;
                text-align:justify;
                span {
                    color: #b2b2ae;
                    font-size: 12px;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
            .source {
                width: 70%;
                margin: 0 auto;
                text-align: right;
                img {
                    width: 30px;
                }
            
            }
            .btns {
                position: absolute;
                bottom:0;
                left:0;
                width: 100%;
                padding: 10px 0;
                text-align: right;
            }
        }
    }

</style>