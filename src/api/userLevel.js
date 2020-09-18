import request from '@/utils/request'

export function createUserLevel(id,data) {
  return request({
    url:'/relation/create/'+id,
    method:'post',
    data:data
  })
}

export function getUserLevel(id) {
  return request({
    url:'/relation/getUserLevel/'+id,
    method:'get'
 
  })
}

export function updateUserLevel(id,data) {
  return request({
    url:'/relation/update/'+id,
    method:'post',
    data:data
  })
}