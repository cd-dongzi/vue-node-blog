import Busboy from 'busboy'
import fs from 'fs'
import path from 'path'
import conf from '../../config'

//检测文件并创建文件
const mkdirSync = dirname => {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

export const uploadFile = (ctx, opts) => {
    //重命名
    function rename (fileName) {
     return Math.random().toString(16).substr(2) + '.' + fileName.split('.').pop()
    }
    
    console.log(ctx.req.headers)
    let busboy = new Busboy({headers: ctx.req.headers});
    console.log('start uploading...')
    /*
        filename: 字段名，
        file: 文件流,
        filename: 文件名
    */
    return new Promise( (resolve, reject) => {
        var fileObj = {}
        busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
            let filePath = '',
                imgPrefix = ''

            if (fieldname === 'markdown_img') {
                filePath = path.join(opts.path, mimetype.split('/')[0] + 's/markdown')
                imgPrefix = `${ctx.protocol}://${ctx.host}/${mimetype.split('/')[0]}s/markdown`
            }else{
                filePath = path.join(opts.path, mimetype.split('/')[0] + 's')
                imgPrefix = `${ctx.protocol}://${ctx.host}/${mimetype.split('/')[0]}s` 
            }
            
            
            if (!mkdirSync(filePath)) {
                throw new Error('没找到目录')
            }
            let fName = rename(filename),
                fPath = path.join(path.join(filePath, fName))
            file.pipe(fs.createWriteStream(fPath))

            file.on('end', () => {
                fileObj[fieldname] = `${imgPrefix}/${fName}`
            })
        })

        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
            fileObj[fieldname] = val;
        })

        busboy.on('finish',  async () => {
            resolve(fileObj)
            console.log('finished...')
        })
        busboy.on('error', function (err) {
           console.log('err:' + err)
           reject(err)
        })

        ctx.req.pipe(busboy)
    })
}

// export const uploadFile = (ctx, opts) => {
//     //重命名
//     function rename (fileName) {
//      return Math.random().toString(16).substr(2) + '.' + fileName.split('.').pop()
//     }
//     console.log(ctx.req.headers)
//     let busboy = new Busboy({headers: ctx.req.headers});
//     console.log('start uploading...')
//     /*
//         filename: 字段名，
//         file: 文件流,
//         filename: 文件名
//     */
//     return new Promise( (resolve, reject) => {
//         var fileObj = {};
//         busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
//             let filePath = '',
//                 imgPrefix = ''
//             filePath = path.join(opts.path, mimetype.split('/')[0] + 's')
//             imgPrefix = `${ctx.header.origin}/${mimetype.split('/')[0]}s`
//             if (!mkdirSync(filePath)) {
//                 throw new Error('没找到目录')
//             }
//             let fName = rename(filename),
//                 fPath = path.join(path.join(filePath, fName))

//             file.pipe(fs.createWriteStream(fPath))

//             file.on('end', () => {
//                 fileObj[fieldname] = `${imgPrefix}/${fName}`
//             })
//         })

//         busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
//             fileObj[fieldname] = val;
//         })

//         busboy.on('finish',  async () => {
//             resolve(fileObj)
//             console.log('finished...')
//         })
//         busboy.on('error', function (err) {
//            console.log('err:' + err)
//            reject(err)
//         })

//         ctx.req.pipe(busboy)
//     })
// }


// //删除文件
// export const delFile = (dirname, ctx) => {  
    
//     return new Promise( (resolve, reject) => {
//         let files = [],
//             filePath = dirname.replace(ctx.request.origin, _root_path).replace(/\\/g,'\/');
//         if(fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//             resolve()
//             console.log('删除成功') 
//         }else{
//             reject('文件不存在')
//         }
//     })
// };


// //删除文件夹
// export const delFolder = (dirname, ctx) => {  
//     return new Promise( (resolve, reject) => {
//         let filePath = dirname.replace(ctx.request.origin, _root_path).replace(/\\/g,'\/').split('\/').slice(0, -1).join('\/');
//         del(filePath, ctx)
//         function del (fPath, ctx) {
//             let files = [];
//             if(fs.existsSync(fPath)) {
//                 files = fs.readdirSync(fPath);
//                 files.forEach( file => {  
//                     var curPath = fPath + "/" + file;  
//                     if(fs.statSync(curPath).isDirectory()) { //遇到文件夹 递归删除
//                         del(curPath, ctx);  
//                     } else { 
//                         fs.unlinkSync(curPath);  
//                     }  
//                 });  
//                 fs.rmdirSync(fPath);
//                 console.log('删除成功')
//                 resolve()  
//             }else{
//                 console.log('不存在该目录');
//                 reject('不存在该目录')
//             }
//         }
//     })
// };