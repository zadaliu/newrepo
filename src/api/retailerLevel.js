import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/umsRetailerLevel/productByGroupId',
    method:'get',
    params:params
  })
}


export function retailerLevellist() {
  return request({
    url:'/umsRetailerLevel/listAll',
    method:'get'
  })
}


export function createTitle(data) {
  return request({
    url:'/umsRetailerLevel/create',
    method:'post',
    data:data
  })
}

export function createRetail(data) {
  return request({
    url:'/umsRetailerLevel/createRetail',
    method:'post',
    data:data
  })
}


export function getTitle(id) {
  return request({
    url:'/umsRetailerLevel/getById/'+id,
    method:'get',
  })
}

export function getRetailerById(id) {
  return request({
    url:'/umsRetailerLevel/getRetailerById/'+id,
    method:'get',
  })
}

export function updateTitle(id, data) {
	return request({
		url: '/umsRetailerLevel/update/' + id,
		method: 'post',
		data: data
	})
}

export function updateRetail( data) {
	return request({
		url: '/umsRetailerLevel/updateRetail',
		method: 'post',
		data: data
	})
}

export function deleteSelectAll (data) {
  return request({
    url:'/title/delete',
    method:'post',
    data:data
  })
}

export function titleList(id) {
  return request({
    url:'/title/listFroMemberId/'+id,
    method:'get'
  })
}

export function getLevel() {
  return request({
    url:'/umsRetailerLevel/getLevel',
    method:'get'
  })
}

export function getAchievementList(params) {
  return request({
    url:'/umsRetailerLevel/getAchievement',
    method:'get',
    params: params
  })
}



export function banrdLevel(id) {
  return request({
    url:'/umsRetailerLevel/banrdLevel/'+id,
    method:'get'
  })
}


