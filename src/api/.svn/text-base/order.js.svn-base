import request from '@/utils/request'
export function fetchList(params) {
	return request({
		url: '/order/list',
		method: 'get',
		params: params
	})
}

export function fetchListSup(params) {
	return request({
		url: '/order/listSup',
		method: 'get',
		params: params
	})
}

export function closeOrder(params) {
	return request({
		url: '/order/update/close',
		method: 'post',
		params: params
	})
}

export function deleteOrder(params) {
	return request({
		url: '/order/delete',
		method: 'post',
		params: params
	})
}

export function deliveryOrder(data) {
	return request({
		url: '/order/update/delivery',
		method: 'post',
		data: data
	});
}

export function getOrderDetail(id) {
	return request({
		url: '/order/' + id,
		method: 'get'
	});
}

export function updateReceiverInfo(data) {
	return request({
		url: '/order/update/receiverInfo',
		method: 'post',
		data: data
	});
}

export function updateMoneyInfo(data) {
	return request({
		url: '/order/update/moneyInfo',
		method: 'post',
		data: data
	});
}

export function updateOrderNote(params) {
	return request({
		url: '/order/update/note',
		method: 'post',
		params: params
	})
}

//佣金列表
export function commissionList(id) {
	return request({
		url: '/order/commissionList/' + id,
		method: 'get'
	});
}
//奖金列表
export function rewardList(id) {
	return request({
		url: '/order/rewardList/' + id,
		method: 'get'
	});
}
//清除分润
export function rewardAndCommissionStatus(id) {
	return request({
		url: '/order/rewardAndCommissionStatus/' + id,
		method: 'get'
	});
}

//分润弹出回显
export function commissionInfo(id) {
	return request({
		url: '/order/commissionInfo/' + id,
		method: 'get'
	});
}

export function getOrderCofrim(data) {
  return request({
    url:'/order/getOrderCofrim/',
    method:'post',
    data: data
  });
}

//供应商导出数据

export function supDateList(params) {
	return request({
		url: '/order/supDateList',
		method: 'get',
		params: params
	})
}

export function supDateResult(data) {
	return request({
		url: '/order/supDateResult',
		method: 'post',
		data: data,
		headers: {'Content-Type': 'multipart/form-data'}
	})
}

export function updateSubCommission(data) {
	return request({
		//url:'/test/ok/update/subCommission',
		url: '/test/ok/list',
		method: 'post',
		data: data
	});
}



export function logisticList(params) {
	return request({
		url: '/order/logisticList',
		method: 'get',
		params: params
	})
}


//订单跟踪
export function goodsIntoByOrderId(id) {
	return request({
		url: '/order/goodsIntoByOrderId/' + id,
		method: 'get'
	});
}

export function exports(params) {
	return request({
		url: '/order/exports',
		method: 'get',
		params: params
	});
}





