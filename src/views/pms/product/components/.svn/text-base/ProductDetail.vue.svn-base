<template>
	<el-card class="form-container" shadow="never">
		<el-steps :active="active" finish-status="success" align-center>
			<el-step title="填写商品信息"></el-step>
			<el-step title="填写商品促销"></el-step>
			<el-step title="填写商品属性"></el-step>
			<el-step title="填写基础分销"></el-step>
			<el-step title="填写会员分销"></el-step>
			<el-step title="选择商品关联"></el-step>
		</el-steps>
		<product-info-detail v-show="showStatus[0]" v-model="productParam" :is-edit="isEdit" @nextStep="nextStep">
		</product-info-detail>
		<product-sale-detail v-show="showStatus[1]" v-model="productParam" :is-edit="isEdit" @nextStep="nextStep" @prevStep="prevStep">
		</product-sale-detail>
		<product-attr-detail v-show="showStatus[2]" v-model="productParam" :is-edit="isEdit" @nextStep="nextStep" @prevStep="prevStep">
		</product-attr-detail>

		<product-jcfx-detail v-show="showStatus[3]" v-model="productParam" :is-edit="isEdit" @nextStep="nextStep" @prevStep="prevStep">
		</product-jcfx-detail>

		<product-hyfx-detail v-show="showStatus[4]" v-model="productParam" :is-edit="isEdit" @nextStep="nextStep" @prevStep="prevStep">
		</product-hyfx-detail>

		<product-relation-detail v-show="showStatus[5]" v-model="productParam" :is-edit="isEdit" @prevStep="prevStep" @finishCommit="finishCommit">
		</product-relation-detail>
	</el-card>
