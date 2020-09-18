import request from '@/utils/request'
export function productByGroupId(params) {
	return request({
		url: '/smsAssemble/productByGroupId',
		method: 'get',
		params: params
	})
}

export function updateStatus(id,data) {
  return request({
    url:'/smsAssemble/update/status/'+id,
    method:'post',
    data:data
  })
}

export function EffectList(id) {
	return request({
		url: '/smsAssemble/effectListById/' + id,
		method: 'get',
	})
}

export function fetchList(params) {
	return request({
		url: '/smsAssemble/listAll',
		method: 'get',
		params: params
	})
}
export function deleteHomeAdvertise(data) {
	return request({
		url: '/smsAssemble/delete',
		method: 'post',
		data: data
	})
}

export function createAssembleMoney(id, data) {
	return request({
		url: '/smsAssembleMoney/create/' + id,
		method: 'post',
		data: data
	})
}

export function updateAssembleMoney(id, data) {
	return request({
		url: '/smsAssembleMoney/update/' + id,
		method: 'post',
		data: data
	})
}

export function createAssemble(data) {
	return request({
		url: '/smsAssemble/create',
		method: 'post',
		data: data
	})
}

export function updateAssemble(id, data) {
	return request({
		url: '/smsAssemble/update/' + id,
		method: 'post',
		data: data
	})
}

export function getAssemble(id) {
	return request({
		url: '/smsAssemble/getById/' + id,
		method: 'get',
	})
}

export function productByAssemble(id) {
	return request({
		url: '/smsAssemble/productByAssembleId/' + id,
		method: 'get',
	})
}

export function deleteGroup(id) {
	return request({
		url: '/goodsGroup/goodsGroup/delete/' + id,
		method: 'get',
	})
}

