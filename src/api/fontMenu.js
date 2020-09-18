import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/fontMenu/listAll',
    method:'get',
    params:params
  })
}

export function createTitle(data) {
  return request({
    url:'/fontMenu/create',
    method:'post',
    data:data
  })
}

export function getTitle(id) {
  return request({
    url:'/fontMenu/getById/'+id,
    method:'get',
  })
}

export function updateTitle(id, data) {
	return request({
		url: '/fontMenu/update/' + id,
		method: 'post',
		data: data
	})
}



export function deleteSelectAll (data) {
  return request({
    url:'/fontMenu/delete',
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