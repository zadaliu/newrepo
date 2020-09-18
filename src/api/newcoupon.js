import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/newcoupon/list',
    method:'get',
    params:params
  })
}

export function historyList(params) {
  return request({
    url:'/newcoupon/historyList',
    method:'get',
    params:params
  })
}



export function queryListById(params) {
  return request({
    url:'/newcoupon/productById',
    method:'get',
    params:params
  })
}
export function createCoupon(data) {
  return request({
    url:'/newcoupon/create',
    method:'post',
    data:data
  })
}

export function getCoupon(id) {
  return request({
    url:'/newcoupon/'+id,
    method:'get',
  })
}

export function updateCoupon(id,data) {
  return request({
    url:'/newcoupon/update/'+id,
    method:'post',
    data:data
  })
}

export function deleteCoupon(id) {
  return request({
    url:'/newcoupon/delete/'+id,
    method:'post',
  })
}


export function updateCouponStatus(id,status) {
  return request({
    url:'/newcoupon/updateCouponStatus/'+id+"/"+status,
    method:'get',
  })
}

//优惠券效果数据
export function couponInfo(id) {
  return request({
    url:'/newcoupon/couponInfo/'+id,
    method:'get',
  })
}



