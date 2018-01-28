<template>
<article>
    <el-dialog title="管理员编辑" :visible.sync="dialogTableVisible" class="edit-wrapper" @close="close" width="80%">
        <div class="box">
            <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
                <el-form-item label="名字" prop="name">
                    <el-input type="text" v-model="info.name"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="info.username"></el-input>
                </el-form-item>
                <el-form-item label="原密码" prop="old_pwd">
                    <el-input type="password" v-model="info.old_pwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pwd">
                    <el-input type="password" v-model="info.pwd"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="roles">
                    <!-- <el-input type="textarea" v-model="info.roles"></el-input> -->
                    <el-select v-model="info.roles" multiple placeholder="请选择" class="block">
                        <el-option v-for="item in roles"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')" :loading="loading">编辑</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</article>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: ['info'],
        data() {
            return {
                roles: [
                    {label: '超级管理员', value: 'admin'},
                    {label: '普通管理员', value: 'default'},
                ],
                loading: false,
                dialogTableVisible: true,
                rules: {
                    name: [
                        { required: true, message: '请填写名字', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    old_pwd: [
                        { required: true, message: '请填写原密码', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请填写密码', trigger: 'blur' }
                    ],
                    roles: [
                        { required: true, message: '请选择权限', trigger: 'change', type: 'array' }
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
                    if (valid) {
                        try{
                            delete this.info.createTime
                            delete this.info.releaseTime
                            await this.$store.dispatch('updateUser', this.info);
                            this.loading = false
                            this.$router.push('/permission/list')
                            this.close()
                        }catch(e) {
                            this.info.pwd = ''
                            this.info.old_pwd = ''
                            this.loading = false
                        }
                    } else {
                        console.log('error submit!!');
                        this.loading = false;
                        return false;
                    }
                });
            }
        }
    }
</script>


<style lang="less" scoped>
    article {
        text-align: center;
        padding: 0 100px;
        h2 {
            text-align: center;
            line-height: 80px;
            color: #666;
            // margin-left: 100px;
        }
        .box {
            // margin-left: 100px;
            width: 500px;
            text-align: left;
        }
        .block {
            width: 100%;
            display: block;
        }
        .left-item {
            text-align: left;
        }
        .form {
        }
        .submit {
            width: 100px;
        }
    }
</style>