import jwt from 'jsonwebtoken'
import conf from '../../config'
import userModel from '../../models/user'
module.exports = {
    async login (ctx, next) {
        console.log('----------------登录接口 user/login-----------------------');
        let {username, pwd} = ctx.request.body;
        console.log(username)
        try {
            let data = await ctx.findOne(userModel, {username: username});
            console.log(data)
            if (!data) {
                return ctx.sendError('用户名不存在！');
            }
            if (pwd !== data.pwd) {
                return ctx.sendError('密码错误,请重新输入！');
            }
            await ctx.update(userModel, {_id: data._id}, {$set:{loginTime: new Date()}}) //更新登陆时间

            let payload = {
                _id: data._id,
                username: data.username,
                name: data.name,
                roles: data.roles
            }
            let token = jwt.sign(payload, conf.auth.admin_secret, {expiresIn: '24h'})  //token签名 有效期为24小时
            ctx.cookies.set(conf.auth.tokenKey, token, {
                httpOnly: false,  // 是否只用于http请求中获取
            });
            console.log('登陆成功')
            ctx.send({message: '登录成功'});
        } catch (e) {
            if (e === '暂无数据') {
                console.log('用户名不存在')
                return ctx.sendError('用户名不存在');
            }
            ctx.throw(e);
            ctx.sendError(e)
        }
        
    },
    async info (ctx, next) {
        console.log('----------------获取用户信息接口 user/getUserInfo-----------------------');
        let token = ctx.request.query.token;
        try {
            let tokenInfo = jwt.verify(token, conf.auth.admin_secret);
            console.log(tokenInfo)
            ctx.send({
                username: tokenInfo.username,
                name: tokenInfo.name,
                _id: tokenInfo._id,
                roles: tokenInfo.roles
            })
        }catch (e) {
            if ('TokenExpiredError' === e.name) {
                ctx.sendError('鉴权失败, 请重新登录!');
                ctx.throw(401, 'token expired,请及时本地保存数据！');
            }
            ctx.throw(401, 'invalid token');
            ctx.sendError('系统异常!');
        }
        
    },

    async list (ctx, next) {
        console.log('----------------获取用户信息列表接口 user/getUserList-----------------------');
        let { keyword, pageindex = 1, pagesize = 10} = ctx.request.query;
        console.log('keyword:'+keyword+','+'pageindex:'+pageindex +','+ 'pagesize:'+pagesize)

        try {
            let reg = new RegExp(keyword, 'i')
            let data = await ctx.findPage(userModel, {
                $or: [
                    {name: { $regex: reg}},
                    {username: { $regex: reg}}
                ]
            }, {pwd: 0}, {limit: pagesize*1, skip: (pageindex-1)*pagesize});

            ctx.send(data)
        }catch (e){
            console.log(e)
            ctx.sendError(e)
        }

    },

    async add (ctx, next) {
        console.log('----------------添加管理员 user/add-----------------------');
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(userModel, {name: paramsData.name})
            if (data) {
                ctx.sendError('数据已经存在, 请重新添加!')
            }else{
                let data = await ctx.add(userModel, paramsData);
                ctx.send(paramsData)
            }
        }catch(e) {
            ctx.sendError(e)
        }
    },

    async update (ctx, next) {
        console.log('----------------更新管理员 user/update-----------------------');
        let paramsData = ctx.request.body;
        console.log(paramsData)
        try {
            let data = await ctx.findOne(userModel, {name: paramsData.name}) 
            if (paramsData.old_pwd !== data.pwd) {
                return ctx.sendError('密码不匹配!')
            }
            delete paramsData.old_pwd
            await ctx.update(userModel, {_id: paramsData._id}, paramsData)
            ctx.send()
        }catch(e) {
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    },

    async del (ctx, next) {
        console.log('----------------删除管理员 user/del-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(userModel, {_id: id})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
    }
}