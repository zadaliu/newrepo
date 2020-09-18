import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/banner/listAll',
    method:'get',
    params:params
  })
}

export function createTitle(data) {
  return request({
    url:'/banner/create',
    method:'post',
    data:data
  })
}

export function getTitle(id) {
  return request({
    url:'/banner/getById/'+id,
    method:'get',
  })
}

export function updateTitle(id, data) {
	return request({
		url: '/banner/update/' + id,
		method: 'post',
		data: data
	})
}



export function deleteSelectAll (data) {
  return request({
    url:'/banner/delete',
    method:'post',
    data:data
  })
}
