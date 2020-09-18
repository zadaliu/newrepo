import request from '@/utils/request'
export function fetchList(params) {
	return request({
		url: '/order/listUser',
		method: 'get',
		params: params
	})
}


export function getUser(id) {
	return request({
		url: '/order/getById/' + id,
		method: 'get',
	})
}

export function updateUser(id, data) {
	return request({
		url: '/order/update/' + id,
		method: 'post',
		data: data
	})
}

export function updateUserTitle(id, data) {
	return request({
		url: '/order/updateUserTitle/' + id,
		method: 'post',
		data: data
	})
}

export function deleteAdminSelectAll(data) {
	return request({
		url: '/order/deleteMember',
		method: 'post',
		data: data
	})
}







export function updateStatus(id, params) {
	return request({
		url: '/home/advertise/update/status/' + id,
		method: 'post',
		params: params
	})
}
export function deleteHomeAdvertise(data) {
	return request({
		url: '/home/advertise/delete',
		method: 'post',
		data: data
	})
}
export function createHomeAdvertise(data) {
	return request({
		url: '/home/advertise/create',
		method: 'post',
		data: data
	})
}


export function updateHomeAdvertise(id, data) {
	return request({
		url: '/home/advertise/update/' + id,
		method: 'post',
		data: data
	})
}

export function umsAdminList(params) {
	return request({
		url: '/admin/list',
		method: 'get',
		params: params
	})
}

//添加管理员
//
//
//
//

export function createAdmin(data) {
	return request({
		url: '/admin/register',
		method: 'post',
		data: data
	})
}

export function getAdmin(id) {
	return request({
		url: '/admin/' + id,
		method: 'get'
	})
}

export function updateAdmin(id, data) {
	return request({
		url: '/admin/update/' + id,
		method: 'post',
		data: data
	})
}


export function getTopMemberLevel() {
	return request({
		url: '/admin/getTopMemberLevel',
		method: 'get'
	})
}

export function getExport(params) {
	return request({
		url: '/order/export',
		method: 'get',
		params:params
	})
}


