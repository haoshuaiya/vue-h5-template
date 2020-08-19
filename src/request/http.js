import axios from "axios";
import QS from "qs";
const instance = axios.create({
	baseURL: "/index.php?route=",
	timeout: 60000
});
// axios.defaults.baseURL = ''
// axios.defaults.timeout = 60000
instance.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded;charset=UTF-8";

// axios.interceptors.request.use()  请求拦截
// 响应拦截
instance.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	error => {
		if (error.response.status) {
			return Promise.reject(error.response);
		}
	}
);

/**
 * get方法封装
 * @param  {String} url [请求的url地址]
 * @param {Object} params [请求携带的参数]
 * @param {Boolean} shouldLogin [请求时是否需要登录状态]
 **/
export function get(url, params = {}, shouldLogin = true) {
	return new Promise((resolve, reject) => {
		instance
			.get(url, {
				params: params
			})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data);
			});
	});
}

/**
 * post方法封装
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求携带的参数]
 * @param {Boolean} shouldLogin [请求时是否需要登录状态]
 * **/

export function post(url, params = {}) {
	return new Promise((resolve, reject) => {
		let data = {};
		if (url.toLowerCase().includes("upload")) {
			instance.defaults.headers.post["Content-Type"] =
				"multipart/form-data";
			let fd = new FormData();
			// console.log(params);

			for (let key in params) {
				// console.log(key, params[key]);
				fd.append(key, params[key]);
			}
			data = fd;
		} else {
			instance.defaults.headers.post["Content-Type"] =
				"application/x-www-form-urlencoded;charset=UTF-8";
			data = QS.stringify(params);
		}
		instance
			.post(url, data)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data);
			});
	});
}
