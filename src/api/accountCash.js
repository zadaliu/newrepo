import request from '@/utils/request'

export function findById(id) {
	return request({
		url: '/accountCash/findById/' + id,
		method: 'get',
	})
}

export function findByIdToMap(id) {
	return request({
		url: '/accountCash/findByIdToMap/' + id,
		method: 'get',
	})
}


export function updateSucsee(id,data) {
  return request({
    url:'/accountCash/updateSucsee/'+id,
    method:'post',
    data:data
  })
}


export function fetchList(params) {
	return request({
		url: '/accountCash/list',
		method: 'get',
		params: params
	})
}

export function memberTeamCount(id) {
  return request({
    url:'/accountCash/memberTeamCount/'+id,
    method:'get',
  })
}


export function selectSyd(id) {
  return request({
    url:'/accountCash/selectSyd/'+id,
    method:'get',
  })
}