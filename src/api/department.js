import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/brand/list',
    method:'get',
    params:params
  })
}


export function groupList() {
  return request({
    url:'/department/groupList',
    method:'get'
  })
}


export function departmentList(params) {
  return request({
    url:'/department/list',
    method:'get',
    params:params
  })
}

export function departmentListAll(params) {
  return request({
    url:'/department/listAll',
    method:'get',
    params:params
  })
}

export function deleteGroup(id) {
  return request({
    url:'/department/goodsGroup/delete/'+id,
    method:'get',
  })
}
export function createGroup(data) {
  return request({
    url:'/department/goodsGroup/create',
    method:'post',
    data:data
  })
}

export function getGroup(id) {
  return request({
    url:'/department/goodsGroup/getById/'+id,
    method:'get',
  })
}

export function deleteSelectAll(data) {
  return request({
    url:'/department/select/delete',
    method:'post',
    data:data
  })
}

export function updateGroup(id,data) {
  return request({
    url:'/department/goodsGroup/update/'+id,
    method:'post',
    data:data
  })
}


