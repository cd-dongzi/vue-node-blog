import mongoose from 'mongoose'
import conf from './config'
// const DB_URL = `mongodb://${conf.mongodb.address}/${conf.mongodb.db}`
const DB_URL = `mongodb://${conf.mongodb.username}:${conf.mongodb.pwd}@${conf.mongodb.address}/${conf.mongodb.db}`; // 账号登陆
mongoose.Promise = global.Promise
mongoose.connect(DB_URL, { useMongoClient: true }, err => {
    if (err) {
        console.log("数据库连接失败！")
    }else{
        console.log("数据库连接成功！")
    }
})
export default mongoose
