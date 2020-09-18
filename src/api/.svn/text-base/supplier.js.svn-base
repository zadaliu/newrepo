/**
 * 供货商管理 
 */
import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/supplier/listAll',
    method:'get',
    params:params
  })
}

export function createTitle(data) {
  return request({
    url:'/supplier/create',
    method:'post',
    data:data
  })
}

export function getTitle(id) {
  return request({
    url:'/supplier/getById/'+id,
    method:'get',
  })
}

export function updateTitle(id, data) {
	return request({
		url: '/supplier/update/' + id,
		method: 'post',
		data: data
	})
}



export function deleteSelectAll (data) {
  return request({
    url:'/supplier/delete',
    method:'post',
    data:data
  })
}


export function getSupplier () {
  return request({
    url:'/supplier/listAllNoPage',
    method:'get',
  })
}

