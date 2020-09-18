import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/logo/listAll',
    method:'get',
    params:params
  })
}

export function createTitle(data) {
  return request({
    url:'/logo/create',
    method:'post',
    data:data
  })
}

export function getTitle(id) {
  return request({
    url:'/logo/getById/'+id,
    method:'get',
  })
}

export function updateTitle(id, data) {
	return request({
		url: '/logo/update/' + id,
		method: 'post',
		data: data
	})
}



export function deleteSelectAll (data) {
  return request({
    url:'/logo/delete',
    method:'post',
    data:data
  })
}
