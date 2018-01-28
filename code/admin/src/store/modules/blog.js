import axios from 'src/utils/fetch'
import { blogTypes } from './classify'

const music = {
	state: {
		blogTypes,
		list: [],
		total: 0
	},
	mutations: {
		BLOGLIST (state, data) {
			state.list = data.data.list;
			state.total = data.data.total;
		}
	},
	actions: {
		addBlog ({commit}, info) {
			return new Promise( (resolve, reject) => {
				axios.postFile('blog/add', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},

		getBlogList ({commit}, params) {
			return new Promise( (resolve, reject) => {
				axios.get('blog/list', params)
					.then( res => {
						commit('BLOGLIST', res)
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		delBlog ({commit}, id) {
			return new Promise( (resolve, reject) => {
				axios.get('blog/del', {id: id})
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		updateBlog ({commit}, info) {
			return new Promise( (resolve, reject) => {
				axios.postFile('blog/update', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		}
	}
}
export default music