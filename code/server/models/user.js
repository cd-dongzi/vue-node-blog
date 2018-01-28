import db from '../mongodb'
let userSchema = db.Schema({
    username: String,
    pwd: String,
    name: String,
    avatar: String,
    roles: Array,
    createTime: { type: Date, default: Date.now},
    loginTime: Date
})
export default db.model('user', userSchema);