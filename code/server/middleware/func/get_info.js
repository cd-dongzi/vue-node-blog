export const get_client_ip = ctx => {
    return ctx.request.headers['x-forwarded-for'] || 
         (ctx.request.connection && ctx.request.connection.remoteAddress) || 
         ctx.request.socket.remoteAddress ||
         (ctx.request.connection.socket && ctx.request.connection.socket.remoteAddress) || null
}