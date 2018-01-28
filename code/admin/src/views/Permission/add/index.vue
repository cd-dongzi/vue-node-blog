<template>
<article>
    <h2>添加管理员</h2>
    <div class="box">
        <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
            <el-form-item label="名字" prop="name">
                <el-input type="text" v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="info.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
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
                <el-button type="primary" @click="submitForm('form')" :loading="loading">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</article>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                info: {
                    name: '',
                    username: '',
                    pwd: '',
                    avatar: '',
                    roles: ['default']
                },
                roles: [
                    {label: '超级管理员', value: 'admin'},
                    {label: '普通管理员', value: 'default'},
                ],
                loading: false,
                rules: {
                    name: [
                        { required: true, message: '请填写名字', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
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
            submitForm(formName) {
                this.loading = true;
                this.$refs[formName].validate( async (valid) => {
                    if (valid) {
                        try{
                            await this.$store.dispatch('addUser', this.info);
                            this.loading = false
                            this.$router.push('/permission/list')
                        }catch(e) {
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