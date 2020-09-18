import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/dom/listAll',
    method:'get',
    params:params
  })
}

export function createTitle(data) {
  return request({
    url:'/dom/create',
    method:'post',
    data:data
  })
}

export function getTitle(id) {
  return request({
    url:'/dom/getById/'+id,
    method:'get',
  })
}

export function updateTitle(id, data) {
	return request({
		url: '/dom/update/' + id,
		method: 'post',
		data: data
	})
}



export function deleteSelectAll (data) {
  return request({
    url:'/dom/delete',
    method:'post',
    data:data
  })
}
