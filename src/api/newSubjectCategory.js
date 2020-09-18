import request from '@/utils/request'


export function fetchList(params) {
	return request({
		url: '/subjectCategory/listAll',
		method: 'get',
		params: params
	})
}

export function createTitle(data) {
  return request({
    url:'/subjectCategory/create',
    method:'post',
    data:data
  })
}

export function getTitle(id) {
  return request({
    url:'/subjectCategory/getById/'+id,
    method:'get',
  })
}

export function updateTitle(id, data) {
	return request({
		url: '/subjectCategory/update/' + id,
		method: 'post',
		data: data
	})
}

export function deleteSelectAll (data) {
  return request({
    url:'/subjectCategory/delete',
    method:'post',
    data:data
  })
}

export function queryList () {
  return request({
    url:'/subjectCategory/getList',
    method:'get',
  })
}