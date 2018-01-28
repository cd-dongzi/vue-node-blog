const path = require('path');

module.exports = {
    async markdown_upload_img (ctx, next) {
        console.log('----------------添加图片 markdown_upload_img-----------------------');
        let opts = {
            path: path.resolve(__dirname, '../../../../public')
        }
        let result = await ctx.uploadFile(ctx, opts)
        ctx.send(result)
    },

    async del_markdown_upload_img (ctx, next) {
        console.log('----------------删除图片 del_markdown_upload_img-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(musicModel, {_id: id})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
        // console.log(id)
    }
}