</template>
<script>
	import ProductInfoDetail from './ProductInfoDetail';
	import ProductSaleDetail from './ProductSaleDetail';
	import ProductAttrDetail from './ProductAttrDetail';
	import ProductJcfxDetail from './ProductJcfxDetail';
	import ProductHyfxDetail from './ProductHyfxDetail';
	import ProductRelationDetail from './ProductRelationDetail';
	import { createProduct, getProduct, updateProduct } from '@/api/product';

	const defaultProductParam = {
		freight:'',
		couponOn:1,
		supplierId:'',
		albumPics: '',
		brandId: null,
		brandName: '',
		transportId:'',
		deleteStatus: 0,
		description: '',
		detailDesc: '',
		detailHtml: '',
		detailMobileHtml: '',
		detailTitle: '',
		feightTemplateId: 0,
		flashPromotionCount: 0,
		flashPromotionId: 0,
		flashPromotionPrice: 0,
		flashPromotionSort: 0,
		giftPoint: 0,
		giftGrowth: 0,
		keywords: '',
		lowStock: 0,
		name: '',
		newStatus: 0,
		note: '',
		originalPrice: 0,
		pic: '',
		//会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
		memberPriceList: [],
		//商品满减
		productFullReductionList: [{
			fullPrice: 0,
			reducePrice: 0
		}],
		//商品阶梯价格
		productLadderList: [{
			count: 0,
			discount: 0,
			price: 0
		}],
		//商品分销设置
		previewStatus: 0,
		price: 0,
		productAttributeCategoryId: null,
		//商品属性相关{productAttributeId: 0, value: ''}
		productAttributeValueList: [],
		//商品sku库存信息{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', sp1: '', sp2: '', sp3: '', stock: 0}
		    //商品sku库存信息{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', spData: '', stock: 0}
		skuStockList: [],
		pmsProductRootList: {
			isRetail: 0,//是否参与分销 ---》0不参与 1参与
			isTwoRetail: 0,//二级分销0关闭  1 开启
			isSalasGold:null,//0.详细销售佣金  1.统一销售佣金
			oneSalaGold:null,//一级销售佣金
			twoSalaGold:null,//二级销售佣金
			oneSalaGoldRatio:null,//一级销售金比例
			twoSalaGoldRatio:null,//二级销售金比例
			dzOneSalaGold:null,//店主一级销售佣金
			dzOneSalaGoldRatio:null,//店主一级销售比例
			zjOneSalaGold:null,//总监一级销售佣金
			zjOneSalaGoldRatio:null,//总监一级销售比例
			fwsOneSalaGold:null,//服务商一级销售佣金
			fwsOneSalaGoldRatio:null,//服务商一级销售比例
			dzTwoSalaGold:null,//店主二级销售佣金
			dzTwoSalaGoldRatio:null,//店主二级销售比例
			zjTwoSalaGold:null,//总监二级销售佣金
			zjTwoSalaGoldRatio:null,//总监二级销售比例
			fwsTwoSalaGold:null,//服务商二级销售佣金
			fwsTwoSalaGoldRatio:null,//服务商二级销售比例
			isGiftPack:0,//是否开启礼包   0 不开启  1 开启
			isGiftMoneyStatus:0,//礼包奖励状态 1开启  0 关闭
			isGiftMoney:null,//礼包奖励要满足多少钱
			dzZjMoney:null,//店主直接奖金
			dzTjMoney:null,//店主同级奖金
			dzJjMoney:null,//店主间接奖金
			zzZjMoney:null,//总监直接奖金
			zzTjMoney:null,//总监同级奖金
			zzJjMoney:null,//总监间接奖金
			fwsZjMoney:null,//服务商直接奖金
			fwsTjMoney:null,//服务商同级奖金
			fwsJjMoney:null//服务商间接奖金
		},
		//商品相关专题{subjectId: 0}
		subjectProductRelationList: [],
		//商品相关优选{prefrenceAreaId: 0}
		prefrenceAreaProductRelationList: [],
		productCategoryId: null,
		productCategoryName: '',
		productSn: '',
		promotionEndTime: '',
		promotionPerLimit: 0,
		promotionPrice: null,
		promotionStartTime: '',
		promotionType: 0,
		publishStatus: 0,
		recommandStatus: 0,
		sale: 0,
		serviceIds: '',
		sort: 0,
		stock: 0,
		subTitle: '',
		unit: '',
		usePointLimit: 0,
		verifyStatus: 0,
		weight: 0
	};
	export default {
		name: 'ProductDetail',
		components: {
			ProductInfoDetail,
			ProductSaleDetail,
			ProductAttrDetail,
			ProductJcfxDetail,
			ProductHyfxDetail,
			ProductRelationDetail
		},
		props: {
			isEdit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				active: 0,
				productParam: Object.assign({}, defaultProductParam),
				showStatus: [true, false, false, false, false, false]
			}
		},
		created() {
			if(this.isEdit) {
				getProduct(this.$route.query.id).then(response => {
					this.productParam = response.data;
				});
			}
		},
		methods: {
			hideAll() {
				for(let i = 0; i < this.showStatus.length; i++) {
					this.showStatus[i] = false;
				}
			},
			prevStep() {
				if(this.active > 0 && this.active < this.showStatus.length) {
					this.active--;
					this.hideAll();
					this.showStatus[this.active] = true;
				}
			},
			nextStep() {
				if(this.active < this.showStatus.length - 1) {
					this.active++;
					this.hideAll();
					this.showStatus[this.active] = true;
				}
			},
			finishCommit(isEdit) {
				this.$confirm('是否要提交该产品', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(isEdit) {
						updateProduct(this.$route.query.id, this.productParam).then(response => {
							this.$message({
								type: 'success',
								message: '提交成功',
								duration: 1000
							});
							this.$router.back();
						});
					} else {
						createProduct(this.productParam).then(response => {

							this.$message({
								type: 'success',
								message: '提交成功',
								duration: 1000
							});
							location.reload();
						});
					}
				})
			}
		}
	}
</script>
<style>
	.form-container {
		width: 800px;
	}
</style>