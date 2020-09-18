import request from '@/utils/request'

export function createCouponProduct(id,proType,data) {
  return request({
    url:'/cprelation/create/'+id + '/' + proType,
    method:'post',
    data:data
  })
}

export function updateCouponProduct(id,proType,data) {
  return request({
    url:'/cprelation/update/'+id + '/' + proType,
    method:'post',
    data:data
  })
}

export function getCouponProduct(id) {
  return request({
    url:'/cprelation/productByCouponId/'+id ,
    method:'get'
  })
}
