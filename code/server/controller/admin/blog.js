import blogModel from '../../models/blog'
import path from 'path'
import marked from 'marked'

marked.setOptions({
    renderer: new marked.Renderer(),
    renderer: new marked.Renderer(),
    gfm: true, //允许 Git Hub标准的markdown.
    tables: true, //允许支持表格语法。该选项要求 gfm 为true。
    breaks: true, //允许回车换行。该选项要求 gfm 为true。
    pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
    sanitize: true, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
    smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
})

module.exports = {
    async list (ctx, next) {
        console.log('----------------获取博客列表 blog/list-----------------------');
        let { keyword, pageindex = 1, pagesize = 10} = ctx.request.query;
        console.log('keyword:'+keyword+','+'pageindex:'+pageindex +','+ 'pagesize:'+pagesize)
        try {
            
            let reg = new RegExp(keyword, 'i')
            let data = await ctx.findPage(blogModel, {
                $or: [
                    {type: { $regex: reg}},
                    {title: { $regex: reg}}
                ]
            }, {createTime: 0, html: 0}, {limit: pagesize*1, skip: (pageindex-1)*pagesize});
            ctx.send(data)
        }catch (e){
            console.log(e)
            ctx.sendError(e)
        }
        
    },

    async add (ctx, next) {
        console.log('----------------添加博客 blog/add-----------------------');
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(blogModel, {title: paramsData.title})
            if (data) {
                ctx.sendError('数据已经存在, 请重新添加!')
            }else{
                
                
                paramsData.html = marked(paramsData.html);
                let data = await ctx.add(blogModel, paramsData);
                ctx.send(paramsData)
            }
        }catch(e) {
            ctx.sendError(e)
        }
    },

    async update (ctx, next) {
        console.log('----------------更新博客 blog/update-----------------------');
        let paramsData = ctx.request.body;
        try {
            paramsData.html = marked(paramsData.html);
            let data = await ctx.update(blogModel, {_id: paramsData._id}, paramsData)
            ctx.send()
        }catch(e) {
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    },

    async del (ctx, next) {
        console.log('----------------删除博客 blog/del-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(blogModel, {_id: id})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
    }
}