import axios from 'src/utils/fetch'
import {getToken} from 'src/utils/auth'
import md5 from 'js-md5'
import axios1 from 'axios'

const user = {
	state: {
		list: [],
		userTotal: 0,
		name: '',
		username: '',
		roles: null,
		token: getToken(),
		otherList: []
	},
	mutations: {
		SET_TOKEN (state, token) {
			state.token = token;
		},
		SET_USERINFO (state, info) {
			state.name = info.name;
			state.username = info.username;
			state.roles = info.roles;
		},
		USERLIST (state, data) {
			state.list = data.list
			state.total = data.total;
		},
		GET_INFOLIST (state, data) {
			state.otherList = data;
		},
		CLEARINFO (state) {
			state.name = '';
			state.username = '';
			state.roles = null;
		}
	},
	actions: {
		clearInfo ({commit}) {
			commit('CLEARINFO')
		},
		userLogin ({state, commit}, info) {
			let {username, pwd} = info;
			return new Promise( (resolve, reject) => {
				axios.post('user/login',{
					username: username,
					pwd: md5(pwd)
				}).then( res => {
					// console.log(res)
					state.token = getToken();
					resolve(res)
				}).catch( err => {
					// console.log(err)
					reject(err)
				})
			})
		},
		getUserInfo ({state, commit}) {
			return new Promise( (resolve, reject) => {
				axios.get('user/info',{
					token: state.token
				}).then( res => {
					console.log(res)
					commit('SET_USERINFO', res.data)
					resolve(res)
				}).catch( err => {
					// console.log(err)
					reject(err)
				})
			})
		},
		getUserList ({commit}, params) {
			return new Promise( (resolve, reject) => {
				axios.get('user/list', params).then( res => {
					console.log(res)
					commit('USERLIST', res.data)
					resolve(res)
				}).catch( err => {
					// console.log(err)
					reject(err)
				})
			})
		},
		addUser ({commit}, info) {
			info.pwd = md5(info.pwd)
			return new Promise( (resolve, reject) => {
				axios.post('user/add', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		delUser ({commit}, id) {
			return new Promise( (resolve, reject) => {
				axios.get('user/del', {id: id})
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		updateUser ({commit}, info) {
			info.pwd = md5(info.pwd)
			info.old_pwd = md5(info.old_pwd)
			return new Promise( (resolve, reject) => {
				axios.post('user/update', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		}
		// getAddOtherInfo () {
		// 	return new Promise( (resolve, reject) => {
		// 		axios.post('admin_apis/info/add').then( res => {
		// 			// console.log(res)
		// 			resolve(res)
		// 		}).catch( err => {
		// 			// console.log(err)
		// 			reject(err)
		// 		})
		// 	})
		// },
		// getOtherInfoList ({commit}) {
		// 	return new Promise( (resolve, reject) => {
		// 		axios.get('admin_apis/info/list').then( res => {
		// 			// console.log(res)
		// 			commit('GET_INFOLIST', res.data)
		// 			resolve(res)
		// 		}).catch( err => {
		// 			// console.log(err)
		// 			reject(err)
		// 		})
		// 	})
		// }
	}
}

export default user