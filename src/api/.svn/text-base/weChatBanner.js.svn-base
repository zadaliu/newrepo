import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/weChatBanner/listAll',
    method:'get',
    params:params
  })
}

export function createTitle(data) {
  return request({
    url:'/weChatBanner/create',
    method:'post',
    data:data
  })
}

export function getTitle(id) {
  return request({
    url:'/weChatBanner/getById/'+id,
    method:'get',
  })
}

export function updateTitle(id, data) {
	return request({
		url: '/weChatBanner/update/' + id,
		method: 'post',
		data: data
	})
}



export function deleteSelectAll (data) {
  return request({
    url:'/weChatBanner/delete',
    method:'post',
    data:data
  })
}
