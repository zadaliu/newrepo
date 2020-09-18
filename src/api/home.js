import request from '@/utils/request'
export function homeData(params) {
	return request({
		url: '/home/data',
		method: 'get',
		params: params
	})
}

export function userCheckData(params) {
	console.log(params);
	return request({
		url: '/home/checkUser',
		method: 'get',
		params: params
	})
}


