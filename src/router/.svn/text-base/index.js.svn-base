import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [{
		path: '/login',
		component: () =>
			import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () =>
			import('@/views/404'),
		hidden: true
	},
	{
		path: '',
		component: Layout,
		redirect: '/home',
		children: [{
			path: 'home',
			name: 'home',
			component: () =>
				import('@/views/home/index'),
			meta: {
				title: '首页',
				icon: 'home'
			}
		}]
	}
]

export const asyncRouterMap = [

	{
			path: '/pms',
			component: Layout,
			redirect: '/pms/product',
			name: 'pms',
			meta: {
				title: '商品',
				icon: 'product'
			},
			children: [{
					path: 'product',
					name: 'product',
					component: () =>
						import('@/views/pms/product/index'),
					meta: {
						title: '商品列表',
						icon: 'product-list'
					}
				},
				{
					path: 'addProduct',
					name: 'addProduct',
					component: () =>
						import('@/views/pms/product/add'),
					meta: {
						title: '添加商品',
						icon: 'product-add'
					}
				},
				{
					path: 'updateProduct',
					name: 'updateProduct',
					component: () =>
						import('@/views/pms/product/update'),
					meta: {
						title: '修改商品',
						icon: 'product-add'
					},
					hidden: true
				},
				{
					path: 'productRecycle',
					name: 'productRecycle',
					component: () =>
						import('@/views/pms/product/index'),
					meta: {
						title: '商品回收站',
						icon: 'product-recycle'
					},
					hidden: true
				},
				{
					path: 'productComment',
					name: 'productComment',
					component: () =>
						import('@/views/pms/product/index'),
					meta: {
						title: '商品评价',
						icon: 'product-comment'
					},
					hidden: true
				},
				{
					path: 'productCate',
					name: 'productCate',
					component: () =>
						import('@/views/pms/productCate/index'),
					meta: {
						title: '商品分类',
						icon: 'product-cate'
					}
				},
				{
					path: 'addProductCate',
					name: 'addProductCate',
					component: () =>
						import('@/views/pms/productCate/add'),
					meta: {
						title: '添加商品分类'
					},
					hidden: true
				},
				{
					path: 'updateProductCate',
					name: 'updateProductCate',
					component: () =>
						import('@/views/pms/productCate/update'),
					meta: {
						title: '修改商品分类'
					},
					hidden: true
				},
				{
					path: 'productAttr',
					name: 'productAttr',
					component: () =>
						import('@/views/pms/productAttr/index'),
					meta: {
						title: '商品分类',
						icon: 'product-attr'
					}
				},
				{
					path: 'productAttrList',
					name: 'productAttrList',
					component: () =>
						import('@/views/pms/productAttr/productAttrList'),
					meta: {
						title: '商品属性列表'
					},
					hidden: true
				},
				{
					path: 'addProductAttr',
					name: 'addProductAttr',
					component: () =>
						import('@/views/pms/productAttr/addProductAttr'),
					meta: {
						title: '添加商品属性'
					},
					hidden: true
				},
				{
					path: 'updateProductAttr',
					name: 'updateProductAttr',
					component: () =>
						import('@/views/pms/productAttr/updateProductAttr'),
					meta: {
						title: '修改商品属性'
					},
					hidden: true
				},
			{
					path: 'brand',
					name: 'brand',
					component: () =>
						import('@/views/pms/brand/index'),
					meta: {
						title: '品牌管理',
						icon: 'product-brand'
					}
				},
				{
					path: 'addBrand',
					name: 'addBrand',
					component: () =>
						import('@/views/pms/brand/add'),
					meta: {
						title: '添加品牌'
					},
					hidden: true
				},
				{
					path: 'updateBrand',
					name: 'updateBrand',
					component: () =>
						import('@/views/pms/brand/update'),
					meta: {
						title: '编辑品牌'
					},
					hidden: true
				},
				{
					path: 'goodsProduct',
					name: 'goodsProduct',
					component: () =>
						import('@/views/pms/goodsProduct/goodGroup'),
					meta: {
						title: '商品分组',
						icon: 'sms'
					}
				},
				{
					path: 'goodGroupAdd',
					name: 'goodGroupAdd',
					component: () =>
						import('@/views/pms/goodsProduct/goodGroupAdd'),
					meta: {
						title: '分组添加',
						icon: 'product-brand'
					},
					hidden: true
				},
				{
					path: 'goodGroupEdit',
					name: 'goodGroupEdit',
					component: () =>
						import('@/views/pms/goodsProduct/goodGroupEdit'),
					meta: {
						title: '分组修改',
						icon: 'product-brand'
					},
					hidden: true
				}
			]
		},
		{
			path: '/oms',
			component: Layout,
			redirect: '/oms/order',
			name: 'oms',
			meta: {
				title: '订单',
				icon: 'order'
			},
			children: [{
					path: 'order',
					name: 'order',
					component: () =>
						import('@/views/oms/order/index'),
					meta: {
						title: '订单列表',
						icon: 'product-list'
					}
				},
				{
					path: 'orderDetail',
					name: 'orderDetail',
					component: () =>
						import('@/views/oms/order/orderDetail'),
					meta: {
						title: '订单详情'
					},
					hidden: true
				},
				{
					path: 'deliverOrderList',
					name: 'deliverOrderList',
					component: () =>
						import('@/views/oms/order/deliverOrderList'),
					meta: {
						title: '发货列表'
					},
					hidden: true
				},
				{
					path: 'orderSetting',
					name: 'orderSetting',
					component: () =>
						import('@/views/oms/order/setting'),
					meta: {
						title: '订单设置',
						icon: 'order-setting'
					}
				},
				{
					path: 'returnApply',
					name: 'returnApply',
					component: () =>
						import('@/views/oms/apply/index'),
					meta: {
						title: '退货申请处理',
						icon: 'order-return'
					}
				},
				{
					path: 'returnReason',
					name: 'returnReason',
					component: () =>
						import('@/views/oms/apply/reason'),
					meta: {
						title: '退货原因设置',
						icon: 'order-return-reason'
					}
				},
				{
					path: 'returnApplyDetail',
					name: 'returnApplyDetail',
					component: () =>
						import('@/views/oms/apply/applyDetail'),
					meta: {
						title: '退货原因详情'
					},
					hidden: true
				}
			]
		},
		{
			path: '/sms',
			component: Layout,
			redirect: '/sms/coupon',
			name: 'sms',
			meta: {
				title: '营销',
				icon: 'sms'
			},
			children: [
				//		{
				//				path: 'flash',
				//				name: 'flash',
				//				component: () =>
				//					import('@/views/sms/flash/index'),
				//				meta: {
				//					title: '秒杀活动列表',
				//					icon: 'sms-flash'
				//				}
				//			},
				{
					path: 'flashSession',
					name: 'flashSession',
					component: () =>
						import('@/views/sms/flash/sessionList'),
					meta: {
						title: '秒杀时间段列表'
					},
					hidden: true
				},
				{
					path: 'selectSession',
					name: 'selectSession',
					component: () =>
						import('@/views/sms/flash/selectSessionList'),
					meta: {
						title: '秒杀时间段选择'
					},
					hidden: true
				},
				{
					path: 'flashProductRelation',
					name: 'flashProductRelation',
					component: () =>
						import('@/views/sms/flash/productRelationList'),
					meta: {
						title: '秒杀商品列表'
					},
					hidden: true
				},
				//			{
				//				path: 'coupon',
				//				name: 'coupon',
				//				component: () =>
				//					import('@/views/sms/coupon/index'),
				//				meta: {
				//					title: '优惠券列表',
				//					icon: 'sms-coupon'
				//				}
				//			},
				{
					path: 'addCoupon',
					name: 'addCoupon',
					component: () =>
						import('@/views/sms/coupon/add'),
					meta: {
						title: '添加优惠券'
					},
					hidden: true
				},
				{
					path: 'updateCoupon',
					name: 'updateCoupon',
					component: () =>
						import('@/views/sms/coupon/update'),
					meta: {
						title: '修改优惠券'
					},
					hidden: true
				},
				{
					path: 'couponHistory',
					name: 'couponHistory',
					component: () =>
						import('@/views/sms/coupon/history'),
					meta: {
						title: '优惠券领取详情'
					},
					hidden: true
				},
				/*{
					path: 'brand',
					name: 'homeBrand',
					component: () =>
						import('@/views/sms/brand/index'),
					meta: {
						title: '品牌推荐',
						icon: 'product-brand'
					}
				},
				{
					path: 'new',
					name: 'homeNew',
					component: () =>
						import('@/views/sms/new/index'),
					meta: {
						title: '新品推荐',
						icon: 'sms-new'
					}
				},
				{
					path: 'hot',
					name: 'homeHot',
					component: () =>
						import('@/views/sms/hot/index'),
					meta: {
						title: '人气推荐',
						icon: 'sms-hot'
					}
				},
				{
					path: 'subject',
					name: 'homeSubject',
					component: () =>
						import('@/views/sms/subject/index'),
					meta: {
						title: '专题推荐',
						icon: 'sms-subject'
					}
				},*/
					{
					path: 'newSubject',
					name: 'newHomeSubject',
					component: () =>
						import('@/views/sms/newSubject/index'),
					meta: {
						title: '专题推荐(新)',
						icon: 'zhuanti'
					}
				},
				{
					path: 'addNewSubject',
					name: 'addNewSubject',
					component: () =>
						import('@/views/sms/newSubject/add'),
					meta: {
						title: '添加专题推荐'
					},
					hidden: true
				},
					{
					path: 'updateNewSubject',
					name: 'updateNewSubject',
					component: () =>
						import('@/views/sms/newSubject/update'),
					meta: {
						title: '修改专题推荐'
					},
					hidden: true
				},
				
				{
					path: 'newSubjectCategory',
					name: 'newHomeSubjectCategory',
					component: () =>
						import('@/views/sms/newSubjectCategory/index'),
					meta: {
						title: '专题分组(新)',
						icon: 'tuijian'
					}
				},
				{
					path: 'addcategory',
					name: 'addcategory',
					component: () =>
						import('@/views/sms/newSubjectCategory/add'),
					meta: {
						title: '添加专题推荐分组'
					},
					hidden: true
				},
					{
					path: 'updatecategory',
					name: 'updatecategory',
					component: () =>
						import('@/views/sms/newSubjectCategory/update'),
					meta: {
						title: '修改专题推荐分组'
					},
					hidden: true
				},
				{
					path: 'advertise',
					name: 'homeAdvertise',
					component: () =>
						import('@/views/sms/advertise/index'),
					meta: {
						title: '广告列表',
						icon: 'sms-ad'
					}
				},
				{
					path: 'addAdvertise',
					name: 'addHomeAdvertise',
					component: () =>
						import('@/views/sms/advertise/add'),
					meta: {
						title: '添加广告'
					},
					hidden: true
				},
				{
					path: 'updateAdvertise',
					name: 'updateHomeAdvertise',
					component: () =>
						import('@/views/sms/advertise/update'),
					meta: {
						title: '编辑广告'
					},
					hidden: true
				}

				,
				{
					path: 'assemble',
					name: 'assemble',
					component: () =>
						import('@/views/sms/assemble/index'),
					meta: {
						title: '拼团列表',
						icon: 'sms-ad'
					}
				},
				{
					path: 'addAssemble',
					name: 'addAssemble',
					component: () =>
						import('@/views/sms/assemble/add'),
					meta: {
						title: '添加拼团'
					},
					hidden: true
				},
				{
					path: 'updateAssemble',
					name: 'updateAssemble',
					component: () =>
						import('@/views/sms/assemble/update'),
					meta: {
						title: '编辑拼团'
					},
					hidden: true
				},
				{
					path: 'seckill',
					name: 'seckill',
					component: () =>
						import('@/views/sms/seckill/index'),
					meta: {
						title: '秒杀列表',
						icon: 'sms-ad'
					}
				},
				{
					path: 'addSeckill',
					name: 'addSeckill',
					component: () =>
						import('@/views/sms/seckill/add'),
					meta: {
						title: '添加秒杀'
					},
					hidden: true
				},
				{
					path: 'updateSeckill',
					name: 'updateSeckill',
					component: () =>
						import('@/views/sms/seckill/update'),
					meta: {
						title: '编辑秒杀'
					},
					hidden: true
				},
				{
					path: 'discount',
					name: 'discount',
					component: () =>
						import('@/views/sms/discount/index'),
					meta: {
						title: '限时折扣',
						icon: 'sms-ad'
					}
				},
				{
					path: 'addDiscount',
					name: 'addDiscount',
					component: () =>
						import('@/views/sms/discount/add'),
					meta: {
						title: '添加限时折扣'
					},
					hidden: true
				},
				{
					path: 'updateDiscount',
					name: 'updateDiscount',
					component: () =>
						import('@/views/sms/discount/update'),
					meta: {
						title: '编辑限时折扣'
					},
					hidden: true
				},{
					path: 'logo',
					name: 'logo',
					component: () =>
						import('@/views/sms/logo/index'),
					meta: {
						title: 'Logo背景图',
						icon: 'sms-ad'
					}
				},
				{
					path: 'addLogoManage',
					name: 'addLogoManage',
					component: () =>
						import('@/views/sms/logo/add'),
					meta: {
						title: '添加Logo背景图'
					},
					hidden: true
				},
				{
					path: 'updateLogoManage',
					name: 'updateLogoManage',
					component: () =>
						import('@/views/sms/logo/update'),
					meta: {
						title: '编辑Logo背景图'
					},
					hidden: true
				},{
					path: 'dom',
					name: 'dom',
					component: () =>
						import('@/views/sms/dom/index'),
					meta: {
						title: '弹窗广告',
						icon: 'sms-ad'
					}
				},
				{
					path: 'addDomManage',
					name: 'addDomManage',
					component: () =>
						import('@/views/sms/dom/add'),
					meta: {
						title: '添加弹窗广告'
					},
					hidden: true
				},
				{
					path: 'updateDomManage',
					name: 'updateDomManage',
					component: () =>
						import('@/views/sms/dom/update'),
					meta: {
						title: '编辑弹窗广告'
					},
					hidden: true
				},{
					path: 'banner',
					name: 'banner',
					component: () =>
						import('@/views/sms/banner/index'),
					meta: {
						title: '分类条Banner',
						icon: 'sms-ad'
					}
				},
				{
					path: 'addBannerManage',
					name: 'addBannerManage',
					component: () =>
						import('@/views/sms/banner/add'),
					meta: {
						title: '添加分类条Banner'
					},
					hidden: true
				},
				{
					path: 'updateaBnnerManage',
					name: 'updateaBnnerManage',
					component: () =>
						import('@/views/sms/banner/update'),
					meta: {
						title: '编辑分类条Banner'
					},
					hidden: true
				},{
					path: 'weChatBanner',
					name: 'weChatBanner',
					component: () =>
						import('@/views/sms/weChat/index'),
					meta: {
						title: 'WeChatBanner',
						icon: 'sms-ad'
					}
				},
				{
					path: 'addWeChatBannerManage',
					name: 'addWeChatBannerManage',
					component: () =>
						import('@/views/sms/weChat/add'),
					meta: {
						title: '添加WeChatBanner'
					},
					hidden: true
				},
				{
					path: 'updateaWeChatBnnerManage',
					name: 'updateaWeChatBnnerManage',
					component: () =>
						import('@/views/sms/weChat/update'),
					meta: {
						title: '编辑WeChatBanner'
					},
					hidden: true
				},
				//			{
				//				path: 'freight',
				//				name: 'freight',
				//				component: () =>
				//					import('@/views/sms/freight/index'),
				//				meta: {
				//					title: '运费设置',
				//					icon: 'sms-ad'
				//				}
				//			},
				{
					path: 'addFreight',
					name: 'addFreight',
					component: () =>
						import('@/views/sms/freight/add'),
					meta: {
						title: '添加运费设置'
					},
					hidden: true
				},
				{
					path: 'updateFreight',
					name: 'updateFreight',
					component: () =>
						import('@/views/sms/freight/update'),
					meta: {
						title: '编辑运费设置'
					},
					hidden: true
				},
				{
					path: 'coupon1',
					name: 'coupon1',
					component: () =>
						import('@/views/sms/newcoupon/index'),
					meta: {
						title: '优惠券',
						icon: 'sms-coupon'
					}
				}, {
					path: 'openTheCopon',
					name: 'openTheCopon',
					component: () =>
						import('@/views/sms/newcoupon/components/openTheCopon'),
					meta: {
						title: '优惠券领取记录'
					},
					hidden: true
				},
				{
					path: 'coupon2',
					name: 'coupon2',
					component: () =>
						import('@/views/sms/group/index'),
					meta: {
						title: '优惠券组',
						icon: 'sms-coupon'
					}
				},
				{
					path: 'addGroup',
					name: 'addGroup',
					component: () =>
						import('@/views/sms/group/add'),
					meta: {
						title: '添加优惠券'
					},
					hidden: true
				},
				{
					path: 'addCoupon1/:id',
					name: 'addCoupon1',
					component: () =>
						import('@/views/sms/newcoupon/add'),
					meta: {
						title: '添加优惠券'
					},
					hidden: true
				},
				{
					path: 'updateCoupon1',
					name: 'updateCoupon1',
					component: () =>
						import('@/views/sms/newcoupon/update'),
					meta: {
						title: '修改优惠券'
					},
					hidden: true
				},
				{
					path: 'updateGroup',
					name: 'updateGroup',
					component: () =>
						import('@/views/sms/group/update'),
					meta: {
						title: '修改优惠券'
					},
					hidden: true
				},

				{
					path: 'transport',
					name: 'transport',
					component: () =>
						import('@/views/sms/transport/transport'),
					meta: {
						title: '运费模板'
					}

				},
				{
					path: 'transport-add-or-update',
					name: 'transport-add-or-update',
					component: () =>
						import('@/views/sms/transport/transport-add-or-update'),
					meta: {
						title: '运费模板11'
					},
					hidden: true
				}
			]
		},
		{
			path: '/data',
			component: Layout,
			redirect: '/data/achievement',
			name: 'data',
			meta: {
				title: '数据',
				icon: 'data'
			},
			children: [{
					path: 'achievement',
					name: 'achievement',
					component: () =>
						import('@/views/data/achievement/index'),
					meta: {
						title: '业绩分析',
						icon: 'data-coupon'
					}
				},
				{
					path: 'goods',
					name: 'goods',
					component: () =>
						import('@/views/data/goods/product'),
					meta: {
						title: '商品分析',
						icon: 'data-coupon'
					}
				},
				{
					path: 'customer',
					name: 'customer',
					component: () =>
						import('@/views/data/customer/customer'),
					meta: {
						title: '客户分析',
						icon: 'data-coupon'
					}
				},
				{
					path: 'deal',
					name: 'deal',
					component: () =>
						import('@/views/data/deal/deal'),
					meta: {
						title: '交易分析',
						icon: 'data-coupon'
					}
				},
				{
					path: 'flow',
					name: 'flow',
					component: () =>
						import('@/views/data/flow/flow'),
					meta: {
						title: '流量分析',
						icon: 'data-coupon'
					}
				}
			]
		},
		{
			path: '/translate',
			component: Layout,
			redirect: '/translate/list',
			name: 'translate',
			meta: {
				title: '客户',
				icon: 'sms-flash'
			},
			children: [{
					path: 'list',
					name: 'list',
					component: () =>
						import('@/views/ums/translate/index'),
					meta: {
						title: '用户列表',
						icon: 'sms-flash'
					}

				}, {
					path: 'translateUpdate',
					name: 'translateUpdate',
					component: () =>
						import('@/views/ums/translate/update'),
					meta: {
						title: '用户设置'
					},
					hidden: true
				},

				{
					path: 'lableList',
					name: 'lableList',
					component: () =>
						import('@/views/ums/lable/index'),
					meta: {
						title: '标签管理',
						icon: 'sms-flash'
					}
				}
			]
		},
		{
			path: '/ums',
			component: Layout,
			redirect: '/ums/admin',
			name: 'ums',
			meta: {
				title: '权限',
				icon: 'ums'
			},
			children: [{
					path: 'admin',
					name: 'admin',
					component: () =>
						import('@/views/ums/admin/index'),
					meta: {
						title: '用户列表',
						icon: 'ums-admin'
					}
				},
				{
					path: 'role',
					name: 'role',
					component: () =>
						import('@/views/ums/role/index'),
					meta: {
						title: '角色列表',
						icon: 'ums-role'
					}
				},
				{
					path: 'allocMenu',
					name: 'allocMenu',
					component: () =>
						import('@/views/ums/role/allocMenu'),
					meta: {
						title: '分配菜单'
					},
					hidden: true
				},
				{
					path: 'allocResource',
					name: 'allocResource',
					component: () =>
						import('@/views/ums/role/allocResource'),
					meta: {
						title: '分配资源'
					},
					hidden: true
				},
				{
					path: 'menu',
					name: 'menu',
					component: () =>
						import('@/views/ums/menu/index'),
					meta: {
						title: '菜单列表',
						icon: 'ums-menu'
					}
				},
				{
					path: 'addMenu',
					name: 'addMenu',
					component: () =>
						import('@/views/ums/menu/add'),
					meta: {
						title: '添加菜单'
					},
					hidden: true
				},
				{
					path: 'updateMenu',
					name: 'updateMenu',
					component: () =>
						import('@/views/ums/menu/update'),
					meta: {
						title: '修改菜单'
					},
					hidden: true
				},
				{
					path: 'resource',
					name: 'resource',
					component: () =>
						import('@/views/ums/resource/index'),
					meta: {
						title: '资源列表',
						icon: 'ums-resource'
					}
				},
				{
					path: 'resourceCategory',
					name: 'resourceCategory',
					component: () =>
						import('@/views/ums/resource/categoryList'),
					meta: {
						title: '资源分类'
					},
					hidden: true
				}
				//			, {
				//				path: 'retailerLevel',
				//				name: 'retailerLevel',
				//				component: () =>
				//					import('@/views/ums/retailerLevel/index'),
				//				meta: {
				//					title: '分销商等级',
				//					icon: 'sms-flash'
				//				}
				//			}
			]
		},
		{
			path: '/mem',
			component: Layout,
			redirect: '/mem/retailerLevel',
			name: 'mem',
			meta: {
				title: '会员分销',
				icon: 'mem'
			},
			children: [{
					path: 'retailerManage',
					name: 'retailerManage',
					component: () =>
						import('@/views/ums/retailerManage/index'),
					meta: {
						title: '分销商管理',
						icon: 'ums-role'
					}
				}, 
				{
					path: 'under',
					name: 'under',
					component: () =>
						import('@/views/ums/retailerManage/under'),
					meta: {
						title: '下级分销商',
						icon: 'ums-role'
					},
					hidden: true
				}, 
				{
					path: 'retailerLevel',
					name: 'retailerLevel',
					component: () =>
						import('@/views/ums/retailerLevel/index'),
					meta: {
						title: '分销商等级',
						icon: 'sms-flash'
					},
					hidden: true
				},
				{
					path: 'addRetailer',
					name: 'addRetailer',
					component: () =>
						import('@/views/ums/retailerLevel/add'),
					meta: {
						title: '添加分销商等级'
					},
					hidden: true
				},
				{
					path: 'updateRetailer',
					name: 'updateRetailer',
					component: () =>
						import('@/views/ums/retailerLevel/update'),
					meta: {
						title: '修改分销商等级'
					},
					hidden: true
				}, {
					path: 'info',
					name: 'info',
					component: () =>
						import('@/views/ums/incomeExamine/info/info'),
					meta: {
						title: '经营收益提现申请信息',
						icon: 'sms-flash'
					},
					hidden: true
				}, {
					path: 'incomeExamine',
					name: 'incomeExamine',
					component: () =>
						import('@/views/ums/incomeExamine/index'),
					meta: {
						title: '收益提现',
						icon: 'sms-flash'
					},
					hidden: true
				}, {
					path: 'vipsetup',
					name: 'vipsetup',
					component: () =>
						import('@/views/ums/vipsetup/index'),
					meta: {
						title: '基础设置',
						icon: 'sms-flash'
					},
					hidden: true
				}

			]
		},
		{
			path: '/shop',
			component: Layout,
			redirect: '/shop/shopMaster',
			name: 'shop',
			meta: {
				title: '店铺',
				icon: 'mem'
			},
			children: [{
					path: 'shopManage',
					name: 'shopManage',
					component: () =>
						import('@/views/shop/index'),
					meta: {
						title: '自定义页面',
						icon: 'ums-role'
					}
				},

				{
					path: 'addShopManage',
					name: 'addShopManage',
					component: () =>
						import('@/views/shop/add'),
					meta: {
						title: '添加自定义页面'
					},
					hidden: true
				},
				{
					path: 'updateShopManage',
					name: 'updateShopManage',
					component: () =>
						import('@/views/shop/update'),
					meta: {
						title: '修改自定义页面'
					},
					hidden: true
				}

			]
		}, {
			path: '/sup',
			component: Layout,
			redirect: '/sup/supplierMaster',
			name: 'sup',
			meta: {
				title: '公司',
				icon: 'mem'
			},
			children: [{
					path: 'supplierManage',
					name: 'supplierManage',
					component: () =>
						import('@/views/sup/index'),
					meta: {
						title: '公司设置管理',
						icon: 'ums-role'
					}
				},

				{
					path: 'addSupplierManage',
					name: 'addSupplierManage',
					component: () =>
						import('@/views/sup/add'),
					meta: {
						title: '添加公司设置'
					},
					hidden: true
				},
				{
					path: 'updateSupplierManage',
					name: 'updateSupplierManage',
					component: () =>
						import('@/views/sup/update'),
					meta: {
						title: '修改公司设置'
					},
					hidden: true
				}

			]
		}, {
			path: '/supOrder',
			component: Layout,
			redirect: '/supOrder/supOrderMaster',
			name: 'supOrder',
			meta: {
				title: '供应商订单',
				icon: 'mem'
			},
			children: [{
					path: 'supOrderManage',
					name: 'supOrderManage',
					component: () =>
						import('@/views/supOrder/index'),
					meta: {
						title: '供应商订单',
						icon: 'ums-role'
					}
			},
			{
					path: 'orderDetail2',
					name: 'orderDetail2',
					component: () =>
						import('@/views/oms/order/orderDetail'),
					meta: {
						title: '订单详情'
					},
					hidden: true
				},
			]
		},
		{
			path: '/finance',
			component: Layout,
			redirect: '/finance/getAmount',
			name: 'finance',
			meta: {
				title: '财务管理',
				icon: 'sui'
			},
			children: [{
					path: 'getAmount',
					name: 'getAmount',
					component: () =>
						import('@/views/finance/shuiyoudi/getAmount'),
					meta: {
						title: '账户余额查询',
						icon: 'balance'
					}
			},
			{
					path: 'getTransaction',
					name: 'getTransaction',
					component: () =>
						import('@/views/finance/shuiyoudi/getTransaction'),
					meta: {
						title: '查询打款任务详情'
					},
				},
			]
		},
		{
			path: '/asset',
			component: Layout,
			redirect: '/asset/index',
			name: 'asset',
			meta: {
				title: '财务系统',
				icon: 'sui'
			},
			children: [{
					path: 'index',
					name: 'index',
					component: () =>
						import('@/views/asset/index'),
					meta: {
						title: '打税查询',
						icon: 'balance'
					}
			},{
					path: 'detail',
					name: 'detail',
					component: () =>
						import('@/views/asset/detail'),
					meta: {
						title: '收益详情'
					},
					hidden: true
				},
			
			]
		},
		{
			path: '*',
			redirect: '/404',
			hidden: true
		}]

		export default new Router({
			// mode: 'history', //后端支持可开
			scrollBehavior: () => ({
				y: 0
			}),
			routes: constantRouterMap
		})