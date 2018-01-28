import jwt from 'jsonwebtoken'
import conf from '../../config'

export default () => {
    return async (ctx, next) => {
        if ( conf.auth.blackList.some(v => ctx.path.indexOf(v) >= 0) ) {
            let token = ctx.cookies.get(conf.auth.tokenKey);
            try {
                jwt.verify(token, conf.auth.admin_secret);
            }catch (e) {
                if ('TokenExpiredError' === e.name) {
                    ctx.sendError('token已过期, 请重新登录!');
                    ctx.throw(401, 'token expired,请及时本地保存数据！');
                }
                ctx.sendError('token验证失败, 请重新登录!');
                ctx.throw(401, 'invalid token');
            }
            console.log("鉴权成功");
        }
        await next();
    }
}