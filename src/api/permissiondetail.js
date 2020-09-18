import request from '@/utils/request'
export function fetchList(params) {
	return request({
		url: '/permission/treeList',
		// url:'/permission/listAll',
		method: 'get',
		params: params
	})
}

export function getPermissionDetail(id) {
	return request({
		url: '/permission/' + id,
		method: 'get'
	});
}

export function creatPermission(data) {
	return request({
		url: '/permission/create',
		method: 'post',
		data: data
	})
}

export function updatePermission(id, data) {
	return request({
		url: '/permission/update/' + id,
		method: 'post',
		data: data
	})
}

export function deletepermission(id) {
	return request({
		url: '/permission/delete/' + id,
		method: 'POST',
	})
}

export function closeOrder(params) {
	return request({
		url: '/order/update/close',
		method: 'post',
		params: params
	})
}

export function deliveryOrder(data) {
	return request({
		url: '/order/update/delivery',
		method: 'post',
		data: data
	});
}

export function updateReceiverInfo(data) {
	return request({
		url: '/order/update/receiverInfo',
		method: 'post',
		data: data
	});
}

export function updateMoneyInfo(data) {
	return request({
		url: '/order/update/moneyInfo',
		method: 'post',
		data: data
	});
}

export function updateOrderNote(params) {
	return request({
		url: '/order/update/note',
		method: 'post',
		params: params
	})
}