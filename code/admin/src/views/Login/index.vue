<template>
<div class="login-wrapper">
    <el-form class="login-form">
        <h3>系统登录</h3>
        <el-form-item prop="username">
            <Icon name="iconzh1" class="icon-user"></Icon>
            <el-input type="text" placeholder="请输入用户名" class="username" v-model="loginInfo.username" @keydown.enter.native="login"/>
        </el-form-item>
        <el-form-item prop="password">
            <Icon name="login_password" class="icon-pwd"></Icon>
            <el-input type="password" placeholder="请输入密码" class="pwd" v-model="loginInfo.pwd" @keydown.enter.native="login"/>
        </el-form-item>
        <el-button type="primary" class="submit" @click="login" :loading="loading">登录</el-button>
    </el-form>
</div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loading: false,
                msg: "",
                loginInfo: {
                    username: "",
                    pwd: ""
                }
            };
        },
        methods: {
            async login() {
                this.loading = true;
                if (!this.loginInfo.username) {
                    this.msg = "请输入用户名";
                } else if (!this.loginInfo.pwd) {
                    this.msg = "请输入密码";
                }
                if (this.msg) {
                    this.$message({
                        message: this.msg,
                        type: "warning"
                    });
                    this.msg = "";
                    this.loading = false;
                    return;
                }   
                try {
                    await this.$store.dispatch('userLogin', this.loginInfo);
                    this.$router.push('/home')
                } catch (e) {
                    console.log(e)
                }           
                
                // console.log(data)
                // if (data.code !== 0) {
                //     this.$router.push('/home')
                // }
                this.loading = false;
            },

        }
    };
</script>

<style lang="less">
    .login-wrapper {
        width: 100%;
        height: 100%;
        position: fixed;
        background: #2d3a4b;
        .login-form {
            width: 400px;
            padding: 35px;
            position: absolute;
            left: 0%;
            right: 0%;
            top: 20%;
            margin: auto;
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
        h3 {
            font-size: 26px;
            color: #fff;
            margin-bottom: 50px;
        }
        .icon {
            color: #889aa4;
            vertical-align: middle;
            width: 1em;
            height: 1em;
            display: inline-block;
            margin-left: 10px;
        }
        .icon-user {
            width: 1.5em;
            height: 1.5em;
            margin-left: 8px;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #889aa4;
            height: 47px;
            vertical-align: middle;
            color: #eee;
        }
        .username input {
            padding: 12px 5px 12px 10px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .submit {
            width: 100%;
        }
    }
</style>