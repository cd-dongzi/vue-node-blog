<template>
    <el-dialog title="歌曲编辑" :visible.sync="dialogTableVisible" class="edit-wrapper" @close="close" width="80%">
        <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
            <el-form-item label="音乐类型" prop="type">
                <el-select v-model="info.type" multiple clearable placeholder="请选择音乐类型" class="block">
                    <el-option v-for="item in blogTypes" :key="item.name" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
                <el-input type="text" v-model="info.title"></el-input>
            </el-form-item>
            <el-form-item label="文章描述" prop="desc">
                <el-input type="textarea" v-model="info.desc"></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="markdown">
                <Markdown v-model="info.markdown"></Markdown>
            </el-form-item>
            <el-form-item label="级别" prop="album">
                <el-select v-model="info.level" placeholder="请选择级别" class="block">
                    <el-option v-for="item in [1,2,3,4,5,6]" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源" prop="source">
                <el-select v-model="info.source" placeholder="请选择来源" class="block">
                    <el-option v-for="item in sources" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Github" prop="github">
                <el-input type="text" v-model="info.github"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" prop="releaseTime">
                <el-date-picker class="block" v-model="info.releaseTime" type="date" placeholder="选择发布日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否可见" prop="isVisible" class="left-item">
                <el-switch v-model="info.isVisible"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')" :loading="loading">更新</el-button>
            </el-form-item>

        </el-form>
    </el-dialog>
</template>


<script>
    import { mapGetters } from 'vuex'
    import Markdown from 'components/Markdown'
    export default {
        components: { Markdown },
        props: ['info'],
        data() {
            return {
                dialogTableVisible: true,
                loading: false,
                rules: {
                    type: [
                        { required: true, message: '请选择至少选择一个文章类型', trigger: 'change', type: 'array' }
                    ],
                    title: [
                        { required: true, message: '请填写文章标题', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请填写文章描述', trigger: 'blur' }
                    ],
                    markdown: [
                        { required: true, message: '请填写文章内容', trigger: 'blur' }
                    ],
                    releaseTime: [
                        { required: true, message: '请选择文章的发布时间', trigger: 'change', type: 'date' }
                    ]
                }
            }
        },
        methods: {
            close() {
                this.$emit('close')
            },
            submitForm(formName) {
                this.loading = true;
                this.$refs[formName].validate( async (valid) => {
                    // console.log(this.info)
                    if (valid) {
                        try {
                            this.info.html = this.info.markdown
                            await this.$store.dispatch('updateBlog', this.info);
                            this.loading = false;
                            // this.$router.push('/music/list');
                            this.close()
                        }catch (e) {
                            this.loading = false;
                        }
                        

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }

        },
        computed: {
            ...mapGetters([
                'blogTypes',
                'sources'
            ])
        }
    }
</script>


<style lang="less" scoped>
    .edit-wrapper {
        .block {
            width: 100%;
            display: block;
        }
        .form {
            // width: 400px;
        }
        .submit {
            width: 100px;
        }
    }
</style>