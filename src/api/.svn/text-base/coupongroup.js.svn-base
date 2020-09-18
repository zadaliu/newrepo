import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/smsNewCouponGiftBag/list',
    method:'get',
    params:params
  })
}

export function queryList() {
  return request({
    url:'/smsNewCouponGiftBag/querylist',
    method:'get'
  })
}

export function createCoupon(data) {
  return request({
    url:'/smsNewCouponGiftBag/create',
    method:'post',
    data:data
  })
}

export function getCoupon(id) {
  return request({
    url:'/smsNewCouponGiftBag/'+id,
    method:'get',
  })
}

export function updateCoupon(id,data) {
  return request({
    url:'/smsNewCouponGiftBag/update/'+id,
    method:'post',
    data:data
  })
}

export function deleteCoupon(id) {
  return request({
    url:'/smsNewCouponGiftBag/delete/'+id,
    method:'post',
  })
}
