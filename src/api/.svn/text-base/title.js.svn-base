import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/title/listAll',
    method:'get',
    params:params
  })
}

export function createTitle(data) {
  return request({
    url:'/title/create',
    method:'post',
    data:data
  })
}

export function getTitle(id) {
  return request({
    url:'/title/getById/'+id,
    method:'get',
  })
}

export function updateTitle(id, data) {
	return request({
		url: '/title/update/' + id,
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