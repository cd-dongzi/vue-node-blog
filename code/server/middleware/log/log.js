import log4js from 'log4js'
import access from './access' // 引入日志输出信息的封装文件
import config from '../../config'
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];

// 提取默认公用参数对象
const baseInfo = config.log
export default (options = {}) => {
    let contextLogger = {}, //错误日志等级对象，最后会赋值给ctx上，用于打印各种日志
        appenders = {}, //日志配置
        opts = Object.assign({}, baseInfo, options), //系统配置
        {
            logLevel,
            dir,
            ip,
            projectName
        } = opts,
        commonInfo = {
            projectName,
            ip
        }; //存储公用的日志信息

    //指定要记录的日志分类
    appenders.all = {
        type: 'dateFile', //日志文件类型，可以使用日期作为文件名的占位符
        filename: `${dir}/all/`, //日志文件名，可以设置相对路径或绝对路径 
        pattern: 'task-yyyy-MM-dd.log', //占位符，紧跟在filename后面  
        alwaysIncludePattern: true //是否总是有后缀名 
    }
    
    // 环境变量为dev local development 认为是开发环境
    if (config.env === "dev" || config.env === "local" || config.env === "development") {
        appenders.out = {
            type: "console"
        }
    }

    let logConfig = {
        appenders,

        /**
         * 指定日志的默认配置项
         * 如果 log4js.getLogger 中没有指定，默认为 cheese 日志的配置项
         */
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: logLevel
            }
        }
    }

    let logger = log4js.getLogger('cheese');
    return async (ctx, next) => {
        const start = Date.now() // 记录请求开始的时间

        // 循环methods将所有方法挂载到ctx 上
        methods.forEach((method, i) => {
            contextLogger[method] = message => {
                logConfig.appenders.cheese = {
                    type: 'dateFile', //日志文件类型，可以使用日期作为文件名的占位符
                    filename: `${dir}/${method}/`,
                    pattern: `${method}-yyyy-MM-dd.log`,
                    alwaysIncludePattern: true //是否总是有后缀名 
                }
                log4js.configure(logConfig)
                logger[method](access(ctx, message, commonInfo))
            }
        })
        ctx.log = contextLogger
        await next()
        // 记录完成的时间 作差 计算响应时间
        const responseTime = Date.now() - start
        
        ctx.log.info(access(ctx, {
            responseTime: `响应时间为${responseTime/1000}s`
        }, commonInfo))

    }

}