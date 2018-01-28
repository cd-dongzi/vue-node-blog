import axios from 'src/utils/fetch'
const other = {
    state: {
        
    },
    mutations: {
        
    },
    actions: {
        markdown_upload_img ({commit}, formData) {
            return new Promise( (resolve, reject) => {
                axios.postFile('markdown_upload_img', formData)
                    .then( res => {
                        resolve(res)
                    }).catch( err => {
                        reject(err)
                    })
            })
        }
    }
};
export default other
