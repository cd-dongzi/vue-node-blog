<template>
    <div class="sign_out">
        <el-dropdown>
          <div class="el-dropdown-link">
                <Icon name="avatar" class="avatar"></Icon>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{userName}}</el-dropdown-item>
            <el-dropdown-item @click.native="removeCookie">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <span>{{$store.state.user.name}}</span>
        <Icon name="tuichu" class="sign_out_icon"></Icon> -->
    </div>
</template>
<script>
    import { removeToken } from '../../utils/auth'
    import { mapGetters } from 'vuex'
    export default {
        methods: {
            removeCookie () {
                removeToken()
                this.$store.dispatch('clearInfo')
                this.$router.push('/login')
            }
        },
        computed: {
            ...mapGetters(['userName'])
        }
    }
</script>
<style lang="less" scoped>
    .sign_out {
        float: right;
        margin-right: 20px;
        >*{
            display: inline-block;
            vertical-align: middle;
        }
        .avatar {
            font-size: 40px;
            margin-top: 5px;
            color: #4AB7BD;
        }
        img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            margin-top: 5px;
        }
        .sign_out_icon {
            color: #5a5e66;
            font-size: 20px;
            cursor: pointer;
            &:hover {
                color: #aaa;
            }
        }
    }
</style>