import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/brand/list',
    method:'get',
    params:params
  })
}

export function groupList(params) {
  return request({
    url:'/goodsGroup/list',
    method:'get',
    params:params
  })
}



export function vertifyRecordById(id) {
  return request({
    url:'/brand/vertifyRecordById/'+id,
    method:'get',
  })
}

export function vertifyRecord(data) {
  return request({
    url:'/brand/vertifyRecord',
    method:'post',
    data:data
  })
}

export function deleteGroup(id) {
  return request({
    url:'/goodsGroup/goodsGroup/delete/'+id,
    method:'get',
  })
}
export function createGroup(data) {
  return request({
    url:'/goodsGroup/goodsGroup/create',
    method:'post',
    data:data
  })
}

export function getGroup(id) {
  return request({
    url:'/goodsGroup/goodsGroup/getById/'+id,
    method:'get',
  })
}

export function updateGroup(id,data) {
  return request({
    url:'/goodsGroup/goodsGroup/update/'+id,
    method:'post',
    data:data
  })
}

export function deleteSelectAll(data) {
  return request({
    url:'/goodsGroup/select/delete',
    method:'post',
    data:data
  })
}

export function createBrand(data) {
  return request({
    url:'/brand/create',
    method:'post',
    data:data
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/brand/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateFactoryStatus(data) {
  return request({
    url:'/brand/update/factoryStatus',
    method:'post',
    data:data
  })
}

export function deleteBrand(id) {
  return request({
    url:'/brand/delete/'+id,
    method:'get',
  })
}

export function getBrand(id) {
  return request({
    url:'/brand/'+id,
    method:'get',
  })
}

export function updateBrand(id,data) {
  return request({
    url:'/brand/update/'+id,
    method:'post',
    data:data
  })
}

